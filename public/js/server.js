const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const PORT = 9090;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

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

app.get('/api/user/:username',async (req,res)=>{
  const user = await User.findOne({username : req.params.username})

  try{
    if(!user){
      res.status(404).json({message:"User not Found"})
    }
      res.status(200).json({
      email:user.email,
      password : user.password
    })
  }
  catch(err){
    res.status(500).json({message:"Error retrieving user",error:err})
  }

})

app.post('/update-password', async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not Found!" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password Changed Successfully" });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: "Error updating password", error: err });
  }
});

app.listen(PORT, () => {
  console.log("Server Listening at port : " + PORT);
});
