const fs = require('fs');
const path = 'c:/Users/saksham/Downloads/pendragoncycle.com (1)/pendragoncycle.com/_next/static/chunks/pages/legal/[slug]-2ff233bf50180e60.js';
let content = fs.readFileSync(path, 'utf8');
// Replace malformed href
content = content.replace(/href:\s*"#"#/, 'href: "#"');
// Replace malformed src path
content = content.replace(/src:\s*"\s*\/\s*images\s*\/\s*logo\s*\/\s*logo\s*-\s*gold\.png"/, 'src: "/images/logo/logo-gold.png"');
fs.writeFileSync(path, content, 'utf8');
console.log('Patch applied');
