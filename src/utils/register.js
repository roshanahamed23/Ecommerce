'use server';
import connectDB from '@/lib/db';
import User from '@/modals/User';
import bcrypt from 'bcryptjs';

export async function register(values) {
  try {
    await connectDB();
    const { firstname, lastname, email, password } = values;
    const isUser = await User.findOne({ email });
    if (isUser) {
      return {
        error: 'user already exists',
      };
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });
    const saveduser = await user.save();
    return {
      message: 'successfuly registered',
    };
  } catch (error) {
    console.error(error);
  }
}
