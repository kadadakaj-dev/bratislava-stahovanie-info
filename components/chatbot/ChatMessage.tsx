import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { SparklesIcon } from '../../constants';

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    const isModel = message.role === 'model';

    return (
        <div className={`flex items-start gap-3 ${isModel ? '' : 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isModel ? 'bg-accent/10 text-accent' : 'bg-surface-2'}`}>
                {isModel ? <SparklesIcon className="w-5 h-5" /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-text-muted"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                )}
            </div>
            <div className={`p-3 rounded-lg max-w-[80%] ${isModel ? 'bg-accent/10' : 'bg-surface-2'}`}>
                <p className="text-text-primary whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
