"use client";

import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

import { Notification, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    recipientId: '1',
    type: 'like',
    actor: { id: '2', name: 'Jane Doe', username: 'janedoe', avatar: 'https://placehold.co/100x100/EEDD82/3B4252' },
    post: { id: 'p1', content: 'Just enjoying a beautiful day...' },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'n2',
    recipientId: '1',
    type: 'follow',
    actor: { id: '3', name: 'John Smith', username: 'johnsmith', avatar: 'https://placehold.co/100x100/D8DEE9/3B4252' },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'n3',
    recipientId: '1',
    type: 'comment',
    actor: { id: '4', name: 'Emily White', username: 'emwhite', avatar: 'https://placehold.co/100x100/A3BE8C/3B4252' },
    post: { id: 'p1', content: 'Just enjoying a beautiful day...' },
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const notificationIcons = {
  like: <Heart className="h-5 w-5 text-red-500" />,
  comment: <MessageCircle className="h-5 w-5 text-blue-500" />,
  follow: <UserPlus className="h-5 w-5 text-green-500" />,
};

export default function NotificationsPage() {
    // In a real app, you'd mark notifications as read via a mutation.
    const markAllAsRead = () => {
        console.log("Marking all as read...");
    }
  
    return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </CardTitle>
          <Button variant="link" onClick={markAllAsRead}>Mark all as read</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start space-x-4 p-4 rounded-lg transition-colors',
                  notification.read ? 'bg-transparent' : 'bg-primary/5'
                )}
              >
                <div className="flex-shrink-0">{notificationIcons[notification.type]}</div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <Link href={`/profile/${notification.actor.username}`}>
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={notification.actor.avatar} />
                        <AvatarFallback>{notification.actor.name[0]}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <p className="text-sm text-foreground">
                      <Link href={`/profile/${notification.actor.username}`} className="font-bold hover:underline">
                        {notification.actor.name}
                      </Link>
                      {notification.type === 'like' && ' liked your post.'}
                      {notification.type === 'comment' && ' commented on your post.'}
                      {notification.type === 'follow' && ' started following you.'}
                    </p>
                  </div>
                  {notification.post && (
                    <Link href={`/post/${notification.post.id}`}>
                        <p className="mt-1 text-sm text-muted-foreground pl-10 border-l-2 ml-4 py-1 border-border/50">
                        "{notification.post.content.substring(0, 30)}..."
                        </p>
                    </Link>
                  )}
                  <p className="text-xs text-muted-foreground mt-2 pl-10">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                 {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary self-center"></div>
                )}
              </div>
            ))}
             {mockNotifications.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Bell className="mx-auto h-12 w-12" />
                    <p className="mt-4">You have no new notifications.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
