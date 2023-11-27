import React from "react";

const ChatFooter = ({ currentMessage, setCurrentMessage, sendMessage }) => {
  return (
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Hey YOU..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  );
}

export default ChatFooter;