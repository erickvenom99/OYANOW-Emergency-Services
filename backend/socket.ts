// socket.ts
import { Server, ServerOptions } from "socket.io";

const socketHandler = (server: any) => {
  const io = new Server(server);

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

export default socketHandler;
