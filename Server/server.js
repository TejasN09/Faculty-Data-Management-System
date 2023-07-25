const express = require("express");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/User");
const PublicationInfo = require("./models/PublicationInfo");
const DevelopmentProgramme = require("./models/DevelopmentProgrammes");
const db = require("./db");
const app = express();

app.use(express.json());

// initialize db
db()


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            userId: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            age: req.body.age,
            dateOfBirth: req.body.dateOfBirth,
            address: {
                fullAddress: req.body.address.fullAddress,
                city: req.body.address.city,
                state: req.body.address.state,
            },
            contact: req.body.contact,
            university: req.body.university,
            universityId: req.body.universityId,
            department: req.body.department,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error saving user to MongoDB:", error);
        res.status(500).json({ error: "Error saving user" });
    }
});

//added all details in one place
app.post("/register/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const newPublicationInfo = new PublicationInfo({
            userId: userId,
            ...req.body,
        });
        await newPublicationInfo.save();
        res.status(201).json({ message: "Publication info created successfully" });
    } catch (error) {
        console.error("Error saving publication info to MongoDB:", error);
        res.status(500).json({ error: "Error saving publication info" });
    }
});

app.post("/addition-details/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const newDevelopmentProgramme = new DevelopmentProgramme({
            userId: userId,
            name: req.body.name,
            titleOfProgramme: req.body.titleOfProgramme,
            durationOfProgramme: {
                from: req.body.durationOfProgramme.from,
                to: req.body.durationOfProgramme.to,
            },
        });

        await newDevelopmentProgramme.save();
        res.status(201).json({ message: "Development Programme created successfully" });
    } catch (error) {
        console.error("Error saving Development Programme to MongoDB:", error);
        res.status(500).json({ error: "Error saving Development Programme" });
    }
});

//user profile can be updated
app.post("/edit-profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                dateOfBirth: req.body.dateOfBirth,
                address: {
                    fullAddress: req.body.address.fullAddress,
                    city: req.body.address.city,
                    state: req.body.address.state,
                },
                contact: req.body.contact,
                university: req.body.university,
                universityId: req.body.universityId,
                department: req.body.department,
            },
            { new: true }
        );

        updatedUser.save();

        res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user to MongoDB:", error);
        res.status(500).json({ error: "Error updating user" });
    }
});



app.get("/fetch-data", async (req, res) => {
    // const userId = req.params.userId;

    //array of strings where admin will select the fields to be fetched from the frontend
    const selectedUserFields = req.body.selectedUserFields;
    const selectedFields = req.body.selectedFields; 

    try {
        const userData = await User.find({}, selectedUserFields).lean();
        const data = await PublicationInfo.find({}, selectedFields).lean();

        //if no data is found in the database
        if (!Array.isArray(data) || data.length === 0 || !Array.isArray(userData) || userData.length === 0) {
            console.log("No data found in the database");
        }

        // Combine the data from the two collections users and publicationInfo using the userId field
        const combinedData = data.map((publication) => {
            const matchingUser = userData.find(
                (user) => user.userId === publication.userId
            );
            return { ...publication, ...matchingUser };
        });

        // Reorder the data to match the order of the selected fields
        const reorderedData = combinedData.map((item) => {
            const orderedItem = {};
            selectedUserFields.forEach((field) => {
                orderedItem[field] = item[field];
            });
            selectedFields.forEach((field) => {
                orderedItem[field] = item[field];
            });
            return orderedItem;
        });
        console.log(reorderedData);

        // Generate the custom header for the Excel sheet
        const header = [...selectedUserFields, ...selectedFields];
        console.log(header);

        // Create a new workbook
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(reorderedData, { header });

        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Save the Excel file to the server (optional)
        const filename = `demo.xlsx`;
        fs.writeFileSync(filename, excelBuffer);

        // Send the Excel file as a downloadable attachment
        res.set('Content-Disposition', `attachment; filename=demo${Date.now()}.xlsx`);
        res.send(excelBuffer);

        fs.unlinkSync(filename);
    }
    catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(5500, () => {
    console.log("Server started on port 5500");
});
