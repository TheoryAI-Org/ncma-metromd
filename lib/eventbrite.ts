import { Event } from '@/types/event';
import getConfig from 'next/config';

// Get server runtime config
const { serverRuntimeConfig } = getConfig() || {};

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
  // Get API credentials from server runtime config
  const EVENTBRITE_API_KEY = serverRuntimeConfig?.eventbriteApiKey;
  const EVENTBRITE_ORGANIZATION_ID = serverRuntimeConfig?.eventbriteOrganizationId;

  console.log('Server runtime config:', { 
    apiKeyExists: !!EVENTBRITE_API_KEY,
    apiKeyLength: EVENTBRITE_API_KEY?.length,
    orgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    configKeys: serverRuntimeConfig ? Object.keys(serverRuntimeConfig) : []
  });

  // Check if API credentials are set
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORGANIZATION_ID) {
    console.warn('Eventbrite API key or Organization ID not set in server runtime config');
    return { upcomingEvents: [], pastEvents: [] };
  }

  try {
    // Construct the API URL
    const apiUrl = `${EVENTBRITE_API_BASE_URL}/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live,started,ended,completed&order_by=start_desc`;
    console.log('Fetching events from:', apiUrl);

    // Fetch all events for the organization - Note the trailing slash after 'events/'
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
      pastEvents: pastEvents.slice(0, 10), // Limit past events to 10
    };
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return { upcomingEvents: [], pastEvents: [] };
  }
} 