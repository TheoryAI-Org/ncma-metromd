import { NextResponse } from 'next/server';

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

// Application event interface
interface AppEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  imageUrl: string;
  eventUrl: string;
}

export async function GET() {
  // Get environment variables - these are server-side only
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  // Log credential status (without exposing actual values)
  console.log('Eventbrite credentials status:', {
    apiKeyExists: !!EVENTBRITE_API_KEY,
    apiKeyLength: EVENTBRITE_API_KEY?.length || 0,
    orgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    orgIdLength: EVENTBRITE_ORGANIZATION_ID?.length || 0,
    nodeEnv: process.env.NODE_ENV
  });

  // Check if credentials are set
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORGANIZATION_ID) {
    console.error('Eventbrite API key or Organization ID not set');
    return NextResponse.json(
      { error: 'Eventbrite API key or Organization ID not set' },
      { status: 500 }
    );
  }

  try {
    // Construct the API URL
    const apiUrl = `${EVENTBRITE_API_BASE_URL}/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live,started,ended,completed&order_by=start_desc`;
    console.log('Fetching events from:', apiUrl);
    
    // Fetch all events for the organization
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Eventbrite API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
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
    const upcomingEvents = events.filter((event: AppEvent) => {
      const eventEndDate = new Date(`${event.date}T${event.endTime}`);
      return eventEndDate >= new Date();
    });

    const pastEvents = events.filter((event: AppEvent) => {
      const eventEndDate = new Date(`${event.date}T${event.endTime}`);
      return eventEndDate < new Date();
    }).slice(0, 10); // Limit past events to 10

    console.log('Processed events:', {
      totalEvents: events.length,
      upcomingCount: upcomingEvents.length,
      pastCount: pastEvents.length
    });

    return NextResponse.json({ upcomingEvents, pastEvents });
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return NextResponse.json(
      { error: 'Error fetching Eventbrite events', message: String(error) },
      { status: 500 }
    );
  }
} 