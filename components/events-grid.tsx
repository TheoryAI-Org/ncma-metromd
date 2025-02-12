import { EventCard } from "@/components/event-card";

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
  let eventsData: EventsData;
  try {
    eventsData = require("@/data/events.json");
  } catch (error) {
    console.error("Error loading events data:", error);
    eventsData = { upcomingEvents: [], pastEvents: [] };
  }

  const upcomingCount = eventsData.upcomingEvents.length;
  const pastCount = eventsData.pastEvents.length;

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
              {eventsData.upcomingEvents.map((event) => (
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
              {eventsData.pastEvents.map((event) => (
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

