"use client";

import { PostCard } from "@/components/post-card";
import type { Post, Comment as CommentType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/components/comment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";

const mockPost: Post = {
    id: "1",
    author: {
      id: "2",
      name: "Jane Doe",
      username: "janedoe",
      avatar: "https://placehold.co/100x100/EEDD82/3B4252",
    },
    content: "Just enjoying a beautiful day out in the park! 🌳☀️",
    imageUrl: "https://placehold.co/600x400",
    videoUrl: null,
    likes: 125,
    comments: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
};

const mockComments: CommentType[] = [
    {
        id: 'c1',
        author: {
            id: "3",
            name: "John Smith",
            username: "johnsmith",
            avatar: "https://placehold.co/100x100/D8DEE9/3B4252",
        },
        text: 'Looks like a wonderful day! Where was this taken?',
        createdAt: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
        id: 'c2',
        author: {
            id: "4",
            name: "Emily White",
            username: "emwhite",
            avatar: "https://placehold.co/100x100/A3BE8C/3B4252",
        },
        text: 'So peaceful! I wish I was there.',
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
    }
];


export default function PostPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  // In a real app, you would fetch post and comments data based on params.id
  // const { data: post, isLoading: isLoadingPost } = useQuery(...)
  // const { data: comments, isLoading: isLoadingComments } = useQuery(...)

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
        <PostCard post={mockPost} />

        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            {user && (
                 <div className="flex items-start space-x-4 mb-6">
                    <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                        <Textarea placeholder="Add a comment..." className="pr-12" />
                        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
           

            <div className="space-y-6">
                {mockComments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>
        </div>
    </div>
  );
}
