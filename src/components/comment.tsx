"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { Comment as CommentType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentProps {
    comment: CommentType
}

export function Comment({ comment }: CommentProps) {
    const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
    });
    const authorInitial = comment.author.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="flex items-start space-x-4">
            <Link href={`/profile/${comment.author.username}`}>
                <Avatar>
                    <AvatarImage src={comment.author.avatar} alt={`@${comment.author.username}`} />
                    <AvatarFallback>{authorInitial}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex-1">
                <div className="bg-muted rounded-lg p-3">
                     <div className="flex items-baseline gap-2">
                        <Link href={`/profile/${comment.author.username}`} className="font-semibold text-sm hover:underline">{comment.author.name}</Link>
                        <p className="text-xs text-muted-foreground">
                            @{comment.author.username}
                        </p>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                </div>
                 <p className="text-xs text-muted-foreground mt-1 pl-1">{timeAgo}</p>
            </div>
        </div>
    )
}
