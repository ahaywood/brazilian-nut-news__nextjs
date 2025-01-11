# Project Overview

This is a Hacker News clone built with Next.js, Tailwind, Prisma, and Supabase.

Users can submit links, comment on links, and vote on links.

Users also have profiles, where you can see the links they've submitted, and the comments they've made, and links they've bookmarked.

# Core functionalities

# Docs

# Current file structure

├── README.md
├── instructions
│ └── instructions.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma
│ ├── schema.prisma
│ └── seed.ts
├── public
│ ├── icons
│ │ ├── README.md
│ │ ├── name.d.ts
│ │ └── sprite.svg
│ ├── next.svg
│ └── vercel.svg
├── src
│ ├── app
│ │ ├── (auth)
│ │ ├── [id]
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── legal
│ │ ├── not-found.tsx
│ │ ├── page.tsx
│ │ ├── profile
│ │ └── submit
│ ├── components
│ │ ├── Comment.tsx
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ ├── Icon.tsx
│ │ ├── Nav.tsx
│ │ └── SharedLink.tsx
│ ├── lib
│ │ ├── prisma.ts
│ │ └── supabase.ts
│ └── other
│ ├── build-icons.mts
│ └── svg-icons
├── tailwind.config.ts
└── tsconfig.json
