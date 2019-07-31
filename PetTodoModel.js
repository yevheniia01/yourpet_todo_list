var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var PetTodoSchema = new Schema({
  // `username` must be of type String
  // `username` will trim leading and trailing whitespace before it's saved
  // `username` is a required field and throws a custom error message if not supplied
  todo: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var PetTodo = mongoose.model("PetTodo", PetTodoSchema);

// Export the User model
module.exports = PetTodo;
