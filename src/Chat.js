// React component represents a chat window that utilizes Socket.IO for 
// real-time communication, manages message state, and renders a chat header, 
// body, and footer with functionalities for sending and receiving messages

import React, { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";

function Chat({ socket, user, room }) {
  // State for current message being typed
  const [currentMessage, setCurrentMessage] = useState("");
  // State to store list of messages in chat
  const [messageList, setMessageList] = useState([]);

  // Function to send message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      // Prepare message data
      const messageData = {
        room,
        sender: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // Emit a "send_message" event with message data
      await socket.emit("send_message", messageData);
      // Update message list with sent message
      setMessageList((list) => [...list, messageData]);
      // Clear current message input
      setCurrentMessage("");
    }
  };

  // Effect to listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received data: ", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // Effect to fetch existing messages when component mounts
  useEffect(() => {
    socket.emit("get_messages", room, (messages) => {
      console.log("get message", messages);
      setMessageList(messages);
    });
  }, []);

  // Render chat window with header, body, and footer components
  return (
    <div className="chat-window">
      <ChatHeader room={room} />
      <ChatBody messageList={messageList} username={user.username} />
      <ChatFooter
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
