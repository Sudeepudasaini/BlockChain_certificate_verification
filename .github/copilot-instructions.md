# CertBot Career Advisor — Copilot Instructions

## Project Purpose
Career counseling web app for IT/tech students in Nepal. Students upload certificates and receive AI-powered career recommendations.

## Stack
- Frontend: React + Tailwind CSS (Vite), React Router, Axios
- Backend: Node.js + Express + MongoDB (Mongoose)
- AI: OpenAI GPT-3.5-turbo or Anthropic Claude via REST API

## Key Files
- src/pages/CareerCounseling/CareerCounseling.jsx — main page with chat tabs
- backend/routes/careerRoute.js — /ask and /recommendations endpoints
- backend/services/recommendation.js — cosine similarity skill matching
- backend/seeders/careerSeed.js — career database seed data

## CRITICAL — AI Advisor Rules (Never Change These)
- /ask route MUST always include systemPrompt restricting CertBot to tech career topics
- systemPrompt MUST always inject: certificateNames, studentSkills, top career title, skillGap
- OpenAI: use /v1/chat/completions with messages array [system, ...history, user]
- Anthropic: use /v1/messages with system field + messages array (NOT /v1/complete)
- Frontend handleSendMessage MUST keep the CAREER_KEYWORDS relevance check
- Off-topic questions must trigger the canned refusal — never remove this

## Coding Conventions
- React: named exports for components, default export for page-level only
- Tailwind only — no inline styles except dynamic width/percentage values
- All API calls go through src/api/axios.js, not raw fetch
- Backend routes protected with protect middleware except /all and /seed
- MongoDB queries use .lean() for read-only

## NEVER Do These
- Do not remove the topic-restriction systemPrompt from /ask
- Do not switch Anthropic back to /v1/complete endpoint
- Do not add localStorage or sessionStorage
- Do not change skill matching logic in recommendation.js unless explicitly asked
- Do not modify careerSeed.js career data unless explicitly asked
