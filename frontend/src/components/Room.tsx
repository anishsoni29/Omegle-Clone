import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [lobby, setLobby] = useState(true);
  const [socket, setSocket] = useState<null | Socket>(null);

  useEffect(() => {
    const socket = io(URL, {
      autoConnect: false,
    });
    socket.on("send-offer", ({ roomId }) => {
      alert("Send offer please");
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
    socket.on("answer", ({ roomId, answer }) => {
      alert("connected to the room");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    setSocket(socket);
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
