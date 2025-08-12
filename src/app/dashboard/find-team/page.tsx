
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Cpu, Lightbulb, Loader, ThumbsUp, Users, Check, Wand2 } from 'lucide-react';
import { MobileHeader } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { roles, technologies } from '@/lib/data';

const initialState = {
  success: false,
  data: null,
  error: null,
  issues: [],
};

const IconCheckboxGrid = ({ title, items, selectedItems, onSelectionChange }: { title: string, items: { id: string, label: string, icon: React.ReactNode }[], selectedItems: string[], onSelectionChange: (id: string, checked: boolean) => void }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-72">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 bg-muted/50 p-3 rounded-md">
                            <Checkbox 
                                id={item.id}
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={(checked) => onSelectionChange(item.id, !!checked)}
                            />
                             <label
                                htmlFor={item.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                            >
                                {item.icon} {item.label}
                            </label>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
);

export default function FindTeamPage() {
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<any>(initialState);
  
  const [teamSize, setTeamSize] = useState(3);
  const [projectIdea, setProjectIdea] = useState('');
  const [neededRoles, setNeededRoles] = useState<string[]>([]);
  const [preferredTech, setPreferredTech] = useState<string[]>([]);

  const handleRoleChange = (id: string, checked: boolean) => {
    setNeededRoles(prev => checked ? [...prev, id] : prev.filter(r => r !== id));
  };
  
  const handleTechChange = (id: string, checked: boolean) => {
    setPreferredTech(prev => checked ? [...prev, id] : prev.filter(t => t !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsPending(true);
      setState(initialState);
      // NOTE: In a real app, you would call a server action here with the form data.
      // For now, we'll simulate a delay and a response.
      setTimeout(() => {
        const mockData = {
          reasoning: "Based on your requirements, I've found a balanced team from your connections. 'InnovatorX' is a strong backend match with extensive hackathon experience. 'DesignGuru' fills the UI/UX role perfectly, and their tech preferences align with yours.",
          suggestedTeammates: [
            { name: "InnovatorX", role: "Backend Developer", skills: ["Node.js", "Python", "AWS"] },
            { name: "DesignGuru", role: "UI/UX Designer", skills: ["Figma", "React", "Web Accessibility"] },
            { name: "CodeWizard", role: "Frontend Developer", skills: ["Next.js", "TypeScript", "Vercel"] },
          ]
        };
        setState({ success: true, data: mockData, error: null, issues: [] });
        setIsPending(false);
      }, 2000);
  }

  // Mock match count
  const potentialMatches = 12;

  return (
    <>
      <MobileHeader>
        <h2 className="text-xl font-bold">Intelligent Recruiter</h2>
      </MobileHeader>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Intelligent Recruiter</h2>
        </div>
        <p className="text-muted-foreground max-w-4xl">
            Define your ideal team below. Our algorithm will scan your connections to find the best-fit members based on their skills, experience, and tech preferences. This feature uses a deterministic matching algorithm, not a generative AI model.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-3 grid grid-cols-1 gap-6">
              <Card>
                   <CardHeader>
                      <CardTitle>Core Requirements</CardTitle>
                      <CardDescription>Define the project and team size.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label htmlFor="teamSize">Desired Team Size: {teamSize}</Label>
                        <Slider
                            id="teamSize"
                            name="teamSize"
                            min={1}
                            max={10}
                            step={1}
                            value={[teamSize]}
                            onValueChange={(value) => setTeamSize(value[0])}
                        />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="projectIdea">Project Idea (Optional)</Label>
                          <Textarea id="projectIdea" name="projectIdea" placeholder="Describe your project idea... This will be shared in the invitations." rows={4} value={projectIdea} onChange={e => setProjectIdea(e.target.value)} />
                      </div>
                  </CardContent>
              </Card>

             <IconCheckboxGrid title="Roles Needed" items={roles} selectedItems={neededRoles} onSelectionChange={handleRoleChange} />
             <IconCheckboxGrid title="Preferred Member Tech Stack" items={technologies} selectedItems={preferredTech} onSelectionChange={handleTechChange} />
              
              <div className="lg:col-span-1">
                   <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isPending}>
                    {isPending ? <><Loader className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</> : <><Wand2 className="mr-2 h-5 w-5" />Find My Team</>}
                  </Button>
              </div>
          </form>

          <div className="lg:col-span-2 space-y-6 sticky top-24">
              <Card className="bg-muted/50 border-dashed">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Lightbulb/> How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        Our algorithm ranks candidates from your connections based on skill overlap, tech alignment, and past hackathon experience to form your ideal team.
                    </p>
                    <div className="flex items-center justify-center p-4 bg-background rounded-lg text-center">
                        <p className="text-xl font-bold text-primary">{potentialMatches}</p>
                        <p className="ml-2 text-foreground">potential matches found in your network.</p>
                    </div>
                  </CardContent>
              </Card>

              {isPending && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 p-8 rounded-lg border border-dashed">
                      <Cpu className="h-16 w-16 text-primary animate-pulse" />
                      <h3 className="text-2xl font-bold tracking-tight text-center">Finding your dream team...</h3>
                      <p className="text-muted-foreground text-center">Our algorithm is analyzing your profile against your connections to find the perfect matches.</p>
                  </div>
              )}

              {!isPending && state?.error && (
                  <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                          {state.error}
                          {state.issues && (
                              <ul className="list-disc pl-5 mt-2">
                                  {state.issues.map((issue: string, i: number) => <li key={i}>{issue}</li>)}
                              </ul>
                          )}
                      </AlertDescription>
                  </Alert>
              )}

              {!isPending && state?.data && (
                  <div className="space-y-6">
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><ThumbsUp />Algorithm's Reasoning</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-muted-foreground">{state.data.reasoning}</p>
                          </CardContent>
                      </Card>

                      <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Users />Suggested Team</h3>
                      <div className="grid grid-cols-1 gap-4">
                          {state.data.suggestedTeammates.map((teammate: any, index: number) => (
                              <Card key={index}>
                                  <CardHeader>
                                      <CardTitle className="text-lg">{teammate.name}</CardTitle>
                                      <CardDescription>{teammate.role}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                      <div className="flex flex-wrap gap-2">
                                          {teammate.skills.map((skill: string) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                      </div>
                                  </CardContent>
                                  <CardFooter>
                                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2"><Check className="h-4 w-4"/> Invitation Sent!</p>
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
