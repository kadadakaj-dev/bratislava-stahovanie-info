import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { getPosts } from '../services/blogService';
import PostCard from './PostCard';
import { PostListSkeleton } from './SkeletonLoader';
import { Translations } from '../App';

interface PostListProps {
  t: Translations;
}

const PostList: React.FC<PostListProps> = ({ t }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <PostListSkeleton />;
  }

  return (
    <div className="container grid gap-8 grid-cols-1 @834px:grid-cols-2 @1440px:grid-cols-3">
      {posts.map((post, index) => (
        <div key={post.slug} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <PostCard post={post} t={t} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
