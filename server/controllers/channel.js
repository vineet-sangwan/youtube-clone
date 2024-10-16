import Channel from "../models/Channel.js";
import { createError } from "../error.js";

// Function to add a new channel (only one channel per user)
export const addChannel = async (req, res, next) => {
    try {
        // Check if the user already has a channel
        const existingChannel = await Channel.findOne({ userId: req.user.id });
        
        if (existingChannel) {
            return next(createError(403, "You can only create one channel."));
        }

        // If no channel exists, proceed with creating the new channel
        const newChannel = new Channel({ userId: req.user.id, ...req.body });
        const savedChannel = await newChannel.save();
        res.status(200).json(savedChannel);
    } catch (err) {
        next(err);
    }
};

// Function to update a channel's details
export const updateChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));
        if (req.user.id === channel.userId.toString()) {
            const updatedChannel = await Channel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedChannel);
        } else {
            return next(createError(403, "You can update only your channel!"));
        }
    } catch (err) {
        next(err);
    }
};

// Function to delete a channel
export const deleteChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));
        if (req.user.id === channel.userId.toString()) {
            await Channel.findByIdAndDelete(req.params.id);
            res.status(200).json("The channel has been deleted.");
        } else {
            return next(createError(403, "You can delete only your channel!"));
        }
    } catch (err) {
        next(err);
    }
};

// Function to get a channel by ID
export const getChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));
        res.status(200).json(channel);
    } catch (err) {
        next(err);
    }
};

// Function to get all channels
export const getAllChannels = async (req, res, next) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (err) {
        next(err);
    }
};
// Function to subscribe to a channel
export const subscribeToChannel = async (req, res, next) => {
    try {
        const channelId = req.params.channelId;
        const userId = req.user.id; // Get the user ID from the token

        // Check if the channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return next(createError(404, "Channel not found"));
        }

        // Check if the user is already subscribed
        if (channel.subscribers.includes(userId)) {
            // If already subscribed, unsubscribe them
            channel.subscribers.pull(userId);
            await channel.save();
            return res.status(200).json({ message: "Unsubscribed successfully", channel });
        }

        // Add the userId to the channel's subscribers array
        channel.subscribers.push(userId);
        await channel.save();

        res.status(200).json({ message: "Subscribed successfully", channel });
    } catch (err) {
        next(err);
    }
};



// Function to unsubscribe from a channel
export const unsubscribeFromChannel = async (req, res, next) => {
    try {
        const channelId = req.params.channelId;
        const userId = req.user.id; // Get the user ID from the token

        // Check if the channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return next(createError(404, "Channel not found"));
        }

        // Check if the user is not subscribed
        if (!channel.subscribers.includes(userId)) {
            return res.status(400).json({ message: "You are not subscribed to this channel" });
        }

        // Remove the userId from the channel's subscribers array
        channel.subscribers.pull(userId);
        await channel.save();

        res.status(200).json({ message: "Unsubscribed successfully", channel });
    } catch (err) {
        next(err);
    }
};


