const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /value="\$\{dt\}" \/ max="\\\$\{today\}">/g;
const replace = `value="\${dt}" max="\${today}" />`;

code = code.replace(regex, replace);

fs.writeFileSync('js/masters.js', code);
console.log('Fixed quotation date max attribute.');
