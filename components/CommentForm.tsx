import React, { useState } from 'react';
import { Translations } from '../App';

interface CommentFormProps {
  onSubmit: (commentData: { author: string; content: string }) => Promise<void>;
  t: Translations;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, t }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      setError(t.formError);
      return;
    }
    setError('');
    setIsSubmitting(true);
    await onSubmit({ author, content });
    setAuthor('');
    setContent('');
    setIsSubmitting(false);
  };
  
  const inputClasses = "block w-full px-3 py-2 bg-surface-1 border-2 border-border rounded-md placeholder-text-muted focus:outline-none focus:ring-ring focus:ring-2 focus:border-accent sm:text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-surface-2 rounded-lg">
      <h4 className="text-lg font-semibold text-text-primary mb-4">{t.leaveComment}</h4>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-text-primary mb-1">
            {t.yourName}
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={inputClasses}
            placeholder={t.yourNamePlaceholder}
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1">
            {t.yourComment}
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={inputClasses}
            placeholder={t.yourCommentPlaceholder}
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border-2 border-text-primary text-sm font-bold rounded-md text-text-primary bg-surface-1 hover:bg-text-primary hover:text-surface-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-2 focus:ring-ring transition-all disabled:opacity-50"
          >
            {isSubmitting ? t.submitting : t.submitComment}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;