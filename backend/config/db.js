import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
  const DB = process.env.MONGO_URI;

  if (!DB) throw new Error('MONGO_URI is not set');

  try {
    await mongoose.connect(DB);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
