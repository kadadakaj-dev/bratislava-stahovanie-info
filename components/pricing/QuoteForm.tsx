import React, { useState, useRef, useEffect } from 'react';
import { Translations } from '../../App';
import { QuoteFormData } from '../../types';
import { CheckCircleIcon } from '../../constants';
import { pricingData } from './PricingGrid';
import { offlineService } from '../../services/offlineService';
import { analyticsService } from '../../services/analyticsService';

interface QuoteFormProps {
    t: Translations;
    formData: QuoteFormData;
    setFormData: React.Dispatch<React.SetStateAction<QuoteFormData>>;
    initialFormState: QuoteFormData;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'queued';

const QuoteForm: React.FC<QuoteFormProps> = ({ t, formData, setFormData, initialFormState }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const statusRef = useRef<HTMLParagraphElement | null>(null);

    // Focus status region when status changes (success/queued)
    useEffect(() => {
        if (status === 'success' || status === 'queued') {
            statusRef.current?.focus();
        }
    }, [status]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
         if (name === 'gdpr' && errors.gdpr) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.gdpr;
                return newErrors;
            });
        }
    };

    const handleExtraServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            extraServices: { ...prev.extraServices, [name]: checked }
        }));
    };
    
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = t.errorRequired;
        if (!formData.email.trim()) newErrors.email = t.errorRequired;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t.errorEmail;
        if (!formData.phone.trim()) newErrors.phone = t.errorRequired;
        else if (!/^\+?[0-9\s-()]{7,}$/.test(formData.phone)) newErrors.phone = t.errorPhone;
        if (!formData.gdpr) newErrors.gdpr = t.errorGdpr;
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setStatus('submitting');
        
        const analyticsProperties = {
            service_type: formData.serviceType,
            has_notes: formData.notes.trim().length > 0,
            from_floor: formData.fromFloor,
            to_floor: formData.toFloor,
            extra_services: Object.entries(formData.extraServices).filter(([_, v]) => v).map(([k]) => k),
        };

        if (navigator.onLine) {
            try {
                // Mock API call
                await new Promise(res => setTimeout(res, 1500));
                analyticsService.trackEvent('form_submit', { form: 'quote', status: 'success', ...analyticsProperties });
                setStatus('success');
                setStatusMessage(t.formSuccess);
            } catch (error) {
                console.error("API call failed, adding to offline queue.", error);
                await offlineService.addRequestToQueue(formData);
                analyticsService.trackEvent('form_submit', { form: 'quote', status: 'queued', ...analyticsProperties });
                setStatus('queued');
                setStatusMessage(t.formQueued);
            }
        } else {
            await offlineService.addRequestToQueue(formData);
            analyticsService.trackEvent('form_submit', { form: 'quote', status: 'queued', ...analyticsProperties });
            setStatus('queued');
            setStatusMessage(t.formQueued);
        }
    };
    
    if (status === 'success' || status === 'queued') {
        const isSuccess = status === 'success';
        return (
            <div className="text-center p-8 bg-surface-2 rounded-lg border-2 border-border relative" role="status" aria-live="polite">
                <CheckCircleIcon className={`w-12 h-12 ${isSuccess ? 'text-primary' : 'text-accent'} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-text-primary" tabIndex={-1} ref={statusRef}>
                    {statusMessage.split('! ')[0] || statusMessage.split('.')[0]}
                </h3>
                <p className="text-text-muted mt-2">
                    {statusMessage.split('! ')[1] || statusMessage.split('. ')[1]}
                </p>
                <button
                    onClick={() => { setFormData(initialFormState); setStatus('idle'); setStatusMessage(''); }}
                    className="mt-6 px-5 py-2.5 bg-accent text-surface-1 font-bold rounded-md shadow-sm hover:brightness-110 transition-all active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {t.formNewRequest}
                </button>
            </div>
        );
    }

    const inputClasses = (name: keyof QuoteFormData | 'gdpr') => `block w-full px-3 py-2 bg-surface-1 border-2 rounded-md placeholder-text-muted focus:outline-none focus:ring-ring focus:ring-2 focus:border-accent sm:text-sm transition-colors ${errors[name] ? 'border-red-500' : 'border-border'}`;
    const checkboxClasses = (name: keyof QuoteFormData | 'gdpr') => `w-5 h-5 rounded text-accent bg-surface-2 border-2 focus:ring-ring ${errors[name] ? 'border-red-500' : 'border-border'}`;

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-8" aria-describedby={Object.keys(errors).length ? 'form-errors' : undefined}>
            <p id="form-errors" className="sr-only" aria-live="assertive">{Object.values(errors).join('. ')}</p>

            {/* Contact / Identity Section */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-describedby="section-contact-desc">
                <legend className="text-sm font-semibold text-text-primary mb-2 px-1">{t.formContactSection || 'Kontaktné údaje'}</legend>
                <span id="section-contact-desc" className="sr-only">{t.formContactAssistive || 'Základné identifikačné údaje potrebné na vytvorenie ponuky.'}</span>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-xs font-medium tracking-wide text-text-muted">{t.formFullName}</label>
                    <input id="name" type="text" name="name" autoComplete="name" placeholder={t.formFullName} value={formData.name} onChange={handleInputChange} className={inputClasses('name')} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p id="name-error" role="alert" className="text-red-500 text-xs">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs font-medium tracking-wide text-text-muted">{t.formEmail}</label>
                    <input id="email" type="email" name="email" autoComplete="email" placeholder={t.formEmail} value={formData.email} onChange={handleInputChange} className={inputClasses('email')} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <p id="email-error" role="alert" className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-xs font-medium tracking-wide text-text-muted">{t.formPhone}</label>
                    <input id="phone" type="tel" name="phone" autoComplete="tel" placeholder={t.formPhone} value={formData.phone} onChange={handleInputChange} className={inputClasses('phone')} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                    {errors.phone && <p id="phone-error" role="alert" className="text-red-500 text-xs">{errors.phone}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="serviceType" className="text-xs font-medium tracking-wide text-text-muted">{t.formServiceType}</label>
                    <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleInputChange} className={inputClasses('serviceType')} aria-describedby="serviceType-help">
                        {pricingData.map(p => <option key={p.type} value={p.type}>{p.type}</option>)}
                        <option value="Rodinný dom">{t.familyHouse}</option>
                        <option value="Firma/Sklad">Firma/Sklad</option>
                    </select>
                    <span id="serviceType-help" className="sr-only">{t.formServiceHelp || 'Zvoľte typ služby na odhad ceny.'}</span>
                </div>
            </fieldset>

            {/* Address Section */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <legend className="text-sm font-semibold text-text-primary mb-2 px-1">{t.formAddressSection || 'Miesta sťahovania'}</legend>
                <div className="flex flex-col gap-1">
                    <label htmlFor="fromAddress" className="text-xs font-medium tracking-wide text-text-muted">{t.formFromAddress}</label>
                    <input id="fromAddress" type="text" name="fromAddress" placeholder={t.formFromAddress} value={formData.fromAddress} onChange={handleInputChange} className={inputClasses('fromAddress')} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="toAddress" className="text-xs font-medium tracking-wide text-text-muted">{t.formToAddress}</label>
                    <input id="toAddress" type="text" name="toAddress" placeholder={t.formToAddress} value={formData.toAddress} onChange={handleInputChange} className={inputClasses('toAddress')} />
                </div>
            </fieldset>

            {/* Floors / Elevator */}
            <fieldset className="p-4 border-2 border-border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6" aria-describedby="floors-desc">
                <legend className="text-sm font-semibold text-text-primary px-1">{t.formFloorsSection || 'Poschodia a výťahy'}</legend>
                <span id="floors-desc" className="sr-only">{t.formFloorsAssistive || 'Zadajte poschodia a dostupnosť výťahov pre presný odhad.'}</span>
                <div className="space-y-2">
                    <label htmlFor="fromFloor" className="font-semibold text-xs text-text-primary uppercase tracking-wide">{t.formFromFloor}</label>
                    <div className="flex gap-4 items-center">
                        <select id="fromFloor" name="fromFloor" value={formData.fromFloor} onChange={handleInputChange} className={`${inputClasses('fromFloor')} w-24`}>
                            {[...Array(21).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <label htmlFor="fromElevator" className="flex items-center gap-2 cursor-pointer text-text-muted text-sm">
                            <input id="fromElevator" type="checkbox" name="fromElevator" checked={formData.fromElevator} onChange={handleCheckboxChange} className={checkboxClasses('fromElevator')} />
                            {t.formElevator}
                        </label>
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="toFloor" className="font-semibold text-xs text-text-primary uppercase tracking-wide">{t.formToFloor}</label>
                    <div className="flex gap-4 items-center">
                        <select id="toFloor" name="toFloor" value={formData.toFloor} onChange={handleInputChange} className={`${inputClasses('toFloor')} w-24`}>
                            {[...Array(21).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <label htmlFor="toElevator" className="flex items-center gap-2 cursor-pointer text-text-muted text-sm">
                            <input id="toElevator" type="checkbox" name="toElevator" checked={formData.toElevator} onChange={handleCheckboxChange} className={checkboxClasses('toElevator')} />
                            {t.formElevator}
                        </label>
                    </div>
                </div>
            </fieldset>

            {/* Extras & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-2">
                    <label htmlFor="moveDate" className="font-semibold text-xs tracking-wide text-text-primary uppercase">{t.formMoveDate}</label>
                    <input id="moveDate" type="date" name="moveDate" value={formData.moveDate} onChange={handleInputChange} className={inputClasses('moveDate')} />
                </div>
                <fieldset className="space-y-2">
                    <legend className="font-semibold text-xs tracking-wide text-text-primary uppercase">{t.formExtraServices}</legend>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-text-muted">
                        {[{ name: 'packing', label: t.servicePacking }, { name: 'bubbleWrap', label: t.serviceBubbleWrap }, { name: 'assembly', label: t.serviceAssembly }, { name: 'disposal', label: t.serviceDisposal }].map(service => (
                            <label key={service.name} className="flex items-center gap-2 cursor-pointer text-sm">
                                <input type="checkbox" name={service.name} checked={formData.extraServices[service.name]} onChange={handleExtraServiceChange} className={checkboxClasses('extraServices')} />
                                {service.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-xs font-medium tracking-wide text-text-muted">{t.formNotes}</label>
                <textarea id="notes" name="notes" placeholder={t.formNotes} rows={4} value={formData.notes} onChange={handleInputChange} className={inputClasses('notes')} />
            </div>

            {/* GDPR */}
            <div className="flex flex-col gap-1">
                <label htmlFor="gdpr" className="flex items-start gap-2 cursor-pointer text-text-muted text-sm leading-relaxed">
                    <input id="gdpr" type="checkbox" name="gdpr" checked={formData.gdpr} onChange={handleCheckboxChange} className={checkboxClasses('gdpr')} required aria-invalid={!!errors.gdpr} aria-describedby={errors.gdpr ? 'gdpr-error' : undefined} />
                    <span>{t.formGdpr}</span>
                </label>
                {errors.gdpr && <p id="gdpr-error" role="alert" className="text-red-500 text-xs">{errors.gdpr}</p>}
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 flex-wrap">
                <button type="submit" disabled={status === 'submitting'} className="inline-flex items-center justify-center px-8 py-3 border-2 border-text-primary text-sm font-bold rounded-md shadow-sm text-on-primary bg-primary hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1 focus:ring-ring transition-all duration-200 active:translate-y-0.5 disabled:bg-border disabled:text-text-muted disabled:border-text-muted">
                    {status === 'submitting' ? t.formSubmitting : t.formSubmit}
                </button>
                {status === 'submitting' && <span className="flex items-center gap-2 text-text-muted text-xs" role="status" aria-live="polite">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    {t.formSubmitting}
                </span>}
            </div>
        </form>
    );
};

export default QuoteForm;