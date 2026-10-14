const fs = require('fs');
global.window = {};
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
eval(fs.readFileSync('js/store.js', 'utf8'));
eval(fs.readFileSync('js/masters.js', 'utf8'));

// Simulate DOM for vendor form
const jsdom = require('jsdom');
// Since jsdom might not be installed, let's inspect saveVendor code directly or construct what saveVendor creates.
