import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'please enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
