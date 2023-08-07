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
    statusOfPatent: {
        type: String,
        required: true,
    },
    inventorsName: {
        type: String,
        required: true,
    },
    titleOfPatent: {
        type: String,
        required: true,
    },
    applicantsNumber: {
        type: String,
        required: true,
    },
    patentFilledDate: {
        type: Date,
        required: true,
    },
    patentPublishedDate: {
        type: Date,
        required: true,
    },
    patentGrantedDate: {
        type: Date,
    },
    patentPublishedNumber: {
        type: String,
        required: true,
    },
    patentGrantedNumber: {
        type: String,
    },
    assigneeName: {
        type: String,
        required: true,
    },
});

const PatentInfo = mongoose.model("PatentInfo", patentSchema);

module.exports = PatentInfo;