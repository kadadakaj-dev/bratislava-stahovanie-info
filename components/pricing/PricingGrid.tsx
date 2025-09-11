import React from 'react';
import { Translations } from '../../App';

export const pricingData = [
    { type: 'Garsónka', price: 65 },
    { type: '1. izbový byt', price: 70 },
    { type: '2. izbový byt', price: 140 },
    { type: '3. izbový byt', price: 240 },
    { type: '4. izbový byt', price: 350 },
];

const PricingCard: React.FC<{ title: string; price: string; t: Translations; isOffer?: boolean }> = ({ title, price, t, isOffer }) => (
    <div className="relative group bg-surface-1 p-6 rounded-lg border-2 border-text-primary text-center transition-all duration-300 hover:shadow-warhol">
        <h3 className="font-bold text-lg text-text-primary">{title}</h3>
        <p className={`text-3xl font-bold text-accent my-2 ${isOffer ? 'text-xl' : ''}`}>{price}</p>
        {!isOffer && <div className="absolute top-0 right-0 -mt-3 -mr-3 px-2 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">{t.fromPrice}</div>}
        
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-text-primary text-surface-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {t.priceTooltip}
            <svg className="absolute text-text-primary h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>
    </div>
);

const PricingGrid: React.FC<{ t: Translations }> = ({ t }) => {
    return (
        <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">{t.basePriceList}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                {pricingData.map(item => (
                    <PricingCard key={item.type} title={item.type} price={`${item.price} €`} t={t} />
                ))}
                <PricingCard title={t.familyHouse} price={t.familyHousePrice} t={t} isOffer={true} />
            </div>
            <p className="text-center mt-4 text-sm text-text-muted">{t.priceTooltip}</p>
        </section>
    );
};

export default PricingGrid;