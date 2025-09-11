import React from 'react';
import { Translations, View } from '../App';
import { analyticsService } from '../services/analyticsService';

interface AboutPageProps {
  t: Translations;
  onNavigate: (view: View) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ t, onNavigate }) => {
  const handleCtaClick = (targetView: View) => {
    analyticsService.trackEvent('click_cta', { target: targetView, location: 'about_page_bottom' });
    onNavigate(targetView);
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    analyticsService.trackEvent('click_cta', { target: 'contact', location: 'about_page_bottom' });
    document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
  };
    
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Block */}
      <header className="text-center">
        <p className="text-lg font-bold text-accent mb-2">{t.aboutPageContent.heroSubtitle}</p>
        <h1 id="about-heading" className="text-4xl sm:text-6xl font-extrabold text-text-primary mb-4 tracking-tight">{t.aboutPageContent.heroTitle}</h1>
        <p className="max-w-3xl mx-auto text-lg text-text-muted">{t.aboutPageContent.heroText}</p>
      </header>
      
      {/* About Company Block */}
      <section aria-labelledby="company-heading">
        <div className="max-w-4xl mx-auto">
            <h2 id="company-heading" className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 text-center">{t.aboutPageContent.companyTitle}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-left space-y-4">
               <p>{t.aboutPageContent.companyText1}</p>
               <p>{t.aboutPageContent.companyText2}</p>
            </div>
        </div>
      </section>

      {/* Services Grid */}
      <section aria-labelledby="about-services-heading">
            <div className="grid md:grid-cols-2 gap-8">
                {t.aboutPageContent.services.map(service => (
                    <div key={service.title} className="bg-surface-1 rounded-lg border-2 border-text-primary p-6 transition-all duration-300 hover:shadow-warhol">
                        <h3 className="text-xl font-bold text-text-primary mb-2">{service.title}</h3>
                        <p className="text-text-muted">{service.description}</p>
                    </div>
                ))}
            </div>
      </section>

      {/* CTA Block */}
       <section className="bg-text-primary text-surface-1 rounded-lg p-8 md:p-12 text-center halftone-overlay" aria-labelledby="about-cta-heading">
        <h2 id="about-cta-heading" className="text-2xl md:text-3xl font-bold mb-6">{t.aboutPageContent.ctaTitle}</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <button onClick={() => handleCtaClick('pricing')} className="inline-block bg-primary text-on-primary font-bold px-8 py-3 rounded-md hover:brightness-110 transition-all duration-300 active:translate-y-0.5 text-lg">
              {t.aboutPageContent.ctaButtonPrimary}
            </button>
            <button onClick={handleContactClick} className="inline-block bg-transparent border-2 border-surface-1 text-surface-1 font-bold px-8 py-3 rounded-md hover:bg-surface-1 hover:text-text-primary transition-all duration-300 active:translate-y-0.5 text-lg">
              {t.aboutPageContent.ctaButtonSecondary}
            </button>
            <button onClick={() => handleCtaClick('references')} className="inline-block bg-transparent border-2 border-accent text-accent font-bold px-8 py-3 rounded-md hover:bg-accent hover:text-surface-1 transition-all duration-300 active:translate-y-0.5 text-lg">
              {t.aboutPageContent.ctaButtonTertiary}
            </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;