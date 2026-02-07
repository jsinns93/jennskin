# Jennskin Naturals

## Overview
A React-based marketing website for Jennskin Naturals, a natural beauty/skincare brand established in 2020 in Indonesia. The site features a bold, neo-brutalist design with yellow and blue brand colors.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN), custom CSS
- **Routing**: React Router DOM v7
- **Fonts**: Inter (Google Fonts)

## Project Structure
- `index.html` - Entry HTML file with Tailwind config and custom styles
- `index.tsx` - React entry point
- `App.tsx` - Main app component with routing
- `components/` - Shared components (Navbar, Footer, ProductCard)
- `pages/` - Page components (Home, Products, About, Contact)
- `constants.ts` - App constants and data
- `types.ts` - TypeScript type definitions
- `vite.config.ts` - Vite configuration

## Development
- **Dev server**: `npm run dev` (port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`

## Deployment
- Static site deployment with Vite build output in `dist/`
