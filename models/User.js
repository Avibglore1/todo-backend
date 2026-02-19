import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password:{type: String},
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshToken: String
},{timestamps: true})

export default mongoose.model("User", userSchema)