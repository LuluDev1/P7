import express from "express";
import ViteExpress from "vite-express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

const PORT = process.env.PORT || 3000;
app.post("/api/form/data", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(200).send();
});

ViteExpress.listen(app, PORT, () =>
  console.log("Server is on http://localhost:" + PORT)
);
