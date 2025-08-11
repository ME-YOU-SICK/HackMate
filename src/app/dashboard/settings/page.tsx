
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, KeyRound, Save, Palette, Shield, User, SlidersHorizontal, Share2, Database, LogOut, PowerOff, BellRing, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Settings</h2>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
                    <TabsTrigger value="profile"><User className="mr-2"/>Profile & Privacy</TabsTrigger>
                    <TabsTrigger value="events"><SlidersHorizontal className="mr-2"/>Event Preferences</TabsTrigger>
                    <TabsTrigger value="integrations"><Share2 className="mr-2"/>Integrations</TabsTrigger>
                    <TabsTrigger value="theme"><Palette className="mr-2"/>Theme & Display</TabsTrigger>
                    <TabsTrigger value="data"><Database className="mr-2"/>Data & Account</TabsTrigger>
                    <TabsTrigger value="security"><Shield className="mr-2"/>Advanced Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline">Profile & Privacy</CardTitle>
                            <CardDescription>Control how your information is displayed to others.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-2">
                                <Label>Profile Visibility</Label>
                                <RadioGroup defaultValue="public" className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="public" id="public" /><Label htmlFor="public">Public (visible to all)</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="event-only" id="event-only" /><Label htmlFor="event-only">Event-only (visible in same event)</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="private" id="private" /><Label htmlFor="private">Private (only connections)</Label></div>
                                </RadioGroup>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Show Past Projects</Label>
                                    <p className="text-xs text-muted-foreground">Allow others to see your project history on your profile.</p>
                                </div>
                                <Switch defaultChecked/>
                            </div>
                             <div className="flex items-center justify-between">
                                <div>
                                    <Label>Show Social Links</Label>
                                    <p className="text-xs text-muted-foreground">Display your connected GitHub, LinkedIn, etc. links.</p>
                                </div>
                                <Switch defaultChecked/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Age & Location Visibility</Label>
                                    <p className="text-xs text-muted-foreground">Control who can see your age and city.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline">Event Preferences</CardTitle>
                            <CardDescription>Customize your experience with events on HackMate.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div className="space-y-2">
                                <Label>Default Event View</Label>
                                <Select defaultValue="grid">
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select view" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="grid">Grid</SelectItem>
                                        <SelectItem value="list">List</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <Label>Automatically join event chat upon joining an event</Label>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label>Enable AI matchmaking suggestions</Label>
                                <Switch defaultChecked />
                            </div>
                            <div className="space-y-4">
                                <Label>Preferred Event Types</Label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center space-x-2"><Checkbox id="hackathon" defaultChecked/><Label htmlFor="hackathon">Hackathon</Label></div>
                                    <div className="flex items-center space-x-2"><Checkbox id="meetup" defaultChecked/><Label htmlFor="meetup">Tech Meetup</Label></div>
                                    <div className="flex items-center space-x-2"><Checkbox id="competition"/><Label htmlFor="competition">Coding Competition</Label></div>
                                     <div className="flex items-center space-x-2"><Checkbox id="workshop"/><Label htmlFor="workshop">Workshop</Label></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                         <CardHeader>
                            <CardTitle className="font-headline">Integrations</CardTitle>
                            <CardDescription>Connect your other accounts to streamline your HackMate experience.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <p className="font-medium">Connect GitHub</p>
                                <Button>Connect</Button>
                            </div>
                             <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <p className="font-medium">Connect LinkedIn</p>
                                <Button>Connect</Button>
                            </div>
                             <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <p className="font-medium">Connect Google Calendar</p>
                                <Button>Connect</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <p className="font-medium">Connect Slack/Discord</p>
                                <Button>Connect</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="theme" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline">Theme & Display</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div className="space-y-2">
                                <Label>Theme</Label>
                                <RadioGroup defaultValue="dark" className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="light" id="light" /><Label htmlFor="light">Light</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="dark" id="dark" /><Label htmlFor="dark">Dark</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="system" id="system" /><Label htmlFor="system">System</Label></div>
                                </RadioGroup>
                            </div>
                            <Separator/>
                             <div className="space-y-4">
                                <Label>Gradient "Glass" UI Intensity</Label>
                                 <RadioGroup defaultValue="subtle" className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="subtle" id="subtle" /><Label htmlFor="subtle">Subtle</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="strong" id="strong" /><Label htmlFor="strong">Strong</Label></div>
                                </RadioGroup>
                            </div>
                             <Separator/>
                            <div className="space-y-2">
                                <Label>Font Size</Label>
                                <Select defaultValue="100">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="90">90%</SelectItem>
                                        <SelectItem value="100">100% (Default)</SelectItem>
                                        <SelectItem value="110">110%</SelectItem>
                                        <SelectItem value="125">125%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="data" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline">Data & Account Management</CardTitle>
                            <CardDescription>Manage your data and account settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button variant="outline">Clear Chat History</Button>
                            <Separator/>
                            <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><LogOut/> Manage Connected Devices & Sessions</h4>
                                <p className="text-sm text-muted-foreground mb-4">You are currently logged in on 2 devices.</p>
                                <Button variant="secondary">Sign out of all other sessions</Button>
                            </div>
                            <Separator/>
                             <div>
                                <h4 className="font-semibold text-destructive flex items-center gap-2 mb-2"><PowerOff/> Delete Account</h4>
                                <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                <Button variant="destructive">Delete My Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="security" className="mt-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline">Advanced Security</CardTitle>
                            <CardDescription>Advanced security options for your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div className="space-y-2">
                                <Label>Session Timeout</Label>
                                 <p className="text-xs text-muted-foreground">Automatically log out after a period of inactivity.</p>
                                <Select defaultValue="8h">
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1h">1 Hour</SelectItem>
                                        <SelectItem value="8h">8 Hours</SelectItem>
                                        <SelectItem value="24h">24 Hours</SelectItem>
                                        <SelectItem value="never">Never</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator/>
                             <div className="flex items-center justify-between">
                                <div>
                                    <Label className="flex items-center gap-2"><BellRing/> Login Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Get an email when a new device logs into your account.</p>
                                </div>
                                <Switch />
                            </div>
                             <Separator/>
                             <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><Key/> API Key Management</h4>
                                <p className="text-sm text-muted-foreground mb-4">For developers using the HackMate API.</p>
                                <Button variant="secondary">Manage API Keys</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
