import React, { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";

function Chat({ socket, user, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        sender: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(()=>{
    socket.on("receive_message", (data) => {
      // todo: check why this effect isn't running
      console.log("received data: ", data);
      setMessageList((list) => [...list, data]);
    });
  },
  [socket])

  useEffect(() => {
    socket.emit("get_messages", room, (messages) => {
      console.log("get message", messages);
      setMessageList(messages);
    });
  }, []);

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
