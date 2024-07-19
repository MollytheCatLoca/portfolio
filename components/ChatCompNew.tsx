'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';
import '@/styles/chatbot.css';
import { Message, useAssistant } from 'ai/react';

type MessageProps = {
  role: 'user' | 'assistant' | 'code';
  text: string;
};

const UserMessage = ({ text }: { text: string }) => (
  <div className="user-message">{text}</div>
);

const AssistantMessage = ({ text }: { text: string }) => (
  <div className="assistant-message">
    <Markdown>{text}</Markdown>
  </div>
);

const CodeMessage = ({ text }: { text: string }) => (
  <div className="code-message">
    {text.split('\n').map((line, index) => (
      <div key={index}>
        <span>{`${index + 1}. `}</span>
        {line}
      </div>
    ))}
  </div>
);

const MessageComponent = ({ role, text }: MessageProps) => {
  switch (role) {
    case 'user':
      return <UserMessage text={text} />;
    case 'assistant':
      return <AssistantMessage text={text} />;
    case 'code':
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

const ChatCompNew: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    status,
    messages: assistantMessages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: '/api/assistant' });

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isReceiving, setIsReceiving] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    if (assistantMessages.length > 0) {
      const lastMessage = assistantMessages[assistantMessages.length - 1];
      if (lastMessage.role === 'assistant') {
        setIsReceiving(true);
        setCurrentResponse(lastMessage.content);  // Sobrescribe en lugar de concatenar
      } else if (lastMessage.content !== lastUserMessage) {
        setMessages((prevMessages) => [...prevMessages, { role: lastMessage.role as 'user' | 'assistant' | 'code', text: lastMessage.content }]);
      }
    }
  }, [assistantMessages, lastUserMessage]);

  useEffect(() => {
    if (status === 'awaiting_message' && currentResponse) {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', text: currentResponse }]);
      setCurrentResponse(''); // Resetear el estado de la respuesta en curso
      setIsReceiving(false);
      setInputDisabled(false); // Permitir nueva entrada del usuario
    }
  }, [status, currentResponse]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputDisabled) {
      const userMessage = input.trim();
      if (userMessage && userMessage !== lastUserMessage) {
        setMessages((prevMessages) => [...prevMessages, { role: 'user', text: userMessage }]);  // Solo agregamos el mensaje del usuario aquí
        submitMessage(e); // Llamamos submitMessage con el evento de formulario
        setLastUserMessage(userMessage); // Actualizar la última entrada del usuario
        setInputDisabled(true); // Deshabilitar entrada hasta que el bot responda
      }
    }
  }

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
      {isChatbotOpen && (
        <Card className="chatbot-card">
          <CardHeader className="chatbot-card-header">
            <h3 className="text-lg font-medium">Chatbot BIS</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="chatbot-icon" onClick={toggleChatbot}>
                <MinimizeIcon className="w-5 h-5" />
                <span className="sr-only">Minimize</span>
              </Button>
              <Button variant="ghost" size="icon" className="chatbot-icon">
                <MaximizeIcon className="w-5 h-5" />
                <span className="sr-only">Maximize</span>
              </Button>
              <Button variant="ghost" size="icon" className="chatbot-icon" onClick={toggleChatbot}>
                <XIcon className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="chatbot-card-conte">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role === 'assistant' ? 'bot' : 'user'}`}>
                <div className="font-medium">{message.role === 'assistant' ? 'Chatbot' : 'You'}</div>
                <p>{message.text}</p>
              </div>
            ))}
            {isReceiving && (
              <div className='message bot'>
                <div className='font-medium'>Chatbot</div>
                <p>{currentResponse}</p>
              </div>
            )}
            {status === 'in_progress' && (
              <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
            )}
            <div ref={ref} />
          </CardContent>
          <CardFooter className="chatbot-card-footer">
            <form onSubmit={onSubmit}>
              <input
                ref={inputRef}
                name='message'
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="chatbot-input"
                disabled={status !== 'awaiting_message' || inputDisabled} // Deshabilitar entrada si está en progreso o esperando respuesta
              />
              <Button type="submit" size="icon" className="chatbot-send-btn" disabled={status !== 'awaiting_message' || inputDisabled}>
                <SendIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      {!isChatbotOpen && (
      <Button variant="ghost" size="icon" className="chatbot-icon chatbot-minimized-icon" onClick={toggleChatbot}>
        <MessageCircleIcon className="w-16 h-16" />  {/* Aumenta el tamaño aquí */}
        <span className="sr-only">Open Chatbot</span>
      </Button>
)}

    </div>
  );
};

function MinimizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function MaximizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default ChatCompNew;
