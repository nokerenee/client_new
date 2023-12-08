import React from "react";

// responsible for rendering header of the chat window

const ChatHeader = ({room}) => {
    return (
        <div className="chat-header">
            <p>Live Chat! {room.name}</p>
        </div>
    );
}

export default ChatHeader;