const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. Remove v-gst-title input
code = code.replace(/\s*<input\s+type="text"\s+id="v-gst-title"[^>]*\/>/g, '');
console.log('Removed v-gst-title');

// 2. Remove v-pan-title input
code = code.replace(/\s*<input\s+type="text"\s+id="v-pan-title"[^>]*\/>/g, '');
console.log('Removed v-pan-title');

// 3. In saveVendor, set defaults if inputs don't exist
code = code.replace(
  /const gstDocTitle = document\.getElementById\('v-gst-title'\)\?\.value\.trim\(\) \|\| '';/,
  "const gstDocTitle = document.getElementById('v-gst-title')?.value.trim() || 'GST Certificate';"
);
code = code.replace(
  /const panDocTitle = document\.getElementById\('v-pan-title'\)\?\.value\.trim\(\) \|\| '';/,
  "const panDocTitle = document.getElementById('v-pan-title')?.value.trim() || 'PAN Card';"
);

fs.writeFileSync('js/masters.js', code, 'utf8');
console.log('Finished updating masters.js');
