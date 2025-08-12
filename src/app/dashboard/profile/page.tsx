"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/sidebar";
import { Github, Linkedin, Save, Twitter } from "lucide-react";
import Link from 'next/link';

const skills = ["React", "Next.js", "TypeScript", "Node.js", "UI/UX Design", "Firebase", "Tailwind CSS"];
const interests = ["AI/ML", "Web3", "Developer Tools", "Social Impact"];

export default function ProfilePage() {
    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">My Profile</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader className="items-center text-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="Ada Lovelace" data-ai-hint="profile picture" />
                                    <AvatarFallback>AL</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-2xl">Ada Lovelace</CardTitle>
                                <CardDescription>Software Engineer & AI Enthusiast</CardDescription>
                                <div className="flex gap-2 pt-4">
                                    <Button asChild variant="outline" size="icon"><Link href="#"><Twitter className="h-4 w-4"/></Link></Button>
                                    <Button asChild variant="outline" size="icon"><Link href="#"><Linkedin className="h-4 w-4"/></Link></Button>
                                    <Button asChild variant="outline" size="icon"><Link href="#"><Github className="h-4 w-4"/></Link></Button>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                            {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Interests</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                            {interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
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
                                        <Input id="fullName" defaultValue="Ada Lovelace" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Professional Title</Label>
                                        <Input id="title" defaultValue="Software Engineer & AI Enthusiast" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="ada.lovelace@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Biography</Label>
                                    <Textarea id="bio" rows={5} defaultValue="An English mathematician and writer, chiefly known for my work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. I am often regarded as the first to recognize the full potential of a 'computing machine' and one of the first computer programmers." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter URL</Label>
                                        <Input id="twitter" defaultValue="https://twitter.com/ada" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                                        <Input id="linkedin" defaultValue="https://linkedin.com/in/ada" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub URL</Label>
                                        <Input id="github" defaultValue="https://github.com/ada" />
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
