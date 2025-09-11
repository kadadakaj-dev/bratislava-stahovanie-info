import React from 'react';
import { Comment } from '../types';
import { Translations } from '../App';

interface CommentListProps {
  comments: Comment[];
  t: Translations;
}

const CommentList: React.FC<CommentListProps> = ({ comments, t }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 px-4 border-2 border-dashed border-border rounded-lg">
        <p className="text-text-muted">{t.noComments}</p>
        <p className="text-text-muted">{t.beFirstComment}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="p-4 bg-surface-2 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-text-primary">{comment.author}</p>
            <p className="text-xs text-text-muted">{comment.date}</p>
          </div>
          <p className="text-text-muted whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;