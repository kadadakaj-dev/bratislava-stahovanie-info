import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Translations } from '../../App';
import { ChatMessage as ChatMessageType } from '../../types';
import { ChatBubbleOvalLeftEllipsisIcon, XIcon, SparklesIcon } from '../../constants';
import { startChat, sendChatMessage } from '../../services/geminiService';
import { analyticsService } from '../../services/analyticsService';
import ChatMessage from './ChatMessage';

const Chatbot: React.FC<{ t: Translations }> = ({ t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatPanelRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize chat on component mount
    useEffect(() => {
        try {
            startChat(t);
            setMessages([{ id: 'init', role: 'model', text: t.chatbot.welcomeMessage }]);
        } catch (e) {
            console.error(e);
            setError(t.chatbot.errorInit);
        }
    }, [t]);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Focus management for accessibility
    useEffect(() => {
        if (isOpen) {
            chatPanelRef.current?.querySelector('textarea')?.focus();
            document.body.style.overflow = 'hidden';
        } else {
             document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [isOpen]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        analyticsService.trackEvent('send_chatbot_message', { message_length: input.length });

        const userInput: ChatMessageType = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userInput]);
        setInput('');
        setIsLoading(true);
        setError(null);

        const modelResponseId = (Date.now() + 1).toString();
        // Add a placeholder for the model's response immediately
        setMessages(prev => [...prev, { id: modelResponseId, role: 'model', text: '' }]);

        try {
            const stream = await sendChatMessage(userInput.text);
            for await (const chunk of stream) {
                setMessages(prev => prev.map(msg => 
                    msg.id === modelResponseId 
                        ? { ...msg, text: msg.text + chunk }
                        : msg
                ));
            }
        } catch (err) {
            console.error(err);
            setError(t.chatbot.errorResponse);
             setMessages(prev => prev.map(msg => 
                msg.id === modelResponseId 
                    ? { ...msg, text: t.chatbot.errorResponse }
                    : msg
            ));
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, t]);
    
    const handleOpenChat = () => {
        analyticsService.trackEvent('open_chatbot');
        setIsOpen(true);
    };

    const transitionClasses = "transition-all duration-300 ease-in-out";

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={handleOpenChat}
                className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1 ${transitionClasses} ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                aria-label={t.chatbot.openChat}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
            </button>

            {/* Chat Panel */}
            <div
                ref={chatPanelRef}
                className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full h-full md:w-[400px] md:h-[600px] bg-surface-1 border-text-primary md:border-2 shadow-warhol md:rounded-lg flex flex-col overflow-hidden ${transitionClasses} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="chatbot-heading"
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b-2 border-text-primary flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="w-7 h-7 text-accent" />
                        <h2 id="chatbot-heading" className="text-xl font-bold text-text-primary">{t.chatbot.title}</h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-text-muted hover:bg-surface-2" aria-label={t.chatbot.closeChat}>
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                           <ChatMessage key={msg.id} message={msg} />
                        ))}
                         {isLoading && messages[messages.length-1]?.role === 'user' && (
                             <ChatMessage message={{ id: 'loading', role: 'model', text: '...' }} />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form */}
                <div className="p-4 border-t-2 border-text-primary flex-shrink-0">
                    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    handleSendMessage(e);
                                }
                            }}
                            placeholder={t.chatbot.placeholder}
                            className="flex-grow p-2 bg-surface-2 border-2 border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent text-sm"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={!input.trim() || isLoading} className="w-10 h-10 flex-shrink-0 bg-accent text-surface-1 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;