const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /\/\/ FORCE HTML5 FORM VALIDATION ACROSS ALL HIDDEN TABS[\s\S]*?return;\s*\}/g;
code = code.replace(regex, '');

fs.writeFileSync('js/masters.js', code);
console.log('Regex removed invalid validation block.');
