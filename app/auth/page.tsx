'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Exchange the code for tokens
      fetch('/api/auth/callback/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for tokens:', error);
        });
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authenticating...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we set up your Google Calendar access.
          </p>
        </div>
      </div>
    </div>
  );
} 