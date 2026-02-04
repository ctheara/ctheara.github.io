---
layout: page
title: HabitForge
description: Full-stack habit tracker with AI coaching
img: assets/img/projects/habitforge-thumbnail.png
importance: 2
category: work
github: https://github.com/ctheara/habit-tracker
live_demo: https://habit-tracker-fawn-omega.vercel.app
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/habitforge-cover.png" title="habitforge" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

A full-stack habit tracking application that helps users build and maintain positive habits with  AI-powered personalized coaching. Built to explore `full-stack development`, authentication patterns, and AI integration.

**Features:**
- Complete habit CRUD operations with `PostgreSQL`
- AI Habit Coach powered by `OpenAI GPT-5-mini`
- Real-time chat interface with conversation history
- Context-aware coaching based on user's habits
- User authentication with `JWT` and secure httpOnly cookies
- Interactive API documentation with `Swagger`

<br>

## Tech Stack

- **Frontend:** `React`, Material-UI, React Router
- **Backend:** `TypeScript`, `Node.js`, `Express.js`
- **Database:** `PostgreSQL`
- **Authentication:** `JWT`, httpOnly cookies, bcrypt
- **AI Integration:** `OpenAI API` (GPT-5-mini)
- **API Documentation:** `Swagger` / OpenAPI
- **Deployment:** `Vercel` (frontend), `Render` (backend)

<br>

## Architecture

```
┌─────────────────────────────────────┐
│      React Frontend (Vercel)        │
│   - Material-UI components          │
│   - React Router navigation         │
│   - Auth state management           │
└──────────────┬──────────────────────┘
               │
               │ HTTPS + CORS
               │ withCredentials: true
               ▼
┌─────────────────────────────────────┐
│   Express Backend (Render)          │
│   ┌─────────────────────────────┐   │
│   │  Authentication Middleware  │   │
│   │  - JWT verification         │   │
│   │  - httpOnly cookie auth     │   │
│   └─────────────┬───────────────┘   │
│                 │                   │
│   ┌─────────────┼───────────────┐   │
│   ▼             ▼               ▼   │
│ ┌──────┐  ┌─────────┐  ┌──────────┐ │
│ │Users │  │ Habits  │  │ AI Coach │ │
│ │Route │  │ Route   │  │  Route   │ │
│ └──┬───┘  └────┬────┘  └────┬─────┘ │
│    │           │              │     │
└────┼───────────┼──────────────┼─────┘
     │           │              │
     ▼           ▼              ▼
┌─────────────────────┐   ┌──────────┐
│    PostgreSQL       │   │  OpenAI  │
│  - Users table      │   │   API    │
│  - Habits table     │   │ (GPT-5)  │
└─────────────────────┘   └──────────┘
```

<br>

## Key Features & Implementation

1. **Habit Management** - Full `CRUD` operations with RESTful API design, supporting habit creation, updates, deletion, and listing with `PostgreSQL` persistence.
2. **AI Habit Coach** - OpenAI GPT-5-mini integration providing personalized coaching, maintaining conversation history, and offering context-aware advice based on user's current habits.
3. **Secure Authentication** - JWT-based auth with httpOnly cookies preventing XSS attacks, bcrypt password hashing, and CORS configuration for cross-origin requests.
4. **API Documentation** - Interactive Swagger UI at `/api-docs` endpoint auto-generated from OpenAPI specifications for easy API exploration and testing.
5. **Production Deployment** - Frontend on Vercel with automatic deployments, backend on Render with environment variable management, and secure HTTPS communication.

<br>

## AI Coach Implementation

**Context-Aware Coaching:**
```typescript
const systemPrompt = `You are a supportive habit coach. 
User's current habits: ${userHabits.map(h => h.habitName).join(', ')}
Provide personalized, actionable advice.`;

const response = await openai.chat.completions.create({
  model: "gpt-5-mini",
  messages: [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ]
});
```

**Features:**
- Fetches user's current habits from database
- Maintains conversation context across messages
- Provides personalized motivation and strategies
- Real-time responses through REST API

<br>

## API Endpoints

**Authentication:**
- `POST /v1/users/signup` - Create new user account
- `POST /v1/users/login` - Login and receive auth cookie
- `GET /v1/users/me` - Get current user profile

**Habit Management:**
- `POST /v1/habits/create` - Create new habit
- `GET /v1/habits/list` - Get all user habits
- `GET /v1/habits/:habitId` - Get specific habit
- `PUT /v1/habits/:habitId` - Update habit
- `DELETE /v1/habits/:habitId` - Delete habit

**AI Coach:**
- `POST /v1/coaches/chat` - Send message to AI coach

<br>

## Learnings

1. Integrate `AI` into the app and provide context to the AI models improves response quality significantly, conversation history enables more natural interactions
2. `Full-Stack Integration`: Managing authentication state between React frontend and Express backend, handling async operations with proper error handling
3. `Security Best Practices`: httpOnly cookies prevent XSS attacks, proper CORS configuration for cross-origin requests, and environment variable management

<br>

## Live Demo

**Try it out:**
- 🚀 **Frontend:** [habit-tracker-fawn-omega.vercel.app](https://habit-tracker-fawn-omega.vercel.app)
- 📚 **API Docs:** [habit-tracker-nyif.onrender.com/api-docs](https://habit-tracker-nyif.onrender.com/api-docs)

*Note: Backend may take 1-2 minutes to wake up on first request (Render free tier)*

<br>

## Links

- **GitHub Repository:** [ctheara/habit-tracker](https://github.com/ctheara/habit-tracker)
- **Live Demo:** [habit-tracker-fawn-omega.vercel.app](https://habit-tracker-fawn-omega.vercel.app)
- **API Documentation:** [Interactive Swagger UI](https://habit-tracker-nyif.onrender.com/api-docs)

---

**Technologies:** `TypeScript` · `React` · `Node.js` · `Express` · `PostgreSQL` · `JWT` · `OpenAI` · `Swagger` · `Material-UI` · `Vercel` · `Render`
