const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /mrp: row\.querySelector\('\.q-mrp'\)\?\.value \|\| 0,/g;
const replace = `mrp: row.querySelector('.q-mrp')?.value || 0,\n        mrpNotApplicable: row.querySelector('.q-mrp-na')?.checked || false,`;

if (code.match(regex)) {
   code = code.replace(regex, replace);
} else {
   const backupRegex = /mrp: row\.querySelector\('\.q-mrp'\)\?\.value \|\| 0,/g; // wait, what is it exactly?
   // Let's replace by finding exact text
}

fs.writeFileSync('js/masters.js', code);
