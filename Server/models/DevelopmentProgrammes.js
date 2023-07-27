const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const DevelopmentProgrammeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  //   faculty name
  name: {
    type: String,
    required: true,
  },
  titleOfProgramme: {
    type: String,
    required: true,
  },
  durationOfProgramme: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
});

const DevelopmentProgramme = mongoose.model(
  "DevelopmentProgramme",
  DevelopmentProgrammeSchema
);

module.exports = DevelopmentProgramme;
