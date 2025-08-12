
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/ui/sidebar";
import { Github, Linkedin, Loader, UserPlus } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/db";
import { Textarea } from "@/components/ui/textarea";

const dummyProfile: UserProfile = {
    uid: 'dummyuser',
    fullName: 'Alex Doe',
    email: 'alex.doe@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=alexdoe',
    age: 24,
    city: 'San Francisco, CA',
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Firebase'],
    skills: ['Frontend Development', 'UI/UX Design', 'Full Stack Developer', 'Product Management'],
    pastHackathons: 'Won "Best Social Impact" at Hack The Bay 2023. Participated in 5 other hackathons.',
    pastProjects: 'Developed a real-time collaborative code editor. Created a mobile app for local event discovery.',
    socials: {
        github: 'https://github.com/alexdoe',
        linkedin: 'https://linkedin.com/in/alexdoe',
    },
    followers: 125,
    following: 78,
};

export default function ProfilePage() {
    const { toast } = useToast();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            setProfile(dummyProfile);
            setLoading(false);
        }, 500);
    }, []);
    
    const handleFollow = () => {
        // UI only
        toast({ title: "Followed (UI Only)", description: `You are now following ${profile?.fullName}.`})
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }

    if (!profile) {
        return <div className="p-8">Could not load profile. Please try again later.</div>;
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
                                    <Button className="flex-1" onClick={handleFollow}>
                                        <UserPlus className="mr-2 h-4 w-4"/> Follow
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
                    </div>
                </div>
            </div>
        </>
    );
}
