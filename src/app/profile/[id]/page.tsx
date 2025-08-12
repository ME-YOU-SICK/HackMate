
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Twitter, Linkedin, Link as LinkIcon, Trophy, Code, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// This is a simplified static page. In a real application,
// you would fetch the user's data based on the `params.id`.
const userProfile = {
  name: 'Alex Turing',
  handle: 'alexturing',
  avatar: 'https://github.com/shadcn.png',
  bio: 'Full-stack developer with a passion for AI and open-source. Turning coffee into code since 2018.',
  connections: 128,
  skills: ['React', 'Node.js', 'Python', 'GenAI', 'Firebase', 'Next.js', 'TypeScript'],
  socials: {
    github: 'https://github.com/alexturing',
    twitter: 'https://twitter.com/alexturing',
    linkedin: 'https://linkedin.com/in/alexturing',
  },
  pastProjects: [
    {
      title: 'AI-Powered Code Assistant',
      description: 'An intelligent code completion tool that learns from your coding style.',
      link: '#',
    },
    {
      title: 'Decentralized Social Network',
      description: 'A social media platform built on blockchain technology.',
      link: '#',
    },
  ],
  pastHackathons: [
    {
      name: 'AI Hackathon 2023',
      award: '1st Place Winner',
      team: ['Breanna Jensen', 'Casey Newton'],
    },
    {
      name: 'Web3 Conclave 2022',
      award: 'Best DeFi Project',
      team: ['Devon Rex'],
    },
  ],
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>('none');

  const handleConnect = () => {
    if (connectionStatus === 'none') {
      setConnectionStatus('pending');
      // In a real app, you'd send a connection request here.
      // To simulate acceptance for this demo, we can set it to 'connected' after a delay.
      // setTimeout(() => setConnectionStatus('connected'), 2000);
    }
  };

  const getButtonText = () => {
    switch (connectionStatus) {
      case 'none':
        return 'Connect';
      case 'pending':
        return 'Request Sent';
      case 'connected':
        return 'Connected';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Left Sidebar - Profile Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <Avatar className="mx-auto mb-4 h-32 w-32 border-4 border-orange-500">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="font-sora text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground">@{userProfile.handle}</p>
                <div className="my-4 flex justify-center space-x-4">
                  <Link href={userProfile.socials.github} target="_blank">
                    <Github className="h-6 w-6 text-muted-foreground hover:text-white" />
                  </Link>
                  <Link href={userProfile.socials.twitter} target="_blank">
                    <Twitter className="h-6 w-6 text-muted-foreground hover:text-white" />
                  </Link>
                  <Link href={userProfile.socials.linkedin} target="_blank">
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-white" />
                  </Link>
                </div>
                <Button
                  className={cn(
                    'w-full text-white',
                    connectionStatus === 'none' && 'warm-gradient',
                    connectionStatus !== 'none' && 'bg-secondary'
                  )}
                  onClick={handleConnect}
                  disabled={connectionStatus === 'pending' || connectionStatus === 'connected'}
                >
                  {getButtonText()}
                </Button>
                <div className="mt-4 text-left">
                  <p className="text-sm font-bold">Connections</p>
                  <p className="text-orange-500">{connectionStatus === 'connected' ? userProfile.connections + 1 : userProfile.connections}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="bg-card p-6">
            <h2 className="font-sora text-2xl font-bold">About Me</h2>
            <p className="mt-2 text-muted-foreground">{userProfile.bio}</p>

            <div className="mt-6">
              <h3 className="mb-3 font-sora text-xl font-bold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="projects">Past Projects</TabsTrigger>
                <TabsTrigger value="hackathons">Past Hackathons</TabsTrigger>
              </TabsList>
              <TabsContent value="projects" className="mt-6">
                <div className="space-y-6">
                  {userProfile.pastProjects.map((project) => (
                    <Card key={project.title} className="bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between font-sora text-xl">
                          {project.title}
                          <Link href={project.link} target="_blank">
                            <LinkIcon className="h-5 w-5 text-muted-foreground hover:text-white" />
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{project.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hackathons" className="mt-6">
                <div className="space-y-6">
                  {userProfile.pastHackathons.map((hackathon) => (
                    <Card key={hackathon.name} className="bg-card">
                       <CardHeader>
                        <CardTitle className="font-sora text-xl">{hackathon.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3 flex items-center text-yellow-400">
                          <Trophy className="mr-2 h-5 w-5" />
                          <span className="font-semibold">{hackathon.award}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                           <Users className="mr-2 h-5 w-5" />
                           <span className="font-semibold">Team: {hackathon.team.join(', ')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
