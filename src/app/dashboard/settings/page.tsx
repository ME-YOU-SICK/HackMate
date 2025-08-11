"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, KeyRound, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Settings</h2>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save All
                </Button>
            </div>

            <div className="grid gap-8">
                 <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Bell/> Notifications</CardTitle>
                        <CardDescription>Manage how you receive notifications from HackMate.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="flex flex-col space-y-4">
                            <p className="font-medium">Email Notifications</p>
                            <div className="flex items-center space-x-3">
                                <Checkbox id="teamInvites" defaultChecked />
                                <Label htmlFor="teamInvites" className="font-normal text-muted-foreground">Team Invitations and Messages</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox id="eventUpdates" defaultChecked />
                                <Label htmlFor="eventUpdates" className="font-normal text-muted-foreground">Event Updates and Reminders</Label>
                            </div>
                             <div className="flex items-center space-x-3">
                                <Checkbox id="newsletter" />
                                <Label htmlFor="newsletter" className="font-normal text-muted-foreground">Product Updates and Newsletter</Label>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                             <p className="font-medium">Notification Frequency</p>
                              <Select defaultValue="immediate">
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="immediate">Immediately</SelectItem>
                                    <SelectItem value="daily">Daily Digest</SelectItem>
                                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><KeyRound /> Security</CardTitle>
                        <CardDescription>Manage your account's security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                         <Button variant="secondary">Change Password</Button>
                         <Separator />
                         <div>
                            <p className="font-medium mb-2">Two-Factor Authentication (2FA)</p>
                            <p className="text-muted-foreground text-sm mb-4">Add an extra layer of security to your account.</p>
                            <Button variant="outline">Enable 2FA</Button>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}