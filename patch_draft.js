const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /const form = document\.getElementById\('vendor-form'\);\s*if \(form && !form\.checkValidity\(\)\) \{/g;
const replace = `const form = document.getElementById('vendor-form');
      if (directSubmit && form && !form.checkValidity()) {`;

code = code.replace(regex, replace);

fs.writeFileSync('js/masters.js', code);
console.log('Patched checkValidity check to only apply if directSubmit.');
