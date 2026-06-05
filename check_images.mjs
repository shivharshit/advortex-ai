import https from 'https';
import fs from 'fs';

const code = fs.readFileSync('src/data/articles.js', 'utf8');
const urls = [...code.matchAll(/img:\s*['"](https:\/\/[^'"]+)['"]/g)].map(m => m[1]);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: err.message });
    });
  });
}

async function run() {
  const uniqueUrls = [...new Set(urls)];
  console.log(`Checking ${uniqueUrls.length} unique URLs...`);
  for (const url of uniqueUrls) {
    const res = await checkUrl(url);
    if (res.status !== 200) {
      console.log(`FAILED: ${res.status} - ${res.url}`);
    } else {
      console.log(`OK: ${res.url}`);
    }
  }
}
run();
