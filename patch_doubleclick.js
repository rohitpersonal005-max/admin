const fs = require('fs');
let code = fs.readFileSync('master-console/js/app.js', 'utf8');

// Completely remove window.submitProvision and the DOMContentLoaded block
const removeRegex = /window\\.submitProvision = function\\(\\) \\{[\\s\\S]*?\\}\\);/g;
code = code.replace(removeRegex, '');

// Now patch forceSubmitProvision to prevent double clicks
code = code.replace(
  `const name = document.getElementById('p-company').value.trim();`,
  `if (btn && btn.disabled) return;
    if (btn) btn.disabled = true;
    const name = document.getElementById('p-company').value.trim();`
);

fs.writeFileSync('master-console/js/app.js', code);
console.log('Successfully patched app.js to prevent double clicks');
