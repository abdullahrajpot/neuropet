import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    sender: {
      type: String,
      enum: ["client", "admin"],
      required: true,
    },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    attachments: [
      {
        filename: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
