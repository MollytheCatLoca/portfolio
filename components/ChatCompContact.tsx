"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import '@/styles/chatbot.css';
import { Message, useAssistant } from 'ai/react';
import { useCardContext } from '@/context/CardContext';

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

interface ChatCompContactProps {
    submitterName: string | null;
}

const ChatCompContact: React.FC<ChatCompContactProps> = ({ submitterName }) => {
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
        if (status === 'awaiting_message') {
            inputRef.current?.focus();
        }
    }, [status]);

    useEffect(() => {
        setIsCardActive(isChatbotOpen);
    }, [isChatbotOpen, setIsCardActive]);

    useEffect(() => {
        if (submitterName && !initialMessageShown) {
            setIsChatbotOpen(true);
            const welcomeMessage = {
                role: 'assistant',
                text: `¡Hola ${submitterName}! Gracias por tu consulta. Soy el asistente virtual de BIS Integraciones, potenciado por Inteligencia Artificial. Hemos recibido tu mensaje correctamente y nuestro equipo lo revisará pronto. Mientras tanto, estoy aquí para ayudarte con cualquier pregunta adicional sobre nuestros productos y servicios. ¿En qué puedo asistirte mientras procesamos tu consulta?`
            };
            setMessages([welcomeMessage]);
            setInitialMessageShown(true);
        }
    }, [submitterName, initialMessageShown]);

    useEffect(() => {
        if (assistantMessages.length > 0) {
            const lastMessage = assistantMessages[assistantMessages.length - 1];
            console.log('Último mensaje recibido:', lastMessage);
            if (lastMessage.role === 'assistant') {
                setIsReceiving(true);
                setCurrentResponse(lastMessage.content);
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
            setCurrentResponse('');
            setIsReceiving(false);
            setInputDisabled(false);
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
                submitMessage(e);
                setLastUserMessage(userMessage);
                setInputDisabled(true);
            }
        }
    }

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
        setIsCardActive(!isChatbotOpen); // Actualiza el estado del CardContext
        if (!isChatbotOpen) {
            setInitialMessageShown(false);
        }
    };

    return (
        <div className= "fixed bottom-4 right-2 md:right-4 md:left-auto z-50 w-[95%] md:w-full md:max-w-md" >
        { isChatbotOpen && (
            <Card className="chatbot-card" >
                <CardHeader className="chatbot-card-header" >
                    <h3 className="text-lg font-medium" > Asistente IA de BIS </h3>
                        < div className = "flex items-center gap-2" >
                            <Button
                    variant="ghost"
    size = "icon"
    className = "chatbot-icon"
    onClick = { toggleChatbot }
        >
        <MinimizeIcon className="w-5 h-5" />
            <span className="sr-only" > Minimize </span>
                </Button>
                < Button variant = "ghost" size = "icon" className = "chatbot-icon" >
                    <MaximizeIcon className="w-5 h-5" />
                        <span className="sr-only" > Maximize </span>
                            </Button>
                            < Button
    variant = "ghost"
    size = "icon"
    className = "chatbot-icon"
    onClick = { toggleChatbot }
        >
        <XIcon className="w-5 h-5" />
            <span className="sr-only" > Close </span>
                </Button>
                </div>
                </CardHeader>
                < CardContent className = "chatbot-card-content" >
                {
                    messages.map((message, index) => (
                        <div
                    key= { index }
                    className = {`message ${message.role === 'assistant' ? 'bot' : 'user'}`}
                    >
                    <div className="font-medium" style = {{ fontWeight: 'bold' }
}>
    { message.role === 'assistant' ? 'Asistente' : 'Tú' }
    </div>
    < div dangerouslySetInnerHTML = {{ __html: processMarkdown(message.text) }} />
        </div>
                ))}
{
    isReceiving && (
        <div className="message bot" >
            <div className="font-medium" style = {{ fontWeight: 'bold' }
}> Asistente </div>
    < div dangerouslySetInnerHTML = {{ __html: processMarkdown(currentResponse) }} />
        </div>
                )}
{
    status === 'in_progress' && (
        <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
                )
}
<div ref={ ref } />
    </CardContent>
    < CardFooter className = "chatbot-card-footer" >
        <form onSubmit={ onSubmit } className = "flex items-center w-full" >
            <input
                    ref={ inputRef }
name = "message"
value = { input }
onChange = { handleInputChange }
placeholder = "Escribe tu mensaje..."
className = "chatbot-input"
disabled = { status !== 'awaiting_message' || inputDisabled}
                  />
    < Button
type = "submit"
size = "icon"
className = "chatbot-send-btn"
disabled = { status !== 'awaiting_message' || inputDisabled}
                  >
    <SendIcon className="w-4 h-4" />
        <span className="sr-only" > Enviar </span>
            </Button>
            </form>
            </CardFooter>
            </Card>
          )}
{
    !isChatbotOpen && (
        <Button
              variant="ghost"
    size = "icon"
    className = "chatbot-icon chatbot-minimized-icon"
    onClick = { toggleChatbot }
        >
        <MessageCircleIcon className="w-16 h-16" />
            <span className="sr-only" > Abrir Asistente IA </span>
                </Button>
          )
}
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

export default ChatCompContact;