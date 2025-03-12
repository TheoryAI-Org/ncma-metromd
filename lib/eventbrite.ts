import { Event } from '@/types/event';

// Eventbrite API base URL
const EVENTBRITE_API_BASE_URL = 'https://www.eventbriteapi.com/v3';

// Eventbrite event interface
interface EventbriteEvent {
  id: string;
  name: {
    text: string;
  };
  description: {
    text: string;
  };
  start: {
    local: string;
  };
  end: {
    local: string;
  };
  logo?: {
    url: string;
  };
  url: string;
}

// Function to fetch events from Eventbrite
export async function fetchEventbriteEvents(): Promise<{
  upcomingEvents: Event[];
  pastEvents: Event[];
}> {
  // Get environment variables
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  // Check if environment variables are set
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORGANIZATION_ID) {
    console.warn('Eventbrite API key or Organization ID not set');
    return { upcomingEvents: [], pastEvents: [] };
  }

  try {
    // Fetch all events for the organization - Note the trailing slash after 'events/'
    const response = await fetch(
      `${EVENTBRITE_API_BASE_URL}/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live,started,ended,completed&order_by=start_desc`,
      {
        headers: {
          'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Eventbrite events to our application format
    const events = data.events.map((event: EventbriteEvent) => ({
      id: event.id,
      title: event.name.text,
      date: event.start.local.split('T')[0], // Extract date part from ISO string
      startTime: event.start.local.split('T')[1].substring(0, 5), // Extract time part (HH:MM)
      endTime: event.end.local.split('T')[1].substring(0, 5), // Extract time part (HH:MM)
      description: event.description.text ? 
        (event.description.text.length > 100 ? 
          `${event.description.text.substring(0, 100)}...` : 
          event.description.text) : 
        'Check ticket prices on event',
      imageUrl: event.logo?.url || '',
      eventUrl: event.url,
    }));

    // Split events into upcoming and past based on end date
    const upcomingEvents = events.filter((event: Event) => {
      const eventEndDate = new Date(`${event.date}T${event.endTime}`);
      return eventEndDate >= new Date();
    });

    const pastEvents = events.filter((event: Event) => {
      const eventEndDate = new Date(`${event.date}T${event.endTime}`);
      return eventEndDate < new Date();
    });

    return {
      upcomingEvents,
      pastEvents: pastEvents.slice(0, 10), // Limit past events to 10
    };
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return { upcomingEvents: [], pastEvents: [] };
  }
} 