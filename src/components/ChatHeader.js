import React from "react";

const ChatHeader = ({room}) => {
    return (
        <div className="chat-header">
            <p>Live Chat! {room.name}</p>
        </div>
    );
}

export default ChatHeader;