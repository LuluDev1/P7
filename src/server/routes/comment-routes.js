import express from "express";

import upload from "../middleware/upload.js";

import { auth } from "../middleware/auth.js";
import { addComment } from "../controllers/comment-controllers.js";

const router = express.Router();

router.post("/addComment", auth, addComment);

export default router;
