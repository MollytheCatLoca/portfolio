'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { useAssistant, CreateMessage } from 'ai/react';
import '@/styles/chatbot.css';

const assistantId: string = process.env.NEXT_PUBLIC_ASSISTANT_ID || '';

const ChatCompNew: React.FC = () => {
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
    append,
  } = useAssistant({ api: '/api/assistant', headers: { 'assistant-id': assistantId } });

  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleStreamResponse = async (response: ReadableStream<Uint8Array>) => {
    const reader = response.getReader();
    const decoder = new TextDecoder();
    let aggregatedText = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      console.log('Received chunk:', chunk);
      aggregatedText += chunk;
    }

    const cleanText = aggregatedText
      .split('\n')
      .filter(line => line.startsWith('0:'))
      .map(line => line.replace(/^0:"|"\n$/g, ''))
      .join('');

    console.log('Processed Clean Text:', cleanText);
    append({
      role: 'assistant',
      content: cleanText,
    } as CreateMessage);
  };

  const customSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message: CreateMessage = {
      role: 'user',
      content: input,
    };

    append(message);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'assistant-id': assistantId,
        },
        body: JSON.stringify({ threadId: null, message: input }),
      });

      if (!response.body) throw new Error('No response body');

      handleStreamResponse(response.body);
    } catch (error) {
      console.error('Error during API request:', error);
    }
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
          <CardContent className="chatbot-card-content">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role === 'assistant' ? 'bot' : 'user'}`}>
                <div className="font-medium">{message.role === 'assistant' ? 'Chatbot' : 'You'}</div>
                <p>{message.content}</p>
              </div>
            ))}
            {status === 'in_progress' && (
              <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
            )}
          </CardContent>
          <CardFooter className="chatbot-card-footer">
            <form onSubmit={customSubmitMessage}>
              <input
                ref={inputRef}
                disabled={status !== 'awaiting_message'}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="chatbot-input"
              />
              <Button type="submit" size="icon" className="chatbot-send-btn">
                <SendIcon className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      {!isChatbotOpen && (
        <Button variant="ghost" size="icon" className="chatbot-icon" onClick={toggleChatbot}>
          <MessageCircleIcon className="w-6 h-6" />
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
