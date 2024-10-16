import express from "express";
import { addVideo, addView, getByTag, getVideosByUser, random, search, sub, trend,getVideo } from "../controllers/video.js";
import { verifyToken } from "../middlewares/verfiy.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id",verifyToken, getVideosByUser)
router.get("/findVideo/:id",getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;
