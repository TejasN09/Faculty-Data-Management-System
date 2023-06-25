const express = require('express');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const User = require('./models/User');
const PatentInfo = require('./models/PatentInfo');
const PublicationInfo = require('./models/PublicationInfo');
const db = require("./db")
const app = express();
app.use(express.json());

//initialze db
db();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
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
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error saving user to MongoDB:', error);
        res.status(500).json({ error: 'Error saving user' });
    }
});

app.post('/patent-info', async (req, res) => {
    try {
        const newPatentInfo = new PatentInfo({
            patentApplicationId: req.body.patentApplicationId,
            statusOfPatent: req.body.statusOfPatent,
            inventorsName: req.body.inventorsName,
            titleOfPatent: req.body.titleOfPatent,
            applicantsNumber: req.body.applicantsNumber,
            patentFilledDate: req.body.patentFilledDate,
            patentPublishedDate: req.body.patentPublishedDate,
            patentGrantedDate: req.body.patentGrantedDate,
            patentPublishedNumber: req.body.patentPublishedNumber,
            patentGrantedNumber: req.body.patentGrantedNumber,
            assigneeName: req.body.assigneeName,
            mediaFile: req.body.mediaFile,
        });

        await newPatentInfo.save();
        res.status(201).json({ message: 'Patent Info created successfully' });
    } catch (error) {
        console.error('Error saving patent info to MongoDB:', error);
        res.status(500).json({ error: 'Error saving patent info' });
    }
});

app.post('/publication-info', async (req, res) => {
    try {
      const newPublicationInfo = new PublicationInfo({
        wosSubjectId: req.body.wosSubjectId,
        wosSubject: req.body.wosSubject,
        expertiseId: req.body.expertiseId,
        expertise: req.body.expertise,
        briefExpertise: req.body.briefExpertise,
        qualification: req.body.qualification,
        subject: req.body.subject,
        organization: req.body.organization,
        organizationType: req.body.organizationType,
        organizationURL: req.body.organizationURL,
        workingFromMonth: req.body.workingFromMonth,
        workingFromYear: req.body.workingFromYear,
        orcidId: req.body.orcidId,
        researcherId: req.body.researcherId,
        scopusId: req.body.scopusId,
        googleScholarId: req.body.googleScholarId,
      });
  
      await newPublicationInfo.save();
      res.status(201).json({ message: 'Publication info created successfully' });
    } catch (error) {
      console.error('Error saving publication info to MongoDB:', error);
      res.status(500).json({ error: 'Error saving publication info' });
    }
  });
  
app.listen(5500, () => {
    console.log('Server started on port 5500');
});
