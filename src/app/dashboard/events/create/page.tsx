
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileHeader } from "@/components/ui/sidebar";
import { ArrowLeft, Calendar as CalendarIcon, Clipboard, ClipboardCheck, PartyPopper } from "lucide-react";
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function generateEventCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function CreateEventPage() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [date, setDate] = useState<DateRange | undefined>();
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [eventCode, setEventCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = generateEventCode();
        setEventCode(code);
        setIsDialogOpen(true);
    };

    const copyToClipboard = () => {
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
                                <Input id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g., AI Global Hackathon 2024" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="eventDescription">Event Description</Label>
                                <Textarea id="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Describe your event..." rows={5} required />
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
                                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Virtual or San Francisco, CA" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Event Banner Image URL</Label>
                                <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://placehold.co/1200x400.png" />
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button type="submit" size="lg">Create Event</Button>
                                </DialogTrigger>
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
