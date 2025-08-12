
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, PartyPopper, User, Tag, Trophy, Loader, Github, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technologies, skills as allSkills } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { updateUserProfile } from '@/lib/db';

const steps = [
  { id: 1, title: "Welcome!", icon: PartyPopper },
  { id: 2, title: "Your Profile", icon: User },
  { id: 3, title: "Skills & Tech", icon: Tag },
  { id: 4, title: "Experience", icon: Trophy },
  { id: 5, title: "All Set!", icon: CheckCircle },
];

const MultiSelectGrid = ({ title, items, selectedItems, onSelectionChange }: { title: string, items: { id: string, label: string }[], selectedItems: string[], onSelectionChange: (id: string, checked: boolean) => void }) => (
    <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <ScrollArea className="h-72 border rounded-md">
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={item.id}
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => onSelectionChange(item.id, !!checked)}
                        />
                        <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </ScrollArea>
    </div>
);


export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    age: '',
    city: '',
    githubUrl: '',
    linkedinUrl: '',
    techStack: [] as string[],
    skills: [] as string[],
    pastHackathons: '',
    pastProjects: '',
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      techStack: checked ? [...prev.techStack, id] : prev.techStack.filter(t => t !== id)
    }));
  };
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter(s => s !== skill)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  }

  const completeOnboarding = async () => {
     if (!user) {
        toast({ title: "Error", description: "You are not logged in.", variant: "destructive" });
        return;
     }

     setIsSaving(true);
     
     const profileData = {
        fullName: formData.fullName,
        age: Number(formData.age) || undefined,
        city: formData.city,
        techStack: formData.techStack,
        skills: formData.skills,
        pastHackathons: formData.pastHackathons,
        pastProjects: formData.pastProjects,
        socials: {
            github: formData.githubUrl,
            linkedin: formData.linkedinUrl,
        },
        connections: [],
        events: [],
        followers: 0,
        following: 0,
     };

     const result = await updateUserProfile(user.uid, profileData);

     setIsSaving(false);
     
     if (result.success) {
        toast({ title: "Profile Created!", description: "Welcome to HackMate!"});
        router.push('/dashboard/events');
     } else {
        toast({ title: "Error", description: "Could not save your profile.", variant: "destructive" });
     }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary/50">
      <div className="w-full max-w-3xl">
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

          <CardContent className="min-h-[450px] max-h-[60vh] overflow-y-auto p-6">
            {currentStep === 1 && (
              <div className="text-center space-y-4 pt-8">
                <h3 className="text-xl font-semibold">Let's get your profile ready for action!</h3>
                <p className="text-muted-foreground">A complete profile helps find you the best teammates and helps others discover you. This will only take a few minutes.</p>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" type="text" placeholder="Ada Lovelace" value={formData.fullName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" name="age" type="number" placeholder="28" value={formData.age} onChange={handleInputChange} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" type="text" placeholder="London, UK" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub Profile URL</Label>
                     <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/adalovelace" value={formData.githubUrl} onChange={handleInputChange} className="pl-10" />
                     </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                     <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="linkedinUrl" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/adalovelace" value={formData.linkedinUrl} onChange={handleInputChange} className="pl-10" />
                     </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                 <p className="text-sm text-muted-foreground text-center">Select your top skills and technologies.</p>
                 <MultiSelectGrid title="Tech Stack" items={technologies} selectedItems={formData.techStack} onSelectionChange={handleTechChange} />
                 <MultiSelectGrid title="General Skills" items={allSkills} selectedItems={formData.skills} onSelectionChange={handleSkillChange} />
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-6 max-w-lg mx-auto">
                 <p className="text-sm text-muted-foreground text-center">Optionally, tell us about your experience.</p>
                 <div>
                    <Label htmlFor="pastHackathons">Past Hackathons</Label>
                    <Textarea id="pastHackathons" name="pastHackathons" placeholder="e.g., Won 'Best AI Hack' at AI Global 2023..." value={formData.pastHackathons} onChange={handleInputChange} />
                 </div>
                  <div>
                    <Label htmlFor="pastProjects">Proudest Projects</Label>
                    <Textarea id="pastProjects" name="pastProjects" placeholder="e.g., Built a real-time chat application with WebSockets..." value={formData.pastProjects} onChange={handleInputChange} />
                 </div>
              </div>
            )}
            {currentStep === 5 && (
                 <div className="text-center space-y-4 pt-8">
                    <h3 className="text-xl font-semibold">Congratulations!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Your HackMate profile is complete. You're ready to connect with innovators, join events, and build amazing things.</p>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && currentStep < steps.length && (
                <Button variant="outline" onClick={prevStep} disabled={isSaving}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
            )}
             {currentStep === 1 && <div />}


            {currentStep < steps.length -1 && (
                <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}

            {currentStep === steps.length -1 && (
                 <Button onClick={nextStep}>
                    Finish <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
            
             {currentStep === steps.length && (
                <Button onClick={completeOnboarding} disabled={isSaving}>
                    {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4" />}
                    Finish & Go to Dashboard
                </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
