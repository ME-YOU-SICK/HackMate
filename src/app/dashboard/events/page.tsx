
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileHeader } from "@/components/ui/sidebar";
import { Calendar, PlusCircle, Users, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import type { Event } from "@/lib/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from "date-fns";

export default function EventsPage() {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [myEvents, setMyEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchEvents = async () => {
            setLoading(true);
            const eventsQuery = query(collection(db, 'events'), where('participants', 'array-contains', user.uid));
            const querySnapshot = await getDocs(eventsQuery);
            const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
            setMyEvents(events);
            setLoading(false);
        };

        fetchEvents();
    }, [user]);

    const now = new Date();
    const upcomingEvents = myEvents.filter(event => new Date(event.dateRange.to) >= now);
    const pastEvents = myEvents.filter(event => new Date(event.dateRange.to) < now);

    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Events</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">My Events</h2>
                    <Button asChild>
                        <Link href="/dashboard/events/create"><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Link>
                    </Button>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="h-12 w-12 animate-spin" />
                    </div>
                ) : (
                    <Tabs defaultValue="upcoming">
                        <TabsList>
                            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
                            <TabsTrigger value="past">Past ({pastEvents.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upcoming" className="mt-6">
                            {upcomingEvents.length === 0 ? (
                                <p className="text-muted-foreground">You haven't joined any upcoming events yet.</p>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {upcomingEvents.map((event) => (
                                        <Card key={event.id} className="overflow-hidden">
                                            <CardHeader className="p-0">
                                                <Image src={event.imageUrl!} alt={event.name} width={600} height={400} className="object-cover" data-ai-hint="hackathon event" />
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-2">
                                                <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                                                <CardDescription className="h-10 overflow-hidden">{event.description}</CardDescription>
                                                <div className="flex items-center text-sm text-muted-foreground pt-2">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                     <span>{format(new Date(event.dateRange.from), 'LLL d')} - {format(new Date(event.dateRange.to), 'LLL d, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Users className="mr-2 h-4 w-4" />
                                                    <span>{event.participants.length} participants</span>
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
                            )}
                        </TabsContent>
                        <TabsContent value="past" className="mt-6">
                             {pastEvents.length === 0 ? (
                                <p className="text-muted-foreground">You have no past events.</p>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {pastEvents.map((event) => (
                                        <Card key={event.id} className="overflow-hidden opacity-75">
                                            <CardHeader className="p-0">
                                                <Image src={event.imageUrl!} alt={event.name} width={600} height={400} className="object-cover" data-ai-hint="archive event" />
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-2">
                                                <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                                                <CardDescription className="h-10 overflow-hidden">{event.description}</CardDescription>
                                                <div className="flex items-center text-sm text-muted-foreground pt-2">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    <span>{format(new Date(event.dateRange.from), 'LLL d')} - {format(new Date(event.dateRange.to), 'LLL d, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Users className="mr-2 h-4 w-4" />
                                                    <span>{event.participants.length} participants</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4">
                                                <Button className="w-full" variant="outline" asChild>
                                                    <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </>
    );
}
