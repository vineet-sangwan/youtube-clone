import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

// controllers/authController.js
export const checkAuth = (req, res) => {
  const user = req.user; // req.user is set by authenticateToken middleware

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  res.status(200).json({ success: true, user });
};


export const signin = async (req, res, next) => {
  try {
    // Find the user by username (or email)
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    // Compare provided password with the hashed password in the database
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h', // Optional: Set token expiration time
    });

    // Exclude password from the user object
    const { password, ...others } = user._doc;

    // Set the cookie with the token and return the user info
    res
      .cookie("token", token, {
        httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Sends cookie only over HTTPS in production
        sameSite: 'Strict', // Controls cookie behavior for cross-site requests
        expires: new Date(Date.now() + 3600000) // Sets cookie expiration (1 hour)
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the cookie by setting it to an empty value and expiring it
    res.clearCookie("token");
    
    res.status(200).json({ message: "User has been logged out!" });
  } catch (err) {
    next(err);
  }
};
