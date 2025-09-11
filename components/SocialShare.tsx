import React from 'react';
import { Post } from '../types';
import { TwitterIcon, LinkedInIcon, FacebookIcon } from '../constants';
import { Translations } from '../App';

interface SocialShareProps {
  post: Post;
  t: Translations;
}

const SocialShare: React.FC<SocialShareProps> = ({ post, t }) => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const encodedExcerpt = encodeURIComponent(post.excerpt);

  const socialLinks = [
    {
      name: 'Twitter',
      Icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      colorClass: 'hover:text-primary',
    },
    {
      name: 'LinkedIn',
      Icon: LinkedInIcon,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
      colorClass: 'hover:text-primary',
    },
    {
      name: 'Facebook',
      Icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      colorClass: 'hover:text-primary',
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        {t.sharePost}
      </h3>
      <div className="flex items-center gap-4">
        {socialLinks.map(({ name, Icon, url, colorClass }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.shareOn(name)}
            className={`text-text-muted transition-colors duration-200 ${colorClass}`}
          >
            <Icon className="w-7 h-7" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;