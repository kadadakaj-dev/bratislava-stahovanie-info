import React, { useState } from 'react';
import { Translations } from '../App';
import { QuoteFormData } from '../types';
import StickyCta from './pricing/StickyCta';
import PricingGrid from './pricing/PricingGrid';
import InfoBoxes from './pricing/InfoBoxes';
import QuoteForm from './pricing/QuoteForm';
import EstimateWidget from './pricing/EstimateWidget';
import FaqSection from './pricing/FaqSection';

const initialFormState: QuoteFormData = {
    name: '', email: '', phone: '', serviceType: '1. izbový byt', fromAddress: '', toAddress: '',
    fromFloor: '0', toFloor: '0', fromElevator: false, toElevator: false, moveDate: '',
    extraServices: { packing: false, bubbleWrap: false, assembly: false, disposal: false },
    notes: '', gdpr: false,
};

const PricingPage: React.FC<{ t: Translations }> = ({ t }) => {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormState);

  return (
    <>
      <StickyCta t={t}/>
      <div className="space-y-16 md:space-y-24">
        <header className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">{t.pricingAndQuote}</h1>
          <p className="max-w-2xl mx-auto text-lg text-text-muted">
            {t.pricingDescription}
          </p>
        </header>

        <PricingGrid t={t} />
        
        <InfoBoxes t={t} />

        <section id="quote-form" aria-labelledby="quote-form-heading" className="bg-surface-1 rounded-lg border-2 border-text-primary p-8 md:p-12 scroll-mt-24">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-2">
                     <h2 id="quote-form-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{t.getQuote}</h2>
                    <p className="text-text-muted mb-8">{t.offerDescriptionShort}</p>
                    <QuoteForm 
                        t={t} 
                        formData={formData} 
                        setFormData={setFormData}
                        initialFormState={initialFormState}
                    />
                </div>
                <div className="lg:col-span-1">
                   <EstimateWidget t={t} formData={formData} />
                </div>
            </div>
        </section>

        <FaqSection t={t} />
      </div>
    </>
  );
};

export default PricingPage;