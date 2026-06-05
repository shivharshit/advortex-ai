const fs = require('fs');

const articlesCode = fs.readFileSync('src/data/articles.js', 'utf8');

const prefix = 'export const articlesData = [\n';

const newBlogsText = fs.readFileSync('new_digital_marketing_blogs.js', 'utf8');
const justTheBlogs = newBlogsText.replace('export const newDigitalMarketingBlogs = [\n', '').replace(/\n\];$/, '');

let updatedCode = articlesCode;

// Regex to remove any blog block that has `category: "Digital Marketing"`
updatedCode = updatedCode.replace(/\{\s*id:\s*['"][^'"]+['"],\s*category:\s*['"]Digital Marketing['"][\s\S]*?content:\s*`[\s\S]*?`\s*\},?\s*/g, '');

// Prepend the new blogs
updatedCode = updatedCode.replace(prefix, prefix + justTheBlogs + ',\n');

fs.writeFileSync('src/data/articles.js', updatedCode);
console.log("Updated successfully");
