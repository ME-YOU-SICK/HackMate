
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, DoorOpen, MapPin, Trophy, Users, Share2, Search, Loader, Code, Shield, Users2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import type { Event, UserProfile } from "@/lib/db";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";


const dummyEvents: Record<string, Event> = {
    'aigh2024': {
        id: 'aigh2024',
        name: 'AI Global Hackathon 2024',
        description: 'A global hackathon focused on pushing the boundaries of Artificial Intelligence. Participants will work in teams to develop innovative AI-powered solutions to real-world problems. The event will feature workshops from industry experts, mentorship sessions, and a final presentation to a panel of judges.',
        dateRange: { from: '2024-10-26T09:00:00Z', to: '2024-10-27T17:00:00Z' },
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Next.js', 'LangChain', 'Docker', 'GCP'],
        requiredSkills: ['Machine Learning', 'Frontend Development', 'UI/UX Design', 'Backend Development', 'Data Science'],
        maxTeamSize: 5,
        participants: Array.from({ length: 42 }, (_, i) => ({
            uid: `user${i}`,
            fullName: `User ${i + 1}`,
            photoURL: `https://i.pravatar.cc/150?u=user${i+1}`,
        }) as UserProfile),
        imageUrl: 'https://placehold.co/1200x400.png',
    },
};

export default function EventDetailsPage() {
    const params = useParams();
    const { toast } = useToast();
    const id = params.id as string;
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            const foundEvent = dummyEvents[id];
            if (foundEvent) {
                setEvent(foundEvent);
            }
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }

    if (!event) {
        return notFound();
    }

    const handleShare = () => {
        navigator.clipboard.writeText(event.id);
        toast({ title: "Copied to clipboard!", description: `Event code "${event.id}" has been copied.`})
    }

    const handleJoin = () => {
        // UI only
        toast({ title: "Joined Event (UI Only)", description: `You have joined "${event.name}".`})
    }

    return (
        <div className="flex-1">
            <div className="relative w-full h-48 md:h-64">
                <Image src={event.imageUrl!} alt={event.name} layout="fill" objectFit="cover" className="opacity-50" data-ai-hint="event banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                     <Button asChild variant="outline" className="mb-4">
                        <Link href="/dashboard/events"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Events</Link>
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{event.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {format(new Date(event.dateRange.from), 'PPP')} - {format(new Date(event.dateRange.to), 'PPP')}</div>
                        <div className="flex items-center gap-2"><Users className="h-4 w-4"/> {event.participants.length} participants</div>
                        <div className="flex items-center gap-2"><Users2 className="h-4 w-4"/> Max team size: {event.maxTeamSize}</div>
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
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5"/>Allowed Tech Stack</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {event.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5"/>Required Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {event.requiredSkills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                    </div>


                    <Card>
                        <CardHeader>
                            <CardTitle>Participants ({event.participants.length})</CardTitle>
                            <CardDescription>Browse participants and find potential teammates.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {event.participants.map((p, i) => (
                                    <Card key={i} className="p-4 text-center">
                                        <Avatar className="mx-auto h-16 w-16 mb-2">
                                            <AvatarImage src={p.photoURL ?? undefined} />
                                            <AvatarFallback>{p.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{p.fullName}</p>
                                            <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                                                <Link href={`/dashboard/profile/${p.uid}`}>View Profile</Link>
                                            </Button>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardContent className="p-6 flex flex-col gap-4">
                           <Button size="lg" className="w-full" onClick={handleJoin}>
                                <DoorOpen className="mr-2 h-5 w-5"/> Join Event
                            </Button>
                             <Button variant="outline" className="w-full" onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4"/> Share Event Code
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
