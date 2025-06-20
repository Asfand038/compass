import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
