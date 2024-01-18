const mongoose = require('mongoose');

const audiobookSchema =  mongoose.Schema({
  title: {
    type: String,
  },
  author: String,
  narrator: String,
  length: String,
  tags: [String],
  description: String,
  coverImage : String,
  audiofileurl: String, // Store the filename or unique identifier for the audio file
});


const Audiobook = mongoose.model('Audiobook', audiobookSchema);

module.exports = Audiobook;
