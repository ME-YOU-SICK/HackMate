
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import EventCard from '@/components/event-card';
import PopularFeed from '@/components/popular-feed';

export default function DashboardPage() {
  const [feedType, setFeedType] = useState('events');

  const suggestedUsers = [
    {
      name: 'Alex Turing',
      handle: 'alexturing',
      avatar: 'https://github.com/shadcn.png',
    },
    {
      name: 'Breanna Jensen',
      handle: 'breannajensen',
      avatar: 'https://github.com/vercel.png',
    },
    {
      name: 'Casey Newton',
      handle: 'caseynewton',
      avatar: 'https://github.com/nextjs.png',
    },
    { name: 'Devon Rex', handle: 'devonrex', avatar: '/placeholder.svg' },
    {
      name: 'Eliot Ness',
      handle: 'eliotness',
      avatar: '/placeholder.svg',
    },
  ];

  return (
    <div className="container mx-auto grid grid-cols-1 gap-12 py-10 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="mb-6 flex items-center justify-between">
          <ToggleGroup
            type="single"
            defaultValue="events"
            className="justify-start"
            onValueChange={(value) => {
              if (value) setFeedType(value);
            }}
          >
            <ToggleGroupItem value="events" aria-label="Toggle events">
              Events
            </ToggleGroupItem>
            <ToggleGroupItem value="popular" aria-label="Toggle popular">
              Popular
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {feedType === 'events' ? (
          <div className="space-y-6">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        ) : (
          <PopularFeed />
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="p-4">
              <h3 className="mb-4 text-sm font-semibold text-slate-400">Suggested for you</h3>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.handle} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-xs text-slate-400">@{user.handle}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sm text-blue-400">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
