const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// Replace all `<div class="sm:col-span-3">` with `<div class="sm:col-span-3 flex flex-col justify-end">`
// Wait, the HTML block has exactly 4 of these divs in the quote row grid.
code = code.replace(/<div class="sm:col-span-3">/g, '<div class="sm:col-span-3 flex flex-col justify-end">');

// But just to be sure, let's also tighten the checkbox height.
// <input type="checkbox" class="q-mrp-na" ... />
code = code.replace(/<input type="checkbox" class="q-mrp-na"/g, '<input type="checkbox" class="q-mrp-na m-0 h-3 w-3"');

fs.writeFileSync('js/masters.js', code);
console.log('Fixed alignment via flex flex-col justify-end.');
