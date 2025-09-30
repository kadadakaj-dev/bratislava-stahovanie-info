import React from 'react';

// Reusable shimmer class names rely on CSS added globally (could move to themeService if desired)
// We inline a <style> tag once for simplicity; in production, consolidate.
const ensureShimmerStyle = () => {
    if (document.getElementById('skeleton-shimmer-style')) return;
    const style = document.createElement('style');
    style.id = 'skeleton-shimmer-style';
    style.textContent = `
    @keyframes skeleton-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    .skeleton-base { position: relative; overflow: hidden; background: rgb(var(--surface-2)); }
    .skeleton-base::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(var(--surface-2),0) 0%, rgba(var(--white),0.4) 50%, rgba(var(--surface-2),0) 100%); animation: skeleton-shimmer 1.6s infinite; }
    @media (prefers-reduced-motion: reduce) { .skeleton-base::after { animation: none; display: none; } }
    `;
    document.head.appendChild(style);
};

interface SkeletonVariantProps {
    lines?: number;
    image?: boolean;
    compact?: boolean;
}

const PostCardSkeleton: React.FC<SkeletonVariantProps> = ({ lines = 3, image = true, compact = false }) => {
    if (typeof window !== 'undefined') ensureShimmerStyle();
    return (
        <div className={`bg-surface-1 rounded-lg border-2 border-border p-1 ${compact ? 'max-w-sm' : ''}`}> 
            {image && <div className="h-48 skeleton-base rounded-md mb-2"></div>}
            <div className="p-6">
                <div className="h-6 w-3/4 skeleton-base rounded mb-4"></div>
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className={`h-4 skeleton-base rounded ${i < lines - 1 ? 'mb-2' : ''} ${i === lines - 1 ? 'w-5/6' : 'w-full'}`}></div>
                ))}
            </div>
        </div>
    );
};


export const PostListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => <PostCardSkeleton key={i} />)}
    </div>
);


export const PostDetailSkeleton: React.FC = () => {
    if (typeof window !== 'undefined') ensureShimmerStyle();
    return (
        <div className="bg-surface-1 rounded-lg border-2 border-border p-6 sm:p-8 lg:p-12">
            <div className="h-10 w-3/4 skeleton-base rounded mb-6"></div>
            <div className="h-48 skeleton-base rounded-lg mb-8"></div>
            <div className="space-y-4">
                <div className="h-5 w-full skeleton-base rounded"></div>
                <div className="h-5 w-full skeleton-base rounded"></div>
                <div className="h-5 w-5/6 skeleton-base rounded"></div>
                <div className="h-5 w-full skeleton-base rounded mt-6"></div>
                <div className="h-5 w-4/6 skeleton-base rounded"></div>
            </div>
        </div>
    );
};

export const SummarySkeleton: React.FC = () => {
    if (typeof window !== 'undefined') ensureShimmerStyle();
    return (
        <div className="mt-6 p-4 bg-surface-2/70 border-l-4 border-accent rounded-r-lg">
            <div className="space-y-3">
                <div className="h-4 skeleton-base rounded w-full"></div>
                <div className="h-4 skeleton-base rounded w-5/6"></div>
                <div className="h-4 skeleton-base rounded w-3/4"></div>
            </div>
        </div>
    );
};