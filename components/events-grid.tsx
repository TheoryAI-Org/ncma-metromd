import { EventCard } from "@/components/event-card";
import eventsData from "@/data/events.json";

type Event = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  imageUrl?: string;
};

type EventsData = {
  upcomingEvents: Event[];
  pastEvents: Event[];
};

export function EventsGrid() {
  // Type assertion for the imported JSON
  const data = eventsData as EventsData;
  const upcomingCount = data.upcomingEvents.length;
  const pastCount = data.pastEvents.length;

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
              {data.upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  imageUrl={event.imageUrl || ""}
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
              {data.pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  imageUrl={event.imageUrl || ""}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

