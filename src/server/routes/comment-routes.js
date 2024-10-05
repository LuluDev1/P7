import express from "express";

// Middleware
import upload from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

// Comment Controllers
import {
  addComment,
  getAllComments,
} from "../controllers/comment-controllers.js";

// Router
const router = express.Router();

router.post("/addComment", auth, upload, addComment);
router.get("/getAllComments", auth, getAllComments);
router.get("/getUserComments", auth);

export default router;
