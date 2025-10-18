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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} t={t} />
      ))}
    </div>
  );
};

export default PostList;
