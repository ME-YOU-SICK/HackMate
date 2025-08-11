
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function SignupPage() {
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
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Ada Lovelace" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label>I am a...</Label>
            <RadioGroup defaultValue="participant" className="flex gap-4 pt-2">
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
          <Button className="w-full" asChild>
            <Link href="/dashboard/onboarding">Create Account</Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary/90 hover:text-primary">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
