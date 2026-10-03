const fs = require('fs');

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync('index.html', 'utf8');

// Inject fonts and tailwind config
const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
`;
if (!html.includes('fonts.googleapis.com')) {
    html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', fontLinks + '\n  <script src="https://cdn.tailwindcss.com"></script>');
}

const tailwindConfig = `
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Newsreader', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
`;
if (!html.includes('tailwind.config =')) {
    html = html.replace('</head>', tailwindConfig + '\n</head>');
}

// Sidebar styling
html = html.replace('class="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300"', 'class="w-64 bg-zinc-50 border-r border-zinc-200 text-zinc-600 flex flex-col transition-all duration-300"');
html = html.replace('class="h-16 flex items-center px-6 bg-slate-950"', 'class="h-20 flex items-center px-8 border-b border-zinc-200"');
html = html.replace('class="text-white font-bold text-lg tracking-wider"', 'class="text-zinc-900 font-serif text-2xl tracking-tight"');

// Links
html = html.replace(/hover:bg-slate-800 hover:text-white/g, 'hover:text-zinc-900');
html = html.replace(/text-slate-400/g, 'text-zinc-400');
html = html.replace(/text-slate-500/g, 'text-zinc-500');

// Header
html = html.replace('class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm"', 'class="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10"');

// Main background
html = html.replace('class="flex-1 bg-slate-50 relative overflow-y-auto"', 'class="flex-1 bg-white relative overflow-y-auto"');

// Replace standard view-container padding
html = html.replace('id="view-container" class="p-6"', 'id="view-container" class="p-10 max-w-7xl mx-auto"');

// Pin Modal
html = html.replace(/bg-slate-900/g, 'bg-zinc-900');

fs.writeFileSync('index.html', html);


// 2. UPDATE JS FILES GLOBALLY
const jsFiles = ['js/app.js', 'js/home.js', 'js/masters.js', 'js/transactions.js', 'js/store.js'];
jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Sweep 1: Strip "AI Design" crutches
    content = content.replace(/shadow-(xs|sm|md|lg|xl|2xl)/g, 'shadow-none');
    content = content.replace(/bg-gradient-to-r from-[-a-z0-9]+ to-[-a-z0-9]+/g, 'bg-transparent');
    content = content.replace(/rounded-(lg|xl|2xl)/g, 'rounded-none');
    content = content.replace(/rounded-md/g, 'rounded-sm');
    
    // Sweep 2: Colors (Slate/Blue -> Zinc/Monochrome)
    content = content.replace(/slate-/g, 'zinc-');
    content = content.replace(/blue-50/g, 'zinc-50');
    content = content.replace(/indigo-50/g, 'zinc-50');
    content = content.replace(/blue-100/g, 'zinc-100');
    content = content.replace(/blue-200/g, 'zinc-200');
    content = content.replace(/indigo-200/g, 'zinc-200');
    
    // Convert generic blue buttons to sharp primary
    content = content.replace(/bg-blue-[67]00/g, 'bg-zinc-900');
    content = content.replace(/bg-indigo-[67]00/g, 'bg-zinc-900');
    content = content.replace(/text-blue-600/g, 'text-zinc-900');
    content = content.replace(/text-indigo-600/g, 'text-zinc-900');
    content = content.replace(/text-blue-700/g, 'text-zinc-900');
    content = content.replace(/text-indigo-700/g, 'text-zinc-900');
    content = content.replace(/text-blue-[89]00/g, 'text-zinc-900');
    
    // Sweep 3: Typographic Hierarchy
    // Page headers
    content = content.replace(/text-xl font-bold text-zinc-900/g, 'text-3xl font-serif tracking-tight text-zinc-900');
    content = content.replace(/text-lg font-bold text-zinc-900/g, 'text-2xl font-serif tracking-tight text-zinc-900');
    // Section subheaders
    content = content.replace(/text-xs font-bold text-zinc-900 uppercase tracking-wider/g, 'text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-200 pb-2 mb-4 block w-full');
    content = content.replace(/text-xs font-bold text-zinc-800 uppercase/g, 'text-[10px] font-bold text-zinc-500 uppercase tracking-widest');
    
    // Form and Component structures
    content = content.replace(/p-[3456]\s+bg-white\s+border\s+border-zinc-[23]00/g, 'py-6 border-b border-zinc-200 bg-transparent');
    content = content.replace(/p-[3456]\s+bg-zinc-50\/?[0-9]*\s+border\s+border-zinc-[23]00/g, 'py-6 border-b border-zinc-200 bg-transparent');
    
    // Keep inputs crisp
    content = content.replace(/border border-zinc-300 rounded-sm/g, 'border border-zinc-300 rounded-none bg-zinc-50 focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900');
    
    fs.writeFileSync(file, content);
});

console.log('Redesign applied successfully.');
