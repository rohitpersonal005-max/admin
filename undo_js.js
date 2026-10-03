const fs = require('fs');

const jsFiles = ['js/app.js', 'js/home.js', 'js/masters.js', 'js/transactions.js', 'js/store.js'];
jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Sweep 1: Colors (Zinc/Monochrome -> Slate/Blue)
    content = content.replace(/zinc-/g, 'slate-');
    content = content.replace(/bg-slate-900 hover:bg-slate-800 text-white font-medium tracking-wide/g, 'bg-blue-600 hover:bg-blue-700 text-white');
    content = content.replace(/text-slate-900/g, 'text-blue-600'); 
    // note: this might break some explicit slate-900 text, but previously blue was mapped to zinc-900.
    
    // Structure & Form components
    content = content.replace(/py-6 border-b border-slate-200 bg-transparent/g, 'p-4 bg-white border border-slate-200 rounded-md');
    content = content.replace(/py-6 border-b border-slate-200/g, 'p-4 bg-white border border-slate-200 rounded-md');
    
    content = content.replace(/border border-slate-300 rounded-none bg-slate-50 focus:bg-white focus:ring-1 focus:ring-slate-900 focus:border-slate-900/g, 'border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none');
    
    content = content.replace(/shadow-none/g, 'shadow-sm');
    content = content.replace(/rounded-none/g, 'rounded-md');
    content = content.replace(/rounded-sm/g, 'rounded-md');
    
    content = content.replace(/bg-transparent/g, 'bg-gradient-to-r from-blue-50 to-indigo-50');

    // Sweep 3: Typographic Hierarchy
    content = content.replace(/text-3xl font-serif tracking-tight text-blue-600/g, 'text-xl font-bold text-slate-900');
    content = content.replace(/text-2xl font-serif tracking-tight text-blue-600/g, 'text-lg font-bold text-slate-900');
    content = content.replace(/text-\[10px\] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4 block w-full/g, 'text-xs font-bold text-slate-900 uppercase tracking-wider');
    content = content.replace(/text-\[10px\] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2 block w-full/g, 'text-xs font-bold text-slate-900 uppercase tracking-wider');
    content = content.replace(/text-\[10px\] font-bold text-slate-500 uppercase tracking-widest/g, 'text-xs font-bold text-slate-800 uppercase');
    
    fs.writeFileSync(file, content);
});

console.log('JS redesign undone successfully.');
