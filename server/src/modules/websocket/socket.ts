import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initWebSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Optional: Listen for messages
    socket.on("message", (msg) => {
      console.log(`Message from ${socket.id}: ${msg}`);
    });
  });
};

export const getIO = (): SocketIOServer => {
  if (!io) throw new Error("Socket.IO not initialized!");
  return io;
};
