import express from "express";
import { createToDo,deleteToDo,getToDos, toggleToDo, updateToDo } from "../controller/todo.controller.js";
import auth from "./../middleware/auth.js"

const router = express.Router();

router.post("/createToDo",auth, createToDo);
router.get("/getToDos",auth, getToDos);
router.put("/:id", auth, updateToDo);
router.delete("/:id", auth, deleteToDo);
router.patch("/:id/toggle", auth, toggleToDo);

export default router