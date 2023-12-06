'use client';

import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState();
console.log("appp")
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {username, room}, (data, response)=>{
        console.log('join',data,response);
    
        setRoom(data.room);
        setUser(data.user);
        setShowChat(true);
      });
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat!</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </div>
  );
}

export default App;
