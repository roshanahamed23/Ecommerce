import mongoose from 'mongoose';
import validator from 'validator';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'pls enter a valid email',
    },
    password: {
      type: String,
      required: true,
      minLenght: 6,
    },
  },
});

const customer =
  mongoose.models?.Customer || mongoose.model('Customer', CustomerSchema);

export default customer;
