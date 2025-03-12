import { NextResponse } from 'next/server';

export async function GET() {
  // Get environment variables
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  // Check if environment variables are set
  if (!EVENTBRITE_API_KEY || !EVENTBRITE_ORGANIZATION_ID) {
    return NextResponse.json({
      error: 'Eventbrite API key or Organization ID not set',
      apiKeyExists: !!EVENTBRITE_API_KEY,
      orgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    }, { status: 500 });
  }

  try {
    // Construct the API URL
    const apiUrl = `https://www.eventbriteapi.com/v3/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live,started,ended,completed&order_by=start_desc`;
    
    // Fetch all events for the organization
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
      },
      next: { revalidate: 0 }, // Don't cache
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        error: `Eventbrite API error: ${response.status}`,
        details: errorText,
      }, { status: response.status });
    }

    const data = await response.json();
    
    // Return basic info about the events
    return NextResponse.json({
      success: true,
      pagination: data.pagination,
      eventCount: data.events?.length || 0,
      firstEventName: data.events?.[0]?.name?.text || null,
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error fetching Eventbrite events',
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 