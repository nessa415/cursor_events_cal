'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface EventDetails {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    // Direct link to Google Calendar
    window.open('https://calendar.google.com/calendar/u/0/r', '_blank');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/process-image', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleSubmit = async () => {
    if (!eventDetails) return;
    
    try {
      // Instead of creating the event directly, we'll generate a Google Calendar link
      const startTime = new Date(`${eventDetails.date}T${eventDetails.time}`);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration
      
      const calendarUrl = new URL('https://calendar.google.com/calendar/render');
      calendarUrl.searchParams.append('action', 'TEMPLATE');
      calendarUrl.searchParams.append('text', eventDetails.name);
      calendarUrl.searchParams.append('details', eventDetails.description);
      calendarUrl.searchParams.append('location', eventDetails.location);
      calendarUrl.searchParams.append('dates', 
        `${startTime.toISOString().replace(/-|:|\.\d+/g, '')}/${endTime.toISOString().replace(/-|:|\.\d+/g, '')}`
      );
      
      window.open(calendarUrl.toString(), '_blank');
      
      // Reset form
      setImage(null);
      setPreview('');
      setEventDetails(null);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Event Flyer to Calendar
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Drag and drop an event flyer, or click to select'}
              </p>
            </div>
            
            {preview && (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Event flyer preview"
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Event Details Section */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : eventDetails ? (
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Name</label>
                    <input
                      type="text"
                      value={eventDetails.name}
                      onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={eventDetails.date}
                      onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={eventDetails.time}
                      onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={eventDetails.location}
                      onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={eventDetails.description}
                      onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Add to Calendar
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                Upload an event flyer to see the extracted details
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 