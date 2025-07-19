"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface LikeButtonProps {
  initialLikes: number;
  initialLiked?: boolean;
}

export function LikeButton({
  initialLikes,
  initialLiked = false,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleClick = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={handleClick} className="group">
        <Heart
          className={cn(
            "h-5 w-5 transition-all duration-300 group-hover:fill-red-500 group-hover:stroke-red-500",
            liked ? "fill-red-500 stroke-red-500" : "text-muted-foreground"
          )}
        />
      </Button>
      <span className="text-sm font-medium text-muted-foreground">{likes}</span>
    </div>
  );
}
