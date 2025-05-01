import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import postRoutes from './routes/posts.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mern-blog-ixd6.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); 


app.use('/api/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running...');
});


const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_blog');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});