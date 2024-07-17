// components/ui/ChatMessages.tsx
import "@/styles/chatbot.css";
import React from "react";

interface ChatMessagesProps {
  messages: { user: string; text: string; type: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="chatbot-card-content chatbot-scrollbar">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container ${message.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`message ${message.type === "user" ? "user" : "bot"}`}
          >
            <div className="font-medium">{message.user}</div>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
