import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'; 
import videoRoutes from './routes/videos.js';  
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

// Database connection function
const connect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to Database');
    })
    .catch((err) => {
      console.error('Error connecting to Database:', err.message);
      process.exit(1);  // Exit if the connection fails
    });
};

// Use the user routes
app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/auth', authRoutes);

app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "something went wrong!";
  return res.status(status).json({
    success:false,status,message
  })
})

// Start the server
app.listen(3000, () => {
  connect();  // Connect to the database before the server starts listening
  console.log('Server running on port 3000');
});
