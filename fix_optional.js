const fs = require('fs');

let masters = fs.readFileSync('js/masters.js', 'utf8');

masters = masters.replace('Select Existing Material (Optional)', 'Select Existing Material');
// Let's also check if there's any other place like "Material Description (Optional)" if applicable
// The user explicitly said: "when selecting existing material ,do not show optional text"

fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
