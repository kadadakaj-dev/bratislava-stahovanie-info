import React, { useMemo } from 'react';
import { Translations } from '../../App';
import { QuoteFormData } from '../../types';
import { CalculatorIcon } from '../../constants';
import { pricingData } from './PricingGrid';

interface EstimateWidgetProps {
  t: Translations;
  formData: QuoteFormData;
}

const estimateConfig = {
    floorSurcharge: 15,
    extraServices: {
        packing: 50,
        bubbleWrap: 30,
        assembly: 40,
        disposal: 60,
    }
};

const EstimateWidget: React.FC<EstimateWidgetProps> = ({ t, formData }) => {
    const estimate = useMemo(() => {
        const basePrice = pricingData.find(p => p.type === formData.serviceType)?.price || 0;
        
        let floorSurcharge = 0;
        if (!formData.fromElevator && parseInt(formData.fromFloor) > 0) {
            floorSurcharge += (parseInt(formData.fromFloor)) * estimateConfig.floorSurcharge;
        }
        if (!formData.toElevator && parseInt(formData.toFloor) > 0) {
            floorSurcharge += (parseInt(formData.toFloor)) * estimateConfig.floorSurcharge;
        }

        const servicesSurcharge = Object.entries(formData.extraServices)
            .filter(([, isSelected]) => isSelected)
            .reduce((total, [serviceName]) => total + (estimateConfig.extraServices[serviceName as keyof typeof estimateConfig.extraServices] || 0), 0);

        const total = basePrice + floorSurcharge + servicesSurcharge;

        return { basePrice, floorSurcharge, servicesSurcharge, total };

    }, [formData]);
    
    return (
        <div className="sticky top-24 bg-surface-1 rounded-lg border-2 border-text-primary p-6">
            <div className="flex items-center gap-3 mb-4">
                <CalculatorIcon className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold text-text-primary">{t.estimateTitle}</h3>
            </div>
            
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-text-muted">{t.estimateBase} ({formData.serviceType})</span>
                    <span className="font-semibold text-text-primary">{estimate.basePrice > 0 ? `${estimate.basePrice} €` : 'N/A'}</span>
                </div>
                {estimate.floorSurcharge > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-text-muted">{t.estimateFloors}</span>
                        <span className="font-semibold text-text-primary">+ {estimate.floorSurcharge} €</span>
                    </div>
                )}
                 {estimate.servicesSurcharge > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-text-muted">{t.estimateServices}</span>
                        <span className="font-semibold text-text-primary">+ {estimate.servicesSurcharge} €</span>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-text-primary">{t.estimateTotal}</span>
                    <span className="font-bold text-primary">{estimate.total > 0 ? `${estimate.total} €` : '--'}</span>
                </div>
            </div>

            <p className="mt-4 text-xs text-text-muted text-center">
                {t.estimateDescription}
            </p>
        </div>
    )
};

export default EstimateWidget;