import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract event details from this image. Return a JSON object with the following fields: name (string), date (YYYY-MM-DD), time (HH:MM), location (string), description (string). If any field is unclear or not present, make your best guess based on the context. For the date, if only a day is mentioned, assume it's the next occurrence of that day. For the time, if only a time is mentioned without AM/PM, assume it's PM if it's a social event (like a party or concert). Return ONLY the JSON object, no markdown formatting or additional text."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${image.type};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    // Parse the response and extract the JSON
    const content = response.choices[0].message.content;
    
    // Clean up the response content to ensure it's valid JSON
    let jsonContent = content || '{}';
    // Remove any markdown code block formatting
    jsonContent = jsonContent.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const eventDetails = JSON.parse(jsonContent);
      return NextResponse.json(eventDetails);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse event details' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
} 