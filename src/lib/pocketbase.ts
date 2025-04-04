
import axios from 'axios';
import { BlogPost } from '@/data/posts';

// PocketBase configuration
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
const POCKETBASE_API_TOKEN = import.meta.env.VITE_POCKETBASE_API_TOKEN || '';

// Define the PocketBase response type
export interface PocketBaseResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

// Define the PocketBase Post schema that matches our collection
export interface PocketBasePost {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  time: string;
  createdAt: string;
  authorName: string;
  featured: boolean;
  featuredSize: "large" | "medium" | "small" | null;
  slug: string;
  readTime: string;
  title: string;
}

// Create a configured axios instance for PocketBase
const pocketBaseClient = axios.create({
  baseURL: POCKETBASE_URL,
  headers: POCKETBASE_API_TOKEN ? {
    'Authorization': `Bearer ${POCKETBASE_API_TOKEN}`
  } : {}
});

// Function to fetch all blog posts from PocketBase
export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await pocketBaseClient.get<PocketBaseResponse<PocketBasePost>>(
      '/api/collections/posts/records',
      {
        params: {
          sort: '-createdAt',
          expand: '',
          perPage: 500  // Adjust based on your expected post volume
        }
      }
    );

    // Map PocketBase format to our BlogPost format
    return response.data.items.map(item => mapToBlogPost(item));
  } catch (error) {
    console.error('Error fetching posts from PocketBase:', error);
    // Fall back to localStorage cache if available
    const cachedData = localStorage.getItem('blog-posts-cache');
    if (cachedData) {
      try {
        const { posts } = JSON.parse(cachedData);
        if (Array.isArray(posts) && posts.length > 0) {
          console.info('Using cached posts due to PocketBase fetch error');
          return posts;
        }
      } catch (e) {
        // Continue with error handling
      }
    }
    throw error;
  }
}

// Helper function to map PocketBase post to BlogPost format
export function mapToBlogPost(pbPost: PocketBasePost): BlogPost {
  // Handle PocketBase image URL format
  const imageUrl = pbPost.image ? 
    (pbPost.image.startsWith('http') ? 
      pbPost.image : 
      `${POCKETBASE_URL}/api/files/${pbPost.collectionName}/${pbPost.id}/${pbPost.image}`) : 
    '';

  return {
    id: Number(pbPost.id) || Math.floor(Math.random() * 10000), // Ensure numeric ID
    slug: pbPost.slug,
    title: pbPost.title,
    category: pbPost.category,
    excerpt: pbPost.excerpt,
    content: pbPost.content,
    image: imageUrl,
    createdAt: pbPost.createdAt,
    authorName: pbPost.authorName || '',
    readTime: pbPost.readTime || pbPost.time || '5 min',
    time: pbPost.time || '',
    featured: pbPost.featured,
    featuredSize: pbPost.featuredSize || undefined
  };
}
