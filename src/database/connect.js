import mongoose from 'mongoose';
const dbURI="mongodb+srv://vava:vava@cluster0.vuxyl3c.mongodb.net/deepuclient"

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;