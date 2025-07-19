"use client";

import { useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";

import { Button } from "./ui/button";

export function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, you would call a mutation here
  };

  return (
    <Button
      variant={isFollowing ? "secondary" : "default"}
      onClick={handleFollow}
    >
      {isFollowing ? (
        <>
          <UserCheck className="mr-2 h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
}
