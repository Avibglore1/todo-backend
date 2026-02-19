import express from "express";

import { refreshEndPoint, signin,signup } from "../controller/user.controller.js";

const router = express.Router();
router.post("/signup",signup);
router.post("/signin", signin);
router.post("/refresh", refreshEndPoint)

export default router
