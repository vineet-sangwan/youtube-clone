import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from '../models/User.js'; // Ensure User model is imported

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return next(createError(403, "Token is not valid!"));
    
    // Fetch user from the database using the ID from the decoded token
    try {
      const user = await User.findById(decoded.id);
      if (!user) return next(createError(401, "User not found"));

      req.user = user; // Attach user to request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      return next(createError(500, "Internal server error")); // Handle errors in fetching user
    }
  });
};
