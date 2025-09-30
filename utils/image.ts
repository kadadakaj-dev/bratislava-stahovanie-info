// Utility helpers for responsive image generation.
// This project currently uses picsum.photos placeholder images with the pattern:
//   https://picsum.photos/seed/<seed>/<width>/<height>
// The service supports format negotiation via extension suffix (e.g. .webp / .avif).
// We exploit this to build srcset lists for multiple widths while preserving the
// original aspect ratio (derived from the URL or provided fallback ratio).

export interface ResponsiveImageConfig {
  url: string;              // Original image URL
  widths: number[];         // Desired target widths
  aspectRatio?: number;     // width / height ratio (default derived or 2)
  sizes: string;            // sizes attribute to emit
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
}

export interface GeneratedResponsiveImage {
  pictureSources: Array<{ type: string; srcSet: string }>; // For <source> elements
  img: {
    src: string;           // Fallback src
    srcSet: string;        // Fallback srcSet (jpeg)
    sizes: string;
    width: number;         // Intrinsic width of largest candidate
    height: number;        // Intrinsic height of largest candidate
    loading?: 'lazy' | 'eager';
    decoding: 'async';
    fetchPriority?: 'high' | 'low' | 'auto';
  };
}

const PICSUM_REGEX = /^(https?:\/\/picsum.photos\/seed\/[^/]+)\/(\d+)+(?:\/(\d+)+)?/i;

function deriveAspectRatio(url: string): number | null {
  const match = url.match(PICSUM_REGEX);
  if (!match) return null;
  const width = parseInt(match[2], 10);
  const height = match[3] ? parseInt(match[3], 10) : NaN;
  if (!isNaN(width) && !isNaN(height) && height !== 0) {
    return width / height;
  }
  return null;
}

function buildPicsumUrl(baseSeed: string, w: number, h: number, ext?: string): string {
  return `${baseSeed}/${w}/${h}${ext ? `.${ext}` : ''}`;
}

export function generateResponsiveImage(cfg: ResponsiveImageConfig): GeneratedResponsiveImage {
  const { url, widths, sizes, aspectRatio: forcedRatio, fetchPriority, loading } = cfg;

  // Ensure widths sorted & unique
  const sortedWidths = Array.from(new Set(widths)).sort((a, b) => a - b);

  const ratio = forcedRatio || deriveAspectRatio(url) || 2; // fallback 2:1

  const match = url.match(PICSUM_REGEX);
  // If not a picsum URL, we only return the original URL without variants.
  if (!match) {
    const largest = sortedWidths[sortedWidths.length - 1] || 800;
    const height = Math.round(largest / ratio);
    return {
      pictureSources: [],
      img: {
        src: url,
        srcSet: '',
        sizes,
        width: largest,
        height,
        loading,
        decoding: 'async',
        fetchPriority
      }
    };
  }

  const baseSeed = match[1];

  // Build srcset strings for each format
  const buildSet = (ext?: string) => sortedWidths.map(w => {
    const h = Math.round(w / ratio);
    return `${buildPicsumUrl(baseSeed, w, h, ext)} ${w}w`;
  }).join(', ');

  const jpegSrcSet = buildSet();
  const webpSrcSet = buildSet('webp');
  const avifSrcSet = buildSet('avif');

  const largestW = sortedWidths[sortedWidths.length - 1];
  const largestH = Math.round(largestW / ratio);

  return {
    pictureSources: [
      { type: 'image/avif', srcSet: avifSrcSet },
      { type: 'image/webp', srcSet: webpSrcSet }
    ],
    img: {
      src: buildPicsumUrl(baseSeed, largestW, largestH),
      srcSet: jpegSrcSet,
      sizes,
      width: largestW,
      height: largestH,
      loading,
      decoding: 'async',
      fetchPriority
    }
  };
}
