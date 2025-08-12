import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Cpu, Flame, Lightbulb, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import PopularCard from './popular-card';

const mostDemandedTech = [
  { name: 'React', icon: Code },
  { name: 'Python', icon: Flame },
  { name: 'Node.js', icon: Zap },
  { name: 'GenAI', icon: Cpu },
];

const mostDemandedSkills = [
  { name: 'Frontend Dev' },
  { name: 'Backend Dev' },
  { name: 'UI/UX Design' },
  { name: 'Project Management' },
];

const mostListedSkills = [
    { name: 'APIs' },
    { name: 'Databases' },
    { name: 'Prototyping' },
    { name: 'Cloud Services' },
  ];

const leastDemandedSkills = [
    { name: 'Delphi' },
    { name: 'Pascal' },
    { name: 'COBOL' },
    { name: 'Fortran' },
  ];

export default function PopularFeed() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="font-sora text-2xl">Popular Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tech" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tech">Tech & Skills</TabsTrigger>
            <TabsTrigger value="users">User Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="tech" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-semibold text-foreground">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                  Most Demanded Tech Stack
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {mostDemandedTech.map((tech) => (
                    <PopularCard key={tech.name} item={tech} color="green" />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 flex items-center text-lg font-semibold text-foreground">
                  <Lightbulb className="mr-2 h-5 w-5 text-blue-400" />
                  Most Demanded Skills
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {mostDemandedSkills.map((skill) => (
                    <PopularCard key={skill.name} item={skill} color="blue" />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="users" className="mt-6">
          <div className="space-y-6">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-semibold text-foreground">
                  <TrendingUp className="mr-2 h-5 w-5 text-red-400" />
                  Most Listed Skills by Users
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {mostListedSkills.map((skill) => (
                    <PopularCard key={skill.name} item={skill} color="red" />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 flex items-center text-lg font-semibold text-foreground">
                  <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
                  Least Demanded Skills
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {leastDemandedSkills.map((skill) => (
                    <PopularCard key={skill.name} item={skill} color="red" />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
