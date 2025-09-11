import React from 'react';
import { Translations } from '../../App';
import { UserGroupIcon, TruckIcon } from '../../constants';

const InfoBoxes: React.FC<{ t: Translations }> = ({ t }) => {
    return (
        <section className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-surface-1 rounded-lg border-2 border-text-primary p-8 transition-all duration-300 hover:shadow-warhol">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center"><UserGroupIcon className="w-7 h-7" /></div>
                    <h2 className="text-xl font-bold text-text-primary">{t.workersPrice}</h2>
                </div>
                <ul className="space-y-2 text-text-muted">
                    <li className="flex justify-between"><span>{t.oneWorker}</span><span className="font-bold text-text-primary">40 {t.pricePerHour}</span></li>
                    <li className="flex justify-between"><span>{t.twoWorkers}</span><span className="font-bold text-text-primary">{t.fromPrice} 50 {t.pricePerHour}</span></li>
                    <li className="flex justify-between"><span>{t.threeOrMoreWorkers}</span><span className="font-bold text-text-primary">{t.priceByAgreement}</span></li>
                </ul>
            </div>
            <div className="bg-surface-1 rounded-lg border-2 border-text-primary p-8 transition-all duration-300 hover:shadow-warhol">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center"><TruckIcon className="w-7 h-7" /></div>
                    <h2 className="text-xl font-bold text-text-primary">{t.transportPrice}</h2>
                </div>
                <ul className="space-y-2 text-text-muted">
                    <li className="flex justify-between"><span>{t.withinBratislava}</span><span className="font-bold text-text-primary">30 €</span></li>
                    <li className="flex justify-between"><span>{t.outsideCity}</span><span className="font-bold text-text-primary">0,80 {t.pricePerKm}</span></li>
                    <li className="flex justify-between border-t border-border mt-2 pt-2"><span>{t.minTripPrice}</span><span className="font-bold text-text-primary">70 €</span></li>
                </ul>
            </div>
      </section>
    );
};

export default InfoBoxes;