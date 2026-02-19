import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.error(err))

app.use("/api/auth", authRoutes);
app.use("/api/todo", toDoRoutes);

const PORT = 5000;
app.listen(PORT,()=>{console.log(`Server listening on PORT ${PORT}`)});
