"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, PlusCircle, Users } from "lucide-react";

const upcomingEvents = [
    { name: "AI Global Hackathon 2024", date: "October 26-27, 2024", participants: 1500, description: "Join developers from around the world to solve real-world problems using AI." },
    { name: "Future of Web3 Summit", date: "November 12, 2024", participants: 800, description: "A summit for blockchain enthusiasts and developers to explore the future of decentralized applications." },
];

const pastEvents = [
    { name: "Innovate & Create Hack Day", date: "June 15, 2024", participants: 500, description: "A 24-hour hackathon focused on building innovative solutions for social good." },
    { name: "Design-a-thon: UI/UX Challenge", date: "May 20, 2024", participants: 350, description: "A creative challenge for designers to showcase their UI/UX skills." },
];

export default function EventsPage() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Events</h2>
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
                            <Card key={index} className="bg-card/60 backdrop-blur-lg border-border/50">
                                <CardHeader>
                                    <CardTitle className="font-headline">{event.name}</CardTitle>
                                    <CardDescription>{event.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{event.participants.toLocaleString()} participants</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">View Details</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pastEvents.map((event, index) => (
                            <Card key={index} className="bg-card/60 backdrop-blur-lg border-border/50 opacity-70">
                                <CardHeader>
                                    <CardTitle className="font-headline">{event.name}</CardTitle>
                                    <CardDescription>{event.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{event.participants.toLocaleString()} participants</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant="outline" disabled>View Details</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}