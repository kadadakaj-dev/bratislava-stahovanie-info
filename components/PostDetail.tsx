import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Post, Comment } from '../types';
import { getPostById } from '../services/blogService';
import { getCommentsByPostId, addComment } from '../services/commentService';
import { summarizePost } from '../services/geminiService';
import { PostDetailSkeleton, SummarySkeleton } from './SkeletonLoader';
import { ArrowLeftIcon, SparklesIcon } from '../constants';
import SocialShare from './SocialShare';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Translations } from '../App';
import { analyticsService } from '../services/analyticsService';

interface PostDetailProps {
  postId: number;
  onBack: () => void;
  t: Translations;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBack, t }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      const [fetchedPost, fetchedComments] = await Promise.all([
        getPostById(postId),
        getCommentsByPostId(postId),
      ]);
      setPost(fetchedPost || null);
      setComments(fetchedComments);
      setLoading(false);
      setSummary(''); // Reset summary on new post
    };
    fetchPostAndComments();
  }, [postId]);

  const handleSummarize = useCallback(async () => {
    if (!post) return;
    
    analyticsService.trackEvent('click_summarize', { post_id: post.id, post_title: post.title });

    setIsSummarizing(true);
    setSummary(''); // Clear previous summary
    const generatedSummary = await summarizePost(post);
    if (generatedSummary.startsWith("The AI summarization feature")) {
       setSummary(t.summaryUnavailable);
    } else if (generatedSummary.startsWith("Sorry, I couldn't")) {
        setSummary(t.summaryError);
    }
    else {
        setSummary(generatedSummary);
    }
    setIsSummarizing(false);
  }, [post, t]);

  const handleCommentSubmit = useCallback(async (commentData: { author: string; content: string }) => {
    const newComment = await addComment({ ...commentData, postId });
    setComments(prevComments => [...prevComments, newComment]);
  }, [postId]);

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return <div className="text-center text-text-muted">{t.postNotFound}</div>;
  }

  return (
    <article className="bg-surface-1 rounded-lg border-2 border-text-primary" aria-labelledby="post-title">
      <header className="p-4 sm:p-6 lg:p-8">
        <button 
          onClick={onBack} 
          className="mb-6 inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          {t.backToPosts}
        </button>

        <h1 id="post-title" className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-sm text-text-muted mb-6">
          <span>{t.authorBy} {post.author}</span>
          <span>&bull;</span>
          <span>{t.publishedOn} {post.date}</span>
        </div>
      </header>
      
      <div className="duotone-wrapper">
        <img className="w-full h-64 md:h-96 object-cover" src={post.imageUrl} alt="" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8" ref={contentRef}>
        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="mt-12 pt-8 border-t border-border space-y-10">
            <SocialShare post={post} t={t} />

            <section aria-labelledby="ai-summary-heading">
                <h3 id="ai-summary-heading" className="text-2xl font-bold text-text-primary mb-4">{t.aiSummary}</h3>
                <button
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-surface-1 font-bold rounded-md shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-0.5"
                >
                    <SparklesIcon className={`w-5 h-5 ${isSummarizing ? 'animate-spin' : ''}`} />
                    {isSummarizing ? t.generating : t.summarizeGemini}
                </button>

                {isSummarizing && <SummarySkeleton />}
                
                {!isSummarizing && summary && (
                     <div className="mt-6 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg" role="status">
                        <p className="text-text-primary">{summary}</p>
                     </div>
                )}
            </section>

            <div className="pt-8 border-t border-border">
              <h3 className="text-2xl font-bold text-text-primary mb-6" id="comments-heading">{t.comments}</h3>
              <CommentList comments={comments} t={t} />
              <CommentForm onSubmit={handleCommentSubmit} t={t} />
            </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;