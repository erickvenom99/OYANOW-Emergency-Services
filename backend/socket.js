"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// socket.ts
const socket_io_1 = require("socket.io");
// Socket.IO with CORS
const socketHandler = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173", // Allow your frontend origin
            methods: ["GET", "POST"],
            credentials: true // Allow credentials
        }
    });
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);
        socket.on("disconnect", () => {
            console.log("User disconnected: " + socket.id);
        });
        socket.on("updateLocation", (data) => {
            io.emit("locationUpdate", data);
        });
    });
    return io;
};
exports.default = socketHandler;
