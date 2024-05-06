import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://mern-estate-appp.netlify.app",
  },
});
io.listen(4000);
let onlineUsers = [];

function addUser(userId, socketId) {
  const isUserExists = onlineUsers.find((user) => user.userId === userId);
  if (!isUserExists) {
    onlineUsers.push({ userId, socketId });
  }
}

function removeUser(socketId) {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

function getUser(userId) {
  return onlineUsers.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUsers);
  });

  socket.on("sendMessage", ({ recieverId, data }) => {
    const reciever = getUser(recieverId);
    if (!reciever) return;
    io.to(reciever.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", (socket) => {
    removeUser(socket.id);
  });
});

console.log("Socket started listening");
