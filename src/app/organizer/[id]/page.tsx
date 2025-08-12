
import EventCard from '@/components/event-card';

// This is a simplified static page. In a real application,
// you would fetch the organizer's data based on the `params.id`.
export default function OrganizerPage({ params }: { params: { id: string } }) {
  const organizerName = "AI Innovators";

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="font-sora text-4xl font-bold">{organizerName}</h1>
        <p className="mt-2 text-lg text-slate-400">Events hosted by {organizerName}</p>
      </div>

      {/* In a real app, you would map over events fetched for this organizer */}
      <div className="mx-auto max-w-2xl space-y-6">
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}
