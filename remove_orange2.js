const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Change pending approvals badge to a neutral corporate blue
html = html.replace(/bg-amber-500 text-slate-950/g, 'bg-blue-600 text-white');

fs.writeFileSync('index.html', html);
