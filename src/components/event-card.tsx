import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, MessageCircle, Heart, Send } from 'lucide-react';

export default function EventCard() {
  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50">
      <CardHeader className="flex-row items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src="https://github.com/nextjs.png" alt="Event Host" />
          <AvatarFallback>EH</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-bold">Hackathon 2024</CardTitle>
          <p className="text-sm text-slate-400">Hosted by AI Innovators</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src="https://placehold.co/600x400.png"
          alt="Event"
          className="h-auto w-full object-cover"
          data-ai-hint="hackathon event"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        <p className="mt-2 text-sm font-semibold">1,234 likes</p>
        <p className="mt-2 text-sm">
          <span className="font-bold">Hackathon 2024</span> Join us for a weekend of innovation...{' '}
          <span className="cursor-pointer text-slate-400">more</span>
        </p>
        <p className="mt-2 cursor-pointer text-sm text-slate-400">View all 42 comments</p>
        <p className="mt-2 text-xs text-slate-500">2 DAYS AGO</p>
      </CardFooter>
    </Card>
  );
}
