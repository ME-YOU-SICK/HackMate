import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, Share2 } from 'lucide-react';

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
      <CardFooter className="flex-col items-start p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-2">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">Join Event</Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-4 text-sm">
          <span className="font-bold">Hackathon 2024:</span> Join us for a weekend of innovation, collaboration, and coding. Build amazing projects, learn new skills, and connect with fellow developers.
        </p>
        <p className="mt-2 text-xs text-slate-500">2 DAYS AGO</p>
      </CardFooter>
    </Card>
  );
}
