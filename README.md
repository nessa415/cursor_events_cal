# Event Flyer to Calendar

A web application that extracts event details from flyers and creates Google Calendar events.

## Features

- Upload event flyers (supports JPEG, JPG, PNG)
- Extract event details using OpenAI's Vision API
- Edit extracted information before creating the event
- Create events directly in your Google Calendar
- Modern, responsive UI

## Prerequisites

- Node.js (v18 or later)
- OpenAI API key
- Google Cloud Project with Calendar API enabled

## Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd cursor-events-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Set up Google Calendar API:
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google Calendar API
   - Create OAuth 2.0 credentials
   - Download the credentials and save them as `credentials.json` in the project root

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload an event flyer by dragging and dropping or clicking the upload area
2. The application will extract event details using OpenAI's Vision API
3. Review and edit the extracted information if needed
4. Click "Add to Calendar" to create the event in your Google Calendar
5. The first time you add an event, you'll need to authorize the application to access your Google Calendar

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4 Vision)
- Google Calendar API
- React Dropzone
- Heroicons

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
