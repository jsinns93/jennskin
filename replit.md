# Jennskin Naturals

## Overview
A React-based marketing website for Jennskin Naturals, a natural beauty/skincare brand. The site includes a full CMS (Content Management System) with an admin panel for managing all text, images, products, and settings across every page.

## Tech Stack
- **Frontend**: React 19 with TypeScript, Vite 6
- **Backend**: Express.js (Node.js) on port 3001
- **Database**: PostgreSQL (Replit built-in)
- **Styling**: Tailwind CSS (via CDN), custom CSS
- **Routing**: React Router DOM v7 (HashRouter)
- **Auth**: JWT + bcrypt for admin authentication
- **File Upload**: Multer for image uploads

## Project Structure
```
├── index.html          # Entry HTML
├── index.tsx           # React entry point
├── App.tsx             # Main app with routes (public + admin)
├── vite.config.ts      # Vite config (port 5000, proxy to 3001)
├── components/         # Shared UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── pages/              # Public pages (fetch CMS data)
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── admin/              # Admin panel
│   ├── api.ts          # API client
│   ├── AdminLogin.tsx
│   ├── AdminLayout.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminSettings.tsx
│   ├── AdminPageEditor.tsx
│   ├── AdminProducts.tsx
│   ├── AdminTestimonials.tsx
│   └── ImageUploader.tsx
├── server/
│   └── index.js        # Express backend (auth, CMS API, uploads)
└── uploads/            # Uploaded images (persistent)
```

## Database Schema
- **admin_users**: id, username, password_hash
- **site_settings**: brand_tagline, bpom_number, store_links (JSONB)
- **page_sections**: page_slug, section_key, content (JSONB)
- **products**: slug, name, category, description, benefits, ingredients, image_url, scents, best_seller, sort_order
- **testimonials**: name, text, role

## Admin Access
- URL: `/#/admin/login`
- Default credentials: admin / admin123
- Manages: site settings, all page content, products, testimonials, image uploads

## Development
- **Dev server**: `npm run dev` (starts Express backend + Vite frontend)
- **Frontend**: Port 5000 (Vite dev server)
- **Backend API**: Port 3001 (Express, proxied via Vite)
- **Build**: `npm run build` (outputs to `dist/`)

## Deployment
- Autoscale deployment
- Build: `npm run build`
- Run: Express server + serve static dist on port 5000

## API Routes
- `POST /api/auth/login` - Admin login
- `GET /api/settings` - Site settings
- `PUT /api/settings` - Update settings (auth required)
- `GET /api/pages/:slug` - Page section content
- `PUT /api/pages/:slug/:sectionKey` - Update page section (auth required)
- `GET/POST /api/products` - List/create products
- `PUT/DELETE /api/products/:id` - Update/delete product
- `GET/POST /api/testimonials` - List/create testimonials
- `PUT/DELETE /api/testimonials/:id` - Update/delete testimonial
- `POST /api/upload` - Image upload (auth required)
