const mongoose = require("mongoose");
const Joi = require('joi');

//  ------------- TODO MODEL --------------
// mongoose schema
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: { type: String, require: true },
    task: { type: String, require: true },
    completed: { type: Boolean, default: false },
    data: Date,
    created_at: Date,
    updated_at: Date
  })
);

// joi validation
function validateTodo(todo) {
  const schema = {
    title: Joi.string().required(),
    task: Joi.string().required()
  };

  return Joi.validate(todo, schema);
}

exports.Todo = Todo;
exports.validate = validateTodo;
