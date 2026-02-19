import express from "express";
import { createToDo,getToDos } from "../controller/todo.controller.js";

const router = express.Router();

router.post("/createToDo", createToDo);
router.get("/getToDos", getToDos);

export default router