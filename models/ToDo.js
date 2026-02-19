import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export default mongoose.model("ToDo", todoSchema)   