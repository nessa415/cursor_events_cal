import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    const eventDetails = await request.json();
    
    // Initialize OAuth2 client
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Set credentials (you'll need to implement a way to store and retrieve these)
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create the event
    const event = {
      summary: eventDetails.name,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: `${eventDetails.date}T${eventDetails.time}:00`,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: `${eventDetails.date}T${eventDetails.time}:00`,
        timeZone: 'America/New_York',
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json({ 
      success: true, 
      eventId: response.data.id 
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
} 