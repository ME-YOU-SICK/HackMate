
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/ui/sidebar";
import { Github, Linkedin, Save, Twitter, Loader } from "lucide-react";
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfile, updateUserProfile } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { toast } = useToast();
    const [user, authLoading] = useAuthState(auth);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            setLoading(true);
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user, authLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(p => p ? { ...p, [name]: value } : null);
    };
    
    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(p => p ? { ...p, socials: { ...p.socials, [name]: value } } : null);
    }

    const handleSaveChanges = async () => {
        if (!user || !profile) return;
        setIsSaving(true);
        const result = await updateUserProfile(user.uid, profile);
        setIsSaving(false);
        if (result.success) {
            toast({ title: "Profile Updated", description: "Your changes have been saved." });
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    };


    if (loading || authLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }

    if (!profile) {
        return <div className="p-8">Could not load profile. Please try again later.</div>;
    }

    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">My Profile</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                    <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader className="items-center text-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={user?.photoURL ?? undefined} alt={profile.fullName} data-ai-hint="profile picture" />
                                    <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                                <CardDescription>{profile.title || 'Hackathon Enthusiast'}</CardDescription>
                                <div className="flex gap-2 pt-4">
                                    {profile.socials?.twitter && <Button asChild variant="outline" size="icon"><Link href={profile.socials.twitter} target="_blank"><Twitter className="h-4 w-4"/></Link></Button>}
                                    {profile.socials?.linkedin && <Button asChild variant="outline" size="icon"><Link href={profile.socials.linkedin} target="_blank"><Linkedin className="h-4 w-4"/></Link></Button>}
                                    {profile.socials?.github && <Button asChild variant="outline" size="icon"><Link href={profile.socials.github} target="_blank"><Github className="h-4 w-4"/></Link></Button>}
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Skills & Tech</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                            {profile.skills?.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader>
                                <CardTitle>Past Events</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {profile.pastEvents && profile.pastEvents.length > 0 ? 
                                    profile.pastEvents.map(event => <Badge key={event.name} variant="outline">{event.name}</Badge>) :
                                    <p className="text-sm text-muted-foreground">No past events yet.</p>
                                }
                            </CardContent>
                        </Card>

                    </div>
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>Update your personal and contact information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" name="fullName" value={profile.fullName} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Professional Title</Label>
                                        <Input id="title" name="title" value={profile.title || ''} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" value={profile.email} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Biography</Label>
                                    <Textarea id="bio" name="bio" rows={5} value={profile.bio || ''} onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter URL</Label>
                                        <Input id="twitter" name="twitter" value={profile.socials?.twitter || ''} onChange={handleSocialChange}/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                                        <Input id="linkedin" name="linkedin" value={profile.socials?.linkedin || ''} onChange={handleSocialChange}/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub URL</Label>
                                        <Input id="github" name="github" value={profile.socials?.github || ''} onChange={handleSocialChange}/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
