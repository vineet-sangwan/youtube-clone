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
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the cookie by setting it to an empty value and expiring it
    res.clearCookie("access_token");
    
    res.status(200).json({ message: "User has been logged out!" });
  } catch (err) {
    next(err);
  }
};
