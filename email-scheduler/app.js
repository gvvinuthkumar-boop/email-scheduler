const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/emails")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(require("./routes/emailroutes"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

