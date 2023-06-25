const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const patentInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4(),
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
  mediaFile: {
    type: String,
  },
});

const PatentInfo = mongoose.model("PatentInfo", patentInfoSchema);

module.exports = PatentInfo;
