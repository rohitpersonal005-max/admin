const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<div class="text-xs text-slate-400 italic">Document data not found in local storage\.<\/div>/g;
const newText = `<div class="text-xs text-slate-400 italic">Document not available.</div>`;

code = code.replace(regex, newText);

fs.writeFileSync('js/masters.js', code);
