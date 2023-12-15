import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Comment", commentSchema);
