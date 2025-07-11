const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `https://url-shortener-backend-6666.onrender.com`;

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

// POST /shorten → Create a new short URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const slug = generateSlug();
  urlMap[slug] = url;
  const shortUrl = `${BASE_URL}/${slug}`;

  res.json({ original: url, short: shortUrl });
});

// GET /:slug → Redirect to original URL
app.get('/:slug', (req, res) => {
  const longUrl = urlMap[req.params.slug];
  if (longUrl) {
    return res.redirect(longUrl);
  }
  res.status(404).send('Short link not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`);
});
