const express = require("express");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const fs = require("fs");
const cors = require('cors');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/User");
const PublicationInfo = require("./models/PublicationInfo");
const DevelopmentProgramme = require("./models/DevelopmentProgrammes");
const PatentInfo = require("./models/Patent");
const db = require("./db");
const app = express();

const { sendotp, verifyotp } = require("./controllers/otp.controller");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// initialize db
db()

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/sendotp", sendotp);
app.post("/verifyotp", verifyotp);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        console.log(password, user.password, isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

        res.json({
            token,
            user: {
                id: user._id,
                userId: user.userId,
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


// Register a new user and save publication and patent details
app.post("/register", async (req, res) => {
    try {
        const userData = req.body;

        const newUser = new User({
            userId: uuidv4(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            conformPassword: userData.conformPassword,
            username: userData.username,
            age: userData.age,
            dateOfBirth: userData.dateOfBirth,
            fullAddress: userData.fullAddress,
            city: userData.city,
            state: userData.state,
            contact: userData.contact,
            university: userData.university,
            universityId: userData.universityId,
            department: userData.department,
        });
        await newUser.save();

        res.status(201).json({ message: "User data created successfully" });
    } catch (error) {
        console.error("Error saving user info to MongoDB:", error);
        res.status(500).json({ error: "Error saving user info" });
    }
});

// publication details
app.post("/publication-details/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const newPublicationInfo = new PublicationInfo({
            userId: userId,
            publicationId: new mongoose.Types.ObjectId(),
            ...req.body,
        });
        await newPublicationInfo.save();
        res.status(201).json({ message: "Publication info created successfully" });
    } catch (error) {
        console.error("Error saving publication info to MongoDB:", error);
        res.status(500).json({ error: "Error saving publication info" });
    }
});

// patent details
app.post("/patent-details/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const newPatentInfo = new PatentInfo({
            userId: userId,
            ...req.body,
        });
        await newPatentInfo.save();
        res.status(201).json({ message: "Patent info created successfully" });
    } catch (error) {
        console.error("Error saving patent info to MongoDB:", error);
        res.status(500).json({ error: "Error saving patent info" });
    }
});

// development programme details
app.post("/programme-details/:userId", async (req, res) => {
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


app.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const userData = await User.findOne({ userId: userId }).select("-_id -userId -password");
        const publicationInfoData = await PublicationInfo.findOne({ userId: userId }).select("-_id -userId");

        res.status(200).json({ userData, publicationInfoData });
    } catch (error) {
        console.error("Error fetching user from MongoDB:", error);
        res.status(500).json({ error: "Error fetching user" });
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
                fullAddress: req.body.address.fullAddress,
                city: req.body.address.city,
                state: req.body.address.state,
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

app.post("/delete-publication-info/:userId/:publicationId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const publicationId = req.params.publicationId;
        const deletedPublicationInfo = await PublicationInfo.findOneAndDelete({
            userId: userId,
            publicationId: publicationId,
        });

        if (!deletedPublicationInfo) {
            return res.status(404).json({ error: "Publication info not found" });
        }

        deletedPublicationInfo.save();

        res.status(201).json({ message: "Publication info deleted successfully" });
    } catch (error) {
        console.error("Error deleting publication info to MongoDB:", error);
        res.status(500).json({ error: "Error deleting publication info" });
    }
});

// share profile
app.post("/share-profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const [sharedProfile, publicationInfoData, patentInfoData] = await Promise.all([
            User.findOne({ userId }).select("-_id -userId -password"),
            PublicationInfo.findOne({ userId }).select("-_id -userId"),
            PatentInfo.findOne({ userId }).select("-_id -userId")
        ]);

        if (!sharedProfile) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ sharedProfile, publicationInfoData, patentInfoData });
    } catch (error) {
        console.error("Error fetching user from MongoDB:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
});


app.get("/fetch-data", async (req, res) => {
    // const userId = req.params.userId;

    //array of strings where admin will select the fields to be fetched from the frontend
    const selectedUserFields = req.body.selectedUserFields;
    const selectedFields = req.body.selectedFields;

    try {
        const data = await PublicationInfo.aggregate([
            {
                $lookup: {
                    // The name of the "User" collection
                    from: "users",
                    // The field in the "PublicationInfo" collection to match with
                    localField: "userId",
                    // The field in the "User" collection to match with
                    foreignField: "userId",
                    // The name of the array to store the matched data from the "User" collection
                    as: "userData",
                },
            },
            {
                $unwind: "$userData",
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ["$userData", "$$ROOT"] },
                },
            },

            {
                $project: {
                    _id: 0, // Exclude "_id" field from the result
                    ...selectedUserFields.reduce((obj, field) => ({ ...obj, [field]: 1 }), {}), // Include only the selected fields from the "User" collection
                    ...selectedFields.reduce((obj, field) => ({ ...obj, [field]: 1 }), {}), // Include only the selected fields from the "PublicationInfo" collection
                },
            },

        ]);
        // console.log(data);

        // Combine the data by userId and remove duplicate fields from the array(data)
        function combineDataByUserId(data) {
            const userMap = new Map();
            //using map to store the data
            data.forEach((item) => {
                const userId = item.userId;

                if (userMap.has(userId)) {
                    const existingData = userMap.get(userId);

                    for (const key in item) {
                        //if key is not userId then add the data to the map
                        if (key !== "userId") {
                            if (Array.isArray(item[key])) {
                                existingData[key] = [...new Set([...existingData[key], ...item[key]])];
                            } else { //if key is not an array then add the data to the map
                                if (existingData[key] !== undefined && existingData[key] !== item[key]) {
                                    existingData[key] = [existingData[key], item[key]].filter(Boolean).join(", "); //after adding the data to the map add comma to separate the data
                                } else {
                                    existingData[key] = item[key];
                                }
                            }
                        }
                    }
                } else {
                    const userData = { ...item };
                    userMap.set(userId, userData);
                }
            });

            return Array.from(userMap.values());
        }

        // call the function
        const combinedData = combineDataByUserId(data);

        // Remove the "userId" field from the combined data
        const finalData = combinedData.map((item) => {
            const { userId, ...rest } = item;
            return rest;
        });

        // Generate the custom header for the Excel sheet
        // remove the "userId" field from the header
        const header = [...selectedUserFields, ...selectedFields].filter((field) => field !== "userId");
        console.log(header);

        // Create a new workbook
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(finalData, { header });

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
