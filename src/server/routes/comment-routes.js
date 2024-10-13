import express from "express";

// Middleware
import upload from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

// Comment Controllers
import {
  addComment,
  getAllComments,
  getUser,
} from "../controllers/comment-controllers.js";

// Router
const router = express.Router();

router.post("/addComment", auth, upload, addComment);
router.post("/deleteComment", auth);
router.post("/deleteUser", auth);
router.get("/getAllComments", auth, getAllComments);
router.get("/getUser/:userid", auth, getUser);

export default router;
