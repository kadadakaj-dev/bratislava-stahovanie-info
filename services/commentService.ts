import { Comment } from '../types';

const COMMENTS_STORAGE_KEY = 'blog-comments';

const getAllComments = (): Comment[] => {
    if (typeof window === 'undefined') return [];
    try {
        const commentsJson = localStorage.getItem(COMMENTS_STORAGE_KEY);
        return commentsJson ? JSON.parse(commentsJson) : [];
    } catch (error) {
        console.error('Error reading comments from localStorage', error);
        return [];
    }
};

const saveAllComments = (comments: Comment[]): void => {
     if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    } catch (error) {
        console.error('Error saving comments to localStorage', error);
    }
};

export const getCommentsByPostId = (postId: number): Promise<Comment[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const allComments = getAllComments();
            const postComments = allComments.filter(comment => comment.postId === postId);
            resolve(postComments);
        }, 500); // Simulate network delay
    });
};

type NewCommentData = Omit<Comment, 'id' | 'date'>;

export const addComment = (commentData: NewCommentData): Promise<Comment> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newComment: Comment = {
                ...commentData,
                id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
                date: new Date().toLocaleString(),
            };
            const allComments = getAllComments();
            saveAllComments([...allComments, newComment]);
            resolve(newComment);
        }, 500); // Simulate network delay
    });
};
