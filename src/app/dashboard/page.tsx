import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Activity, Search, Users, Wrench } from "lucide-react";
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/60 backdrop-blur-lg border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Hackathons you are participating in
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-lg border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              New connections this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-lg border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Finder</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Suggestions</div>
             <p className="text-xs text-muted-foreground">
              Potential teammates found by AI
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-lg border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
             <p className="text-xs text-muted-foreground">
              Keep your profile updated for best matches
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-card/60 backdrop-blur-lg border-border/50">
            <CardHeader>
              <CardTitle className="font-headline">Join an Event</CardTitle>
              <CardDescription>
                Have a 6-character event code? Enter it below to join a hackathon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="e.g., HCK24X" className="uppercase" maxLength={6} />
                  <Button type="submit">Join Event</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-lg border-border/50">
            <CardHeader>
              <CardTitle className="font-headline">Find Teammates</CardTitle>
              <CardDescription>
                Use our AI-powered tool to find the perfect teammates for your next project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard/find-team">Launch Team Finder</Link>
              </Button>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
