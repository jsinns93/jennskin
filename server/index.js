import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

import crypto from 'crypto';
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self';");
  }
}));

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME_TYPES.includes(file.mimetype) && ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, png, gif, webp, svg) are allowed'));
    }
  }
});

function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ user: { id: user.id, username: user.username }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', authMiddleware, async (req, res) => {
  try {
    const { brand_tagline, bpom_number, store_links } = req.body;
    const result = await pool.query(
      `UPDATE site_settings SET brand_tagline = COALESCE($1, brand_tagline), bpom_number = COALESCE($2, bpom_number), store_links = COALESCE($3, store_links), updated_at = NOW() WHERE id = 1 RETURNING *`,
      [brand_tagline, bpom_number, store_links ? JSON.stringify(store_links) : null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pages/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM page_sections WHERE page_slug = $1 ORDER BY section_key', [req.params.slug]);
    const sections = {};
    result.rows.forEach(row => { sections[row.section_key] = row.content; });
    res.json({ slug: req.params.slug, sections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pages/:slug/:sectionKey', authMiddleware, async (req, res) => {
  try {
    const { slug, sectionKey } = req.params;
    const { content } = req.body;
    const result = await pool.query(
      `INSERT INTO page_sections (page_slug, section_key, content, updated_at) VALUES ($1, $2, $3, NOW()) ON CONFLICT (page_slug, section_key) DO UPDATE SET content = $3, updated_at = NOW() RETURNING *`,
      [slug, sectionKey, JSON.stringify(content)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY sort_order, created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', authMiddleware, async (req, res) => {
  try {
    const { slug, name, category, description, benefits, ingredients, image_url, scents, best_seller, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO products (slug, name, category, description, benefits, ingredients, image_url, scents, best_seller, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [slug, name, category, description, benefits || [], ingredients || [], image_url, scents || null, best_seller || false, sort_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const { slug, name, category, description, benefits, ingredients, image_url, scents, best_seller, sort_order } = req.body;
    const result = await pool.query(
      `UPDATE products SET slug=COALESCE($1,slug), name=COALESCE($2,name), category=COALESCE($3,category), description=COALESCE($4,description), benefits=COALESCE($5,benefits), ingredients=COALESCE($6,ingredients), image_url=COALESCE($7,image_url), scents=$8, best_seller=COALESCE($9,best_seller), sort_order=COALESCE($10,sort_order), updated_at=NOW() WHERE id=$11 RETURNING *`,
      [slug, name, category, description, benefits, ingredients, image_url, scents || null, best_seller, sort_order, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/testimonials', authMiddleware, async (req, res) => {
  try {
    const { name, text, role } = req.body;
    const result = await pool.query(
      'INSERT INTO testimonials (name, text, role) VALUES ($1,$2,$3) RETURNING *',
      [name, text, role]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const { name, text, role } = req.body;
    const result = await pool.query(
      'UPDATE testimonials SET name=COALESCE($1,name), text=COALESCE($2,text), role=COALESCE($3,role) WHERE id=$4 RETURNING *',
      [name, text, role, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function seedAdmin() {
  const result = await pool.query('SELECT COUNT(*) FROM admin_users');
  if (parseInt(result.rows[0].count) === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await pool.query('INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)', ['admin', hash]);
    console.log('Default admin created: admin / admin123');
  }
}

async function seedDefaultContent() {
  const prodCount = await pool.query('SELECT COUNT(*) FROM products');
  if (parseInt(prodCount.rows[0].count) === 0) {
    const products = [
      { slug: 'deodorant-spray', name: 'Deodorant Spray', category: 'Deodorant', description: 'Natural alum deodorant designed to control odor and sweat effectively while being gentle on your skin.', benefits: ['Natural alum protection','Controls odor and sweat','Brightens underarms','Non-sticky and fast drying'], ingredients: ['Natural Alum','Purified Water','Fragrance'], scents: ['Vanilla','Jasmine','Bubblegum','Baby Fresh','Sakura'], image_url: 'https://picsum.photos/seed/deo/600/800', best_seller: true, sort_order: 1 },
      { slug: 'green-apple-serum', name: 'Green Apple Serum', category: 'Serum', description: 'A potent brightening serum that helps reduce acne and scars with the power of botanical extracts.', benefits: ['Intense brightening','Fades acne scars','Improves skin texture','Antioxidant protection'], ingredients: ['Apple Extract','Niacinamide','Ceramide','Vitamin C'], scents: null, image_url: 'https://picsum.photos/seed/serum/600/800', best_seller: true, sort_order: 2 },
      { slug: 'honey-moisturizer', name: 'Honey Moisturizer', category: 'Moisturizer', description: 'Deeply hydrating moisturizer that calms redness and provides long-lasting moisture.', benefits: ['Deep hydration','Soothes redness','Repair skin barrier','Dewy finish'], ingredients: ['Honey','Centella Asiatica','Chamomile','Squalane'], scents: null, image_url: 'https://picsum.photos/seed/honey/600/800', best_seller: true, sort_order: 3 },
      { slug: 'calendula-facial-wash', name: 'Calendula Facial Wash', category: 'Cleanser', description: 'A gentle cleanser that removes impurities without stripping your skin of its natural oils.', benefits: ['Gentle cleansing','Calms inflammation','Keeps skin supple','Safe for sensitive skin'], ingredients: ['Calendula','Jojoba Oil','Niacinamide','Aloe Vera'], scents: null, image_url: 'https://picsum.photos/seed/wash/600/800', best_seller: false, sort_order: 4 },
      { slug: 'gotu-kola-toner', name: 'Gotu Kola Toner', category: 'Toner', description: 'Hydrating and calming toner that balances skin pH and prepares skin for further treatment.', benefits: ['Hydrating','Calming effect','Balances pH','Reduces redness'], ingredients: ['Centella Asiatica (Gotu Kola)','Cucumber Extract','Hyaluronic Acid'], scents: null, image_url: 'https://picsum.photos/seed/toner/600/800', best_seller: false, sort_order: 5 }
    ];
    for (const p of products) {
      await pool.query(
        'INSERT INTO products (slug, name, category, description, benefits, ingredients, image_url, scents, best_seller, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [p.slug, p.name, p.category, p.description, p.benefits, p.ingredients, p.image_url, p.scents, p.best_seller, p.sort_order]
      );
    }
    console.log('Default products seeded');
  }

  const testCount = await pool.query('SELECT COUNT(*) FROM testimonials');
  if (parseInt(testCount.rows[0].count) === 0) {
    const testimonials = [
      { name: 'Sarah K.', text: 'The Deodorant Spray is a game changer! No more sticky feeling and it smells amazing.', role: 'Loyal Customer' },
      { name: 'Aditya R.', text: 'My acne scars started fading in just two weeks with the Green Apple Serum. Highly recommend!', role: 'Student' },
      { name: 'Maya S.', text: "Finally found a moisturizer that doesn't break me out. The Honey Moisturizer is magic.", role: 'Working Professional' }
    ];
    for (const t of testimonials) {
      await pool.query('INSERT INTO testimonials (name, text, role) VALUES ($1,$2,$3)', [t.name, t.text, t.role]);
    }
    console.log('Default testimonials seeded');
  }

  const pageCount = await pool.query('SELECT COUNT(*) FROM page_sections');
  if (parseInt(pageCount.rows[0].count) === 0) {
    const sections = [
      { page: 'home', key: 'hero', content: { badge: 'Est. 2020 • Indonesia', title_line1: 'Naturally', title_line2: 'Yours —', title_line3: 'Everyday Glow.', subtitle: 'Natural ingredients. Skin-friendly formulas. Designed for daily care.', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop', badge_text: '100% BPOM Certified Safe' } },
      { page: 'home', key: 'ticker', content: { items: ['Alcohol Free', 'Natural Ingredients', 'Indonesian Made'] } },
      { page: 'home', key: 'bestsellers', content: { title_line1: 'Our', title_line2: 'Favorites', subtitle: 'The essentials your skin has been waiting for.' } },
      { page: 'home', key: 'why', content: { title_line1: 'Why', title_line2: 'Jennskin?', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop', features: [ { id: '01', title: 'Clean Formulas', desc: 'No alcohol, no parabens. Only the essentials your skin needs.' }, { id: '02', title: 'Tropical Science', desc: 'Designed specifically for the Indonesian climate and humidity.' }, { id: '03', title: 'Safe for Daily Use', desc: 'Gentle enough to be your morning and evening ritual foundation.' } ] } },
      { page: 'home', key: 'cta', content: { title_line1: 'Ready', title_line2: 'To Glow?', subtitle: 'Join the natural skincare revolution. High quality, Indonesian made, BPOM certified.' } },
      { page: 'about', key: 'intro', content: { badge: 'Our DNA', title_line1: 'True', title_line2: 'Natural', title_line3: 'Heritage.', paragraph1: 'Jennskin Naturals was founded in 2020 by Jennifer Coppen with a clear vision: to bring high-performance natural skincare to the modern Indonesian woman.', paragraph2: "We believe that beauty should never come at the cost of your health. That's why every drop is free from alcohol, parabens, and harsh synthetics.", image: 'https://images.unsplash.com/photo-1570172619992-23136208665c?q=80&w=1200&auto=format&fit=crop', quote: "\"We don't follow trends; we nurture real skin.\"" } },
      { page: 'about', key: 'philosophy', content: { items: [ { title: 'Source', desc: 'Ethically harvested Indonesian botanicals.' }, { title: 'Science', desc: 'BPOM certified safe and gentle formulas.' }, { title: 'Soul', desc: 'Designed for confidence and self-care daily.' } ] } },
      { page: 'contact', key: 'header', content: { title_line1: "Let's", title_line2: 'Chat.' } },
      { page: 'contact', key: 'booth', content: { title: 'Visit Our Booth', line1: 'Living World Mall', line2: '(In front of MM Juice)', line3: 'Denpasar, Bali' } },
      { page: 'products', key: 'header', content: { badge: 'Boutique', title: 'The Collection', subtitle: 'High-performance natural skincare crafted for the modern soul.' } }
    ];
    for (const s of sections) {
      await pool.query('INSERT INTO page_sections (page_slug, section_key, content) VALUES ($1,$2,$3)', [s.page, s.key, JSON.stringify(s.content)]);
    }
    console.log('Default page sections seeded');
  }
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`CMS API running on port ${PORT}`);
  seedAdmin().then(() => seedDefaultContent()).catch(err => console.error('Seed error:', err));
});
server.on('error', (err) => {
  console.error('Server error:', err);
});
