
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, PartyPopper, User, Tag, Trophy, X, Loader } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, title: "Welcome!", icon: PartyPopper },
  { id: 2, title: "Your Profile", icon: User },
  { id: 3, title: "Your Skills", icon: Tag },
  { id: 4, title: "Your Interests", icon: Tag },
  { id: 5, title: "Past Events", icon: Trophy },
  { id: 6, title: "All Set!", icon: CheckCircle },
];

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      "JavaScript / TypeScript", "Python", "Java", "C++", "C#", "Go", "Ruby", "Rust", "PHP", "Swift", "Kotlin", "Dart", "R Programming", "MATLAB", "Scala"
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      "HTML5 / CSS3", "React.js", "Next.js", "Vue.js", "Svelte", "Tailwind CSS", "Bootstrap", "Web Accessibility (a11y)", "UI/UX Design", "Progressive Web Apps (PWA)", "Responsive Web Design", "Figma to Code Integration"
    ]
  },
  {
    category: "Backend Development",
    skills: [
      "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "GraphQL", "REST API Design", "WebSockets / Real-Time Apps", "Microservices Architecture", "API Security & Authentication (OAuth, JWT)", "Serverless Functions"
    ]
  },
  {
    category: "Mobile Development",
    skills: [
      "React Native", "Flutter", "SwiftUI", "Android (Java/Kotlin)", "Mobile UI/UX Design", "Mobile Performance Optimization"
    ]
  },
  {
    category: "Databases & Storage",
    skills: [
      "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Redis", "Elasticsearch", "Neo4j (Graph Databases)"
    ]
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS", "Google Cloud Platform", "Microsoft Azure", "Docker", "Kubernetes", "CI/CD (GitHub Actions, GitLab CI, CircleCI)", "Infrastructure as Code (Terraform)", "Cloud Security", "API Gateways"
    ]
  },
  {
    category: "AI / Data Science",
    skills: [
      "Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Computer Vision", "TensorFlow / PyTorch", "Data Analysis (Pandas, NumPy)", "Data Visualization (Matplotlib, Seaborn, D3.js)", "AI Ethics & Responsible AI"
    ]
  },
  {
    category: "Cybersecurity",
    skills: [
      "Ethical Hacking / Pen Testing", "Network Security", "Cryptography", "Security Auditing", "Cloud Security", "Identity & Access Management (IAM)"
    ]
  },
  {
    category: "Other Hackathon-Relevant Skills",
    skills: [
      "API Integration", "Blockchain / Web3 Development", "Smart Contracts (Solidity)", "AR/VR Development (Unity, Unreal, Three.js)", "IoT Development", "Game Development", "Automation Scripting", "Web Scraping"
    ]
  },
  {
    category: "Soft Skills & Leadership",
    skills: [
      "Project Management", "Pitching & Public Speaking", "Design Thinking", "Technical Writing", "Agile / Scrum Methodologies", "Time Management", "Team Collaboration Tools (Trello, Notion, Jira, Asana)", "Networking & Community Building"
    ]
  },
  {
    category: "LinkedIn Buzzwords & Trendy Skills",
    skills: [
      "Growth Hacking", "Thought Leadership", "Digital Transformation", "Cross-Functional Collaboration", "Data-Driven Decision Making", "Cloud-Native Development", "API-First Design", "Product-Led Growth", "Innovation Strategy", "Full-Stack Development", "DevRel (Developer Relations)", "MVP Development (Minimum Viable Product)"
    ]
  }
];

export default function OnboardingPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [pastEvents, setPastEvents] = useState<{name: string, role: string}[]>([]);
  const [currentEventName, setCurrentEventName] = useState('');
  const [currentEventRole, setCurrentEventRole] = useState('');
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setFullName(user.displayName || '');
        setEmail(user.email || '');
    }
  }, [user, loading, router]);


  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const saveProfileData = async () => {
    if (!user) return;
    setIsSaving(true);
    const profileData = {
        fullName,
        email,
        skills,
        interests,
        pastEvents,
    };
    const result = await updateUserProfile(user.uid, profileData);
    setIsSaving(false);
    if (result.success) {
      toast({ title: "Progress Saved!", variant: 'default' });
    } else {
      toast({ title: "Error", description: "Could not save progress.", variant: 'destructive' });
    }
  }

  const nextStep = async () => {
    if (currentStep < steps.length -1) {
        await saveProfileData();
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  }
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

  if (loading || !user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary/50">
            <Loader className="h-12 w-12 animate-spin text-primary"/>
            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
    )
  }

  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary/50">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <Card>
          <CardHeader>
             <div className="w-full mb-4">
                <p className="text-sm text-center text-muted-foreground mb-2">Step {currentStep} of {steps.length}</p>
                <Progress value={progress} className="h-2" />
            </div>
            <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold tracking-tight pt-4">
              <CurrentIcon className="h-7 w-7 text-primary" /> {steps[currentStep-1].title}
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h-[350px] max-h-[50vh] overflow-y-auto p-6">
            {currentStep === 1 && (
              <div className="text-center space-y-4 pt-8">
                <h3 className="text-xl font-semibold">Let's get your profile ready for action!</h3>
                <p className="text-muted-foreground">A complete profile helps our AI find you the best teammates and helps others discover you. This will only take a few minutes.</p>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Ada Lovelace" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} disabled />
                </div>
              </div>
            )}
             {currentStep === 3 && (
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground text-center">Select your top skills from the categories below.</p>
                 <Accordion type="multiple" className="w-full">
                    {skillCategories.map(category => (
                      <AccordionItem key={category.category} value={category.category}>
                        <AccordionTrigger className="font-semibold">{category.category}</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                            {category.skills.map(skill => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`skill-${skill}`} 
                                  onCheckedChange={(checked) => handleSkillChange(skill, !!checked)}
                                  checked={skills.includes(skill)}
                                />
                                <Label htmlFor={`skill-${skill}`} className="font-normal text-sm">{skill}</Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </Accordion>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-4 max-w-md mx-auto">
                 <p className="text-sm text-muted-foreground text-center">What topics are you passionate about? Press Enter or comma to add an interest.</p>
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
                    <Badge key={interest} variant="secondary" className="flex items-center gap-1">
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
              <div className="space-y-4 max-w-md mx-auto">
                 <p className="text-sm text-muted-foreground text-center">List some hackathons or tech events you've participated in.</p>
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
                    <h3 className="text-xl font-semibold">Congratulations, {fullName}!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Your HackMate profile is complete. You're ready to connect with innovators, join events, and build amazing things.</p>
                     <Button asChild size="lg">
                        <Link href="/dashboard">Go to my Dashboard <ArrowRight className="ml-2 h-5 w-5"/></Link>
                    </Button>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep} disabled={isSaving}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
            ) : <div />}

            {currentStep < steps.length ? (
                <Button onClick={nextStep} disabled={isSaving}>
                    {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    {currentStep < steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                    {currentStep === steps.length - 1 && <CheckCircle className="ml-2 h-4 w-4" />}
                </Button>
            ) : <div />}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
