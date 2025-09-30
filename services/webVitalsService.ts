import { onCLS, onFID, onLCP, onINP, onTTFB, CLSMetric, FIDMetric, LCPMetric, INPMetric, TTFBMetric } from 'web-vitals';
import { analyticsService } from './analyticsService';

type AnyMetric = CLSMetric | FIDMetric | LCPMetric | INPMetric | TTFBMetric | { name: string; value: number; id: string };

const report = (metric: AnyMetric) => {
  try {
    analyticsService.trackEvent('web_vital', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: (metric as any).rating
    });
  } catch (e) {
    // swallow
  }
};

export const initWebVitals = () => {
  onCLS(report);
  onFID(report);
  onLCP(report);
  onINP(report);
  onTTFB(report);
};
