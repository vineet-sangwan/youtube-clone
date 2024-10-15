import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'; 
import videoRoutes from './routes/videos.js'; 
import commentRoutes from './routes/comments.js';
import channelRoutes from './routes/channel.js'
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import cors

const app = express();
dotenv.config();

// Connect to MongoDB
const connect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to Database');
    })
    .catch((err) => {
      console.error('Error connecting to Database:', err.message);
      process.exit(1); 
    });
};

// Middleware
app.use(cookieParser());
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Update the origin to match your frontend's URL
  credentials: true // Allow cookies to be sent
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/channels", channelRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

// Start server
app.listen(3000, () => {
  connect(); 
  console.log('Server running on port 3000');
});
