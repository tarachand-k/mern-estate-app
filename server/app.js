import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));

console.log(process.env.CLIENT_URL);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/test", testRouter);

app.listen(8800, () => {
  console.log("Server is listening...");
});
