import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

console.log(process.env.CLIENT_URL);

app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.listen(8800, () => {
  console.log("Server is listening...");
});
