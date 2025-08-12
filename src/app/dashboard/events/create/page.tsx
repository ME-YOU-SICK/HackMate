
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
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { technologies, skills } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createEventAction } from '@/app/actions/create-event.action';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

const createEventSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters."),
  eventDescription: z.string().min(10, "Description must be at least 10 characters."),
  techStack: z.array(z.string()).min(1, "Please select at least one technology."),
  requiredSkills: z.array(z.string()).min(1, "Please select at least one skill."),
  maxTeamSize: z.coerce.number().min(1, "Max team size must be at least 1.").max(10, "Max team size cannot exceed 10."),
  dateRange: z.custom<DateRange>().refine(val => val?.from, "Please select a date range."),
});


const MultiSelectGrid = ({ title, items, field }: { title: string, items: { id: string, label: string }[], field: any }) => (
    <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <ScrollArea className="h-48 border rounded-md">
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={item.id}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                                return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value: string) => value !== item.id))
                            }}
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


export default function CreateEventPage() {
    const { toast } = useToast();
    const [user] = useAuthState(auth);
    const [eventCode, setEventCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            eventName: "",
            eventDescription: "",
            techStack: [],
            requiredSkills: [],
            maxTeamSize: 4,
        }
    });

    const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
        if (!user) {
            toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('eventName', data.eventName);
        formData.append('eventDescription', data.eventDescription);
        formData.append('maxTeamSize', String(data.maxTeamSize));
        formData.append('techStack', JSON.stringify(data.techStack));
        formData.append('requiredSkills', JSON.stringify(data.requiredSkills));
        formData.append('dateRange', JSON.stringify({ from: data.dateRange?.from?.toISOString(), to: data.dateRange?.to?.toISOString() }));
        formData.append('organizerId', user.uid);
        
        const result = await createEventAction(formData);
        
        setIsSubmitting(false);

        if (result.success && result.eventCode) {
            setEventCode(result.eventCode);
            setIsDialogOpen(true);
            toast({ title: "Event Created!", description: "Your event has been created successfully." });
        } else {
            toast({ title: "Error Creating Event", description: result.error, variant: "destructive" });
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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="eventName">Event Name</Label>
                                <Input id="eventName" placeholder="e.g., AI Global Hackathon 2024" {...register("eventName")} />
                                {errors.eventName && <p className="text-sm text-destructive">{errors.eventName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="eventDescription">Event Description</Label>
                                <Textarea id="eventDescription" placeholder="Describe your event..." rows={5} {...register("eventDescription")} />
                                {errors.eventDescription && <p className="text-sm text-destructive">{errors.eventDescription.message}</p>}
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Event Dates</Label>
                                    <Controller
                                        name="dateRange"
                                        control={control}
                                        render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value?.from ? (
                                                    field.value.to ? (
                                                        <>
                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                        {format(field.value.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(field.value.from, "LLL dd, y")
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
                                                    defaultMonth={field.value?.from}
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    numberOfMonths={2}
                                                />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                    {errors.dateRange && <p className="text-sm text-destructive">{errors.dateRange.message as string}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxTeamSize">Max Team Size</Label>
                                    <Input id="maxTeamSize" type="number" {...register("maxTeamSize")} />
                                    {errors.maxTeamSize && <p className="text-sm text-destructive">{errors.maxTeamSize.message}</p>}
                                </div>
                            </div>

                             <Controller
                                name="techStack"
                                control={control}
                                render={({ field }) => <MultiSelectGrid title="Allowed Tech Stack" items={technologies} field={field} />}
                            />
                            {errors.techStack && <p className="text-sm text-destructive">{errors.techStack.message}</p>}
                            
                            <Controller
                                name="requiredSkills"
                                control={control}
                                render={({ field }) => <MultiSelectGrid title="Required Skills" items={skills} field={field} />}
                            />
                            {errors.requiredSkills && <p className="text-sm text-destructive">{errors.requiredSkills.message}</p>}
                            
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
