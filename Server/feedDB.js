const PublicationInfo = require("./models/PublicationInfo");
const patentInfo = require("./models/PatentInfo");
const db = require("./db");
db();

const addPublication = new PublicationInfo({
  wosSubjectId: "12345",
  wosSubject: "Computer Science",
  expertiseId: "67890",
  expertise: "Machine Learning",
  briefExpertise: "Natural Language Processing",
  qualification: "Ph.D. in Computer Science",
  subject: "Artificial Intelligence",
  organization: "Example University",
  organizationType: "Academic",
  organizationURL: "http://exampleuniversity.edu",
  workingFromMonth: "January",
  workingFromYear: "2010",
  orcidId: "ORCID12345",
  researcherId: "RESEARCHER67890",
  scopusId: "SCOPUS12345",
  googleScholarId: "GOOGLESCHOLAR67890",
});

const addpatentInfo = new patentInfo({
  patentApplicationId: "12345",
  statusOfPatent: "Pending",
  inventorsName: "John Doe",
  titleOfPatent: "Example Patent",
  applicantsNumber: "67890",
  patentFilledDate: "2022-05-10",
  patentPublishedDate: "2023-02-15",
  patentGrantedDate: "2023-06-01",
  patentPublishedNumber: "P123456",
  patentGrantedNumber: "G789012",
  assigneeName: "Example Company",
  mediaFile: "patent.pdf",
});

addPublication.save();
addpatentInfo.save();
