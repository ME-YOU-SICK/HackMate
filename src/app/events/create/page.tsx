
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const skillCategories = {
  "Programming Languages": ["JavaScript / TypeScript", "Python", "Java", "C++", "C#", "Go", "Ruby", "Rust", "PHP", "Swift", "Kotlin", "Dart", "R Programming", "MATLAB", "Scala"],
  "Frontend Development": ["HTML5 / CSS3", "React.js", "Next.js", "Vue.js", "Svelte", "Tailwind CSS", "Bootstrap", "Web Accessibility (a11y)", "UI/UX Design", "Progressive Web Apps (PWA)", "Responsive Web Design", "Figma to Code Integration"],
  "Backend Development": ["Node.js", "Express.js", "Django", "Flask", "Spring Boot", "GraphQL", "REST API Design", "WebSockets / Real-Time Apps", "Microservices Architecture", "API Security & Authentication (OAuth, JWT)", "Serverless Functions"],
  "Mobile Development": ["React Native", "Flutter", "SwiftUI", "Android (Java/Kotlin)", "Mobile UI/UX Design", "Mobile Performance Optimization"],
  "Databases & Storage": ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Redis", "Elasticsearch", "Neo4j (Graph Databases)"],
  "Cloud & DevOps": ["AWS", "Google Cloud Platform", "Microsoft Azure", "Docker", "Kubernetes", "CI/CD (GitHub Actions, GitLab CI, CircleCI)", "Infrastructure as Code (Terraform)", "Cloud Security", "API Gateways"],
  "AI / Data Science": ["Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Computer Vision", "TensorFlow / PyTorch", "Data Analysis (Pandas, NumPy)", "Data Visualization (Matplotlib, Seaborn, D3.js)", "AI Ethics & Responsible AI"],
  "Cybersecurity": ["Ethical Hacking / Pen Testing", "Network Security", "Cryptography", "Security Auditing", "Cloud Security", "Identity & Access Management (IAM)"],
  "Other Hackathon Skills": ["API Integration", "Blockchain / Web3 Development", "Smart Contracts (Solidity)", "AR/VR Development (Unity, Unreal, Three.js)", "IoT Development", "Game Development", "Automation Scripting", "Web Scraping"],
};


export default function CreateEventPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-sora text-3xl">Create a New Event</CardTitle>
          <CardDescription>
            Fill in the details below to set up your next hackathon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" placeholder="e.g., AI for Good Hackathon" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Event Description</Label>
              <Textarea id="event-description" placeholder="Describe what your hackathon is all about." rows={5} />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <DatePicker />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Mode</Label>
              <RadioGroup defaultValue="online" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="mode-online" />
                  <Label htmlFor="mode-online">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="mode-offline" />
                  <Label htmlFor="mode-offline">Offline</Label>
                </div>
              </RadioGroup>
            </div>

             <div className="space-y-2">
                <Label htmlFor="max-team-size">Max Team Size</Label>
                <Input id="max-team-size" type="number" min="1" defaultValue="4" className="w-24" />
             </div>

            <div className="space-y-4">
              <Label>Allowed Tech Stacks & Skills</Label>
              <div className="space-y-6 rounded-lg border p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="mb-3 font-semibold text-orange-400">{category}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox id={`skill-${skill.replace(/\s+/g, '-')}`} />
                          <Label htmlFor={`skill-${skill.replace(/\s+/g, '-')}`} className="text-sm font-normal text-muted-foreground">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Event Banner</Label>
              <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed hover:border-orange-500">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click or drag file to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registration-link">Registration Link</Label>
              <Input id="registration-link" type="url" placeholder="https://your-event-registration.com" />
            </div>

            <Button type="submit" className={cn("w-full warm-gradient text-white")}>
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
