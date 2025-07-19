"use client";

import Image from "next/image";
import Link from "next/link";
import { Post, User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { FollowButton } from "@/components/follow-button";
import { Button } from "@/components/ui/button";

const mockUser: User = {
    id: "2",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    avatar: "https://placehold.co/150x150/EEDD82/3B4252",
    bio: "Lover of coffee, code, and cats. Exploring the world one city at a time. 🚀"
};

const mockUserPosts: Partial<Post>[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `p${i + 1}`,
  imageUrl: `https://placehold.co/300x300?text=Post+${i+1}`,
  likes: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 50),
}));


export default function ProfilePage({ params }: { params: { username: string } }) {
    // In a real app, fetch user data based on params.username
    const user = mockUser;

    return (
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            <Card className="overflow-hidden">
                <div className="h-32 md:h-48 bg-muted" data-ai-hint="header background">
                     <Image src="https://placehold.co/1200x300" alt="Cover image" width={1200} height={300} className="w-full h-full object-cover"/>
                </div>
                <CardContent className="p-4 sm:p-6">
                    <div className="flex items-end -mt-16 sm:-mt-20 space-x-5">
                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex justify-between items-baseline">
                             <div className="pt-12">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-muted-foreground">@{user.username}</p>
                            </div>
                            <FollowButton />
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-foreground">{user.bio}</p>
                    </div>

                    <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
                        <div className="flex gap-1">
                            <span className="font-bold text-foreground">1.2K</span> Posts
                        </div>
                        <div className="flex gap-1">
                            <span className="font-bold text-foreground">5.8K</span> Followers
                        </div>
                         <div className="flex gap-1">
                            <span className="font-bold text-foreground">312</span> Following
                        </div>
                    </div>
                </CardContent>
            </Card>

             <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Posts</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockUserPosts.map(post => (
                        <Link href={`/post/${post.id}`} key={post.id}>
                            <Card className="overflow-hidden aspect-square group relative">
                                <Image
                                    src={post.imageUrl!}
                                    alt="Post"
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    data-ai-hint="gallery image"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                                    <div className="flex items-center gap-1 font-bold">
                                        <span>{post.likes}</span> ❤️
                                    </div>
                                     <div className="flex items-center gap-1 font-bold">
                                        <span>{post.comments}</span> 💬
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
