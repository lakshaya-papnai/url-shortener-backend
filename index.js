const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_REDIRECT_BASE = process.env.FRONTEND_REDIRECT_BASE || 'https://lakshaya-url.vercel.app/r'; // 🔥 Replace with your actual Vercel domain

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

// POST /shorten → Create short slug & return frontend redirect URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const slug = generateSlug();
  urlMap[slug] = url;

  // 🔗 Return frontend-based short link instead of backend link
  const shortUrl = `${FRONTEND_REDIRECT_BASE}/${slug}`;
  res.json({ original: url, short: shortUrl });
});

// GET /:slug → Actual redirect handler used by frontend redirect page
app.get('/:slug', (req, res) => {
  const longUrl = urlMap[req.params.slug];
  if (longUrl) {
    return res.send(longUrl); // 🧠 Frontend will receive and redirect
  }
  res.status(404).json({ error: 'Short link not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running with redirect base: ${FRONTEND_REDIRECT_BASE}`);
});
