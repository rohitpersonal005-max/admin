const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/#modal-card > div:first-child, \\r?\\n\\s*#stacked-modal-card > div:first-child,\\r?\\n\\s*\\.border-b\\.border-slate-200 \\{/g, '#modal-card > div:first-child, #stacked-modal-card > div:first-child {');

fs.writeFileSync('index.html', html);
