const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

//initialze db
db();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5500, () => {
  console.log("Server started on port 5500");
});


