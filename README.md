# The Kitch – MVP Website

A bilingual (🇫🇷/🇬🇧) dynamic website for **The Kitch**, Rabat’s favorite brunching spot.  
Built with **Next.js 13 (App Router)**, **Tailwind CSS**, **Prisma**, and **Supabase**.  
Deployed on **Vercel** free tier.

---

## ✨ Features

- **Bilingual support**: English & French with i18n routing (`/en`, `/fr`).
- **Dynamic menu**: Structured from PDF ingestion into Postgres via Prisma.
- **Gallery**: Optimized images with alt text.
- **About & Contact pages**: Story, hours, and embedded map.
- **Branding**: Custom logo, dark red + beige palette, modern typography.
- **Agentic ingestion pipeline**:
  - PDF → structured schema (`MenuSection`, `MenuItem`).
  - Validation & provenance tracking.
  - Safe publishing (no silent guesses).

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 13 (App Router), React Server Components, Tailwind CSS.
- **Backend**: Next.js API routes, Prisma ORM.
- **Database**: Supabase (Postgres free tier).
- **Deployment**: Vercel (free tier).
- **Content ingestion**: `pdf-parse` + Prisma seed script.

---

## 📂 Project Structure
the-kitch-mvp/ 
├── app/ # Next.js routes (Home, Menu, Gallery, About, Contact, i18n) 
├── components/ # Navbar, Footer, MenuSection, LanguageToggle 
├── lib/ # db client, i18n config, validators 
├── prisma/ # schema + seed script 
├── public/ # static assets (logo, gallery images) 
├── data/ # internal assets (menu PDF for ingestion) 
├── styles/ # Tailwind global styles

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/mhdbel/the-kitch-mvp.git
cd the-kitch-mvp
npm install

DATABASE_URL="postgresql://user:password@dbhost:5432/thekitch"

npx prisma migrate dev --name init

npx ts-node prisma/seed.ts

npm run dev

---
Built by Mehdi Belbachir with agentic software engineering best practices.
