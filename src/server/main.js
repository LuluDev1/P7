import express from "express";
import ViteExpress from "vite-express";

import commentRoutes from "./routes/comment-routes.js";
import userRoutes from "./routes/auth-routes.js";
import cors from "cors";

// Enable CORS for all routes

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", userRoutes);
app.use("/api/form", commentRoutes);

ViteExpress.listen(app, PORT, () =>
  console.log("Server is on http://localhost:" + PORT)
);
