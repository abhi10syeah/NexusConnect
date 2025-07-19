"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, User as UserIcon, LogIn } from "lucide-react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "./theme-toggle";

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = user ? [
    { href: "/", label: "Home", icon: Home },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: `/profile/${user.username}`, label: "Profile", icon: UserIcon },
  ] : [
     { href: "/auth/login", label: "Login", icon: LogIn },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    <path d="M2 9.27l5 4.87-1.18 6.88L12 17.77l6.18 3.25L17 14.14l5-4.87-6.91-1.01L12 2z"></path>
                </svg>
                <span>NexusConnect</span>
            </Link>
          </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <ThemeToggle />
        </SidebarGroup>
    </>
  );
}
