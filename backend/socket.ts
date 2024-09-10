// socket.ts
import { Server, ServerOptions } from "socket.io";

// Socket.IO with CORS
const socketHandler = (server: any) => {
  const io = new Server(server, {
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

export default socketHandler;
