
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
        skills: ['JavaScript / TypeScript', 'Python', 'React.js', 'Next.js', 'Node.js', 'Firebase', 'Natural Language Processing (NLP)', 'Machine Learning', 'Full-Stack Development', 'API-First Design'],
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
        skills: ['UI/UX Design', 'Figma to Code Integration', 'Web Accessibility (a11y)', 'Responsive Web Design', 'Design Thinking', 'Team Collaboration Tools (Trello, Notion, Jira, Asana)'],
        pastProjects: [
            { title: 'Mobile Banking App Redesign', description: 'A complete overhaul of a major bank\'s mobile application.' },
            { title: 'Design System for a Startup', description: 'Created a component library from scratch.' },
        ],
        pastHackathons: [
            { name: 'Fintech Challenge 2023', award: 'Top 5 Finalist' },
            { name: 'Design for Good Hackathon', award: 'Most Impactful Design' },
        ],
    },
    {
        id: 'casey-newton',
        name: 'Casey Newton',
        skills: ['Project Management', 'Agile / Scrum Methodologies', 'Pitching & Public Speaking', 'DevRel (Developer Relations)', 'Time Management', 'Digital Transformation'],
        pastProjects: [
            { title: 'Community Growth Initiative', description: 'Led a team to grow developer community engagement by 150%.'}
        ],
        pastHackathons: [],
    },
    {
        id: 'devon-rex',
        name: 'Devon Rex',
        skills: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow / PyTorch', 'Data Analysis (Pandas, NumPy)', 'Data Visualization (Matplotlib, Seaborn, D3.js)', 'Computer Vision'],
        pastProjects: [
            { title: 'Sentiment Analysis Engine', description: 'A tool for analyzing customer feedback from text.' },
        ],
        pastHackathons: [
             { name: 'DataFest 2024', award: 'Best Visualization' },
             { name: 'AI for Social Good', award: '1st Place Winner' },
        ],
    },
    {
        id: 'eliot-ness',
        name: 'Eliot Ness',
        skills: ['Go', 'Rust', 'Docker', 'Kubernetes', 'Microservices Architecture', 'CI/CD (GitHub Actions, GitLab CI, CircleCI)', 'AWS', 'Cloud-Native Development', 'API Security & Authentication (OAuth, JWT)'],
        pastProjects: [
             { title: 'High-Performance API Gateway', description: 'A cloud-native gateway for microservices.' },
             { title: 'CI/CD Pipeline Automation', description: 'Built a fully automated deployment pipeline for a fleet of microservices.' },
        ],
        pastHackathons: [
             { name: 'Cloud Native Hacks', award: 'Most Scalable Solution' },
        ],
    },
     {
        id: 'fiona-gallagher',
        name: 'Fiona Gallagher',
        skills: ['React.js', 'TypeScript', 'HTML5 / CSS3', 'Tailwind CSS', 'GraphQL', 'Progressive Web Apps (PWA)', 'Full-Stack Development'],
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
