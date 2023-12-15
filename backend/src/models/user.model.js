import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    avatarURL:{
        type: String
    }
},{
    timestamps: true,
    versionKey: false
}) 

export default model("User", userSchema);