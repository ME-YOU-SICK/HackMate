
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, DoorOpen, MapPin, Trophy, Users, Share2, Search, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { Event, UserProfile } from "@/lib/db";
import { format } from "date-fns";


export default function EventDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [event, setEvent] = useState<Event | null>(null);
    const [participants, setParticipants] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchEventAndParticipants = async () => {
            setLoading(true);
            const eventRef = doc(db, 'events', id);
            const eventSnap = await getDoc(eventRef);

            if (!eventSnap.exists()) {
                setLoading(false);
                notFound();
                return;
            }
            
            const eventData = eventSnap.data() as Event;
            setEvent(eventData);

            if (eventData.participants && eventData.participants.length > 0) {
                 const participantsQuery = query(collection(db, 'users'), where('uid', 'in', eventData.participants));
                 const participantsSnap = await getDocs(participantsQuery);
                 const participantsData = participantsSnap.docs.map(doc => doc.data() as UserProfile);
                 setParticipants(participantsData);
            }
            
            setLoading(false);
        };

        fetchEventAndParticipants();
    }, [id]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }

    if (!event) {
        return notFound();
    }

    const handleShare = () => {
        navigator.clipboard.writeText(event.id);
        // Maybe show a toast notification here
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
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {event.location}</div>
                        <div className="flex items-center gap-2"><Users className="h-4 w-4"/> {event.participants.length} participants</div>
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

                    <Tabs defaultValue="participants">
                        <TabsList>
                            <TabsTrigger value="participants">Participants ({participants.length})</TabsTrigger>
                            <TabsTrigger value="prizes">Prizes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="participants" className="mt-4">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Meet the Hackers</CardTitle>
                                    <CardDescription>Browse participants and find potential teammates.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {participants.map((p, i) => (
                                            <Card key={i} className="p-4 text-center">
                                                <Avatar className="mx-auto h-16 w-16 mb-2">
                                                    <AvatarImage src={p.photoURL ?? undefined} />
                                                    <AvatarFallback>{p.fullName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <p className="font-semibold">{p.fullName}</p>
                                                <div className="flex flex-wrap gap-1 justify-center mt-2 h-12 overflow-hidden">
                                                    {p.skills?.slice(0, 3).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
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
