// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET,POST"],
//   },
// });

// export const getReceiverId=(receiverId)=>{
//     return userSocketMap[receiverId]

// }
// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
//   const userId = socket.handshake.query.userId;

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   if (userId != "undefined") userSocketMap[userId] == socket.id;
//   socket.on("disconnect", () => {
//     console.log("user disconnteced", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };
