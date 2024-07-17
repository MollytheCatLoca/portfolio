import React, { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  setInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <form className="flex items-center w-full space-x-2" onSubmit={handleSubmit}>
      <Input
        id="message"
        placeholder="Type your message..."
        value={input}
        onChange={setInput}
        className="flex-1"
        autoComplete="off"
      />
      <Button type="submit" size="icon" className="chatbot-send-btn">
        <SendIcon className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default ChatInput;
