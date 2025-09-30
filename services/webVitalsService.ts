import { onCLS, onFID, onLCP, onINP, onTTFB, CLSMetric, FIDMetric, LCPMetric, INPMetric, TTFBMetric } from 'web-vitals';
import { trackWebVital } from './analyticsService';

type AnyMetric = CLSMetric | FIDMetric | LCPMetric | INPMetric | TTFBMetric | { name: string; value: number; id: string };

// Sampling ratio (avoid flooding analytics in high traffic). 1 = 100%.
const SAMPLE_RATIO = 0.5; // 50% sample by default
// Batch flush when page becomes hidden or after timeout
const metricsBuffer: AnyMetric[] = [];
let flushScheduled = false;

const scheduleFlush = () => {
  if (flushScheduled) return;
  flushScheduled = true;
  setTimeout(() => flushMetrics(), 4000); // idle flush
};

const flushMetrics = () => {
  if (!metricsBuffer.length) { flushScheduled = false; return; }
  const batch = metricsBuffer.splice(0, metricsBuffer.length);
  batch.forEach(m => {
    trackWebVital({
      name: m.name,
      value: round((m as any).value as number),
      id: (m as any).id,
      rating: (m as any).rating,
    });
  });
  flushScheduled = false;
};

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetrics();
    }
  });
}

const round = (val: number) => Math.round(val * 100) / 100; // 2 decimals

const shouldSample = () => {
  if (SAMPLE_RATIO >= 1) return true;
  return Math.random() < SAMPLE_RATIO;
};

const report = (metric: AnyMetric) => {
  try {
    if (!shouldSample()) return;
    metricsBuffer.push(metric);
    scheduleFlush();
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
