# HackMate Platform

A comprehensive hackathon management platform that connects participants, organizers, recruiters, and sponsors in a seamless ecosystem.

## 🚀 Features

### For Participants
- **Profile Management** - Showcase your skills, projects, and experience
- **Event Discovery** - Find and join hackathons that match your interests
- **Skills Tracker** - Track in-demand skills and technologies
- **Team Formation** - Create or join teams with complementary skills
- **Resource Library** - Access curated learning resources and tools
- **Quiz Integration** - Practice with coding challenges from popular platforms

### For Organizers
- **Event Management** - Create and manage hackathon events
- **Team Management** - Oversee team formation and progression
- **Announcements** - Communicate with participants, panels, and teams
- **Sponsorship** - Connect with sponsors and manage funding
- **Analytics** - Track event progress and participant engagement

### For Recruiters
- **Candidate Discovery** - Find talented participants
- **Job Postings** - Post opportunities and requirements
- **Interview Management** - Schedule and conduct interviews
- **Skills Assessment** - Evaluate candidate capabilities

### For Sponsors
- **Event Sponsorship** - Support hackathons and gain visibility
- **Talent Pipeline** - Access to top-performing participants
- **Analytics Dashboard** - Track ROI and engagement metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Graphics**: Three.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hackmate-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
hackmate-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── participant/       # Participant dashboard
│   │   ├── organizer/         # Organizer dashboard
│   │   ├── recruiter/         # Recruiter dashboard
│   │   ├── sponsor/           # Sponsor dashboard
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   └── lib/                  # Utility functions
├── public/                   # Static assets
└── ...                      # Configuration files
```

## 🎨 Design System

The platform uses a consistent design system with:
- **Deep Blue Gradient** theme throughout the application
- **Glowing Effects** for cards and interactive elements
- **Responsive Design** that works on all devices
- **Dark/Light Mode** support
- **Smooth Animations** using Framer Motion

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. The `netlify.toml` file is already configured
3. Deploy automatically on every push to main branch

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Manual Build

```bash
npm run build
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌟 Key Features

### Role-Based Access Control
- **Participants** - Join events, form teams, showcase skills
- **Organizers** - Manage events, teams, and sponsorships
- **Recruiters** - Find talent and post opportunities
- **Sponsors** - Support events and access talent pipeline

### Smart Team Formation
- **Intelligent Pairing** - Algorithm matches participants with complementary skills
- **Role Compatibility** - Ensures balanced teams with diverse expertise
- **Newbie Protection** - Pairs beginners with experienced members
- **Experience Balancing** - Mixes different skill levels appropriately

### Comprehensive Event Management
- **Multi-Round Events** - Support for complex hackathon structures
- **Panel Management** - Organize participants into specialized tracks
- **Progress Tracking** - Monitor team advancement through rounds
- **Submission Management** - Handle presentations, repos, and documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, email support@hackmate.com or join our community Discord.

---

**HackMate** - Empowering the next generation of innovators through collaborative hackathons.