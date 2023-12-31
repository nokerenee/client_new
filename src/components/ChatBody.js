import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatMessage from "./ChatMessage";

// responsible for rendering body of the chat window

const ChatBody = ({ messageList, username }) => {
  return (
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent, index) => (
          <ChatMessage
            key={index}
            messageContent={messageContent}
            username={username}
          />
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBody;
