import React from 'react';

const PostCardSkeleton: React.FC = () => (
  <div className="bg-surface-1 rounded-lg border-2 border-border p-1 animate-pulse">
    <div className="h-48 bg-surface-2 rounded-t-md"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-surface-2 rounded mb-4"></div>
      <div className="h-4 w-full bg-surface-2 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-surface-2 rounded"></div>
    </div>
  </div>
);


export const PostListSkeleton: React.FC = () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
    </div>
);


export const PostDetailSkeleton: React.FC = () => (
    <div className="bg-surface-1 rounded-lg border-2 border-border p-6 sm:p-8 lg:p-12 animate-pulse">
        <div className="h-10 w-3/4 bg-surface-2 rounded mb-6"></div>
        <div className="h-48 bg-surface-2 rounded-lg mb-8"></div>
        <div className="space-y-4">
            <div className="h-5 w-full bg-surface-2 rounded"></div>
            <div className="h-5 w-full bg-surface-2 rounded"></div>
            <div className="h-5 w-5/6 bg-surface-2 rounded"></div>
            <div className="h-5 w-full bg-surface-2 rounded mt-6"></div>
            <div className="h-5 w-4/6 bg-surface-2 rounded"></div>
        </div>
    </div>
);

export const SummarySkeleton: React.FC = () => (
    <div className="mt-6 p-4 bg-surface-2 border-l-4 border-accent rounded-r-lg animate-pulse">
        <div className="space-y-3">
            <div className="h-4 bg-border rounded w-full"></div>
            <div className="h-4 bg-border rounded w-5/6"></div>
            <div className="h-4 bg-border rounded w-3/4"></div>
        </div>
    </div>
);