const express = require('express');
const mongoose = require('mongoose');
const XLSX = require('xlsx');

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb://0.0.0.0:27017/Faculty-Data-Management-System", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connection sucessfull!!"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(5500, () => {
    console.log('Server started on port 5500');
});