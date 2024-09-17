"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card2';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';
import '@/styles/chatbot.css';
import { Message, useAssistant } from 'ai/react';
import { useCardContext } from '@/context/CardContext';
import { UserCircle, Bot } from 'lucide-react';

// Función para procesar Markdown simple
const processMarkdown = (text: string) => {
    // Reemplazar marcadores de fuente completos
    text = text.replace(/【\d+(:?\d*)?†?source】/g, '.');

    // Reemplazar marcadores de fuente que solo tienen apertura al inicio de una línea
    text = text.replace(/^【\d+(:?\d*)?†?source/gm, '');

    const lines = text.split('\n');
    let processedLines = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Procesar negrita
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        line = line.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        line = line.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Procesar listas
        if (/^[•\-*]\s/.test(line)) {
            if (!inList) {
                processedLines.push('<ul style="margin-left: 20px; margin-top: 10px; margin-bottom: 10px;">');
                inList = true;
            }
            processedLines.push(`<li>${line.replace(/^[•\-*]\s/, '')}</li>`);
        } else {
            if (inList) {
                processedLines.push('</ul>');
                inList = false;
            }

            // Procesar encabezados
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)[0].length;
                const text = line.replace(/^#+\s/, '');
                processedLines.push(`<h${level} style="font-weight: bold; margin-top: 15px; margin-bottom: 10px;">${text}</h${level}>`);
            }
            // Procesar líneas con dos puntos
            else if (line.includes(':')) {
                const [title, content] = line.split(':');
                processedLines.push(`<p><strong>${title}:</strong></p>`);
                if (content.trim()) {
                    processedLines.push(`<p style="margin-top: 5px; margin-bottom: 10px;">${content.trim()}</p>`);
                }
            }
            // Líneas normales
            else {
                processedLines.push(`<p style="margin-bottom: 10px;">${line}</p>`);
            }
        }
    }

    if (inList) {
        processedLines.push('</ul>');
    }

    return processedLines.join('');
};

const ChatCompNew2: React.FC = () => {
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
    const [initialMessageShown, setInitialMessageShown] = useState(false);
    const { isCardActive, setIsCardActive } = useCardContext();

    const scrollToBottom = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentResponse]);

    useEffect(() => {
        if (setIsCardActive) {
            setIsCardActive(isChatbotOpen);
        }
    }, [isChatbotOpen, setIsCardActive]);

    useEffect(() => {
        if (status === 'awaiting_message') {
            inputRef.current?.focus();
        }
    }, [status]);

    useEffect(() => {
        if (isChatbotOpen && !initialMessageShown) {
            const welcomeMessage = {
                role: 'assistant',
                text: 'Hola, soy el Chatbot de BIS, potenciado por Inteligencia Artificial. Pregúntame lo que quieras sobre nuestros productos y servicios. ¡Estoy aquí para ayudarte! Arranquemos.'
            };
            setMessages([welcomeMessage]);
            setInitialMessageShown(true);
        }
    }, [isChatbotOpen, initialMessageShown]);

    useEffect(() => {
        if (assistantMessages.length > 0) {
            const lastMessage = assistantMessages[assistantMessages.length - 1];
            console.log('Último mensaje recibido:', lastMessage);
            if (lastMessage.role === 'assistant') {
                setIsReceiving(true);
                setCurrentResponse(lastMessage.content); // Sobrescribe en lugar de concatenar
            } else if (lastMessage.content !== lastUserMessage) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: lastMessage.role as 'user' | 'assistant' | 'code', text: lastMessage.content },
                ]);
            }
        }
    }, [assistantMessages, lastUserMessage]);

    useEffect(() => {
        if (status === 'awaiting_message' && currentResponse) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', text: currentResponse },
            ]);
            console.log('Respuesta actual:', currentResponse);
            setCurrentResponse(''); // Resetear el estado de la respuesta en curso
            setIsReceiving(false);
            setInputDisabled(false); // Permitir nueva entrada del usuario
        }
    }, [status, currentResponse]);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!inputDisabled) {
            const userMessage = input.trim();
            console.log('Mensaje del usuario:', userMessage);
            if (userMessage && userMessage !== lastUserMessage) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'user', text: userMessage },
                ]);
                submitMessage(e); // Llamamos submitMessage con el evento de formulario
                setLastUserMessage(userMessage); // Actualizar la última entrada del usuario
                setInputDisabled(true); // Deshabilitar entrada hasta que el bot responda
            }
        }
    }

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
        if (!isChatbotOpen) {
            setInitialMessageShown(false);
        }
    };

    return (
        <div className= "fixed bottom-0 right-4 z-50 w-[95%] md:w-96" >
        {
            isChatbotOpen?(
    <div className = "bg-black text-white rounded-t-xl shadow-lg border border-gray-800 flex flex-col h-[600px] transition-all duration-300 ease-in-out" >
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h3 className="text-xl font-bold" > BIS ChatBot </h3>
            < button onClick = { toggleChatbot } className = "text-gray-400 hover:text-white transition-colors" >
                <XIcon className="w-6 h-6" />
                    </button>
                    </div>

                    < div className = "flex-grow overflow-y-auto p-4 space-y-4" >
                    {
                        messages.map((message, index) => (
                            <div key= { index } className = {`flex ${message.role === 'user' ? 'justify-end' : ''} space-x-3`} >
                    {
                        message.role === 'assistant' ? (
                            <div className= "w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center" >
                            <Bot className="w-6 h-6 text-blue-400" />
                                </div>
            ) : (
    <div className= "w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center order-first" >
    <UserCircle className="w-6 h-6 text-gray-400" />
        </div>
            )}
<div className="max-w-[75%]" >
    <div className={ `${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'} p-2 rounded-lg text-sm` }>
        <div dangerouslySetInnerHTML={ { __html: processMarkdown(message.text) } } />
            </div>
            </div>
            </div>
        ))}

{
    isReceiving && (
        <div className="flex space-x-3" >
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center" >
                <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    < div className = "max-w-[75%]" >
                        <div className="bg-gray-800 text-gray-300 p-2 rounded-lg text-sm" >
                            <div dangerouslySetInnerHTML={ { __html: processMarkdown(currentResponse) } } />
                                </div>
                                </div>
                                </div>
        )
}

{
    status === 'in_progress' && (
        <div className="flex justify-center" >
            <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin" > </div>
                </div>
        )
}

<div ref={ ref } />
    </div>

    < div className = "p-4 border-t border-gray-800" >
        <form onSubmit={ onSubmit } className = "flex items-center space-x-2" >
            <input
            ref={ inputRef }
name = "message"
value = { input }
onChange = { handleInputChange }
placeholder = "Start a new message"
className = "flex-grow bg-gray-900 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
disabled = { status !== 'awaiting_message' || inputDisabled}
          />
    < button
type = "submit"
className = "bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
disabled = { status !== 'awaiting_message' || inputDisabled}
          >
    <SendIcon className="w-5 h-5" />
        </button>
        </form>
        </div>
        </div>
  ) : (
    <button
      onClick= { toggleChatbot }
className = "bg-black text-white py-3 px-4 rounded-t-xl shadow-lg flex items-center justify-between hover:bg-gray-900 transition-all duration-300 w-full border border-gray-800"
style = {{
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
    <div className="flex items-center space-x-3" >
        <MessageCircleIcon className="w-6 h-6 text-blue-400" />
            <span className="font-semibold text-lg" > BIS ChatBot </span>
                </div>
                < div className = "bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" >
                    1
                    </div>
                    </button>
  )}
</div>
    );
};

function MinimizeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg { ...props } xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" >
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                            </svg>
    );
}

function MaximizeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg { ...props } xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                            </svg>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg { ...props } xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" >
            <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
                    </svg>
    );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg { ...props } xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
    );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg { ...props } xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" >
            <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
                    </svg>
    );
}

export default ChatCompNew2;