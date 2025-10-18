import { Post } from '../types';

// 2025-10-18: Blog URLs refactored, slug helpers added for routing and redirects
// --- Blog slug helpers for routing/redirects (2025-10-18) ---
// Use only in frontend for routing, or server-side for sitemap/redirects
export function getAllBlogSlugs(): string[] {
  return [
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
  return idToSlug[idStr] || null;
}

const mockPosts: Post[] = [
];

/**
 * Fetches all blog posts.
 * @returns A promise that resolves to an array of posts.
 */
export const getPosts = (): Promise<Post[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPosts);
    }, 500); // Simulate network delay
  });
};

/**
 * Fetches a single blog post by its ID.
 * @param id The ID of the post to fetch.
 * @returns A promise that resolves to the post or undefined if not found.
 */
export const getPostById = (id: number): Promise<Post | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockPosts.find(post => post.id === id));
      }, 300); // Simulate network delay
    });
};
