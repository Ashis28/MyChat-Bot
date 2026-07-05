# AI Portfolio Backend

## Overview

This project is a serverless backend built using **Cloudflare Workers** and **Google Gemini** that powers the AI assistant integrated into my personal portfolio website.

Rather than responding with predefined answers, the backend dynamically constructs a knowledge-aware system prompt from structured portfolio data and sends it to Gemini to generate context-aware responses. Visitors can ask questions naturally about my skills, projects, experience, education, certifications, and career goals.

The architecture is designed to be modular, lightweight, scalable, and easy to extend with additional AI capabilities in future versions.

---

# Features

* AI-powered conversational portfolio assistant
* Google Gemini 2.5 Flash integration
* Cloudflare Workers serverless architecture
* Dynamic system prompt generation
* Modular knowledge loading system
* JSON-based portfolio knowledge repository
* Multi-turn conversation support
* Context preservation using conversation history
* Secure API key management through Cloudflare Secrets
* CORS configuration for Angular frontend
* Clean service-based architecture
* Easy knowledge updates without modifying business logic

---

# Architecture

```text
Angular Frontend
        │
        ▼
POST /chat
        │
        ▼
Cloudflare Worker
        │
        ▼
Load Portfolio Knowledge
        │
        ▼
Generate System Prompt
        │
        ▼
Attach Conversation History
        │
        ▼
Google Gemini API
        │
        ▼
Generate Response
        │
        ▼
Return AI Reply
        │
        ▼
Angular Chat Interface
```

---

# Project Structure

```text
src
│
├── ai
│   ├── gemini.ts
│   └── prompt.ts
│
├── knowledge
│   ├── about.json
│   ├── skills.json
│   ├── projects.json
│   ├── experience.json
│   ├── education.json
│   ├── contact.json
│   ├── certifications.json
│   ├── achievements.json
│   ├── faqs.json
│   └── system.json
│
├── services
│   ├── chat.ts
│   └── knowledge.ts
│
├── types
│   └── knowledge.ts
│
└── index.ts
```

---

# Knowledge Management

All portfolio information is maintained as structured JSON documents inside the `knowledge` directory.

The backend loads these files at runtime and combines them into a single knowledge object used for prompt generation.

Current knowledge modules include:

* About
* Skills
* Projects
* Experience
* Education
* Contact Information
* Certifications
* Achievements
* Frequently Asked Questions
* Assistant Configuration

This separation allows portfolio content to be updated independently without changing the backend implementation.

---

# Conversation Flow

For every incoming request:

1. The frontend sends the user's message.
2. Previous conversation history is included.
3. The backend loads the portfolio knowledge.
4. A system prompt is dynamically generated.
5. User history and system context are forwarded to Gemini.
6. Gemini generates a context-aware response.
7. The reply is returned to the frontend.

This allows the assistant to maintain conversational context while answering only from the available portfolio knowledge.

---

# API

## POST `/chat`

### Request

```json
{
    "message": "Tell me about your projects",
    "history": [
        {
            "role": "user",
            "content": "Hi"
        },
        {
            "role": "assistant",
            "content": "Hello!"
        }
    ]
}
```

### Response

```json
{
    "reply": "..."
}
```

---

# Technologies Used

## Backend

* TypeScript
* Cloudflare Workers
* Wrangler CLI

## Artificial Intelligence

* Google Gemini 2.5 Flash API
* Prompt Engineering
* Context-Aware Conversations

## Data Management

* JSON Knowledge Base
* Modular Knowledge Loader

## Communication

* REST API
* Fetch API
* CORS

---

# Current Capabilities

The assistant can answer questions related to:

* Skills and technologies
* Projects
* Internship experience
* Education
* Contact information
* Certifications
* Career goals
* Availability
* Portfolio overview

It politely declines questions that fall outside the available portfolio knowledge.

---

# Planned Enhancements (Version 2)

The next iteration of the project will focus on improving scalability, response quality, and cost optimization.

### AI Enhancements

* Semantic knowledge retrieval
* Retrieval-Augmented Generation (RAG)
* Multiple AI model support
* Model fallback mechanism
* Streaming AI responses
* Response confidence evaluation
* Better prompt optimization

### Performance

* In-memory response caching
* Similar question detection
* Token usage optimization
* Knowledge caching
* Faster prompt generation

### Backend Improvements

* Persistent conversation storage
* Conversation summarization
* Rate limiting
* Request logging
* Analytics dashboard
* Error monitoring
* Configuration management
* API versioning

### Knowledge Management

* Admin knowledge update panel
* Markdown document support
* Automatic knowledge indexing
* Knowledge version control

### Security

* Authentication for administration
* Abuse protection
* Request validation
* Enhanced security headers

---

# Environment Variables

Create a `.dev.vars` file.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# Running the Project

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

The worker will start on:

```text
http://localhost:8787
```

The chat endpoint is available at:

```text
POST http://localhost:8787/chat
```

---

# Author

**Ash Kumar Dash**

This backend is part of my AI-powered portfolio, demonstrating serverless backend development, prompt engineering, structured knowledge management, and conversational AI integration using modern cloud technologies.
