
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { teamify } from '@/ai/flows/teamify-flow';
import { Loader2 } from 'lucide-react';
import { TeamifyOutput } from '@/ai/flows/teamify-flow';
import { Separator } from '@/components/ui/separator';
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
  "Soft Skills & Leadership": ["Project Management", "Pitching & Public Speaking", "Design Thinking", "Technical Writing", "Agile / Scrum Methodologies", "Time Management", "Team Collaboration Tools (Trello, Notion, Jira, Asana)", "Networking & Community Building"],
  "Trendy Skills": ["Growth Hacking", "Thought Leadership", "Digital Transformation", "Cross-Functional Collaboration", "Data-Driven Decision Making", "Cloud-Native Development", "API-First Design", "Product-Led Growth", "Innovation Strategy", "Full-Stack Development", "DevRel (Developer Relations)", "MVP Development (Minimum Viable Product)"],
};

export default function TeamifyPage() {
  const [teamSize, setTeamSize] = useState(3);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [projectIdea, setProjectIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TeamifyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      // For the AI, we can send all selected items as 'skills' and a subset as 'techStack'
      const techStack = selectedSkills.filter(skill => 
        skillCategories["Programming Languages"].includes(skill) || 
        skillCategories["Frontend Development"].includes(skill) ||
        skillCategories["Backend Development"].includes(skill) ||
        skillCategories["Databases & Storage"].includes(skill)
      );

      const response = await teamify({
        teamSize,
        techStack: techStack,
        skills: selectedSkills,
        projectIdea,
      });
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-sora text-3xl">Teamify ✨</CardTitle>
          <CardDescription>
            Assemble your dream team with the power of AI. Just specify your needs, and we'll find the best-fit members from your connections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="team-size">How many team members do you need?</Label>
                <Input
                  id="team-size"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                  min="1"
                  max="10"
                  className="w-24"
                />
              </div>

              <div className="space-y-4">
                <Label>What skills and technologies are you looking for?</Label>
                <div className="space-y-6 rounded-lg border p-4">
                  {Object.entries(skillCategories).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="mb-3 font-semibold text-orange-400">{category}</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
                        {skills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={`skill-${skill.replace(/\s+/g, '-')}`}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={() => handleSkillChange(skill)}
                            />
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
                <Label htmlFor="project-idea">Describe your project idea (optional)</Label>
                <Textarea
                  id="project-idea"
                  placeholder="e.g., A platform to connect hackathon participants using GenAI..."
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className={cn("w-full warm-gradient text-white")} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding your team...
                  </>
                ) : 'Find My Team'}
              </Button>
            </form>
          ) : (
             <div className="space-y-6">
              <div>
                <h3 className="font-sora text-2xl font-bold text-green-400">Team Assembled!</h3>
                <p className="text-muted-foreground">We've found the best candidates from your connections. An invitation has been sent to them.</p>
              </div>
              <div className="space-y-4">
                {result.team.map((member) => (
                   <Card key={member.name} className="bg-secondary/30 p-4">
                     <CardTitle className="text-lg">{member.name}</CardTitle>
                     <p className="text-sm font-bold text-orange-400">{member.assignedRole}</p>
                     <p className="mt-2 text-xs text-muted-foreground">{member.reasoning}</p>
                   </Card>
                ))}
              </div>
               <Card className="bg-secondary/30 p-4">
                  <h4 className="font-bold">Invitation Message Sent:</h4>
                  <p className="mt-2 text-sm italic text-muted-foreground">"{result.invitationMessage}"</p>
               </Card>
               <Button onClick={() => setResult(null)} variant="outline">Start Over</Button>
             </div>
          )}

           {error && (
              <div className="mt-4 rounded-md border border-red-500/50 bg-red-500/20 p-4 text-center text-sm text-red-400">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
