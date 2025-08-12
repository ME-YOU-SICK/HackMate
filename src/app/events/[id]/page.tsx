import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Share2, Users, Code, Calendar } from 'lucide-react';

const techStacks = ['React', 'Node.js', 'Python', 'GenAI', 'Firebase'];

const participants = [
  { name: 'Alex Turing', avatar: 'https://github.com/shadcn.png' },
  { name: 'Breanna Jensen', avatar: 'https://github.com/vercel.png' },
  { name: 'Casey Newton', avatar: 'https://github.com/nextjs.png' },
  { name: 'Devon Rex', avatar: '/placeholder.svg' },
  { name: 'Eliot Ness', avatar: '/placeholder.svg' },
  { name: 'Fiona Gallagher', avatar: '/placeholder.svg' },
  { name: 'George Costanza', avatar: '/placeholder.svg' },
  { name: 'Hank Hill', avatar: '/placeholder.svg' },
];

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50">
            <CardContent className="p-0">
              <img
                src="https://placehold.co/800x400.png"
                alt="Event"
                className="h-auto w-full object-cover"
                data-ai-hint="hackathon event banner"
              />
            </CardContent>
          </Card>
          <div className="mt-8">
            <h2 className="mb-4 font-sora text-3xl font-bold">About the Hackathon</h2>
            <p className="text-slate-300">
              Join us for a weekend of innovation, collaboration, and coding. Build amazing projects, learn new skills, and connect with fellow developers. This hackathon is focused on pushing the boundaries of what's possible with modern technology. Whether you're a seasoned pro or a first-time hacker, there's a place for you here. We'll have workshops, mentors, and plenty of coffee to keep you going.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="mb-4 font-sora text-2xl font-bold">Participants ({participants.length})</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {participants.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={p.avatar} alt={p.name} />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-sm font-medium">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside>
          <div className="sticky top-24">
            <Card className="border-slate-800 bg-slate-900/50 p-6">
              <h1 className="font-sora text-4xl font-bold">Hackathon 2024</h1>
              <p className="mt-2 text-slate-400">Hosted by AI Innovators</p>
              
              <div className="my-6 flex items-center space-x-2">
                <Button className="flex-1 bg-orange-500 text-white hover:bg-orange-600">Join Event</Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-slate-400" />
                  <span>
                    <span className="font-bold">{participants.length}</span> participants
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-slate-400" />
                  <span>Max team size: <span className="font-bold">4</span></span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-slate-400" />
                  <span>Starts: <span className="font-bold">October 26, 2024</span></span>
                </div>
                <div>
                  <div className="flex items-center">
                    <Code className="mr-3 h-5 w-5 text-slate-400" />
                    <span className="font-bold">Allowed Tech Stacks</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {techStacks.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
