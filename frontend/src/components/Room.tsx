import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [lobby, setLobby] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", ({ roomId }) => {
      setLobby(false);
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("offer", ({ roomId, offer }) => {
      alert("Send answer please");
      setLobby(false);
      socket.emit("answer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("answer", () => {
      alert("Connected to the room");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [name]);

  if (lobby) {
    return <div>Waiting to get connected with you!</div>;
  }
  return (
    <div>
      Hi {name}
      <video width={400} height={400} />
      <video width={400} height={400} />
    </div>
  );
};
