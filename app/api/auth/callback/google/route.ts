import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store the refresh token securely
    // In a production app, you should store this in a secure database
    // For this example, we'll store it in an environment variable
    process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    );
  }
} 