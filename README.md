# Christina Cephus - Developer Portfolio

A modern, noir-themed developer portfolio showcasing my projects and GitHub activity with a cyberpunk aesthetic.

## Features

- Noir grayscale color scheme with cyberpunk design elements
- Real-time GitHub integration showing latest repositories and commits
- Interactive project cards with detailed modal views
- Responsive design for all devices
- Standalone GitHub activity page

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GitHub API integration
- Deployed on Vercel

## Pages

- **Home**: Introduction and featured projects
- **Projects**: Interactive gallery of my development projects
- **GitHub Activity**: Real-time display of my GitHub repositories and commits
- **Prompts**: Collection of AI prompts I've crafted
- **About**: Background information and skills
- **Contact**: Ways to reach me

## Environment Variables

### GitHub Integration
For optimal GitHub API performance and higher rate limits, set up a GitHub personal access token:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate a new token with `public_repo` scope (read access to public repositories)
3. Add to your `.env.local` file:

```bash
# Optional: GitHub Personal Access Token for higher API rate limits
GITHUB_TOKEN=your_github_token_here

# Optional: For client-side requests (use with caution)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

**Note**: The GitHub integration will work without a token but with lower rate limits (60 requests/hour vs 5000 requests/hour with token).

### AI Prompt Engineer
The prompt engineering chatbot supports multiple AI models. Configure API keys for enhanced functionality:

```bash
# OpenAI API Key (required for GPT-4 optimization)
OPENAI_API_KEY=your_openai_api_key_here

# Google AI API Key (required for Gemini optimization)
GEMINI_API_KEY=your_google_ai_api_key_here

# Anthropic API Key (optional - fallback works without key)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**API Key Setup Instructions:**

1. **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Uses GPT-4o-mini model for cost efficiency
   - Estimated cost: ~$0.03 per 1000 tokens

2. **Google Gemini**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Uses Gemini 1.5 Flash model
   - Has generous free tier

3. **Anthropic Claude**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
   - Uses Claude 3 Haiku for cost efficiency
   - Fallback optimization works without API key

**Note**: The prompt engineer will work with rule-based optimization even without API keys, but AI-powered optimization provides significantly better results.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/theCephusHasLanded/theCephus.git

# Install dependencies
cd theCephus
npm install

# (Optional) Set up environment variables
cp .env.example .env.local
# Edit .env.local with your GitHub token

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

This project is deployed on Vercel at [thecephus.vercel.app](https://thecephus.vercel.app)