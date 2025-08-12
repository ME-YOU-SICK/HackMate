
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, DoorOpen, MapPin, Trophy, Users, Share2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, you would fetch this based on the `params.id`
const allEvents = [
    { 
        id: "ai-global-hackathon-2024", 
        name: "AI Global Hackathon 2024", 
        date: "October 26-27, 2024", 
        participants: 1500, 
        description: "Join developers, innovators, and creators from around the world in a 48-hour marathon to solve real-world problems using the power of Artificial Intelligence. This is more than a competition; it's a chance to learn, network, and build the future.", 
        image: "https://placehold.co/1200x400.png",
        location: "Virtual / San Francisco, CA",
        status: "Upcoming"
    },
    { 
        id: "future-of-web3-summit", 
        name: "Future of Web3 Summit", 
        date: "November 12, 2024", 
        participants: 800, 
        description: "A premier summit for blockchain enthusiasts, developers, and investors to explore the evolving landscape of decentralized applications, DeFi, and the metaverse.", 
        image: "https://placehold.co/1200x400.png",
        location: "Virtual",
        status: "Upcoming"
    },
     { 
        id: "innovate-create-hack-day", 
        name: "Innovate & Create Hack Day", 
        date: "June 15, 2024", 
        participants: 500, 
        description: "A 24-hour hackathon focused on building innovative solutions for social good.", 
        image: "https://placehold.co/1200x400.png",
        location: "New York, NY",
        status: "Past"
    },
    { 
        id: "design-a-thon-ui-ux-challenge", 
        name: "Design-a-thon: UI/UX Challenge", 
        date: "May 20, 2024", 
        participants: 350, 
        description: "A creative challenge for designers to showcase their UI/UX skills.", 
        image: "https://placehold.co/1200x400.png",
        location: "Virtual",
        status: "Past"
    },
];

const mockParticipants = [
    { name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', skills: ['React', 'Node.js', 'Figma'] },
    { name: 'Ben Carter', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', skills: ['Python', 'TensorFlow', 'Data Analysis'] },
    { name: 'Aisha Khan', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', skills: ['UX Research', 'Prototyping'] },
    { name: 'Marcus Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', skills: ['Next.js', 'GraphQL', 'Vercel'] },
    { name: 'Olivia Martinez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', skills: ['AWS', 'Docker', 'Terraform'] },
    { name: 'Leo Gupta', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', skills: ['Solidity', 'Web3.js'] },
];

const mockSchedule = [
    { time: "9:00 AM", title: "Opening Ceremony & Keynote" },
    { time: "10:00 AM", title: "Hacking Begins!" },
    { time: "1:00 PM", title: "Lunch & Networking" },
    { time: "3:00 PM", title: "Workshop: Intro to GenAI" },
    { time: "7:00 PM", title: "Dinner" },
    { time: "10:00 PM", title: "Midnight Snack & Surprise Challenge" },
];


export default function EventDetailsPage({ params: { id } }: { params: { id: string } }) {
    const event = allEvents.find(e => e.id === id);

    if (!event) {
        notFound();
    }

    return (
        <div className="flex-1">
            <div className="relative w-full h-48 md:h-64">
                <Image src={event.image} alt={event.name} layout="fill" objectFit="cover" className="opacity-50" data-ai-hint="event banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                     <Button asChild variant="outline" className="mb-4">
                        <Link href="/dashboard/events"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Events</Link>
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{event.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {event.date}</div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {event.location}</div>
                        <div className="flex items-center gap-2"><Users className="h-4 w-4"/> {event.participants.toLocaleString()} participants</div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 grid gap-8 lg:grid-cols-3 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>About this Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="schedule">
                        <TabsList>
                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            <TabsTrigger value="participants">Participants</TabsTrigger>
                            <TabsTrigger value="prizes">Prizes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="schedule" className="mt-4">
                             <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-6">
                                    {mockSchedule.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="font-semibold">{item.time}</div>
                                            </div>
                                             <div className="relative w-full">
                                                <div className="absolute -left-6 top-1 h-full w-px bg-border" />
                                                <div className="absolute -left-[29px] top-0 h-3 w-3 rounded-full bg-primary" />
                                                <p className="font-medium ml-4">{item.title}</p>
                                             </div>
                                        </div>
                                    ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="participants" className="mt-4">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Meet the Hackers</CardTitle>
                                    <CardDescription>Browse participants and find potential teammates.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {mockParticipants.map((p, i) => (
                                            <Card key={i} className="p-4 text-center">
                                                <Avatar className="mx-auto h-16 w-16 mb-2">
                                                    <AvatarImage src={p.avatar} />
                                                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <p className="font-semibold">{p.name}</p>
                                                <div className="flex flex-wrap gap-1 justify-center mt-2">
                                                    {p.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                                </div>
                                                 <Button variant="outline" size="sm" className="mt-3 w-full">View Profile</Button>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="prizes" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prizes & Awards</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-md bg-muted">
                                        <Trophy className="h-8 w-8 text-yellow-500"/>
                                        <div>
                                            <p className="font-semibold">Grand Prize</p>
                                            <p className="text-sm text-muted-foreground">$10,000 Cash + Mentorship</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-md bg-muted/50">
                                        <Trophy className="h-8 w-8 text-gray-400"/>
                                        <div>
                                            <p className="font-semibold">Runner Up</p>
                                            <p className="text-sm text-muted-foreground">$5,000 + Premium SWAG</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-md bg-muted/50">
                                        <Trophy className="h-8 w-8 text-orange-400"/>
                                        <div>
                                            <p className="font-semibold">Best Social Impact</p>
                                            <p className="text-sm text-muted-foreground">$2,500 + Sponsored API Credits</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardContent className="p-6 flex flex-col gap-4">
                           <Button size="lg" className="w-full">
                                <DoorOpen className="mr-2 h-5 w-5"/> Join Event
                            </Button>
                             <Button variant="outline" className="w-full">
                                <Share2 className="mr-2 h-4 w-4"/> Share Event
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Looking for a team?</CardTitle>
                            <CardDescription>Use our tool to find teammates for this event.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Button asChild className="w-full">
                                <Link href="/dashboard/find-team"><Search className="mr-2 h-4 w-4"/> Find Teammates</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
