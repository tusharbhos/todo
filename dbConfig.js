import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/todolistdb'; // or use your MongoDB Atlas connection string

export const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI); // No need for useNewUrlParser and useUnifiedTopology options
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process if connection fails
    }
};
