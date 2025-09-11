import React, { useState } from 'react';

interface FaqItemProps {
    q: string;
    a: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-t border-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-text-primary text-sm">{q}</span>
                <svg className={`w-5 h-5 transform transition-transform text-text-muted ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="grid overflow-hidden faq-answer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="min-h-0">
                    <p className="pb-3 text-text-muted text-sm">{a}</p>
                </div>
            </div>
        </div>
    )
};

export default FaqItem;
