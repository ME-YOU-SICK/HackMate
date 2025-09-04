"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState, Suspense } from "react";
import { Calendar, Users, Plus, Edit3 } from "lucide-react";

function OrganizerEventsInner() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", type: "hackathon", schedule: "", scheduleItems: [] });
  const [dayName, setDayName] = useState("");
  const [dayDate, setDayDate] = useState("");
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [createDayName, setCreateDayName] = useState("");
  const [createDayDate, setCreateDayDate] = useState("");
  const [showCreateAddSchedule, setShowCreateAddSchedule] = useState(false);

  const mockEvents = [
    {
      id: 1,
      name: "TechCrunch Hackathon 2024",
      description: "Build the next big thing in 48 hours. Focus on AI, blockchain, and sustainability.",
      type: "hackathon",
      schedule: "Day 1: Opening ceremony, team formation, and initial brainstorming\nDay 2: Development and mentoring sessions\nDay 3: Final presentations and awards",
      scheduleItems: [
        { day: "Day 1", date: "2024-03-15" },
        { day: "Day 2", date: "2024-03-16" },
        { day: "Day 3", date: "2024-03-17" }
      ],
      participants: 150,
      date: "March 15-17, 2024"
    },
    {
      id: 2,
      name: "Web3 Masterclass Series",
      description: "Learn about blockchain, DeFi, and NFT development from industry experts.",
      type: "masterclass",
      schedule: "Weekly sessions covering different aspects of Web3 development",
      scheduleItems: [
        { day: "Week 1", date: "2024-02-01" },
        { day: "Week 2", date: "2024-02-08" },
        { day: "Week 3", date: "2024-02-15" },
        { day: "Week 4", date: "2024-02-22" }
      ],
      participants: 75,
      date: "February 2024"
    },
    {
      id: 3,
      name: "AI Innovation Workshop",
      description: "Hands-on workshop on machine learning, computer vision, and natural language processing.",
      type: "workshop",
      schedule: "Full-day intensive workshop with practical coding sessions",
      scheduleItems: [
        { day: "Morning Session", date: "2024-04-10" },
        { day: "Afternoon Session", date: "2024-04-10" }
      ],
      participants: 45,
      date: "April 10, 2024"
    },
    {
      id: 4,
      name: "Startup Pitch Competition",
      description: "Showcase your startup idea to investors and industry leaders. $50K in prizes.",
      type: "hackathon",
      schedule: "Pitch preparation, mentoring, and final presentations",
      scheduleItems: [
        { day: "Preparation Day", date: "2024-05-20" },
        { day: "Pitch Day", date: "2024-05-21" }
      ],
      participants: 25,
      date: "May 20-21, 2024"
    },
    {
      id: 5,
      name: "Cybersecurity Webinar",
      description: "Learn about the latest cybersecurity threats and defense strategies.",
      type: "webinar",
      schedule: "Online webinar with Q&A session",
      scheduleItems: [
        { day: "Webinar", date: "2024-06-05" }
      ],
      participants: 200,
      date: "June 5, 2024"
    }
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem('org_events');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        } else {
          // If localStorage has empty array or invalid data, load mock events
          setEvents(mockEvents);
          localStorage.setItem('org_events', JSON.stringify(mockEvents));
        }
      } else {
        // Initialize with mock events if none exist
        setEvents(mockEvents);
        localStorage.setItem('org_events', JSON.stringify(mockEvents));
      }
    } catch {
      // If there's any error, load mock events
      setEvents(mockEvents);
      localStorage.setItem('org_events', JSON.stringify(mockEvents));
    }
  }, []);

  const persist = (list: any[]) => {
    setEvents(list);
    try { localStorage.setItem('org_events', JSON.stringify(list)); } catch {}
  };

  const createEvent = () => {
    if (!form.name.trim()) return;
    const id = Date.now();
    const newEvent = { id, ...form, participants: 0, date: "TBD" };
    const next = [newEvent, ...events];
    persist(next);
    setSelectedId(id);
    setShowCreate(false);
    setForm({ name: "", description: "", type: "hackathon", schedule: "", scheduleItems: [] });
    setCreateDayName("");
    setCreateDayDate("");
    setShowCreateAddSchedule(false);
  };

  const selected = events.find(e => e.id === selectedId) || null;

  const updateSelected = (patch: Partial<any>) => {
    if (!selected) return;
    const next = events.map(e => e.id === selected.id ? { ...e, ...patch } : e);
    persist(next);
  };

  const addScheduleItem = () => {
    if (!selected) return;
    if (!dayName.trim() || !dayDate) return;
    const items = Array.isArray(selected.scheduleItems) ? selected.scheduleItems : [];
    const updated = { ...selected, scheduleItems: [...items, { day: dayName.trim(), date: dayDate }] };
    const next = events.map(e => e.id === selected.id ? updated : e);
    persist(next);
    setDayName("");
    setDayDate("");
  };

  const removeScheduleItem = (idx: number) => {
    if (!selected) return;
    const items = Array.isArray(selected.scheduleItems) ? selected.scheduleItems : [];
    const updated = { ...selected, scheduleItems: items.filter((_: any, i: number) => i !== idx) };
    const next = events.map(e => e.id === selected.id ? updated : e);
    persist(next);
  };

  const addCreateScheduleItem = () => {
    if (!createDayName.trim() || !createDayDate) return;
    const items = Array.isArray(form.scheduleItems) ? form.scheduleItems : [];
    setForm({ ...form, scheduleItems: [...items, { day: createDayName.trim(), date: createDayDate }] });
    setCreateDayName("");
    setCreateDayDate("");
  };

  const removeCreateScheduleItem = (idx: number) => {
    const items = Array.isArray(form.scheduleItems) ? form.scheduleItems : [];
    setForm({ ...form, scheduleItems: items.filter((_: any, i: number) => i !== idx) });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
        <DashboardSidebar userRole="organizer" userName="Sarah Johnson" />
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex gap-6 flex-1 w-full h-full overflow-hidden">
            {/* Left: Scrollable events list */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Events</h2>
                <button onClick={() => setShowCreate(true)} className="px-2 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2">
                {events.length === 0 && (
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">No events yet. Create one.</div>
                )}
                {events.map((e) => (
                  <GlowingCard
                    key={e.id}
                    title={e.name}
                    description={e.description || "No description"}
                    className={cn("cursor-pointer", selectedId === e.id && "ring-2 ring-blue-500")}
                    onClick={() => setSelectedId(e.id)}
                  >
                    <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {e.date || 'TBD'}</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {e.participants}</span>
                    </div>
                  </GlowingCard>
                ))}
              </div>
            </div>

            {/* Right: Details form */}
            <div className="flex-1 min-w-0">
              {selected ? (
                <GlowingCard className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Edit Event</h2>
                      <Edit3 className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                        <input value={selected.name} onChange={(e) => updateSelected({ name: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Type</label>
                        <select value={selected.type} onChange={(e) => updateSelected({ type: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white">
                          <option value="hackathon">Hackathon</option>
                          <option value="webinar">Webinar</option>
                          <option value="masterclass">Free Masterclass</option>
                          <option value="workshop">Workshop</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
                        <textarea value={selected.description} onChange={(e) => updateSelected({ description: e.target.value })} rows={4} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm text-neutral-700 dark:text-neutral-300">Schedule</label>
                          <button
                            type="button"
                            onClick={() => setShowAddSchedule((s) => !s)}
                            className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            + Add day
                          </button>
                        </div>
                        <textarea value={selected.schedule || ""} onChange={(e) => updateSelected({ schedule: e.target.value })} rows={3} placeholder="Overview or notes for schedule" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                        {showAddSchedule && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={dayName}
                                onChange={(e) => setDayName(e.target.value)}
                                placeholder="Day name (e.g., Day 1)"
                                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                              />
                              <input
                                type="date"
                                value={dayDate}
                                onChange={(e) => setDayDate(e.target.value)}
                                className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                              />
                              <button onClick={addScheduleItem} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                            </div>
                          </div>
                        )}
                        <div className="mt-3 space-y-2">
                          {(selected.scheduleItems || []).map((it: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                              <div className="text-sm text-neutral-900 dark:text-white">{it.day}</div>
                              <div className="text-sm text-neutral-600 dark:text-neutral-400">{it.date}</div>
                              <button onClick={() => removeScheduleItem(idx)} className="text-sm text-blue-600 hover:text-blue-700">Remove</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowingCard>
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                  Select an event to edit its details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Create Event</h3>
              <button onClick={() => setShowCreate(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white">
                  <option value="hackathon">Hackathon</option>
                  <option value="webinar">Webinar</option>
                  <option value="masterclass">Free Masterclass</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm text-neutral-700 dark:text-neutral-300">Schedule</label>
                  <button
                    type="button"
                    onClick={() => setShowCreateAddSchedule((s) => !s)}
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    + Add day
                  </button>
                </div>
                <textarea value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} rows={3} placeholder="Overview or notes for schedule" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                {showCreateAddSchedule && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={createDayName}
                        onChange={(e) => setCreateDayName(e.target.value)}
                        placeholder="Day name (e.g., Day 1)"
                        className="flex-1 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                      />
                      <input
                        type="date"
                        value={createDayDate}
                        onChange={(e) => setCreateDayDate(e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                      />
                      <button onClick={addCreateScheduleItem} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                    </div>
                  </div>
                )}
                <div className="mt-3 space-y-2">
                  {(form.scheduleItems || []).map((it: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                      <div className="text-sm text-neutral-900 dark:text-white">{it.day}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">{it.date}</div>
                      <button onClick={() => removeCreateScheduleItem(idx)} className="text-sm text-blue-600 hover:text-blue-700">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
              <button onClick={createEvent} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrganizerEventsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <OrganizerEventsInner />
    </Suspense>
  );
}


