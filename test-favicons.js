const https = require('https');

const domains = ['openai.com', 'anthropic.com', 'deepseek.com', 'runwayml.com', 'pika.art'];

domains.forEach(domain => {
  https.get(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`, (res) => {
    console.log(`${domain}: ${res.statusCode} (content-type: ${res.headers['content-type']})`);
  });
});
