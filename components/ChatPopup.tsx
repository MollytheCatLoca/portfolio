// ChatPopup.tsx
"use client";
import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Chat from './chat';  
import styles from '../styles/ChatPopup.module.css';
import { X } from 'lucide-react';



const ChatPopup: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (chatRef.current) {
      chatRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    if (chatRef.current) {
      chatRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - size.width / 2,
        y: e.clientY - 20, // ajustar el valor según sea necesario
      });
    }
    if (isResizing) {
      setSize({
        width: e.clientX - position.x,
        height: e.clientY - position.y,
      });
    }
  };

  const handleResizeMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: globalThis.MouseEvent) => handleMouseMove(e);

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  if (!isOpen) return null;

  return (
    <div
      ref={chatRef}
      className={styles.chatPopup}
      onMouseDown={handleMouseDown}
      style={{ top: position.y, left: position.x, width: size.width, height: size.height }}
    >
      <div className={styles.header}>
        <span>Chat</span>
        <X onClick={handleClose} className={styles.closeButton} />
      </div>
      <div className={styles.content}>
        <Chat />
      </div>
      <div
        className={styles.resizeHandle}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default ChatPopup;
