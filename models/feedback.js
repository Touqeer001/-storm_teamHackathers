const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  suggestion: String,
  email: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);