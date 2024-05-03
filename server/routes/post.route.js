import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("router works");
  res.status(200).send("posts");
});

export default router;
