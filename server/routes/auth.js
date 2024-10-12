import express from "express";
import { signin, signup,logout,checkAuth } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verfiy.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//LOGOUT 
router.post("/logout", logout);

// check authenticastion 
router.get('/me', verifyToken, checkAuth);

export default router;
