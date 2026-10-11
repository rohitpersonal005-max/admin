const fs = require('fs');
const content = fs.readFileSync('js/masters.js', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (l.includes('v-gst-title') || l.includes('v-pan-title') || l.includes('gstDocTitle') || l.includes('panDocTitle')) {
    console.log(`${idx + 1}: ${l}`);
  }
});
