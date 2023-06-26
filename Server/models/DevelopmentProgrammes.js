const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DevelopmentProgrammeSchema = new Schema({
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
  titleofprogramme: {
    type: String,
    required: true,
  },
  durationofprogramme: {
    from: {
      type: date,
      required: true,
    },
    to: {
      type: date,
      required: true,
    },
  },
});

const DevelopmentProgramme = mongoose.model(
  "DevelopmentProgramme",
  DevelopmentProgrammeSchema
);

module.exports = DevelopmentProgramme;
