
// This is a mock service to simulate fetching user data from a database.
// In a real application, this would be replaced with actual database queries.

export interface UserProfile {
    id: string;
    name: string;
    skills: string[];
    pastProjects: Array<{ title: string; description: string; }>;
    pastHackathons: Array<{ name:string; award: string; }>;
}

const mockUsers: UserProfile[] = [
    {
        id: 'alex-turing',
        name: 'Alex Turing',
        skills: ['React', 'Node.js', 'Python', 'GenAI', 'Firebase', 'Next.js', 'TypeScript', 'Frontend', 'Backend', 'Full-stack'],
        pastProjects: [
            { title: 'AI-Powered Code Assistant', description: 'An intelligent code completion tool that learns from your coding style.' },
            { title: 'Decentralized Social Network', description: 'A social media platform built on blockchain technology.' },
        ],
        pastHackathons: [
            { name: 'AI Hackathon 2023', award: '1st Place Winner' },
            { name: 'Web3 Conclave 2022', award: 'Best DeFi Project' },
        ],
    },
    {
        id: 'breanna-jensen',
        name: 'Breanna Jensen',
        skills: ['UI/UX Design', 'Figma', 'Prototyping', 'Frontend'],
        pastProjects: [
            { title: 'Mobile Banking App Redesign', description: 'A complete overhaul of a major bank\'s mobile application.' },
        ],
        pastHackathons: [
            { name: 'Fintech Challenge 2023', award: 'Top 5 Finalist' },
        ],
    },
    {
        id: 'casey-newton',
        name: 'Casey Newton',
        skills: ['Project Management', 'Agile', 'Scrum'],
        pastProjects: [],
        pastHackathons: [],
    },
    {
        id: 'devon-rex',
        name: 'Devon Rex',
        skills: ['Python', 'Data Science', 'Machine Learning', 'GenAI'],
        pastProjects: [
            { title: 'Sentiment Analysis Engine', description: 'A tool for analyzing customer feedback from text.' },
        ],
        pastHackathons: [
             { name: 'DataFest 2024', award: 'Best Visualization' },
        ],
    },
    {
        id: 'eliot-ness',
        name: 'Eliot Ness',
        skills: ['Go', 'Rust', 'Backend', 'DevOps', 'Kubernetes'],
        pastProjects: [
             { title: 'High-Performance API Gateway', description: 'A cloud-native gateway for microservices.' },
        ],
        pastHackathons: [
             { name: 'Cloud Native Hacks', award: 'Most Scalable Solution' },
        ],
    },
     {
        id: 'fiona-gallagher',
        name: 'Fiona Gallagher',
        skills: ['React', 'TypeScript', 'Frontend', 'UI/UX Design'],
        pastProjects: [
             { title: 'E-commerce Storefront', description: 'A responsive and accessible online shop.' },
        ],
        pastHackathons: [
             { name: 'RetailTech Hack 2022', award: '2nd Place Winner' },
        ],
    },
];


export async function getConnections(): Promise<UserProfile[]> {
    // In a real app, you'd fetch the current user's connections.
    // For now, we return all mock users as if they are all connected.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUsers);
        }, 500);
    });
}
