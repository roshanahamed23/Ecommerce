import mongoose from 'mongoose';
export default function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise;
  } else {
    const url = process.env.DATABASE_URL;
    mongoose.connect(url);
  }
}
