const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const publicationInfoSchema = new mongoose.Schema({
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  userId: {
    type: String,
    default: uuidv4(),
  },
  wosSubjectId: {
    type: String,
    required: true,
  },
  wosSubject: {
    type: String,
    required: true,
  },
  expertiseId: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  briefExpertise: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
    required: true,
  },
  organizationURL: {
    type: String,
    required: true,
  },
  workingFromMonth: {
    type: String,
    required: true,
  },
  workingFromYear: {
    type: String,
    required: true,
  },
  orcidId: {
    type: String,
    required: true,
  },
  researcherId: {
    type: String,
    required: true,
  },
  scopusId: {
    type: String,
    required: true,
  },
  googleScholarId: {
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
  mediaFile: {
    type: String,
  },
});

const PublicationInfo = mongoose.model(
  "PublicationInfo",
  publicationInfoSchema
);

module.exports = PublicationInfo;
