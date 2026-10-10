const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<span>\+ Add Certificate<\/span>/g;
const newStr = `<span>Add Certificate</span>`;

code = code.replace(regex, newStr);

fs.writeFileSync('js/masters.js', code);
