const fs = require('fs');

const articlesCode = fs.readFileSync('src/data/articles.js', 'utf8');

// Match everything from `export const articlesData = [` up to the end
const prefix = 'export const articlesData = [\n';

const newBlogsText = fs.readFileSync('new_ai_automation_blogs.js', 'utf8');
const justTheBlogs = newBlogsText.replace('export const newAutomationBlogs = [\n', '').replace(/\n\];$/, '');

// Now we need to remove the old AI Automation blogs from articlesCode
// They are exactly the first 4 blogs, but we can use regex to be safe.
let updatedCode = articlesCode;

// Regex to remove any blog block that has `category: "AI Automation",`
updatedCode = updatedCode.replace(/\{\s*id:\s*['"][^'"]+['"],\s*category:\s*['"]AI Automation['"][\s\S]*?content:\s*`[\s\S]*?`\s*\},?\s*/g, '');

// Prepend the new blogs
updatedCode = updatedCode.replace(prefix, prefix + justTheBlogs + ',\n');

fs.writeFileSync('src/data/articles.js', updatedCode);
console.log("Updated successfully");
