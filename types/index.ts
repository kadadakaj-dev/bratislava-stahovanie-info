export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  datePublished: string; // ISO 8601 format for schema.org
  tags: string[];
}

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export interface Comment {
  id: string;
  postId: number;
  author: string;
  content: string;
  date: string;
}

export interface QuoteFormData {
  id?: string; // Used for offline queue
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  fromFloor: string;
  toFloor: string;
  fromElevator: boolean;
  toElevator: boolean;
  moveDate: string;
  extraServices: {
    [key: string]: boolean;
    packing: boolean;
    bubbleWrap: boolean;
    assembly: boolean;
    disposal: boolean;
  };
  notes: string;
  gdpr: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}