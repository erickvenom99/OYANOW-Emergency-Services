"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// socket.ts
const socket_io_1 = require("socket.io");
const socketHandler = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
        socket.on("updateLocation", (data) => {
            // Emit the updated location to all connected clients
            io.emit("locationUpdate", data);
        });
    });
    return io;
};
exports.default = socketHandler;
