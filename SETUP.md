# Environment Setup

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**

## Environment Variables

This project uses environment variables for configuration. Follow these steps:

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file with your actual values:**
   ```env
   # Gemini API Key (if using AI features)
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   
   # App configuration
   VITE_APP_NAME=YouTube Stats Tracker Builder
   ```

3. **Get your Gemini API Key (if needed):**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

## Security Notes

- **Never commit your `.env` file** - it's already added to `.gitignore`
- **Use VITE_ prefix** for client-side environment variables
- **Keep your API keys secure** and don't share them publicly

## Development

After setting up your environment variables:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.