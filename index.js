const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Updated redirect base to match new Vercel deployment
const FRONTEND_REDIRECT_BASE = process.env.FRONTEND_REDIRECT_BASE || 'https://go-pi-five.vercel.app/r';

app.use(cors());
app.use(express.json());

const urlMap = {};

function generateSlug() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug;
  do {
    slug = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  } while (urlMap[slug]);
  return slug;
}

// 🔗 POST /shorten → Create a short slug and return frontend redirect link
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const slug = generateSlug();
  urlMap[slug] = url;

  const shortUrl = `${FRONTEND_REDIRECT_BASE}/${slug}`;
  res.json({ original: url, short: shortUrl });
});

// 🌐 GET /:slug → Return original URL for frontend to redirect
app.get('/:slug', (req, res) => {
  const longUrl = urlMap[req.params.slug];
  if (longUrl) {
    return res.send(longUrl);
  }
  res.status(404).json({ error: 'Short link not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running with redirect base: ${FRONTEND_REDIRECT_BASE}`);
});
