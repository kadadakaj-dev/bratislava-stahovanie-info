import { onCLS, onFID, onLCP, onINP, onTTFB, CLSMetric, FIDMetric, LCPMetric, INPMetric, TTFBMetric } from 'web-vitals';
import { trackWebVital } from './analyticsService';

type AnyMetric = CLSMetric | FIDMetric | LCPMetric | INPMetric | TTFBMetric | { name: string; value: number; id: string };

// Sampling ratio (avoid flooding analytics in high traffic). 1 = 100%.
const SAMPLE_RATIO = 1;

const round = (val: number) => Math.round(val * 100) / 100; // 2 decimals

const shouldSample = () => {
  if (SAMPLE_RATIO >= 1) return true;
  return Math.random() < SAMPLE_RATIO;
};

const report = (metric: AnyMetric) => {
  try {
    if (!shouldSample()) return;
    trackWebVital({
      name: metric.name,
      value: round(metric.value as number),
      id: metric.id,
      rating: (metric as any).rating,
    });
  } catch {
    // no-op
  }
};

export const initWebVitals = () => {
  onCLS(report);
  onFID(report);
  onLCP(report);
  onINP(report);
  onTTFB(report);
};
