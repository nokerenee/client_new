import React from "react";

const ChatMessage = ({ messageContent, username }) => {
  return (
    <div
      className="message"
      id={username === messageContent.author ? "you" : "other"}
    >
      <div>
        <div className="message-content">
          <p>{messageContent.message}</p>
        </div>
        <div className="message-meta">
          <p id="time">{messageContent.time}</p>
          <p id="author">{messageContent.author}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;