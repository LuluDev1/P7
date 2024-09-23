import express from "express";
import ViteExpress from "vite-express";
import upload from "./middleware/upload.js";

const app = express();

const PORT = process.env.PORT || 3000;

// app.post("/api/form/data", upload.single("file"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   res.status(200).send();
// });

ViteExpress.listen(app, PORT, () =>
  console.log("Server is on http://localhost:" + PORT)
);
