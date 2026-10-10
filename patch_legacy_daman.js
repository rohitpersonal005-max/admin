const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /const matchedState = this\.indianStates\.find\(s => s\.code === prefix\);/g;
const replace = `let matchedState = this.indianStates.find(s => s.code === prefix);
        if (prefix === '25') matchedState = this.indianStates.find(s => s.code === '26'); // Legacy Daman & Diu fallback`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
