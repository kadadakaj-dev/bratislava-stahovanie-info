import React from 'react';
import { Translations, View } from '../App';
import ServiceCard from './services/ServiceCard';
import { analyticsService } from '../services/analyticsService';

interface ServicesPageProps {
  t: Translations;
  onNavigate: (view: View) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ t, onNavigate }) => {

  const handleCtaClick = (targetView: View) => {
    analyticsService.trackEvent('click_cta', { target: targetView, location: 'services_page_bottom' });
    onNavigate(targetView);
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    analyticsService.trackEvent('click_cta', { target: 'contact', location: 'services_page_bottom' });
    document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="space-y-16 md:space-y-24" aria-labelledby="services-heading">
      <header className="text-center">
        <h1 id="services-heading" className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">{t.ourServices}</h1>
        <p className="max-w-2xl mx-auto text-lg text-text-muted">
          {t.servicesDescription}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {t.servicesContent.map((service, index) => (
            <ServiceCard key={index} service={service} />
        ))}
      </div>

      <section className="bg-text-primary text-surface-1 rounded-lg p-8 md:p-12 text-center halftone-overlay" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-3">{t.servicesCtaTitle}</h2>
        <p className="max-w-3xl mx-auto mb-8 text-surface-1/80">
            {t.servicesCtaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => handleCtaClick('pricing')} className="inline-block bg-primary text-on-primary font-bold px-8 py-3 rounded-md hover:brightness-110 transition-all duration-300 active:translate-y-0.5 text-lg">
              {t.servicesCtaPricingBtn}
            </button>
            <button onClick={handleContactClick} className="inline-block bg-transparent border-2 border-surface-1 text-surface-1 font-bold px-8 py-3 rounded-md hover:bg-surface-1 hover:text-text-primary transition-all duration-300 active:translate-y-0.5 text-lg">
              {t.servicesCtaContactBtn}
            </button>
        </div>
      </section>
    </section>
  );
};

export default ServicesPage;