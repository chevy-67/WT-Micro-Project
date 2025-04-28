const express = require("express");
const mongoose = require("mongoose");
const PORT = 9090;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/signupDB")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Error : " + err));

const signupSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = new mongoose.model("Signup", signupSchema);

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    const duplicate_username = await User.findOne({ username: username });
    if (duplicate_username) {
      return res.status(403).send("Username already exist");
    }
    await user.save();
    console.log("User info saved successfully...");
    res.status(201).send("Account created successfully!");
  } catch (error) {
    console.log("Error : " + error);
    res.status(500).send("Error occurred...");
  }
});

app.post("/login", async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    if (user.password !== pass) {
      return res.status(401).send("Password mismatch");
    }
    res.status(200).send("Login success...");
  } catch (err) {
    console.log("Error : " + err);
    res.status(500).send("Error occurred : " + err);
  }
});
app.listen(PORT, () => {
  console.log("Server Listening at port : " + PORT);
});
