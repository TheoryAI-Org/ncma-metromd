import { NextResponse } from 'next/server';
import getConfig from 'next/config';

export async function GET() {
  // Get server runtime config
  const { serverRuntimeConfig } = getConfig() || {};
  
  // Get environment variables
  const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
  const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

  // Return environment variable status (not the actual values for security)
  return NextResponse.json({
    // Environment variables
    envApiKeyExists: !!EVENTBRITE_API_KEY,
    envApiKeyLength: EVENTBRITE_API_KEY?.length || 0,
    envOrgIdExists: !!EVENTBRITE_ORGANIZATION_ID,
    envOrgIdLength: EVENTBRITE_ORGANIZATION_ID?.length || 0,
    
    // Server runtime config
    configExists: !!serverRuntimeConfig,
    configApiKeyExists: !!serverRuntimeConfig?.eventbriteApiKey,
    configApiKeyLength: serverRuntimeConfig?.eventbriteApiKey?.length || 0,
    configOrgIdExists: !!serverRuntimeConfig?.eventbriteOrganizationId,
    configOrgIdLength: serverRuntimeConfig?.eventbriteOrganizationId?.length || 0,
    configKeys: serverRuntimeConfig ? Object.keys(serverRuntimeConfig) : [],
    
    // Node environment
    nodeEnv: process.env.NODE_ENV,
    
    // Environment variable keys (without values)
    envKeys: Object.keys(process.env).filter(key => 
      key.includes('EVENTBRITE') || key.includes('NEXT_PUBLIC')
    )
  });
} 