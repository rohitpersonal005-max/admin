const fs = require('fs');
let code = fs.readFileSync('js/dashboard.js', 'utf8');
code = code.replace(/\$\{role === 'Admin' \? `\s*<button onclick="CMS_DASHBOARD\.openTaskModal\(\)".*?>[\s\S]*?<\/button>\s*` : ''\}/g, `<button onclick="CMS_DASHBOARD.openTaskModal()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-md transition flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> Add task</button>`);
fs.writeFileSync('js/dashboard.js', code);
