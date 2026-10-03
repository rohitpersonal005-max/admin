const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/text-amber-400/g, 'text-slate-400');

fs.writeFileSync('index.html', html);
