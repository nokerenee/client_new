import React from "react";

const ChatHeader = ({username}) => {
    return (
        <div className="chat-header">
            <p>Live Chat! {username}</p>
        </div>
    );
}

export default ChatHeader;