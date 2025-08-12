
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MobileHeader } from "@/components/ui/sidebar";
import { Calendar, PlusCircle, Search, SlidersHorizontal, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/lib/db";

const dummyEvents: Event[] = [
    {
        id: 'aigh2024',
        name: 'AI Global Hackathon 2024',
        description: 'A global hackathon focused on pushing the boundaries of Artificial Intelligence.',
        dateRange: { from: '2024-10-26T09:00:00Z', to: '2024-10-27T17:00:00Z' },
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Next.js'],
        requiredSkills: ['Machine Learning', 'Frontend Development', 'UI/UX Design'],
        maxTeamSize: 5,
        participants: Array(42).fill({ fullName: "Dummy User" } as any),
        imageUrl: 'https://placehold.co/600x400.png',
    },
    {
        id: 'web3con',
        name: 'Web3 Con & Hackathon',
        description: 'Build the future of the decentralized web. Workshops, talks, and a massive hackathon.',
        dateRange: { from: '2024-11-15T10:00:00Z', to: '2024-11-17T18:00:00Z' },
        techStack: ['Solidity', 'React', 'ethers.js', 'IPFS'],
        requiredSkills: ['Blockchain', 'Smart Contracts', 'dApp Development'],
        maxTeamSize: 4,
        participants: Array(128).fill({ fullName: "Dummy User" } as any),
        imageUrl: 'https://placehold.co/600x400.png',
    },
    {
        id: 'gamejam24',
        name: 'Global Game Jam 2024',
        description: 'Create a video game from scratch in 48 hours. Join thousands of developers worldwide.',
        dateRange: { from: '2025-01-24T17:00:00Z', to: '2025-01-26T17:00:00Z' },
        techStack: ['Unity', 'C#', 'Blender', 'Godot'],
        requiredSkills: ['Game Design', '3D Modeling', 'C# Programming'],
        maxTeamSize: 6,
        participants: Array(88).fill({ fullName: "Dummy User" } as any),
        imageUrl: 'https://placehold.co/600x400.png',
    },
];

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = dummyEvents.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Events</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-start justify-between space-y-2 flex-col sm:flex-row sm:items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Hackathon Events</h2>
                    <Button asChild>
                        <Link href="/dashboard/events/create"><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Link>
                    </Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by name or technology..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline">
                        <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden flex flex-col">
                            <CardHeader className="p-0">
                                <Image src={event.imageUrl!} alt={event.name} width={600} height={400} className="object-cover" data-ai-hint="hackathon event" />
                            </CardHeader>
                            <CardContent className="p-4 space-y-3 flex-1">
                                <CardTitle className="text-lg font-semibold hover:text-primary transition-colors">
                                     <Link href={`/dashboard/events/${event.id}`}>{event.name}</Link>
                                </CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{new Date(event.dateRange.from).toLocaleDateString()} - {new Date(event.dateRange.to).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>{event.participants.length} participants</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold mb-2 flex items-center"><Tag className="mr-2 h-4 w-4 text-muted-foreground"/>Tech Stack</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {event.techStack.slice(0, 4).map(tech => (
                                            <Badge key={tech} variant="secondary">{tech}</Badge>
                                        ))}
                                        {event.techStack.length > 4 && <Badge variant="outline">...</Badge>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <Button className="w-full" asChild>
                                    <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No events found matching your search.</p>
                    </div>
                )}
            </div>
        </>
    );
}
