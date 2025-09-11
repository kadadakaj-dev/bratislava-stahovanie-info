import React from 'react';
import { Post } from '../types';
import { ArrowRightIcon } from '../constants';
import { Translations } from '../App';

interface PostCardProps {
  post: Post;
  onSelectPost: (id: number) => void;
  t: Translations;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelectPost, t }) => {
  return (
    <article 
      className="bg-surface-1 rounded-lg border-2 border-text-primary overflow-hidden transition-all duration-300 group hover:shadow-warhol flex flex-col"
      aria-labelledby={`post-title-${post.id}`}
    >
        <div className="duotone-wrapper">
             <img 
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" 
                src={post.imageUrl} 
                alt="" // Alt text is provided by the heading
                onClick={() => onSelectPost(post.id)}
                loading="lazy"
                decoding="async"
            />
        </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
                <span key={tag} className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
        <h3 
            id={`post-title-${post.id}`}
            className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors"
        >
          <button 
             onClick={() => onSelectPost(post.id)}
             className="text-left"
          >
            <span className="absolute inset-0" aria-hidden="true"></span>
            {post.title}
          </button>
        </h3>
        <p className="text-text-muted text-base flex-grow">
          {post.excerpt}
        </p>
         <div className="mt-4 pt-4 border-t border-border relative z-10">
          <div
            className="inline-flex items-center font-bold text-accent group-hover:text-text-primary transition-colors"
            aria-hidden="true" // The whole card is clickable
          >
            {t.readMore}
            <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PostCard);