import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Using dynamic import or direct import for the articles
import { articlesData } from './src/data/articles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://advortex.in';

const staticRoutes = [
  '/',
  '/services',
  '/portfolio',
  '/ai-tools',
  '/blog',
  '/about',
  '/contact',
  '/pricing',
  '/privacy-policy',
  '/terms-of-service',
  '/careers',
  '/workplace-policy'
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  const today = new Date().toISOString().split('T')[0];

  // Add static routes
  staticRoutes.forEach(route => {
    let priority = '0.8';
    if (route === '/') priority = '1.0';
    if (route === '/contact') priority = '0.9';

    xml += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  });

  // Add dynamic blog routes
  articlesData.forEach(article => {
    // Attempt to convert article.date (e.g., "June 6, 2026") to YYYY-MM-DD
    let lastModDate = today;
    try {
      const d = new Date(article.date);
      if (!isNaN(d.getTime())) {
        lastModDate = d.toISOString().split('T')[0];
      }
    } catch (e) {
      // fallback to today
    }

    xml += `  <url>
    <loc>${DOMAIN}/blog/${article.id}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Sitemap successfully generated with ${staticRoutes.length + articlesData.length} URLs!`);
}

generateSitemap();
