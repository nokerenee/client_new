import React from "react";

// responsible for rendering footer of the chat window

const ChatFooter = ({ currentMessage, setCurrentMessage, sendMessage }) => {
  return (
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Message..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyDown={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  );
};

export default ChatFooter;
