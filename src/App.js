// defines a React application (App) that establishes a socket connection to a server, 
// prompts the user to enter a username and room ID, and, upon joining a room, 
// renders a chat interface (Chat component) if the conditions are met

"use client";

import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat";

// Connect to Socket.IO server
const socket = io.connect("http://localhost:3001");

// Main App component
function App() {
  // State variables to manage username, room, chat visibility, and user details
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState();

  // Function to handle joining room
  const joinRoom = () => {
    // Check if username and room are provided
    if (username !== "" && room !== "") {
      // Emit "join_room" event to server
      socket.emit("join_room", { username, room }, (data, response) => {
        console.log("join", data, response);

        // Update state with room and user information
        setRoom(data.room);
        setUser(data.user);
        // Set flag to show chat interface
        setShowChat(true);
      });
    }
  };

  // Render main application
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
