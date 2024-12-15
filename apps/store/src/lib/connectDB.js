import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
    return new Error(error);
  }
}
