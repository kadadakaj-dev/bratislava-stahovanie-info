import React from 'react';
import { Translations } from '../../App';
import { EnvelopeIcon } from '../../constants';

const StickyCta = ({ t }: { t: Translations }) => {
    const scrollToForm = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="sticky top-16 bg-surface-1/80 backdrop-blur-md shadow-glass py-3 px-4 sm:px-6 lg:px-8 z-40 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 border-b border-border">
            <div className="container mx-auto flex items-center justify-between">
                <p className="hidden md:block font-bold text-text-primary">{t.nonBindingOffer}</p>
                <div className="flex items-center gap-3">
                     <a href="mailto:info@viandmo.com" className="inline-flex items-center gap-2 justify-center px-4 py-2 border-2 border-accent text-accent text-sm font-bold rounded-md hover:bg-accent hover:text-surface-1 transition-colors">
                        <EnvelopeIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">{t.writeEmail}</span>
                    </a>
                    <button onClick={scrollToForm} className="inline-flex items-center justify-center px-4 py-2 border-2 border-primary text-sm font-bold rounded-md shadow-sm text-on-primary bg-primary hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1 focus:ring-ring transition-all">
                        {t.getQuote}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default StickyCta;