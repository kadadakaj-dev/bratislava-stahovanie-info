import React from 'react';
import { FacebookIcon, WhatsAppIcon } from '../constants';
import { Translations, View } from '../App';
import { analyticsService } from '../services/analyticsService';

interface FooterProps {
    t: Translations;
    onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ t, onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const inputClasses = "block w-full px-3 py-2 bg-surface-2 border-2 border-border rounded-md shadow-sm placeholder-text-muted focus:outline-none focus:ring-ring focus:ring-2 focus:border-accent sm:text-sm transition-colors";

  const socialLinks = [
    {
      name: 'Facebook',
      Icon: FacebookIcon,
      url: 'https://www.facebook.com/viandmocom',
      colorClass: 'hover:text-primary',
    },
    {
      name: 'WhatsApp',
      Icon: WhatsAppIcon,
      url: 'https://api.whatsapp.com/send?phone=421911275755',
      colorClass: 'hover:text-primary',
    },
  ];

  const handleSocialClick = (name: string) => {
    analyticsService.trackEvent('click_social', { social_network: name, location: 'footer' });
  };
  
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // This form uses mailto, so we only track the attempt to submit.
    // We prevent default to ensure the tracking event fires before navigation.
    // A timeout allows the tracking to complete before the mail client is opened.
    e.preventDefault(); 
    analyticsService.trackEvent('submit_contact_form', { form_location: 'footer' });
    setTimeout(() => {
        if(e.target instanceof HTMLFormElement) {
            e.target.submit();
        }
    }, 300);
  };

  return (
    <footer className="bg-surface-2 text-text-primary">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{t.contactUs}</h3>
                <div className="space-y-4 text-sm">
                    <div>
                        <p className="font-bold text-text-secondary">{t.movingContact}</p>
                        <p className="text-text-muted">Miroslav Danihel</p>
                        <a href="tel:+421911275755" className="hover:text-primary transition-colors">+421 911 275 755</a>
                        <br />
                        <a href="mailto:info@viandmo.com" className="hover:text-primary transition-colors">info@viandmo.com</a>
                    </div>
                     <div>
                        <p className="font-bold text-text-secondary">{t.cleaningContact}</p>
                        <a href="tel:+421918895730" className="hover:text-primary transition-colors">+421 918 895 730</a>
                    </div>
                </div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{t.businessInfo}</h3>
                <div className="text-sm text-text-muted">
                    <p className="font-bold text-text-primary">VI and MO s. r. o.</p>
                    <p>Karpatské námestie 7770/10A</p>
                    <p>831 06 Bratislava - Rača, Slovensko</p>
                    <p>IČO: 56 811 322 | DIČ: 2122461176</p>
                    <a href="#" className="mt-2 inline-block hover:text-primary underline">{t.privacy}</a>
                </div>
            </div>
             <div className="flex items-center gap-4">
                {socialLinks.map(({ name, Icon, url, colorClass }) => (
                    <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${name}`}
                    className={`text-text-muted transition-colors duration-200 ${colorClass}`}
                    onClick={() => handleSocialClick(name)}
                    >
                    <Icon className="w-7 h-7" />
                    </a>
                ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-text-primary">{t.areYouMoving}</h3>
            <form action="mailto:info@viandmo.com" method="post" encType="text/plain" className="mt-4 space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name-footer" className="sr-only">{t.nameOrCompany}</label>
                        <input type="text" name="name" id="name-footer" required className={inputClasses} placeholder={t.nameOrCompany} />
                    </div>
                    <div>
                        <label htmlFor="phone-footer" className="sr-only">{t.mobile}</label>
                        <input type="tel" name="phone" id="phone-footer" required className={inputClasses} placeholder={t.mobile} />
                    </div>
                </div>
                <div>
                     <label htmlFor="email-footer" className="sr-only">{t.email}</label>
                     <input type="email" name="email" id="email-footer" required className={inputClasses} placeholder={t.email} />
                </div>
                 <div>
                     <label htmlFor="address-footer" className="sr-only">{t.address}</label>
                     <textarea name="address" id="address-footer" rows={3} className={inputClasses} placeholder={t.address}></textarea>
                 </div>
                <div>
                    <button type="submit" className="inline-flex items-center px-6 py-3 border-2 border-text-primary text-base font-bold rounded-md shadow-sm text-text-primary bg-surface-1 hover:bg-text-primary hover:text-surface-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-2 focus:ring-ring transition-all duration-200 active:translate-y-0.5">
                        {t.sendRequest}
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-surface-1">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-text-muted">
            <p>&copy; {currentYear} VI and MO s. r. o. | {t.footerRights}</p>
            <p className="mt-1">2025 Dev by Gruppa Taxonomy™</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;