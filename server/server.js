const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo-app")
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  text: String
});

const Todo = mongoose.model("Todo", todoSchema);


app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
app.put("/todos/:id", async (req, res) => {

  await Todo.findByIdAndUpdate(req.params.id, {
    text: req.body.text
  });

  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  await newTodo.save();

  const todos = await Todo.find();
  res.json(todos);
});


app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  const todos = await Todo.find();
  res.json(todos);
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});