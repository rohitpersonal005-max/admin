const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/bg-amber-50/g, 'bg-slate-50');
html = html.replace(/text-amber-800/g, 'text-slate-800');
html = html.replace(/border-amber-300/g, 'border-slate-300');
html = html.replace(/hover:bg-amber-100/g, 'hover:bg-slate-100');
html = html.replace(/text-amber-700/g, 'text-slate-700');
html = html.replace(/border-amber-200/g, 'border-slate-200');
html = html.replace(/text-amber-600/g, 'text-slate-600');

fs.writeFileSync('index.html', html);
