
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-none">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="overflow-hidden h-64 md:h-full rounded-lg">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <CardContent className="p-4 flex flex-col justify-center">
            <Badge className="w-fit mb-3">{post.category}</Badge>
            <Link to={`/post/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 hover:text-blue-600 transition duration-200">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{post.author.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                {post.date} · {post.readTime} read
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-none">
      <div className="overflow-hidden h-48 rounded-lg">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <Badge className="w-fit mb-3">{post.category}</Badge>
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-xl font-serif font-bold mb-2 hover:text-blue-600 transition duration-200">{post.title}</h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>
          <div className="text-xs text-gray-500">
            {post.date} · {post.readTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
