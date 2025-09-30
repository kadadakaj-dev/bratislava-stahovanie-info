import React, { useMemo } from 'react';
import { Post } from '../types';
import { ArrowRightIcon } from '../constants';
import { Translations } from '../App';
import { generateResponsiveImage } from '../utils/image';

// NOTE: This component refactor improves:
// - Accessibility: clearer heading association, explicit aria-label on action, focus styles
// - Performance: uses decoding="async", sets width/height for CLS stability, aspect ratio wrapper
// - UX: larger tap target, subtle hover transform guarded by prefers-reduced-motion
// - Semantics: article + header/footer regions for better screen reader landmarks

interface PostCardProps {
  post: Post;
  t: Translations;
}

const PostCard: React.FC<PostCardProps> = ({ post, t }) => {
  const readMoreLabel = useMemo(() => t.readMoreAria(post.title), [t, post.title]);

  return (
    <article
      className="relative isolate bg-surface-1 rounded-lg border-2 border-text-primary overflow-hidden transition-shadow duration-300 group focus-within:shadow-warhol hover:shadow-warhol flex flex-col"
      aria-labelledby={`post-title-${post.id}`}
    >
      {/* Clickable overlay link kept first for early focus in DOM */}
      <a
        href={`#blog/${post.id}`}
        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
        aria-label={readMoreLabel}
      >
        <span className="sr-only">{readMoreLabel}</span>
      </a>

      <header className="block">
        <div className="duotone-wrapper aspect-[5/2] w-full overflow-hidden">
          {(() => {
            const responsive = generateResponsiveImage({
              url: post.imageUrl,
              widths: [320, 480, 640, 768, 960],
              sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
              loading: 'lazy',
              fetchPriority: 'low'
            });
            return (
              <picture>
                {responsive.pictureSources.map(s => (
                  <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={responsive.img.sizes} />
                ))}
                <img
                  className="w-full h-full object-cover will-change-transform motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                  src={responsive.img.src}
                  srcSet={responsive.img.srcSet}
                  sizes={responsive.img.sizes}
                  width={responsive.img.width}
                  height={responsive.img.height}
                  alt={post.imageAlt}
                  loading={responsive.img.loading}
                  decoding={responsive.img.decoding}
                  fetchPriority={responsive.img.fetchPriority}
                />
              </picture>
            );
          })()}
        </div>
      </header>

      <div className="p-6 flex flex-col flex-grow">
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-3" aria-label={t.tagsLabel}>
            {post.tags.map(tag => (
              <li key={tag} className="text-xs font-medium tracking-wide text-accent bg-accent/10 px-2 py-1 rounded-full">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <h3
          id={`post-title-${post.id}`}
          className="text-balance text-xl font-bold leading-snug text-text-primary mb-2 motion-safe:transition-colors group-hover:text-accent"
        >
          {post.title}
        </h3>
        <p className="text-text-muted text-base flex-grow line-clamp-4">
          {post.excerpt}
        </p>
        <footer className="mt-4 pt-4 border-t border-border relative z-20">
          <span
            className="inline-flex items-center font-semibold text-accent motion-safe:transition-colors group-hover:text-text-primary select-none"
            aria-hidden="true"
          >
            {t.readMore}
            <ArrowRightIcon className="ml-2 w-4 h-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1" />
          </span>
        </footer>
      </div>
    </article>
  );
};

export default React.memo(PostCard);
