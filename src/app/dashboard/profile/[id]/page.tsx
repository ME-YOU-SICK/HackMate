
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/ui/sidebar";
import { Github, Linkedin, Loader, UserPlus, Check, UserCheck } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/db";
import { Textarea } from "@/components/ui/textarea";
import { notFound, useParams } from "next/navigation";
import { dummyUsers } from "@/lib/dummy-data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { addConnection, getUserProfile } from "@/lib/db";


export default function ProfilePage() {
    const { toast } = useToast();
    const params = useParams();
    const id = params.id as string;
    const [currentUser] = useAuthState(auth);

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Find profile in dummy data
        const dummyProfile = dummyUsers.find(u => u.uid === id);
        if (dummyProfile) {
            setProfile(dummyProfile);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        const checkIfFollowing = async () => {
            if (!currentUser || !profile) return;
            const currentUserProfile = await getUserProfile(currentUser.uid);
            if (currentUserProfile?.connections?.includes(profile.uid)) {
                setIsFollowing(true);
            }
        };
        checkIfFollowing();
    }, [currentUser, profile]);
    
    const handleFollow = async () => {
        if (!currentUser || !profile) {
            toast({ title: "Please log in to connect.", variant: "destructive"});
            return;
        };
        if (currentUser.uid === profile.uid) {
            toast({ title: "You cannot follow yourself.", variant: "destructive"});
            return;
        }

        setIsSubmitting(true);
        const result = await addConnection(currentUser.uid, profile.uid);
        setIsSubmitting(false);

        if (result.success) {
            setIsFollowing(true);
            toast({ title: "Connected!", description: `You are now connected with ${profile?.fullName}.`})
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive"})
        }
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }

    if (!profile) {
        return notFound();
    }

    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Profile</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader className="items-center text-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={profile.photoURL ?? undefined} alt={profile.fullName} data-ai-hint="profile picture" />
                                    <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                                <CardDescription>{profile.age} years old from {profile.city}</CardDescription>
                                <div className="flex justify-center space-x-4 pt-2">
                                    <div className="text-center">
                                        <p className="font-bold text-lg">{profile.followers}</p>
                                        <p className="text-sm text-muted-foreground">Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg">{profile.following}</p>
                                        <p className="text-sm text-muted-foreground">Following</p>
                                    </div>
                                </div>
                                 <div className="flex flex-col sm:flex-row gap-2 pt-4 w-full">
                                    <Button className="flex-1" onClick={handleFollow} disabled={isFollowing || isSubmitting}>
                                        {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : (isFollowing ? <UserCheck className="mr-2 h-4 w-4"/> : <UserPlus className="mr-2 h-4 w-4"/>)}
                                        {isFollowing ? 'Connected' : 'Connect'}
                                    </Button>
                                    {profile.socials?.github && <Button asChild variant="outline" size="icon"><Link href={profile.socials.github} target="_blank"><Github className="h-4 w-4"/></Link></Button>}
                                    {profile.socials?.linkedin && <Button asChild variant="outline" size="icon"><Link href={profile.socials.linkedin} target="_blank"><Linkedin className="h-4 w-4"/></Link></Button>}
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tech Stack</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {profile.techStack?.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {profile.skills?.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Past Hackathons</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{profile.pastHackathons}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Past Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{profile.pastProjects}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Connections</CardTitle>
                                <CardDescription>Users connected with {profile.fullName}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4">
                                {profile.connections?.map(connId => {
                                    const connProfile = dummyUsers.find(u => u.uid === connId);
                                    if (!connProfile) return null;
                                    return (
                                        <Link href={`/dashboard/profile/${connProfile.uid}`} key={connId} className="flex flex-col items-center gap-2 text-center group">
                                            <Avatar>
                                                <AvatarImage src={connProfile.photoURL ?? undefined} />
                                                <AvatarFallback>{connProfile.fullName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs w-20 truncate group-hover:text-primary">{connProfile.fullName}</span>
                                        </Link>
                                    )
                                })}
                                {(!profile.connections || profile.connections.length === 0) && (
                                    <p className="text-sm text-muted-foreground">No connections yet.</p>
                                )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
