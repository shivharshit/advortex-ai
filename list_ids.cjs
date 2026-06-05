const fs = require('fs');
const code = fs.readFileSync('src/data/articles.js', 'utf8');
const match = code.match(/id:\s*['"]([^'"]+)['"]/g);
console.log(match.map(x => x.split(/['"]/)[1]));
