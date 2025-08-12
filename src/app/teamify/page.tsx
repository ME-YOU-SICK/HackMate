
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

const availableTech = ['React', 'Node.js', 'Python', 'GenAI', 'Firebase', 'Next.js', 'TypeScript', 'Go', 'Rust'];
const availableSkills = ['Frontend', 'Backend', 'Full-stack', 'UI/UX Design', 'Project Management', 'DevOps', 'Data Science'];

export default function TeamifyPage() {
  const [teamSize, setTeamSize] = useState(3);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projectIdea, setProjectIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TeamifyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleTechChange = (tech: string) => {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSkillChange = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await teamify({
        teamSize,
        techStack,
        skills,
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
    <div className="container mx-auto max-w-3xl py-10">
      <Card className="border-slate-800 bg-slate-900/50">
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
                <Label>What tech stack are you planning to use?</Label>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {availableTech.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tech-${tech}`}
                        checked={techStack.includes(tech)}
                        onCheckedChange={() => handleTechChange(tech)}
                      />
                      <Label htmlFor={`tech-${tech}`} className="font-normal">
                        {tech}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>What skills are you looking for in team members?</Label>
                 <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={skills.includes(skill)}
                        onCheckedChange={() => handleSkillChange(skill)}
                      />
                      <Label htmlFor={`skill-${skill}`} className="font-normal">
                        {skill}
                      </Label>
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

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
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
                <p className="text-slate-300">We've found the best candidates from your connections. An invitation has been sent to them.</p>
              </div>
              <div className="space-y-4">
                {result.team.map((member) => (
                   <Card key={member.name} className="border-slate-700 bg-slate-800/50 p-4">
                     <CardTitle className="text-lg">{member.name}</CardTitle>
                     <p className="text-sm font-bold text-orange-400">{member.assignedRole}</p>
                     <p className="mt-2 text-xs text-slate-400">{member.reasoning}</p>
                   </Card>
                ))}
              </div>
               <Card className="border-slate-700 bg-slate-800/50 p-4">
                  <h4 className="font-bold">Invitation Message Sent:</h4>
                  <p className="mt-2 text-sm text-slate-300 italic">"{result.invitationMessage}"</p>
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
