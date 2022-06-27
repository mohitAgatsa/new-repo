const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
// const { mogoUrl } = require("./keys");

require("./models/User");
const requiredToken = require("./middleWare/requiredToken");
const authRoutes = require("./routes/authRoutes");

const mogoUrl =
  "mongodb+srv://mohit:Rohit348@cluster0.ojhc9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mogoUrl, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahhhhh");
});

mongoose.connection.on("error", (err) => {
  console.log("this is error", err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello Mohit");
});

app.get("/", requiredToken, (req, res) => {
  res.send("Your Email is " + req.user.email);
});

app.listen(PORT, () => {
  console.log("server running" + PORT);
});
