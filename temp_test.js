const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexGstInput = /onGstInput\(val\) \{[\s\S]*?\}\s*\}\s*\},/g;

// Wait, I need a precise replacement. I'll just find the end of onGstInput.
