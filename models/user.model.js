const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: { type: String, minLength: 1, required: true},
  email: { type: String, minLength: 1, required: true, unique: true},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
