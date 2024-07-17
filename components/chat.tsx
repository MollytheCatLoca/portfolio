// Chat.tsx
'use client';

import { Message, useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/inputCh';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CopyToClipboard from '@/components/copy-to-clipboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'black',
  function: 'blue',
  tool: 'purple',
  assistant: 'green',
  data: 'orange',
};

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: '/api/assistant' });

  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitMessage(e);
  }

  return (
    <section className='py-24 text-zinc-700'>
      <div className='container max-w-3xl'>
        {/* Error message */}
        {error && (
          <div className='relative px-6 py-4 text-white bg-red-500 rounded-md'>
            <span className='block sm:inline'>Error: {error.toString()}</span>
          </div>
        )}
        {/* Chat area */}
        <div className='mx-auto mt-3 w-full max-w-lg'>
          <ScrollArea
            className='mb-2 h-[400px] rounded-md border p-4'
            ref={ref}
          >
            {messages.map((m: Message) => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12' style={{ color: roleToColorMap[m.role] }}>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'data' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-orange-500 text-white'>
                        Data
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {(m.data as any).description}
                        <br />
                        <pre className='bg-gray-200'>
                          {JSON.stringify(m.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          {status === 'in_progress' && (
            <div className='w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse' />
          )}

          <form onSubmit={onSubmit} className='relative'>
            <Input
              ref={inputRef}
              name='message'
              value={input}
              onChange={handleInputChange}
              placeholder='Ask me anything...'
              className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
              disabled={status !== 'awaiting_message'}
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={status !== 'awaiting_message'}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>

          <button
            className='fixed bottom-0 w-full max-w-md p-2 mb-8 text-white bg-red-500 rounded-lg'
            onClick={stop}
          >
            Stop
          </button>
        </div>
      </div>
    </section>
  );
}
