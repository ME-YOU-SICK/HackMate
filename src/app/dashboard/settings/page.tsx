
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { MobileHeader } from "@/components/ui/sidebar";
import { Loader, LogOut, PowerOff, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile, updateUserProfile } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteUserAccountAction, signOutAction } from "@/lib/auth";
import { deleteUser } from "firebase/auth";
import { useRouter } from "next/navigation";


const SettingsSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {children}
        </CardContent>
    </Card>
)

export default function SettingsPage() {
    const { setTheme, theme } = useTheme();
    const [user, authLoading] = useAuthState(auth);
    const { toast } = useToast();
    const router = useRouter();

    const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            setLoading(true);
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user, authLoading]);

    const handleProfileChange = async (key: keyof UserProfile, value: any) => {
        if (!profile) return;
        const updatedProfile = { ...profile, [key]: value };
        setProfile(updatedProfile);
        
        if (!user) return;
        setIsSaving(true);
        const result = await updateUserProfile(user.uid, { [key]: value });
        setIsSaving(false);
        if (!result.success) {
            toast({ title: "Error", description: "Failed to save setting.", variant: "destructive" });
        }
    };
    
    const handleDeleteAccount = async () => {
        if (!user) return;
        setIsDeleting(true);
        try {
            // First, delete Firestore data
            const dbDeleteResult = await deleteUserAccountAction(user.uid);
            if (!dbDeleteResult.success) {
                throw new Error(dbDeleteResult.error);
            }

            // Then, delete from Firebase Auth
            await deleteUser(user);
            
            toast({ title: "Account Deleted", description: "Your account has been permanently deleted." });
            router.push('/signup');

        } catch (error: any) {
            console.error("Deletion error:", error);
            toast({
                title: "Error Deleting Account",
                description: "This is a sensitive operation and may require you to log in again before it can be completed.",
                variant: "destructive"
            });
        } finally {
            setIsDeleting(false);
        }
    };


    if (loading || authLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader className="h-12 w-12 animate-spin" /></div>;
    }


    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Settings</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <Button disabled>
                        <Save className="mr-2 h-4 w-4" /> All Changes Saved
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                    {profile && (
                        <SettingsSection title="Profile & Privacy" description="Control how your information is displayed to others.">
                            <div className="space-y-2">
                                <Label>Profile Visibility</Label>
                                <RadioGroup 
                                    value={profile.visibility || 'public'} 
                                    onValueChange={(value) => handleProfileChange('visibility', value)}
                                    className="flex flex-col sm:flex-row gap-4 pt-2"
                                >
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="public" id="public" /><Label htmlFor="public">Public (visible to all)</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="event-only" id="event-only" /><Label htmlFor="event-only">Event-only (visible in same event)</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="private" id="private" /><Label htmlFor="private">Private (only connections)</Label></div>
                                </RadioGroup>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Show Past Projects</Label>
                                    <p className="text-xs text-muted-foreground">Allow others to see your project history on your profile.</p>
                                </div>
                                <Switch 
                                    checked={profile.showPastProjects}
                                    onCheckedChange={(checked) => handleProfileChange('showPastProjects', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Show Social Links</Label>
                                    <p className="text-xs text-muted-foreground">Display your connected GitHub, LinkedIn, etc. links.</p>
                                </div>
                                <Switch
                                    checked={profile.showSocialLinks}
                                    onCheckedChange={(checked) => handleProfileChange('showSocialLinks', checked)}
                                />
                            </div>
                        </SettingsSection>
                    )}

                    <SettingsSection title="Integrations" description="Connect your other accounts to streamline your HackMate experience.">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium">Connect GitHub</p>
                            <Button variant="outline">Connect</Button>
                        </div>
                         <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium">Connect LinkedIn</p>
                            <Button variant="outline">Connect</Button>
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Theme & Display" description="Customize the look and feel of the application.">
                        <div className="space-y-2">
                            <Label>Theme</Label>
                             <RadioGroup 
                                defaultValue={theme} 
                                onValueChange={setTheme}
                                className="flex flex-col sm:flex-row gap-4 pt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="light" id="light" /><Label htmlFor="light">Light</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="dark" id="dark" /><Label htmlFor="dark">Dark</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="system" id="system" /><Label htmlFor="system">System</Label></div>
                            </RadioGroup>
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Data & Account Management" description="Manage your data and account settings.">
                        <Button variant="outline" onClick={() => signOutAction().then(() => router.push('/login'))}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Sign Out
                        </Button>
                        <Separator/>
                        <div>
                            <h4 className="font-semibold text-destructive flex items-center gap-2 mb-2"><PowerOff/> Delete Account</h4>
                            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete My Account</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting}>
                                        {isDeleting ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : null}
                                        Continue
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </SettingsSection>
                </div>
            </div>
        </>
    );
}
