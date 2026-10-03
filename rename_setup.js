const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<i data-lucide="folder" class="w-3 h-3 text-blue-400"><\/i> Transactions/, '<i data-lucide="folder" class="w-3 h-3 text-blue-400"></i> Setup');

fs.writeFileSync('index.html', html);
