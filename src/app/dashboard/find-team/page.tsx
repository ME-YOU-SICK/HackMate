"use client";

import { useState, useActionState } from 'react';
import { getTeamSuggestions } from '@/app/actions/suggest-teammates.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import type { SuggestTeammatesOutput } from '@/ai/flows/suggest-teammates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Cpu, Lightbulb, Loader, ThumbsUp, User, Users } from 'lucide-react';
import { MobileHeader } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const initialState = {
  success: false,
};

export default function FindTeamPage() {
  const [state, formAction, isPending] = useActionState(getTeamSuggestions, initialState);
  const [teamSize, setTeamSize] = useState(3);

  return (
    <>
    <MobileHeader>
      <h2 className="text-xl font-bold">AI Teammate Finder</h2>
    </MobileHeader>
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">AI Teammate Finder</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl">
            Fill out the form below with your project details and preferences. Our AI will analyze your input to suggest the most compatible teammates from the event.
        </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form action={formAction} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
                 <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Tell us about the project you want to build.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="hackathonDescription">Project Description</Label>
                        <Textarea id="hackathonDescription" name="hackathonDescription" placeholder="Describe your project idea, goals, and what you want to build. The more detail, the better the matches!" required  rows={6} />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Let the AI know about your skills and experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="userSkills">Your Skills</Label>
                        <Input id="userSkills" name="userSkills" placeholder="e.g., React, UI/UX Design, Python" required />
                        <p className="text-xs text-muted-foreground">Comma-separated values.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="userTechStack">Preferred Tech Stack</Label>
                        <Input id="userTechStack" name="userTechStack" placeholder="e.g., Next.js, Firebase, Tailwind CSS" required />
                        <p className="text-xs text-muted-foreground">Comma-separated values.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Team Preferences</CardTitle>
                    <CardDescription>What are you looking for in a team?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="userExperience">Your Experience</Label>
                        <Select name="userExperience" defaultValue="Intermediate">
                            <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="desiredTeamSize">Desired Team Size: {teamSize}</Label>
                        <Slider
                            id="desiredTeamSize"
                            name="desiredTeamSize"
                            min={1}
                            max={5}
                            step={1}
                            value={[teamSize]}
                            onValueChange={(value) => setTeamSize(value[0])}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="md:col-span-2">
                 <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : <><BrainCircuit className="mr-2 h-4 w-4" />Generate Suggestions</>}
                </Button>
            </div>
        </form>

        <div className="lg:col-span-1 space-y-6">
            <Card className="bg-muted/50 border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb/> Pro Tip</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Provide a detailed project description and a comprehensive list of your skills for the most accurate teammate suggestions. The more the AI knows, the better it can help!</p>
                </CardContent>
            </Card>

            {isPending && (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 rounded-lg border border-dashed">
                    <Cpu className="h-16 w-16 text-primary animate-pulse" />
                    <h3 className="text-2xl font-bold tracking-tight text-center">Finding your dream team...</h3>
                    <p className="text-muted-foreground text-center">Our AI is analyzing your profile against other participants to find the perfect matches.</p>
                </div>
            )}

            {!isPending && state?.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.error}
                        {state.issues && (
                            <ul className="list-disc pl-5 mt-2">
                                {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                            </ul>
                        )}
                    </AlertDescription>
                </Alert>
            )}

            {!isPending && state?.data && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ThumbsUp />AI's Reasoning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{state.data.reasoning}</p>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Users />Suggested Teammates</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {state.data.suggestedTeammates.map((teammate, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{teammate.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {teammate}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">A brief description of why this person is a good match would go here, including their skills and experience.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">React</Badge>
                                        <Badge variant="secondary">Node.js</Badge>
                                        <Badge variant="secondary">UX Design</Badge>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">View Profile</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
    </>
  );
}
