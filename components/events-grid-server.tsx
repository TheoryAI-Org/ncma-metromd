import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";

interface EventsGridServerProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export function EventsGridServer({ upcomingEvents, pastEvents }: EventsGridServerProps) {
  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {upcomingCount > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-medium">Upcoming Events</h2>
              <div className="text-sm text-gray-600">({upcomingCount})</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  imageUrl={event.imageUrl || ""}
                  eventUrl={event.eventUrl}
                />
              ))}
            </div>
          </div>
        )}

        {pastCount > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-medium">Past Events</h2>
              <div className="text-sm text-gray-600">({pastCount})</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  imageUrl={event.imageUrl || ""}
                  eventUrl={event.eventUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 