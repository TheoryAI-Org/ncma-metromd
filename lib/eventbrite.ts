import { Event } from '@/types/event';
import eventsSnapshot from '@/data/events.json';

// Eventbrite API base URL
const EVENTBRITE_API_BASE_URL = 'https://www.eventbriteapi.com/v3';

// Past meetings are a matter of record and do not change, so a stale snapshot
// beats an empty table when the API is unreachable or unconfigured. Upcoming
// events are deliberately NOT backfilled — an empty list there is a real state.
const PAST_EVENTS_FALLBACK: Event[] = eventsSnapshot.pastEvents;

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
  // Get environment variables - these are server-side only
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  console.log('Environment variables:', { 
    apiKeyExists: !!EVENTBRITE_API_KEY,
    apiKeyLength: EVENTBRITE_API_KEY?.length || 0,
    orgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    orgId: EVENTBRITE_ORGANIZATION_ID,
    envKeys: Object.keys(process.env).filter(key => 
      key.includes('EVENTBRITE') || key.includes('NEXT_PUBLIC')
    )
  });

  // Check if API credentials are set
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORGANIZATION_ID) {
    console.warn('Eventbrite API key or Organization ID not set');
    return { upcomingEvents: [], pastEvents: PAST_EVENTS_FALLBACK };
  }

  try {
    // Construct the API URL
    const apiUrl = `${EVENTBRITE_API_BASE_URL}/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live,started,ended,completed&order_by=start_desc`;
    console.log('Fetching events from:', apiUrl);

    // Fetch all events for the organization
    const response = await fetch(
      apiUrl,
      {
        headers: {
          'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Eventbrite API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API response data:', { 
      pagination: data.pagination,
      eventCount: data.events?.length || 0
    });
    
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

    console.log('Processed events:', {
      totalEvents: events.length,
      upcomingCount: upcomingEvents.length,
      pastCount: pastEvents.length
    });

    return {
      upcomingEvents,
      pastEvents: pastEvents.length > 0
        ? pastEvents.slice(0, 10) // Limit past events to 10
        : PAST_EVENTS_FALLBACK,
    };
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return { upcomingEvents: [], pastEvents: PAST_EVENTS_FALLBACK };
  }
} 