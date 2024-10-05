import express from "express";

// Middleware
import upload from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

// Comment Controllers
import { addComment } from "../controllers/comment-controllers.js";

// Router
const router = express.Router();

router.post("/addComment", auth, upload, addComment);

export default router;
