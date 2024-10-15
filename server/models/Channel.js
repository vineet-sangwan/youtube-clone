import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL or path to the profile picture
    required: true,
  },
  bannerImage: {
    type: String, // URL or path to the banner image
    required: false, // Optional
  },
  subscribers: {
    type: Number,
    default: 0, // Default is 0 subscribers when a channel is created
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model("Channel", ChannelSchema);

export default Channel;
