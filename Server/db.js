const mongoose = require("mongoose");
const db = async () => {
  try {
    const connect = await mongoose.connect("mongodb://0.0.0.0:27017/FDMS", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("Connection Unsuccesfull");
    console.error(err);
  }
};

module.exports = db;
