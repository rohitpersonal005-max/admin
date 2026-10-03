const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Constrain modal footer style
html = html.replace(/\\.border-t\\.border-slate-200 \\{/g, '#modal-card .border-t.border-slate-200, #stacked-modal-card .border-t.border-slate-200 {');
// Constrain modal header style
html = html.replace(/#modal-card > div:first-child, \\s*#stacked-modal-card > div:first-child,\\s*\\.border-b\\.border-slate-200 \\{/g, '#modal-card > div:first-child, #stacked-modal-card > div:first-child {');

fs.writeFileSync('index.html', html);
