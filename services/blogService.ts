import { Post } from '../types';

// 2025-10-18: Blog URLs refactored, slug helpers added for routing and redirects
// --- Blog slug helpers for routing/redirects (2025-10-18) ---
// Use only in frontend for routing, or server-side for sitemap/redirects
export function getAllBlogSlugs(): string[] {
  const slugs: string[] = [
    'kontrolny-zoznam-stahovanie',
    'kolko-stoji-stahovanie-bratislava',
    'ako-naplanovat-stahovanie',
    'problem-so-starym-nabytkom',
    'ako-vybrat-stahovaciu-firmu',
    'stahovanie-studentov',
    'stahovanie-seniorov',
    'ako-usetrit-pri-stahovani',
    'odvoz-odpadu-po-stahovani',
    'ako-zvladnut-stahovanie-firmy',
    'stahovanie-v-ruzine',
    'ako-zabranit-poskodeniu-nabytku',
    'stahovanie-do-noveho-mesta',
    'ako-pripravit-deti-na-stahovanie',
    // ...pridať ďalšie podľa obsahu blogu
  ];
  return slugs;
}

export function getSlugFromOldId(idStr: string): string | null {
  const idToSlug: Record<string, string> = {
    '02': 'kontrolny-zoznam-stahovanie',
    '03': 'kolko-stoji-stahovanie-bratislava',
    '04': 'ako-naplanovat-stahovanie',
    '05': 'problem-so-starym-nabytkom',
    '06': 'ako-vybrat-stahovaciu-firmu',
    '07': 'stahovanie-studentov',
    '08': 'stahovanie-seniorov',
    '09': 'ako-usetrit-pri-stahovani',
    '10': 'odvoz-odpadu-po-stahovani',
    '11': 'ako-zvladnut-stahovanie-firmy',
    '12': 'stahovanie-v-ruzine',
    '13': 'ako-zabranit-poskodeniu-nabytku',
    '14': 'stahovanie-do-noveho-mesta',
    '15': 'ako-pripravit-deti-na-stahovanie',
  };
  return idToSlug[idStr] ?? null;
}

function isPostArray(data: unknown): data is Post[] {
  if (!Array.isArray(data)) return false;
  return data.every((item: unknown): boolean => {
    if (typeof item !== 'object' || item === null) return false;
    const obj = item as Record<string, unknown>;
    return 'id' in obj && typeof obj.id === 'number' &&
           'title' in obj && typeof obj.title === 'string' &&
           'excerpt' in obj && typeof obj.excerpt === 'string' &&
           'content' in obj && typeof obj.content === 'string' &&
           'imageUrl' in obj && typeof obj.imageUrl === 'string' &&
           'imageAlt' in obj && typeof obj.imageAlt === 'string' &&
           'author' in obj && typeof obj.author === 'string' &&
           'date' in obj && typeof obj.date === 'string' &&
           'datePublished' in obj && typeof obj.datePublished === 'string' &&
           'tags' in obj && Array.isArray(obj.tags) && obj.tags.every((tag: unknown): boolean => typeof tag === 'string');
  });
}

const mockPosts: Post[] = [];

const BLOG_CACHE_KEY: string = 'blogPosts';

export function getPosts(): Promise<Post[]> {
  // Check localStorage for cached posts
  const cachedPosts: string | null = localStorage.getItem(BLOG_CACHE_KEY);
  if (cachedPosts !== null) {
    try {
      const parsed: unknown = JSON.parse(cachedPosts);
      if (isPostArray(parsed)) {
        return Promise.resolve(parsed);
      } else {
        console.error('Invalid cached blog posts data');
      }
    } catch (error: unknown) {
      console.error('Failed to parse cached blog posts:', error);
    }
  }

  // Fallback to loading from markdown files (mock implementation for now)
  const posts: Post[] = mockPosts; // Replace with actual markdown loading logic

  // Cache the posts in localStorage
  try {
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(posts));
  } catch (error: unknown) {
    console.error('Failed to cache blog posts:', error);
  }

  return Promise.resolve(posts);
}

export function getPostById(id: number): Promise<Post | undefined> {
  return getPosts().then((posts: Post[]): Post | undefined => {
    return posts.find((post: Post): boolean => post.id === id) ?? undefined;
  });
}
