"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Activity = {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

const activities: Activity[] = [
  {
    id: "1",
    type: "login",
    message: "Logged in from new device",
    timestamp: "2 minutes ago",
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
    }
  },
  {
    id: "2",
    type: "subscription",
    message: "Upgraded to Pro plan",
    timestamp: "1 hour ago",
    user: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "3",
    type: "api",
    message: "API usage increased by 30%",
    timestamp: "3 hours ago"
  },
  {
    id: "4",
    type: "payment",
    message: "Monthly payment processed successfully",
    timestamp: "1 day ago",
    user: {
      name: "Michael Davis",
      email: "michael@example.com",
      avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "5",
    type: "system",
    message: "System maintenance completed",
    timestamp: "2 days ago"
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-md border p-4">
          {activity.user ? (
            <Avatar>
              <AvatarImage src={activity.user.avatarUrl} />
              <AvatarFallback>
                {activity.user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="rounded-full bg-muted p-2">
              <div className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.message}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}