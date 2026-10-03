const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Sidebar shell
html = html.replace('w-60 bg-zinc-900 text-zinc-300 flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 -translate-x-full border-r border-zinc-800', 'w-64 bg-zinc-50 border-r border-zinc-200 text-zinc-600 flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 -translate-x-full');

// Sidebar header
html = html.replace('px-5 py-4 flex items-center justify-center border-b border-zinc-800 bg-zinc-950/80 shrink-0', 'h-20 flex items-center justify-center border-b border-zinc-200 bg-zinc-50 shrink-0 px-8');

// Logo
html = html.replace('text-white font-black text-xl tracking-wider', 'text-zinc-900 font-serif text-2xl tracking-tight');
html = html.replace('text-white font-black text-lg tracking-wider', 'text-zinc-900 font-serif text-2xl tracking-tight');

// Hover states in sidebar
html = html.split('hover:bg-zinc-800/50').join('hover:bg-zinc-200 hover:text-zinc-900');

// Top header shell
html = html.replace('h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0', 'h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 shrink-0');

// Main content padding
html = html.replace('class="flex-1 overflow-y-auto p-4 sm:p-6"', 'class="flex-1 overflow-y-auto p-10 max-w-7xl mx-auto w-full"');
html = html.replace('class="max-w-7xl mx-auto pb-8"', 'class="w-full pb-8"');

// Auth gate text/color changes
html = html.replace('bg-zinc-950', 'bg-zinc-50');
html = html.replace('bg-zinc-900 px-7 py-6 text-white', 'bg-white border border-zinc-200 px-10 py-10 text-zinc-900 shadow-sm rounded-none');

fs.writeFileSync('index.html', html);
