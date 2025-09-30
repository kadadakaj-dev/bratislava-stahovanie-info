import React, { useState } from 'react';
import { analyticsService } from '../services/analyticsService';

interface LeadMagnetDownloadProps {
  assetId?: string; // e.g. 'plan-30'
  label?: string;
  description?: string;
}

// Minimal placeholder lead magnet component. In production you'd gate by email submission.
export const LeadMagnetDownload: React.FC<LeadMagnetDownloadProps> = ({ assetId = 'plan-30', label = 'Stiahnuť PDF Plán', description = 'Získajte 30-dňový plán hladkého sťahovania (PDF)' }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    analyticsService.trackEvent('lead_magnet_download', { page: window.location.pathname + window.location.hash, asset: assetId });
    setDownloaded(true);
    // Placeholder: simulate download; integrate real file path once asset exists
    const blob = new Blob(['Placeholder PDF obsah – nahraďte reálnym súborom.'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${assetId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-surface-2 flex flex-col gap-2 max-w-md">
      <h3 className="font-bold text-text-primary text-lg">{label}</h3>
      <p className="text-sm text-text-muted">{description}</p>
      <button onClick={handleDownload} disabled={downloaded} className="px-4 py-2 rounded-md font-semibold text-sm bg-accent text-surface-1 hover:brightness-110 disabled:opacity-60">
        {downloaded ? 'Stiahnuté' : 'Stiahnuť PDF'}
      </button>
    </div>
  );
};

export default LeadMagnetDownload;
