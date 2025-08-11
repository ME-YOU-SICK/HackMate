
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { signUpWithEmailAndPassword } from "@/lib/auth";
import { updateUserProfile } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('participant');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signUpWithEmailAndPassword(email, password, fullName);

    if (result.success && result.userId) {
      await updateUserProfile(result.userId, {
        uid: result.userId,
        email,
        fullName,
        // you can add role here if it's part of your user profile
      });
      
      toast({
        title: "Account Created!",
        description: "Welcome to HackMate! Let's get your profile set up.",
      });
      router.push('/dashboard/onboarding');

    } else {
      setIsLoading(false);
      setError(result.error || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[radial-gradient(#29ABE2_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-border/50">
        <CardHeader className="text-center">
           <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join HackMate to find your dream team.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Signup Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Ada Lovelace" required value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup value={role} onValueChange={setRole} className="flex gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="participant" id="participant" />
                  <Label htmlFor="participant">Participant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="organizer" id="organizer" />
                  <Label htmlFor="organizer">Organizer</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="underline text-primary/90 hover:text-primary">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
