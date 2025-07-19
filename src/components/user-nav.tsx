"use client";

import Link from "next/link";
import { CreditCard, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { SidebarFooter } from "./ui/sidebar";

export function UserNav() {
  const { user, logout, loading } = useAuth();

  if (loading) {
      return (
          <SidebarFooter>
              <div className="flex items-center space-x-4 p-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-3 w-[120px]" />
                </div>
            </div>
          </SidebarFooter>
      )
  }

  if (!user) {
    return null;
  }

  const userInitial = user.name?.charAt(0).toUpperCase() || "?";

  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-auto w-full justify-start gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={`@${user.username}`} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className="text-left">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/profile/${user.username}`}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
