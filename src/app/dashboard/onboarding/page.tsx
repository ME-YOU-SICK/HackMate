
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, PartyPopper, User, Tag, Trophy, X } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { id: 1, title: "Welcome to HackMate!", icon: PartyPopper },
  { id: 2, title: "Basic Information", icon: User },
  { id: 3, title: "Your Skills", icon: Tag },
  { id: 4, title: "Your Interests", icon: Tag },
  { id: 5, title: "Past Hackathons", icon: Trophy },
  { id: 6, title: "You're All Set!", icon: CheckCircle },
];

const predefinedSkills = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "UI/UX Design", "Firebase", 
  "Tailwind CSS", "GraphQL", "Docker", "Kubernetes", "GenAI", "LLMs", "Data Science"
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [pastEvents, setPastEvents] = useState<{name: string, role: string}[]>([]);
  const [currentEventName, setCurrentEventName] = useState('');
  const [currentEventRole, setCurrentEventRole] = useState('');

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSkills(prev => [...prev, skill]);
    } else {
      setSkills(prev => prev.filter(s => s !== skill));
    }
  };
  
  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (currentInterest && !interests.includes(currentInterest)) {
        setInterests([...interests, currentInterest.trim()]);
      }
      setCurrentInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const addPastEvent = () => {
    if (currentEventName && currentEventRole) {
      setPastEvents([...pastEvents, { name: currentEventName.trim(), role: currentEventRole.trim() }]);
      setCurrentEventName('');
      setCurrentEventRole('');
    }
  };

  const removePastEvent = (index: number) => {
    setPastEvents(pastEvents.filter((_, i) => i !== index));
  };

  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-slate-900/50">
       <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[radial-gradient(#29ABE2_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <Card className="bg-card/70 backdrop-blur-lg border-border/50">
          <CardHeader>
            <div className="w-full mb-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    {steps.map(step => (
                        <div key={step.id} className={`flex flex-col items-center w-24 ${currentStep >= step.id ? 'text-primary' : ''}`}>
                             <step.icon className={`h-5 w-5 mb-1 ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`} />
                             <span className="text-center">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline pt-4">
              <CurrentIcon className="h-7 w-7" /> {steps[currentStep-1].title}
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h-[250px]">
            {currentStep === 1 && (
              <div className="text-center space-y-4 pt-8">
                <h3 className="text-xl">Let's get your profile ready for action!</h3>
                <p className="text-muted-foreground">A complete profile helps our AI find you the best teammates and helps others discover you. This will only take a few minutes.</p>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Ada Lovelace" defaultValue="Ada Lovelace" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" defaultValue="ada.lovelace@example.com" />
                </div>
              </div>
            )}
             {currentStep === 3 && (
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground">Select your top skills from the list below.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {predefinedSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`skill-${skill}`} 
                        onCheckedChange={(checked) => handleSkillChange(skill, !!checked)}
                        checked={skills.includes(skill)}
                      />
                      <Label htmlFor={`skill-${skill}`} className="font-normal">{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground">What topics are you passionate about? Press Enter or comma to add an interest.</p>
                <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Input 
                      id="interests" 
                      placeholder="e.g., AI/ML, Web3"
                      value={currentInterest}
                      onChange={(e) => setCurrentInterest(e.target.value)}
                      onKeyDown={handleInterestKeyDown}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map(interest => (
                    <Badge key={interest} variant="outline" className="flex items-center gap-1">
                      {interest}
                      <button onClick={() => removeInterest(interest)} className="rounded-full hover:bg-destructive/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
             {currentStep === 5 && (
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground">List some hackathons or tech events you've participated in.</p>
                <div className="flex gap-4 items-end">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" placeholder="e.g., AI Global Hackathon 2024" value={currentEventName} onChange={e => setCurrentEventName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="eventRole">Your Role/Project</Label>
                        <Input id="eventRole" placeholder="e.g., Frontend Dev" value={currentEventRole} onChange={e => setCurrentEventRole(e.target.value)} />
                    </div>
                    <Button onClick={addPastEvent} variant="secondary">Add</Button>
                </div>
                <div className="space-y-2 mt-4">
                  {pastEvents.map((event, index) => (
                    <Card key={index} className="p-3 flex justify-between items-center bg-muted/50">
                      <div>
                          <p className="font-semibold">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.role}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removePastEvent(index)}>
                          <X className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 6 && (
                 <div className="text-center space-y-4 pt-8">
                    <h3 className="text-xl font-semibold">Congratulations, Ada!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Your HackMate profile is complete. You're ready to connect with innovators, join events, and build amazing things.</p>
                     <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/dashboard">Go to my Dashboard <ArrowRight className="ml-2 h-5 w-5"/></Link>
                    </Button>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && currentStep < steps.length ? (
                <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
            ) : <div />}

            {currentStep < steps.length -1 ? (
                <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : currentStep === steps.length - 1 ? (
                 <Button onClick={nextStep}>
                    Finish <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
            ) : <div />}

          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
