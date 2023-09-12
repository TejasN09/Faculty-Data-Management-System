const mongoose = require("mongoose");

const patentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    patentApplicationId: {
        type: String,
        required: true,
    },
    patentLink: {
        type: String,
    },
    patentDate: {
        type: Date,
        required: true,
    },
    statusOfPatent: {
        type: String,
        required: true,
    },
    titleOfPatent: {
        type: String,
        required: true,
    },
    patentFilledDate: {
        type: Date,
        required: true,
    },
    patentPublishedDate: {
        type: Date,
    },
    patentGrantedDate: {
        type: Date,
    },
    patentPublishedNumber: {
        type: String,
    },
});

const PatentInfo = mongoose.model("PatentInfo", patentSchema);

module.exports = PatentInfo;