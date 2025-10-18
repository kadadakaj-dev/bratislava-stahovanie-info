import React from 'react';
import { Translations } from '../../App';
import { HomeModernIcon, BuildingOfficeIcon, TrashIcon, TruckIcon, BoxIcon, CheckCircleIcon } from '../../constants';
import FaqItem from './FaqItem';

const iconMap = {
    HomeModernIcon,
    BuildingOfficeIcon,
    TrashIcon,
    TruckIcon,
    BoxIcon,
};

type Service = Translations['servicesContent'][0];

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const IconComponent = iconMap[service.icon as keyof typeof iconMap];
    
    return (
        <div className="bg-surface-1 rounded-lg border-2 border-text-primary p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-warhol group h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                {IconComponent && <IconComponent className="w-7 h-7" />}
              </div>
              <h2 className="text-xl font-bold text-text-primary">{service.title}</h2>
            </div>
            <p className="text-accent font-semibold mb-4 text-base">{service.usp}</p>
            
            <div className="flex-grow mb-6">
              <h3 className="font-bold mb-3 text-text-primary">{service.featuresTitle}</h3>
              <ul className="space-y-2">
                {service.features.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    {item.link ? (
                        <a href={`#${item.link}`} className="text-sm text-text-muted text-left underline hover:text-accent transition-colors">
                            {item.text}
                        </a>
                    ) : (
                        <span className="text-sm text-text-muted">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
                {service.faqs.map((faq, i) => (
                    <FaqItem key={i} q={faq.q} a={faq.a} />
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;
