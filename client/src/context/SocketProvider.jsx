import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";

const SocketContext = React.createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = React.useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setSocket(io.connect("https://estate-socket-server.onrender.com"));
  }, []);

  useEffect(() => {
    user && socket?.emit("newUser", user.id);
  }, [user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = React.useContext(SocketContext);
  if (!context)
    throw new Error(
      "Context value should be used within SocketProvider component"
    );

  return context;
}

export default SocketProvider;
