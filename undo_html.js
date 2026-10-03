const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove design override block
html = html.replace(/<style id="design-override">[\s\S]*?<\/style>/, '');

// 2. Restore Tailwind config & Fonts
const oldHead = `
  <!-- Google Fonts: Roboto & IBM Plex Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Roboto', 'Segoe UI', 'sans-serif'],
            mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
          },
          colors: {
            slate: { 800: '#1e2235', 900: '#141724', 950: '#0c0f18' },
            blue: { 50: '#f0f5ff', 100: '#e5edff', 500: '#2563eb', 600: '#1159eb', 700: '#0f4bc6' },
            green: { 400: '#5ac973', 500: '#48c263', 600: '#3bab53' },
          }
        }
      }
    }
  </script>
`;
html = html.replace(/<!-- Fonts -->[\s\S]*?<\/script>\s*<\/script>/, oldHead);
// Alternative fallback if regex fails
html = html.replace(/<link rel="preconnect"[^>]+>\s*<link rel="preconnect"[^>]+>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Newsreader[^>]+>\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>[\s\S]*?<\/script>/, oldHead);

// 3. Restore layout classes in index.html
html = html.replace(/w-64 bg-zinc-50 border-r border-zinc-200 text-zinc-600 flex flex-col/g, 'w-64 bg-slate-900 text-slate-300 flex flex-col');
html = html.replace(/h-20 flex items-center justify-center border-b border-zinc-200 bg-zinc-50 shrink-0 px-8/g, 'px-5 py-4 flex items-center justify-center border-b border-slate-800 bg-slate-950/80 shrink-0');
html = html.replace(/text-zinc-900 font-serif text-2xl tracking-tight/g, 'text-white font-bold text-lg tracking-wider');
html = html.replace(/hover:bg-zinc-200 hover:text-zinc-900/g, 'hover:bg-slate-800 hover:text-white');
html = html.replace(/hover:bg-zinc-200/g, 'hover:bg-slate-800/50');
html = html.replace(/h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 shrink-0/g, 'h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0');
html = html.replace(/p-10 max-w-7xl mx-auto w-full/g, 'p-6');
html = html.replace(/class="w-full pb-8"/g, 'class="max-w-7xl mx-auto pb-8"');
html = html.replace(/bg-white border border-zinc-200 px-10 py-10 text-zinc-900 shadow-sm rounded-none/g, 'bg-slate-900 px-7 py-6 text-white');
html = html.replace(/bg-zinc-50/g, 'bg-slate-50');
html = html.replace(/bg-zinc-900/g, 'bg-slate-900');
html = html.replace(/text-zinc-/g, 'text-slate-');
html = html.replace(/border-zinc-/g, 'border-slate-');
html = html.replace(/bg-zinc-/g, 'bg-slate-');
html = html.replace(/hover:text-slate-900/g, 'hover:text-white');

html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());

fs.writeFileSync('index.html', html);
