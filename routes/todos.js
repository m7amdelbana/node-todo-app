const { Todo, validate } = require("../models/todo");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// get Todos
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort("date");
  res.send(todos);
});

// get Todo by Id
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");
  res.send(todo);
});

// add Todo
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let todo = new Todo({
    title: req.body.title,
    task: req.body.task
  });
  todo = await todo.save();
  res.send(todo);
});

// update Todo
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      task: req.body.task
    },
    { new: true }
  );
  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");
  res.send(todo);
});

// delete todo
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);
  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");
  res.send(todo);
});

module.exports = router;
