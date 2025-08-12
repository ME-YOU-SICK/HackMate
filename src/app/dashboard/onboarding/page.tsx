
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, PartyPopper, User, Tag, Trophy, X, Loader, Upload, Github } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { technologies } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

const steps = [
  { id: 1, title: "Welcome!", icon: PartyPopper },
  { id: 2, title: "Your Profile", icon: User },
  { id: 3, title: "Skills & Tech", icon: Tag },
  { id: 4, title: "Experience", icon: Trophy },
  { id: 5, title: "All Set!", icon: CheckCircle },
];

export default function OnboardingPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    githubUrl: '',
    skills: [] as string[],
    tech: [] as string[],
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setFormData(prev => ({
            ...prev,
            fullName: user.displayName || '',
            email: user.email || '',
        }));
    }
  }, [user, loading, router]);


  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileData = async () => {
    if (!user) return;
    setIsSaving(true);
    const profileData = {
        fullName: formData.fullName,
        city: formData.city,
        skills: formData.skills,
        socials: { github: formData.githubUrl },
    };
    const result = await updateUserProfile(user.uid, profileData);
    setIsSaving(false);
    if (result.success) {
      toast({ title: "Progress Saved!", variant: 'default' });
    } else {
      toast({ title: "Error", description: result.error || "Could not save progress.", variant: 'destructive' });
    }
  }

  const nextStep = async () => {
    if (currentStep < steps.length) {
        if(currentStep !== 1 && currentStep !== steps.length -1) await saveProfileData();
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  }

  const completeOnboarding = async () => {
     await saveProfileData();
     router.push('/dashboard');
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter(s => s !== skill)
    }));
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
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" type="text" placeholder="Ada Lovelace" value={formData.fullName} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" type="text" placeholder="London, UK" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub Profile URL (Optional)</Label>
                    <Input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/adalovelace" value={formData.githubUrl} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label>Avatar</Label>
                    <div className="flex items-center gap-4">
                        <Button variant="outline"><Upload className="mr-2"/> Upload Image</Button>
                        <p className="text-xs text-muted-foreground">Or we'll use your Google/GitHub avatar.</p>
                    </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground text-center">Select your top skills and technologies.</p>
                 <ScrollArea className="h-80">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {technologies.map(tech => (
                        <div key={tech.id} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`skill-${tech.id}`} 
                                onCheckedChange={(checked) => handleSkillChange(tech.label, !!checked)}
                                checked={formData.skills.includes(tech.label)}
                            />
                            <Label htmlFor={`skill-${tech.id}`} className="font-normal text-sm flex items-center gap-2">
                                {tech.icon} {tech.label}
                            </Label>
                        </div>
                        ))}
                    </div>
                 </ScrollArea>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-4 max-w-md mx-auto">
                 <p className="text-sm text-muted-foreground text-center">Optionally, add past projects or hackathons you're proud of.</p>
                 {/* This can be implemented later */}
                 <div className="text-center p-8 border-dashed border-2 rounded-md mt-4">
                    <Trophy className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <p className="mt-4 text-muted-foreground">You can add past projects and events from your profile page later.</p>
                 </div>
              </div>
            )}
            {currentStep === 5 && (
                 <div className="text-center space-y-4 pt-8">
                    <h3 className="text-xl font-semibold">Congratulations, {formData.fullName}!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Your HackMate profile is complete. You're ready to connect with innovators, join events, and build amazing things.</p>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && currentStep <= steps.length ? (
                <Button variant="outline" onClick={prevStep} disabled={isSaving}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
            ) : <div />}

            {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} disabled={isSaving}>
                    {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : <div /> }
            
             {currentStep === steps.length -1 && (
                <Button onClick={nextStep} disabled={isSaving}>
                    {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}

             {currentStep === steps.length && (
                <Button onClick={completeOnboarding} disabled={isSaving}>
                    {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
                    Finish & Go to Dashboard
                    <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
