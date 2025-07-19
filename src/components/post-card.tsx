"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, MoreHorizontal } from "lucide-react";

import type { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LikeButton } from "./like-button";
import { Button } from "./ui/button";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  const authorInitial = post.author.name?.charAt(0).toUpperCase() || "?";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Link href={`/profile/${post.author.username}`}>
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={`@${post.author.username}`} />
            <AvatarFallback>{authorInitial}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
            <Link href={`/profile/${post.author.username}`} className="font-semibold hover:underline">{post.author.name}</Link>
            <p className="text-xs text-muted-foreground">
                <Link href={`/profile/${post.author.username}`}>@{post.author.username}</Link>
                <span className="mx-1">·</span> 
                <Link href={`/post/${post.id}`} className="hover:underline">{timeAgo}</Link>
            </p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="px-4 pb-2">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      
      {post.imageUrl && (
        <div className="relative w-full bg-card">
            <Link href={`/post/${post.id}`}>
                <Image
                    src={post.imageUrl}
                    alt="Post image"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint="social media post"
                />
            </Link>
        </div>
      )}

      <CardFooter className="p-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <LikeButton initialLikes={post.likes} />
          <Link href={`/post/${post.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
