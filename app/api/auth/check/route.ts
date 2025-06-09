import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if we have a refresh token
    const hasRefreshToken = !!process.env.GOOGLE_REFRESH_TOKEN;
    
    return NextResponse.json({ authenticated: hasRefreshToken });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ authenticated: false });
  }
} 