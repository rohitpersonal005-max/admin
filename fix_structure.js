const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Global replaces
html = html.replace(/bg-slate-/g, 'bg-zinc-');
html = html.replace(/text-slate-/g, 'text-zinc-');
html = html.replace(/border-slate-/g, 'border-zinc-');
html = html.replace(/hover:bg-slate-800 hover:text-white/g, 'hover:text-zinc-900');

// Structure overrides
html = html.replace(/w-64 bg-zinc-900 text-zinc-300 flex flex-col transition-all duration-300/g, 'w-64 bg-zinc-50 border-r border-zinc-200 text-zinc-600 flex flex-col transition-all duration-300');
html = html.replace(/h-16 flex items-center px-6 bg-zinc-950/g, 'h-20 flex items-center px-8 border-b border-zinc-200');
html = html.replace(/text-white font-bold text-lg tracking-wider/g, 'text-zinc-900 font-serif text-2xl tracking-tight');
html = html.replace(/h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shadow-sm/g, 'h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10');

// Cache buster
html = html.replace(/\\?v=[0-9_]+/g, '?v=' + Date.now());

fs.writeFileSync('index.html', html);
console.log('Fixed index.html structure.');
