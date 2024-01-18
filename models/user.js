const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fav : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audiobook',
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
