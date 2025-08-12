
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <h1 className="mb-8 font-sora text-4xl font-bold">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>
                This information will be displayed publicly on your profile page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Alex Turing" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="m@example.com" disabled />
                  <p className="text-xs text-muted-foreground">Your email is not shown on your public profile.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  defaultValue="Full-stack developer with a passion for AI and open-source. Turning coffee into code since 2018."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" defaultValue="React, Node.js, Python, GenAI, Firebase" />
                <p className="text-xs text-muted-foreground">
                  Enter your skills, separated by commas.
                </p>
              </div>
               <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" defaultValue="https://github.com/alexturing" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input id="twitter" defaultValue="https://twitter.com/alexturing" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" defaultValue="https://linkedin.com/in/alexturing" />
              </div>
              <Button className={cn('warm-gradient text-white')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Display & Accessibility</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup defaultValue="dark" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </RadioGroup>
               </div>
               <div className="space-y-3">
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-muted-foreground">This feature is not yet available.</p>
               </div>
               <Button className={cn('warm-gradient text-white')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
           <Card className="bg-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="team-invites">Team Invites</Label>
                        <p className="text-xs text-muted-foreground">Get notified when someone invites you to their team.</p>
                    </div>
                    <Switch id="team-invites" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="new-follower">New Connections</Label>
                        <p className="text-xs text-muted-foreground">Get notified when someone connects with you.</p>
                    </div>
                    <Switch id="new-follower" defaultChecked />
                </div>
                <Separator />
                 <div className="space-y-3">
                  <Label>Email Frequency</Label>
                   <RadioGroup defaultValue="immediate" className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="email-immediate" />
                      <Label htmlFor="email-immediate">Immediate</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="email-daily" />
                      <Label htmlFor="email-daily">Daily Digest</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="email-weekly" />
                      <Label htmlFor="email-weekly">Weekly Digest</Label>
                    </div>
                  </RadioGroup>
               </div>
                <Separator />
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Enable push notifications on your devices.</p>
                    </div>
                    <Switch id="push-notifications" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-xs text-muted-foreground">Enable SMS notifications (charges may apply).</p>
                    </div>
                    <Switch id="sms-notifications" disabled />
                </div>
                <Button className={cn('warm-gradient text-white')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="mt-6">
           <Card className="bg-card">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your information is shared across the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="online-status">Show Online Status</Label>
                        <p className="text-xs text-muted-foreground">Allow others to see when you are currently online.</p>
                    </div>
                    <Switch id="online-status" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="last-active">Show Last Active Time</Label>
                        <p className="text-xs text-muted-foreground">Allow others to see the last time you were active.</p>
                    </div>
                    <Switch id="last-active" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="profile-view-notifications">Profile View Notifications</Label>
                        <p className="text-xs text-muted-foreground">Get notified when another user views your profile.</p>
                    </div>
                    <Switch id="profile-view-notifications" />
                </div>
                <Button className={cn('warm-gradient text-white')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 rounded-lg border p-4">
                <Label className="text-lg">Change Password</Label>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <Button className={cn('warm-gradient text-white')}>Update Password</Button>
              </div>
              <Separator />
               <div className="space-y-4 rounded-lg border p-4">
                  <Label className="text-lg">Two-Factor Authentication (2FA)</Label>
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm text-muted-foreground">Protect your account with an extra layer of security.</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                  </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-lg font-semibold text-red-500">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  Deleting your account is permanent and cannot be undone.
                </p>
                <Button variant="destructive" className="mt-4">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="mt-6">
           <Card className="bg-card">
            <CardHeader>
              <CardTitle>Event & Collaboration Settings</CardTitle>
              <CardDescription>Manage how you interact with events and teams.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="auto-join">Auto-Join Recommended Events</Label>
                        <p className="text-xs text-muted-foreground">Automatically join events that match your profile.</p>
                    </div>
                    <Switch id="auto-join" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="auto-accept-invites">Auto-Accept Team Invites</Label>
                        <p className="text-xs text-muted-foreground">Automatically accept invites from trusted connections.</p>
                    </div>
                    <Switch id="auto-accept-invites" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label>Calendar Sync</Label>
                        <p className="text-xs text-muted-foreground">Sync your HackMate events with your personal calendar.</p>
                    </div>
                    <Button variant="outline">Connect Calendar</Button>
                </div>
                <Button className={cn('warm-gradient text-white')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
