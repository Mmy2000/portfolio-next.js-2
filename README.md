# Mahmoud Yousef — Portfolio v2

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Windows: double-click setup.bat then run npm run dev

## Tech Stack
- Next.js 15 (App Router)
- TypeScript + Tailwind CSS 3
- Framer Motion 11 (animations)
- Three.js (3D Hero sphere)
- Lucide React (icons)
- Google Fonts (Playfair Display + DM Sans + JetBrains Mono)

## Customise
- Data → app/lib/data.ts
- Colors → app/globals.css
- Fonts → app/layout.tsx
- Sections → app/page.tsx

## Connect Django backend
Replace mock data in app/lib/data.ts with fetch() calls to your DRF API.
For the contact form, replace the setTimeout in Contact.tsx with a POST to /api/contact/.
