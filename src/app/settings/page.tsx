
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="mb-8 font-sora text-4xl font-bold">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card className="border-slate-800 bg-slate-900/50">
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
                <p className="text-xs text-slate-400">
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
              <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="m@example.com" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">Update Password</Button>
              <Separator />
              <div>
                <h4 className="text-lg font-semibold text-red-500">Danger Zone</h4>
                <p className="text-sm text-slate-400">
                  Deleting your account is permanent and cannot be undone.
                </p>
                <Button variant="destructive" className="mt-4">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
           <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">
                    <div>
                        <Label htmlFor="team-invites">Team Invites</Label>
                        <p className="text-xs text-slate-400">Get notified when someone invites you to their team.</p>
                    </div>
                    <Switch id="team-invites" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">
                    <div>
                        <Label htmlFor="new-follower">New Connections</Label>
                        <p className="text-xs text-slate-400">Get notified when someone connects with you.</p>
                    </div>
                    <Switch id="new-follower" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">
                    <div>
                        <Label htmlFor="event-reminders">Event Reminders</Label>
                        <p className="text-xs text-slate-400">Receive reminders for events you have joined.</p>
                    </div>
                    <Switch id="event-reminders" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">
                    <div>
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-xs text-slate-400">Receive our weekly newsletter with top events.</p>
                    </div>
                    <Switch id="newsletter" />
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
