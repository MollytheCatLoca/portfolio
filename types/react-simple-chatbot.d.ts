declare module 'react-simple-chatbot' {
  import { ComponentType } from 'react';

  export interface Step {
    id: string;
    message?: string | (({ steps, values }: { steps: any; values: any }) => Promise<any>);
    trigger?: string;
    user?: boolean;
  }

  export interface ChatBotProps {
    steps: Step[];
  }

  const ChatBot: ComponentType<ChatBotProps>;
  export default ChatBot;
}
