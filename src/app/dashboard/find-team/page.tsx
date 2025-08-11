"use client";

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { getTeamSuggestions } from '@/app/actions/suggest-teammates.action.ts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import type { SuggestTeammatesOutput } from '@/ai/flows/suggest-teammates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Loader, ThumbsUp, User, Users } from 'lucide-react';

const initialState = {
  success: false,
};

export default function FindTeamPage() {
  const [state, formAction] = useFormState(getTeamSuggestions, initialState);
  const [teamSize, setTeamSize] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };
  
  if (loading && !state.data && !state.error) {
     // The form has been submitted, but we don't have a result yet.
  } else if (loading) {
    // We have a result, so stop loading
    setLoading(false);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="bg-card/60 backdrop-blur-lg border-border/50">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><BrainCircuit /> AI Teammate Finder</CardTitle>
              <CardDescription>Fill out the form to get personalized teammate suggestions for your hackathon project.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hackathonDescription">Project Description</Label>
                  <Textarea id="hackathonDescription" name="hackathonDescription" placeholder="Describe your project idea, goals, and what you want to build." required />
                </div>
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
                <div className="space-y-2">
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
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : 'Generate Suggestions'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="md:col-span-2">
            {loading && (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 rounded-lg bg-card/60 backdrop-blur-lg border border-dashed border-border/50">
                    <Loader className="h-12 w-12 text-primary animate-spin" />
                    <h3 className="text-2xl font-headline">Finding your dream team...</h3>
                    <p className="text-muted-foreground">Our AI is analyzing your profile to find the best matches.</p>
                </div>
            )}

            {!loading && state?.error && (
                <Alert variant="destructive" className="bg-destructive/20 border-destructive">
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

            {!loading && state?.data && (
                <div className="space-y-6">
                    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><ThumbsUp />AI's Reasoning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{state.data.reasoning}</p>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-headline flex items-center gap-2"><Users />Suggested Teammates</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {state.data.suggestedTeammates.map((teammate, index) => (
                            <Card key={index} className="bg-card/60 backdrop-blur-lg border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <User /> {teammate}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">A brief description of why this person is a good match would go here, including their skills and experience.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">React</span>
                                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">Node.js</span>
                                        <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">UX Design</span>
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
  );
}
