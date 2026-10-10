const fs = require('fs');
let code = fs.readFileSync('js/dashboard.js', 'utf8');

const regex = /<button onclick="CMS_DASHBOARD\.openTaskModal\(\)"[^>]*>.*?Add task<\/button>/;
const replacement = `\${role === 'Admin' ? \`<button onclick="CMS_DASHBOARD.openTaskModal()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-md transition flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> Add task</button>\` : ''}`;

code = code.replace(regex, replacement);
fs.writeFileSync('js/dashboard.js', code);
console.log('Restored Admin-only task creation.');
