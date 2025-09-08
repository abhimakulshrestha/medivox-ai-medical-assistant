🩺 Overview
MediVox is a cutting-edge AI-powered medical voice assistant that provides instant, accurate medical consultations through natural voice conversations. Built with modern web technologies, it offers 24/7 healthcare support with specialized AI doctor agents for different medical fields.
✨ Features
🎯 Core Functionality

AI Voice Consultations - Natural voice conversations with AI medical specialists
Real-time Transcription - Live speech-to-text conversion during consultations
Medical Report Generation - Automated structured reports after each consultation
Specialist Matching - AI-powered doctor recommendation based on symptoms
Session History - Complete consultation history with detailed reports

🏥 Medical Specialists Available

General Physician - Everyday health concerns and common symptoms
Pediatrician - Children's health and care (Premium)
Dermatologist - Skin issues, rashes, acne, infections
Psychologist - Mental health and emotional well-being
Nutritionist - Healthy eating and weight management (Premium)
Cardiologist - Heart health and blood pressure (Premium)
ENT Specialist - Ear, nose, and throat problems
Orthopedic - Bone, joint, and muscle pain
Gynecologist - Women's reproductive health
Dentist - Oral hygiene and dental problems

🔐 User Management

Secure Authentication - Powered by Clerk
Subscription Plans - Free and Pro tiers
Usage Limits - 10 free consultations for non-premium users
Profile Management - User preferences and history

🛠️ Tech Stack
Frontend

Next.js 14 - React framework with App Router
TypeScript - Type-safe development
Tailwind CSS - Utility-first CSS framework
Framer Motion - Animation library
Lucide React - Beautiful icons
shadcn/ui - Modern UI components

Backend

Next.js API Routes - Serverless API endpoints
Drizzle ORM - Type-safe database toolkit
Neon Database - Serverless PostgreSQL
OpenRouter - AI model API gateway

AI & Voice

Vapi AI - Voice AI conversation platform
DeepSeek Chat - Advanced language model for medical responses
Real-time Speech Processing - Live transcription and synthesis

Authentication & Payments

Clerk - Complete user management solution
Subscription Management - Built-in pricing and billing

🚀 Getting Started
Prerequisites

Node.js 18+ installed
npm or yarn package manager
Database (Neon PostgreSQL recommended)

Environment Variables
Create a .env.local file in the root directory:
env# Database
DATABASE_URL="your_neon_database_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# AI Services
OPEN_ROUTER_API_KEY="your_openrouter_api_key"
NEXT_PUBLIC_VAPI_API_KEY="your_vapi_api_key"
Installation

Clone the repository
bashgit clone https://github.com/yourusername/medivox.git
cd medivox

Install dependencies
bashnpm install
# or
yarn install

Set up the database
bashnpm run db:push
# or
yarn db:push

Run the development server
bashnpm run dev
# or
yarn dev

Open your browser
Navigate to http://localhost:3000

📖 Usage
Starting a Consultation

Sign up/Login - Create an account or sign in
Describe Symptoms - Add your symptoms or health concerns
AI Doctor Selection - Get AI-recommended specialists or choose from the list
Voice Consultation - Start speaking with your chosen AI doctor
Get Report - Receive a detailed medical report after consultation

Managing History

View all past consultations in the History section
Access detailed medical reports for each session
Track your health journey over time

Subscription Benefits
Free Plan:

10 consultations per month
Access to basic specialists
Standard report generation

Pro Plan:

Unlimited consultations
Access to all premium specialists
Priority support
Advanced reporting features

🏗️ Project Structure
medivox/
├── app/
│   ├── (auth)/                 # Authentication pages
│   ├── (routes)/dashboard/     # Main dashboard
│   ├── api/                    # API routes
│   ├── _components/            # Landing page components
│   └── globals.css             # Global styles
├── components/ui/              # Reusable UI components
├── config/                     # Configuration files
├── context/                    # React context providers
├── shared/                     # Shared utilities and data
└── public/                     # Static assets
🔧 Key Components
Voice Integration

Vapi AI Integration - Real-time voice processing
Live Transcription - Speech-to-text conversion
Audio Processing - High-quality voice synthesis

Medical AI

Symptom Analysis - AI-powered symptom interpretation
Doctor Matching - Smart specialist recommendation
Report Generation - Structured medical documentation

User Experience

Responsive Design - Works on all devices
Dark/Light Mode - Theme customization
Accessibility - WCAG compliant interface

🤝 Contributing
We welcome contributions to MediVox! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🆘 Support

Documentation - Visit our docs
Issues - Report bugs on GitHub Issues
Discord - Join our community
Email - Contact us at support@medivox.com

⚠️ Disclaimer
MediVox is an AI-powered medical assistant for informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
🙏 Acknowledgments

Vapi AI for voice AI technology
Clerk for authentication services
Neon for database hosting
Vercel for deployment platform
OpenRouter for AI model access


<div align="center">
  Made with ❤️ for better healthcare accessibility
MediVox - Your AI Medical Companion
</div>
