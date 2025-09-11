import React, { useState } from 'react';
import { Translations } from '../../App';
import { QuestionMarkCircleIcon } from '../../constants';

const faqs = [
    { q: 'faqQ1', a: 'faqA1' },
    { q: 'faqQ2', a: 'faqA2' },
    { q: 'faqQ3', a: 'faqA3' },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                <span className="font-semibold text-text-primary">{q}</span>
                <svg className={`w-6 h-6 transform transition-transform text-text-muted ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="grid overflow-hidden faq-answer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="min-h-0">
                     <p className="pb-4 text-text-muted">{a}</p>
                </div>
            </div>
        </div>
    )
}

const FaqSection: React.FC<{ t: Translations }> = ({ t }) => {
    return (
        <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3">
                <QuestionMarkCircleIcon className="w-8 h-8"/>
                {t.faqTitle}
            </h2>
            <div className="max-w-3xl mx-auto bg-surface-1 rounded-lg border-2 border-text-primary p-4 sm:p-8">
                {faqs.map(faq => <FaqItem key={faq.q} q={t[faq.q as keyof Translations] as string} a={t[faq.a as keyof Translations] as string}/>)}
            </div>
      </section>
    );
};

export default FaqSection;