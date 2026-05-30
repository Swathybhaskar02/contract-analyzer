# ContractIQ - AI-Powered Contract & NDA Analysis System

A modern web application that uses AI to analyze complex legal documents, identify non-standard clauses, liability risks, and obligations. Built for legal teams and paralegals to automate first-pass contract review.

![ContractIQ](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **PDF Document Upload**: Support for PDF and TXT files up to 50MB
- **AI-Powered Analysis**: Uses GPT-4 to analyze contract clauses and identify risks
- **Baseline Template Comparison**: Compare documents against standard templates (NDA, Service Agreement, Employment Contract, Software License)
- **Risk Assessment**: Comprehensive risk scoring with high/medium/low classifications
- **Key Findings Dashboard**: Organized view of non-standard clauses, liability risks, obligations, and more
- **Deviation Detection**: Identify clauses that deviate from your company's standards
- **Actionable Recommendations**: Get specific suggestions for legal team review
- **Modern UI**: Beautiful, responsive interface with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (FREE - optional, works with mock data without it)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/contract-analyzer.git
cd contract-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Get your FREE Gemini API key:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Add it to `.env.local`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a Contract**: Click "Analyze a Contract" and upload a PDF or TXT file
2. **Select Template**: Choose a baseline template to compare against
3. **Review Results**: Explore the analysis including:
   - Overall risk score
   - Non-standard clauses
   - Liability risks
   - Obligations
   - Termination clauses
   - Deviations from standard templates
   - Actionable recommendations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **PDF Processing**: pdf-parse
- **AI**: Google Gemini 1.5 Flash (FREE tier)
- **Icons**: Lucide React

## Project Structure

```
contract-analyzer/
├── src/
│   ├── app/
│   │   ├── api/analyze/     # API route for document analysis
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── AnalysisResults.tsx
│   │   ├── AnalyzingState.tsx
│   │   ├── FileUpload.tsx
│   │   └── Header.tsx
│   └── lib/
│       ├── analysis-prompts.ts  # LLM prompts
│       ├── baseline-templates.ts # Standard templates
│       ├── types.ts             # TypeScript types
│       └── utils.ts             # Utility functions
├── public/
├── package.json
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key (FREE!) | No (uses mock data if not provided) |

## Free AI with Google Gemini

This app uses **Google Gemini 1.5 Flash** which has a generous free tier:
- **15 requests per minute**
- **1 million tokens per minute**
- **1,500 requests per day**

Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

## Demo Mode

If no Gemini API key is configured, the application runs in demo mode with mock analysis data. This is useful for testing the UI and understanding the application flow.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
