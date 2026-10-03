const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the injected corporate CSS block
html = html.replace(/<style id="corporate-professional-override">[\s\S]*?<\/style>/, '');
html = html.replace(/<style id="enterprise-form-override">[\s\S]*?<\/style>/, '');

// 2. Restore sidebar orange icons
html = html.replace(/<i data-lucide="file-clock" class="w-4 h-4 text-slate-400"><\/i>/g, '<i data-lucide="file-clock" class="w-4 h-4 text-amber-400"></i>');
html = html.replace(/<span class="text-\[10px\] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1 pointer-events-none">\s*<i data-lucide="sliders" class="w-3 h-3 text-slate-400"><\/i> Reports\s*<\/span>/, '<span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1 pointer-events-none">\n              <i data-lucide="sliders" class="w-3 h-3 text-amber-400"></i> Reports\n            </span>');
html = html.replace(/<i data-lucide="arrow-down-left" class="w-4 h-4 text-slate-400"><\/i>/g, '<i data-lucide="arrow-down-left" class="w-4 h-4 text-amber-400"></i>');
html = html.replace(/<i data-lucide="shield-check" class="w-4 h-4 text-slate-400"><\/i>/g, '<i data-lucide="shield-check" class="w-4 h-4 text-amber-400"></i>');

// 3. Restore pending approvals counter
html = html.replace(/id="pending-approvals-counter" class="hidden bg-blue-600 text-white font-bold px-1\.5 py-0\.2 rounded text-\[10px\]"/g, 'id="pending-approvals-counter" class="hidden bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded text-[10px]"');

// 4. Restore header pending badge
const oldBadge = 'class="hidden px-2.5 py-1 bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-[11px] rounded hover:bg-slate-100 transition flex items-center gap-1.5"';
const newBadge = 'class="hidden px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 font-semibold text-[11px] rounded hover:bg-amber-100 transition flex items-center gap-1.5"';
html = html.replace(oldBadge, newBadge);

html = html.replace(/<i data-lucide="clock" class="w-3\.5 h-3\.5 text-slate-700"><\/i>/, '<i data-lucide="clock" class="w-3.5 h-3.5 text-amber-700"></i>');

// 5. Restore pin modal icon
const oldPin = 'class="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-3"';
const newPin = 'class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3"';
html = html.replace(oldPin, newPin);

// Ensure no styles block remains
html = html.replace(/<style id="design-override">[\s\S]*?<\/style>/, '');

fs.writeFileSync('index.html', html);
console.log('Undo completed.');
