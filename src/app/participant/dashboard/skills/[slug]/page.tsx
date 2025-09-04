"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { BookOpen, ExternalLink, Lightbulb, ArrowLeft, ListChecks } from "lucide-react";

type Topic = { title: string; content: string };
type Resource = { title: string; url: string };
type Project = { title: string; description: string; milestones: string[] };

type SkillPack = { overview: string; topics: Topic[]; resources: Resource[]; projects: Project[] };

const mockResources: Record<string, SkillPack> = {
  react: {
    overview:
      "React is a declarative, component-driven library for building interactive user interfaces. It emphasizes predictable UI through one-way data flow, and offers hooks for managing state, effects, context, and performance optimizations.",
    topics: [
      { title: "Core Concepts (JSX & Components)", content: "Understand how JSX maps to elements, how to create function components, pass props, handle children, and compose UI from small parts." },
      { title: "State & Effects (Hooks)", content: "Use useState for local state, useEffect for side-effects, and learn patterns to avoid stale closures, dependency arrays pitfalls, and race conditions." },
      { title: "Performance", content: "Leverage memo, useMemo, and useCallback to avoid unnecessary renders; split code, lazy-load, and use Suspense where suitable." },
      { title: "Data Fetching", content: "Model data fetching with effects or libraries like React Query; handle loading, error states, retry logic, and caching." },
      { title: "Routing & State Management", content: "Use React Router/Next.js routing; pick state tools (Context, Redux, Zustand) for cross-component state and server cache separation." },
    ],
    resources: [
      { title: "Official Docs", url: "https://react.dev" },
      { title: "React Beta Docs", url: "https://beta.reactjs.org" },
      { title: "React Patterns", url: "https://reactpatterns.com" },
    ],
    projects: [
      {
        title: "Productive Todo App",
        description: "A keyboard-first todo app with filters, bulk actions, and offline support.",
        milestones: ["CRUD with local state", "Persist to localStorage", "Add keyboard shortcuts", "Offline-first UX"],
      },
      {
        title: "Dashboard with Charts",
        description: "Analytics dashboard that fetches data, shows charts, and handles error states.",
        milestones: ["REST fetch with loading & error", "Skeleton states", "Charting with Recharts", "Pagination & filters"],
      },
      {
        title: "Infinite Scroll Feed",
        description: "Social feed with virtualization, optimistic likes, and infinite scrolling.",
        milestones: ["Virtualized list", "Infinite scroll", "Optimistic updates", "Prefetch next page"],
      },
    ],
  },
  nextjs: {
    overview:
      "Next.js is a React framework offering file-system routing, server components, API routes, and powerful optimizations for performance and DX.",
    topics: [
      { title: "Routing & Layouts", content: "Use the App Router, nested layouts, dynamic routes, and route groups to structure complex apps." },
      { title: "Data Fetching", content: "Leverage server components, fetch caching, revalidation, and streaming for fast TTFB and UX." },
      { title: "Optimizations", content: "Use Image, Font, and Script optimizations; embrace edge runtime where applicable." },
      { title: "Deployment", content: "Understand build outputs, static vs dynamic rendering, environment variables, and platform adapters." },
    ],
    resources: [
      { title: "Next.js Docs", url: "https://nextjs.org/docs" },
      { title: "App Router", url: "https://nextjs.org/docs/app" },
      { title: "Vercel Learn", url: "https://vercel.com/learn" },
    ],
    projects: [
      { title: "Blog with MDX", description: "Static blog with MDX posts and dynamic routes.", milestones: ["MDX integration", "Dynamic route for post", "Incremental static regen", "Sitemap & RSS"] },
      { title: "SaaS Starter", description: "Auth, dashboard, and billing-ready starter.", milestones: ["Auth UI", "Protected routes", "Database layer", "Billing placeholder"] },
    ],
  },
  nodejs: {
    overview: "Node.js lets you run JavaScript on the server, building APIs and CLIs with a rich ecosystem.",
    topics: [
      { title: "HTTP & Express", content: "Build REST APIs, handle middleware, validation, and error handling." },
      { title: "Database Access", content: "Connect to Postgres/MongoDB, use Prisma or Mongoose for data modeling." },
      { title: "Testing", content: "Write unit/integration tests, mock external services, and use supertest for endpoints." },
    ],
    resources: [
      { title: "Node.js Docs", url: "https://nodejs.org/en/docs" },
      { title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html" },
      { title: "Prisma Docs", url: "https://www.prisma.io/docs" },
    ],
    projects: [
      { title: "REST API", description: "CRUD API with pagination and filtering.", milestones: ["Resource routes", "Validation", "Error handling", "Integration tests"] },
      { title: "CLI Tool", description: "A Node CLI to scaffold files.", milestones: ["Commander setup", "Config file", "E2E tests", "Publish to npm (mock)"] },
    ],
  },
};

function titleCase(slug: string) {
  return slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

function SkillDetailInner() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = (params?.slug || "").toString();
  const title = useMemo(() => titleCase(slug), [slug]);
  const key = slug.replace(/[^a-z0-9]+/g, "").toLowerCase();

  const fallbackPack: SkillPack = {
    overview: `${title} is a widely used technology. Below are core topics, resources, and projects to become productive quickly.`,
    topics: [
      { title: "Getting Started", content: `Install tooling, create a hello world, and learn ${title}'s core syntax.` },
      { title: "Core Concepts", content: `Deep-dive into the mental model and primitives ${title} provides.` },
      { title: "Ecosystem", content: `Explore common libraries and tooling that pair well with ${title}.` },
      { title: "Best Practices", content: `Adopt patterns for reliability, performance, and maintainability.` },
    ],
    resources: [
      { title: `Official ${title} Docs`, url: `https://www.google.com/search?q=${encodeURIComponent(title + " docs")}` },
      { title: `${title} Guide on MDN`, url: `https://developer.mozilla.org` },
      { title: `Awesome ${title}`, url: `https://github.com/sindresorhus/awesome` },
    ],
    projects: [
      { title: `${title} Starter`, description: `A basic starter to exercise fundamentals of ${title}.`, milestones: ["Scaffold project", "Run locally", "Ship a small feature"] },
      { title: `${title} Feature Build`, description: "Implement a non-trivial feature end-to-end.", milestones: ["Define scope", "Implement", "Test", "Polish"] },
    ],
  };

  const data: SkillPack = mockResources[key] || fallbackPack;

  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}> 
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h1>
                <p className="text-neutral-600 dark:text-neutral-400">Curated overview, resources, and project ideas</p>
              </div>
              <Link href="/participant/dashboard/skills" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Skills
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <GlowingCard icon={<BookOpen className="h-4 w-4" />} title="Overview" description="What this technology is about" className="h-full">
                <div className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {data.overview}
                </div>
              </GlowingCard>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Core Topics</h2>
                </div>
                <GlowingCard className="h-full">
                  <div className="mt-2 space-y-3 pb-6">
                    {data.topics.map((t, i) => (
                      <div key={i} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-2 mb-1">
                          <ListChecks className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-neutral-900 dark:text-white text-sm">{t.title}</span>
                        </div>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{t.content}</p>
                      </div>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Top Resources</h2>
                </div>
                <GlowingCard className="h-full">
                  <div className="mt-2 space-y-3">
                    {data.resources.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
                          <ExternalLink className="h-4 w-4 text-blue-600" /> {r.title}
                        </div>
                        <span className="text-xs text-neutral-500">Visit</span>
                      </a>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Practice Projects</h2>
              </div>
              <GlowingCard icon={<Lightbulb className="h-4 w-4" />} title="Hands-on Ideas" description="Build to learn effectively" className="h-full">
                <div className="mt-4 space-y-3 pb-2">
                  {data.projects.map((p, i) => (
                    <div key={i} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                      <div className="font-medium text-neutral-900 dark:text-white text-sm mb-1">{p.title}</div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.milestones.map((m, j) => (
                          <span key={j} className="px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs">{m}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlowingCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillDetailPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SkillDetailInner />
    </Suspense>
  );
}


