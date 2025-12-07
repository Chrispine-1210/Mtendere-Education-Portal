import { Server } from "http";
import { Server as SocketServer } from "socket.io";

let io: SocketServer;

export const setupWebSocket = (server: Server) => {
    io = new SocketServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("🔌 New client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });

        socket.on("ping", () => {
            socket.emit("pong");
        });

        // You can add more custom socket events here
    });
};

export const broadcast = (event: string, data: any) => {
    if (io) {
        io.emit(event, data);
    }
};

