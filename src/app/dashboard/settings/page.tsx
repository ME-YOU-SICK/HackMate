
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MobileHeader } from "@/components/sidebar";
import { Bell, Database, KeyRound, LogOut, Palette, PowerOff, Save, Share2, Shield, SlidersHorizontal, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SettingsSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {children}
        </CardContent>
    </Card>
)

export default function SettingsPage() {
    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Settings</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save All Changes
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                    <SettingsSection title="Profile & Privacy" description="Control how your information is displayed to others.">
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
                    </SettingsSection>

                    <SettingsSection title="Event Preferences" description="Customize your experience with events on HackMate.">
                        <div className="flex items-center justify-between">
                            <Label>Enable AI matchmaking suggestions</Label>
                            <Switch defaultChecked />
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Integrations" description="Connect your other accounts to streamline your HackMate experience.">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium">Connect GitHub</p>
                            <Button>Connect</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium">Connect LinkedIn</p>
                            <Button>Connect</Button>
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Theme & Display" description="Customize the look and feel of the application.">
                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <RadioGroup defaultValue="light" className="flex flex-col sm:flex-row gap-4 pt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="light" id="light" /><Label htmlFor="light">Light</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="dark" id="dark" /><Label htmlFor="dark">Dark</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="system" id="system" /><Label htmlFor="system">System</Label></div>
                            </RadioGroup>
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Data & Account Management" description="Manage your data and account settings.">
                        <Button variant="outline">Clear Chat History</Button>
                        <Separator/>
                        <div>
                            <h4 className="font-semibold text-destructive flex items-center gap-2 mb-2"><PowerOff/> Delete Account</h4>
                            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                            <Button variant="destructive">Delete My Account</Button>
                        </div>
                    </SettingsSection>
                </div>
            </div>
        </>
    );
}
