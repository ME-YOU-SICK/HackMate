"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileHeader } from "@/components/sidebar";
import { Calendar, PlusCircle, Users } from "lucide-react";
import Image from "next/image";

const upcomingEvents = [
    { name: "AI Global Hackathon 2024", date: "October 26-27, 2024", participants: 1500, description: "Join developers from around the world to solve real-world problems using AI.", image: "https://placehold.co/600x400.png" },
    { name: "Future of Web3 Summit", date: "November 12, 2024", participants: 800, description: "A summit for blockchain enthusiasts and developers to explore the future of decentralized applications.", image: "https://placehold.co/600x400.png" },
];

const pastEvents = [
    { name: "Innovate & Create Hack Day", date: "June 15, 2024", participants: 500, description: "A 24-hour hackathon focused on building innovative solutions for social good.", image: "https://placehold.co/600x400.png" },
    { name: "Design-a-thon: UI/UX Challenge", date: "May 20, 2024", participants: 350, description: "A creative challenge for designers to showcase their UI/UX skills.", image: "https://placehold.co/600x400.png" },
];

export default function EventsPage() {
    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Events</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Events</h2>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                </div>
                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {upcomingEvents.map((event, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader className="p-0">
                                        <Image src={event.image} alt={event.name} width={600} height={400} className="object-cover" data-ai-hint="hackathon event" />
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-2">
                                        <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                                        <CardDescription>{event.description}</CardDescription>
                                        <div className="flex items-center text-sm text-muted-foreground pt-2">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>{event.participants.toLocaleString()} participants</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4">
                                        <Button className="w-full">View Details</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="past" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pastEvents.map((event, index) => (
                                <Card key={index} className="overflow-hidden opacity-75">
                                    <CardHeader className="p-0">
                                         <Image src={event.image} alt={event.name} width={600} height={400} className="object-cover" data-ai-hint="archive event" />
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-2">
                                        <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                                        <CardDescription>{event.description}</CardDescription>
                                        <div className="flex items-center text-sm text-muted-foreground pt-2">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>{event.participants.toLocaleString()} participants</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4">
                                        <Button className="w-full" variant="outline" disabled>View Details</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
