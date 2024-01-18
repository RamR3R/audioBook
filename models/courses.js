const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
  },
  instructor: String,
  length: String,
  description: String,
  coverImage: String,
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audiobook',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
