import express from "express";
import { 
    addChannel, 
    updateChannel, 
    deleteChannel, 
    getChannel, 
    getAllChannels,
    subscribeToChannel,
    unsubscribeFromChannel,
} from "../controllers/channel.js";
import { verifyToken } from "../middlewares/verfiy.js"; // Assuming you have this middleware for token verification

const router = express.Router();

// Create a channel
router.post("/", verifyToken, addChannel);

// Update a channel
router.put("/:id", verifyToken, updateChannel);

// Delete a channel
router.delete("/:id", verifyToken, deleteChannel);

// Get a channel by ID
router.get("/find/:id", getChannel);

// Get all channels
router.get("/", getAllChannels);

// Subscribe to a channel
router.post("/:channelId/subscribe", verifyToken, subscribeToChannel);

// Unsubscribe from a channel
router.delete("/:channelId/unsubscribe", verifyToken, unsubscribeFromChannel);


export default router;
