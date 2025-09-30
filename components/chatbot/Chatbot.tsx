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
    const openButtonRef = useRef<HTMLButtonElement>(null);

    // Initialize chat on component mount
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY);
    useEffect(() => {
        if (!hasApiKey) return; // Do not initialize chat
        try {
          startChat(t);
          setMessages([{ id: 'init', role: 'model', text: t.chatbot.welcomeMessage }]);
        } catch (e) {
          console.error(e);
          setError(t.chatbot.errorInit);
        }
    }, [t, hasApiKey]);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Focus management and body scroll lock for accessibility
    useEffect(() => {
        if (isOpen) {
            const focusableElements = chatPanelRef.current?.querySelectorAll('textarea, button');
            if (focusableElements && focusableElements.length > 0) {
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                const handleKeyDown = (e: KeyboardEvent) => {
                    if (e.key === 'Escape') {
                        handleCloseChat();
                    }
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                lastElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                firstElement.focus();
                                e.preventDefault();
                            }
                        }
                    }
                };

                const panel = chatPanelRef.current;
                panel?.addEventListener('keydown', handleKeyDown);
                firstElement.focus();
                document.body.style.overflow = 'hidden';

                return () => {
                    panel?.removeEventListener('keydown', handleKeyDown);
                    document.body.style.overflow = '';
                    openButtonRef.current?.focus();
                };
            }
        }
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
             const errorMessage = t.chatbot.errorResponse;
             setError(errorMessage);
             setMessages(prev => prev.map(msg => 
                msg.id === modelResponseId 
                    ? { ...msg, text: errorMessage }
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

    const handleCloseChat = () => {
        analyticsService.trackEvent('close_chatbot');
        setIsOpen(false);
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            {hasApiKey && (
            <div className="fixed bottom-6 right-6 z-[1000]">
                <button
                    ref={openButtonRef}
                    onClick={handleOpenChat}
                    className={`transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'} bg-primary text-on-primary w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:brightness-110 active:translate-y-0.5`}
                    aria-label={t.chatbot.openChat}
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
                </button>
            </div>
            )}

            {/* Chat Panel */}
            {hasApiKey && (
            <div
                ref={chatPanelRef}
                className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[1001] w-full h-full sm:w-[400px] sm:h-[calc(100vh-3rem)] sm:max-h-[700px] bg-surface-1 rounded-lg border-2 border-border shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isOpen}
                aria-labelledby="chatbot-title"
            >
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="w-6 h-6 text-accent" />
                        <h2 id="chatbot-title" className="text-lg font-bold text-text-primary">{t.chatbot.title}</h2>
                    </div>
                    <button
                        onClick={handleCloseChat}
                        className="p-1 rounded-full text-text-muted hover:bg-surface-2"
                        aria-label={t.chatbot.closeChat}
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 text-accent">
                                <SparklesIcon className="w-5 h-5 animate-pulse" />
                            </div>
                            <div className="p-3 rounded-lg bg-accent/10">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '75ms'}}></span>
                                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <footer className="p-4 border-t border-border">
                    {error && <p className="text-red-500 text-sm mb-2" role="alert">{error}</p>}
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    handleSendMessage(e as any);
                                }
                            }}
                            placeholder={t.chatbot.placeholder}
                            className="flex-1 p-2 bg-surface-2 border-2 border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="p-2 bg-primary text-on-primary rounded-md disabled:bg-border disabled:text-text-muted transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
                        </button>
                    </form>
                </footer>
                        </div>
                        )}
                        {!hasApiKey && (
                            <div className="fixed bottom-6 right-6 z-[1000] text-xs text-text-muted bg-surface-2 p-3 rounded shadow" aria-live="polite">
                                AI asistent momentálne nie je dostupný.
                            </div>
                        )}
        </>
    );
};

export default Chatbot;
