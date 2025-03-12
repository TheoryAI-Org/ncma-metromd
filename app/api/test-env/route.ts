import { NextResponse } from 'next/server';

export async function GET() {
  // Get environment variables
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  // Return environment variable status (not the actual values for security)
  return NextResponse.json({
    // Environment variables
    apiKeyExists: !!EVENTBRITE_API_KEY,
    apiKeyLength: EVENTBRITE_API_KEY?.length || 0,
    orgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    orgIdLength: EVENTBRITE_ORGANIZATION_ID?.length || 0,
    
    // Node environment
    nodeEnv: process.env.NODE_ENV,
    
    // Environment variable keys (without values)
    envKeys: Object.keys(process.env).filter(key => 
      key.includes('EVENTBRITE') || key.includes('NEXT_PUBLIC')
    )
  });
} 