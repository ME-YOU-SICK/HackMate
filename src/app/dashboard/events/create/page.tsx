
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileHeader } from "@/components/ui/sidebar";
import { ArrowLeft, Calendar as CalendarIcon, Clipboard, ClipboardCheck, Loader, PartyPopper } from "lucide-react";
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { createEventAction } from '@/app/actions/create-event.action';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function CreateEventPage() {
    const { toast } = useToast();
    const [user] = useAuthState(auth);
    const [date, setDate] = useState<DateRange | undefined>();
    const [eventCode, setEventCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
             toast({
                title: "Authentication Error",
                description: "You must be logged in to create an event.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append('dateRange', JSON.stringify(date || {}));
        formData.append('organizerId', user.uid);

        const result = await createEventAction(formData);

        setIsSubmitting(false);

        if (result.success && result.eventCode) {
            setEventCode(result.eventCode);
            setIsDialogOpen(true);
        } else {
            toast({
                title: "Error Creating Event",
                description: result.error || "An unexpected error occurred.",
                variant: "destructive"
            });
        }
    };

    const copyToClipboard = () => {
        if (!eventCode) return;
        navigator.clipboard.writeText(eventCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    return (
        <>
            <MobileHeader>
                <h2 className="text-xl font-bold">Create Event</h2>
            </MobileHeader>
            <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                <div className="flex items-center gap-4">
                     <Button asChild variant="outline" size="icon">
                        <Link href="/dashboard/events"><ArrowLeft /></Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Create a New Event</h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                        <CardDescription>Fill out the form below to create your event.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="eventName">Event Name</Label>
                                <Input name="eventName" id="eventName" placeholder="e.g., AI Global Hackathon 2024" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="eventDescription">Event Description</Label>
                                <Textarea name="eventDescription" id="eventDescription" placeholder="Describe your event..." rows={5} required />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Event Dates</Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.from ? (
                                            date.to ? (
                                                <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                            ) : (
                                            <span>Pick a date range</span>
                                            )}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input name="location" id="location" placeholder="e.g., Virtual or San Francisco, CA" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Event Banner Image URL (Optional)</Label>
                                <Input name="imageUrl" id="imageUrl" placeholder="https://placehold.co/1200x400.png" />
                            </div>
                            <Button type="submit" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <><Loader className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                                ) : (
                                    "Create Event"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md text-center">
                        <DialogHeader className="items-center">
                            <PartyPopper className="h-12 w-12 text-primary mb-4" />
                            <DialogTitle className="text-2xl">Event Created Successfully!</DialogTitle>
                            <DialogDescription>
                                Share this unique code with your participants to let them join the event.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2 justify-center">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Event Code
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue={eventCode}
                                    readOnly
                                    className="text-2xl font-mono tracking-widest text-center h-12"
                                />
                            </div>
                            <Button type="button" size="icon" className="h-12 w-12" onClick={copyToClipboard}>
                                {isCopied ? <ClipboardCheck className="h-6 w-6" /> : <Clipboard className="h-6 w-6" />}
                            </Button>
                        </div>
                    </DialogContent>
                 </Dialog>
            </div>
        </>
    );
}
