import mongoose from 'mongoose'

let isConnected = false;

const connectDB = async () => {
  try {
    // Check if already connected
    if (isConnected) {
      console.log('Using existing MongoDB connection');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('⚠️  MongoDB connection failed - API will run without database persistence');
    console.log('💡 Tip: Check your MongoDB Atlas cluster status or network connectivity');
    // Don't exit - let the application continue without DB
    isConnected = false;
  }
};

// Function to check if database is connected
export const isDatabaseConnected = () => isConnected;

export default connectDB;