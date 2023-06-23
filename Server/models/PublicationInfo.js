const mongoose  = require('mongoose');

const publicationInfoSchema = new mongoose.Schema({
    wosSubjectId: {
        type: String,
        required: true
    },
    wosSubject : {
        type: String,
        required: true
    },
    expertiseId: {
        type: String,
        required: true
    },
    expertise : {
        type: String,
        required: true
    },
    briefExpertise : {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    subject : {
        type: String,
        required: true
    },
    organization : {
        type: String,
        required: true
    },
    organizationType : {
        type: String,
        required: true
    },
    organizationURL : {
        type: String,
        required: true
    },
    workingFromMonth : {
        type: String,
        required: true
    },
    workingFromYear : {
        type: String,
        required: true
    },
    orcidId : {
        type: String,
        required: true
    },
    researcherId : {
        type: String,
        required: true
    },
    scopusId : {
        type: String,
        required: true
    },
    googleScholarId : {
        type: String,
        required: true
    },

});

const PublicationInfo = mongoose.model('Publication_Info', publicationInfoSchema);

module.exports = PublicationInfo;