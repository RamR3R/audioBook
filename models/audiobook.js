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
  audiofileurl: String,
  audioFile : {
    name : {
      type : String,
      required : true
    },
    audio : {
      data : Buffer,
      contentType : String,
    },
  },
  uploadedBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
} // Store the filename or unique identifier for the audio file
});


const Audiobook = mongoose.model('Audiobook', audiobookSchema);

module.exports = Audiobook;
