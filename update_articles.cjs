const fs = require('fs');

const images = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600", // Automation
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1531746790731-6c08cd263439?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",

  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", // Marketing
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",

  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600", // Tools
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",

  "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600", // Web Dev
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=600",

  "https://images.unsplash.com/photo-1518932945647-7a3c96922bdc?auto=format&fit=crop&q=80&w=600", // News
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1620825937374-87fc7d62828e?auto=format&fit=crop&q=80&w=600"
];

const relatedLinks = [
  // AI Automation
  ["top-10-ai-tools-productivity-growth-2026", "how-ai-is-replacing-manual-marketing-tasks"],
  ["how-ai-automation-saves-20-hours-weekly", "ai-workflow-automation-lead-generation"],
  ["how-ai-automation-saves-20-hours-weekly", "how-to-generate-leads-using-digital-funnels"],
  ["ai-workflow-automation-lead-generation", "seo-vs-ai-marketing-what-works-in-2026"],
  
  // Marketing
  ["seo-vs-ai-marketing-what-works-in-2026", "how-to-generate-leads-using-digital-funnels"],
  ["how-small-businesses-can-grow-using-ai-marketing", "linkedin-growth-strategy-for-b2b"],
  ["linkedin-growth-strategy-for-b2b", "how-small-businesses-can-grow-using-ai-marketing"],
  ["how-to-generate-leads-using-digital-funnels", "ai-workflow-automation-lead-generation"],

  // AI Tools
  ["best-free-ai-tools-for-marketing-content-automation", "how-to-choose-the-right-ai-tools-beginner-guide"],
  ["top-10-ai-tools-productivity-growth-2026", "ai-tools-vs-human-work-what-to-automate"],
  ["how-to-choose-the-right-ai-tools-beginner-guide", "top-10-ai-tools-every-business-should-use-in-2026"],
  ["best-free-ai-tools-for-marketing-content-automation", "ai-tools-vs-human-work-what-to-automate"],

  // Web Dev
  ["modern-website-development-trends-2026", "why-every-business-needs-ai-powered-website"],
  ["high-converting-website-increase-sales-3x", "landing-page-optimization-tips"],
  ["modern-website-development-trends-2026", "why-every-business-needs-ai-powered-website"],
  ["high-converting-website-increase-sales-3x", "modern-website-development-trends-2026"],

  // AI News
  ["openai-google-meta-ai-updates-for-businesses", "how-ai-agents-are-replacing-traditional-systems"],
  ["latest-ai-trends-in-2026-business-automation", "future-of-ai-in-marketing-sales-automation-2026-2030"],
  ["future-of-ai-in-marketing-sales-automation-2026-2030", "latest-ai-trends-in-2026-business-automation"],
  ["openai-google-meta-ai-updates-for-businesses", "how-ai-agents-are-replacing-traditional-systems"]
];

const ids = [
  'how-ai-automation-saves-20-hours-weekly',
  'top-10-ai-tools-every-business-should-use-in-2026',
  'ai-workflow-automation-lead-generation',
  'how-ai-is-replacing-manual-marketing-tasks',
  'how-small-businesses-can-grow-using-ai-marketing',
  'seo-vs-ai-marketing-what-works-in-2026',
  'how-to-generate-leads-using-digital-funnels',
  'linkedin-growth-strategy-for-b2b',
  'top-10-ai-tools-productivity-growth-2026',
  'best-free-ai-tools-for-marketing-content-automation',
  'ai-tools-vs-human-work-what-to-automate',
  'how-to-choose-the-right-ai-tools-beginner-guide',
  'high-converting-website-increase-sales-3x',
  'modern-website-development-trends-2026',
  'landing-page-optimization-tips',
  'why-every-business-needs-ai-powered-website',
  'latest-ai-trends-in-2026-business-automation',
  'openai-google-meta-ai-updates-for-businesses',
  'how-ai-agents-are-replacing-traditional-systems',
  'future-of-ai-in-marketing-sales-automation-2026-2030'
];

let code = fs.readFileSync('src/data/articles.js', 'utf8');

// The regex will match every article block
const articleRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?content:\s*`([\s\S]*?)`\s*\}/g;

code = code.replace(articleRegex, (match, id, content) => {
  const index = ids.indexOf(id);
  if (index === -1) return match;
  
  // replace image
  let newMatch = match.replace(/img:\s*['"][^'"]+['"]/, 'img: "' + images[index] + '"');
  
  // append internal links to content
  const link1 = relatedLinks[index][0];
  const link2 = relatedLinks[index][1];
  
  // Find titles for links
  const title1 = ids.includes(link1) ? link1.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()) : "Related Article";
  const title2 = ids.includes(link2) ? link2.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()) : "Related Insights";

  const additionalContent = '\\n\\n### Related Articles\\n- [' + title1 + '](/blog/' + link1 + ')\\n- [' + title2 + '](/blog/' + link2 + ')';
  
  // Make sure we only append once per run
  if (!content.includes('### Related Articles')) {
    newMatch = newMatch.replace(/content:\s*\`([\s\S]*?)\`/, 'content: `' + content + additionalContent + '`');
  }
  
  return newMatch;
});

fs.writeFileSync('src/data/articles.js', code);
console.log('Successfully updated articles.js');
