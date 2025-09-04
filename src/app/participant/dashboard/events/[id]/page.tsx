"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { Calendar, MapPin, Users, Trophy, ArrowLeft } from "lucide-react";

const eventLookup: Record<string, any> = {};

function EventDetailInner() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id?.toString() || "";

  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    // In a real app, fetch by id. Here, try localStorage or mock.
    try {
      const raw = localStorage.getItem('joined_events_data');
      if (raw) {
        const map = JSON.parse(raw);
        if (map[id]) {
          setEventData(map[id]);
          return;
        }
      }
    } catch {}
    // Fallback minimal data
    setEventData({
      id,
      title: `Event #${id}`,
      date: "TBD",
      location: "TBD",
      participants: 0,
      prize: "$0",
      schedule: [
        { time: "Day 1", item: "Kickoff & Team Formation" },
        { time: "Day 2", item: "Build & Mentorship" },
        { time: "Day 3", item: "Demos & Awards" },
      ],
      prizes: ["Grand Prize", "Runner Up", "Best Innovation"],
    });
  }, [id]);

  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  if (!eventData) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{eventData.title}</h1>
                <p className="text-neutral-600 dark:text-neutral-400">Event details and schedule</p>
              </div>
              <Link href="/participant/dashboard/events" className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                <ArrowLeft className="h-4 w-4 text-[#FFA100]" />
                Back to Events
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <GlowingCard className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"><Calendar className="h-4 w-4 text-[#FFA100]" /> {eventData.date}</div>
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"><MapPin className="h-4 w-4 text-[#FFA100]" /> {eventData.location}</div>
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"><Users className="h-4 w-4 text-[#FFA100]" /> {eventData.participants} participants</div>
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"><Trophy className="h-4 w-4 text-[#FFA100]" /> {eventData.prize} prize pool</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Prizes</h3>
                    <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
                      {eventData.prizes?.map((p: string, i: number) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Schedule</h2>
              </div>
              <GlowingCard className="h-full">
                <div className="mt-2 space-y-2 pb-4">
                  {eventData.schedule?.map((s: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">{s.time}</div>
                      <div className="text-sm text-neutral-700 dark:text-neutral-300">{s.item}</div>
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

export default function EventDetailPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EventDetailInner />
    </Suspense>
  );
}


