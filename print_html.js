const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const startMarker = `row.innerHTML = \``;
const endMarker = `        <div>\n          <label class="block font-bold text-slate-700 mb-1 text-[10px]">Upload Quotation Copy (PDF / Image)</label>`;

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

console.log(code.substring(startIndex, endIndex));
