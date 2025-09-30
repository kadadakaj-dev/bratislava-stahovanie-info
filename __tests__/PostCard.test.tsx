import { render, screen } from '@testing-library/react';
import PostCard from '../components/PostCard';

const mockPost = {
  id: 1,
  title: 'Test Title',
  excerpt: 'Short excerpt',
  content: '<p>Full content</p>',
  imageUrl: 'test.jpg',
  imageAlt: 'Alt',
  tags: ['tag1', 'tag2']
};

const t: any = {
  readMore: 'Čítať viac',
  readMoreAria: (title: string) => `Zobraziť detail príspevku ${title}`
};

describe('PostCard', () => {
  it('renders title and excerpt', () => {
    render(<PostCard post={mockPost as any} t={t} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Short excerpt')).toBeInTheDocument();
  });
});
