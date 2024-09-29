import express from "express";
import ViteExpress from "vite-express";
import upload from "./middleware/upload.js";
import userRoutes from "./routes/auth-routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", userRoutes);

ViteExpress.listen(app, PORT, () =>
  console.log("Server is on http://localhost:" + PORT)
);
