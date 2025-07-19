"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { PostCard } from "@/components/post-card";
import { CreatePostForm } from "@/components/create-post-form";
import type { Post } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const mockPosts: Post[] = [
  {
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
    comments: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: "2",
    author: {
      id: "3",
      name: "John Smith",
      username: "johnsmith",
      avatar: "https://placehold.co/100x100/D8DEE9/3B4252",
    },
    content: "Check out this cool project I've been working on. #coding #development",
    imageUrl: "https://placehold.co/600x400",
    videoUrl: null,
    likes: 342,
    comments: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
    {
    id: "3",
    author: {
      id: "4",
      name: "Emily White",
      username: "emwhite",
      avatar: "https://placehold.co/100x100/A3BE8C/3B4252",
    },
    content: "My new puppy is the cutest! Look at that face! ❤️🐶",
    imageUrl: "https://placehold.co/600x400",
    videoUrl: null,
    likes: 891,
    comments: 102,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];


export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto max-w-2xl p-4 space-y-8">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Home Feed
        </h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </header>

      <div className="space-y-8">
        <CreatePostForm userAvatar={user.avatar} />

        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
