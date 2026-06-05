const fs = require('fs');

// The new blogs we want to inject
const newBlogsCode = fs.readFileSync('new_ai_automation_blogs.js', 'utf8');

// A bit of hacky parsing since it's an ES module
// We can just extract the array from newBlogsCode
const arrayContent = newBlogsCode.substring(newBlogsCode.indexOf('['));

// We can eval it safely because we just wrote it
const newBlogs = eval(arrayContent);

// Now read the original articles.js
let articlesCode = fs.readFileSync('src/data/articles.js', 'utf8');

// To modify it safely without breaking template literals, we can use regex
// Or just do a full rewrite of the file. Let's rewrite the file entirely to be safe.
// Wait, articlesData is an array of objects. We can just parse the original file with eval if we strip `export const articlesData = `
const originalArrayStr = articlesCode.substring(articlesCode.indexOf('['));
const originalBlogs = eval(originalArrayStr);

// Filter out the old AI Automation blogs
const filteredBlogs = originalBlogs.filter(b => b.category !== 'AI Automation');

// Prepend the new ones so they appear first, or put them at the top
const updatedBlogs = [...newBlogs, ...filteredBlogs];

// Now we need to convert the updatedBlogs back to a string with template literals for `content`
function generateJS(blogs) {
  let js = 'export const articlesData = [\n';
  
  for (let i = 0; i < blogs.length; i++) {
    const b = blogs[i];
    js += '  {\n';
    js += `    id: "${b.id}",\n`;
    js += `    category: "${b.category}",\n`;
    js += `    title: "${b.title}",\n`;
    js += `    author: "${b.author}",\n`;
    js += `    date: "${b.date}",\n`;
    js += `    readTime: "${b.readTime}",\n`;
    js += `    img: "${b.img}",\n`;
    js += `    content: \`\n${b.content.trim()}\n\`\n`;
    js += '  }' + (i === blogs.length - 1 ? '\n' : ',\n');
  }
  
  js += '];\n';
  return js;
}

const finalCode = generateJS(updatedBlogs);
fs.writeFileSync('src/data/articles.js', finalCode);
console.log('Successfully injected 4 new AI Automation blogs.');
