const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "secret@123"; 

mongoose.connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", UserSchema);


const TodoSchema = new mongoose.Schema({
  text: String,
  userId: String
});
const Todo = mongoose.model("Todo", TodoSchema);


function verifyToken(req, res, next) {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {

    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
}


app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "fill all fields" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "fill all fields" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "wrong password" });
    }

    // 🔥 generate token
    const token = jwt.sign(
      { userId: user._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "success", token });

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});


app.post("/addTodo", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.json({ message: "empty todo" });

    const todo = new Todo({
      text,
      userId: req.userId 
    });

    await todo.save();

    res.json({ message: "Todo Added" });

  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


app.get("/todos", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


app.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text }
    );

    res.json({ message: "updated" });

  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


app.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));