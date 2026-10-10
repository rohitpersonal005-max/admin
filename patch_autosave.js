const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /\/\/ Auto-clear error styling on input\s*const vendorForm = document\.getElementById\('vendor-form'\);\s*if \(vendorForm\) \{\s*vendorForm\.addEventListener\('input', \(e\) => \{\s*if \(e\.target\.classList\.contains\('border-rose-500'\)\) \{\s*e\.target\.classList\.remove\('border-rose-500', 'bg-rose-50'\);\s*\}\s*\}\);\s*vendorForm\.addEventListener\('change', \(e\) => \{\s*if \(e\.target\.classList\.contains\('border-rose-500'\)\) \{\s*e\.target\.classList\.remove\('border-rose-500', 'bg-rose-50'\);\s*\}\s*\}\);\s*\}/g;

const replace = `// Auto-clear error styling and Auto-Save Draft
        const vendorForm = document.getElementById('vendor-form');
        if (vendorForm) {
          
          let draftTimeout;
          const triggerAutoSave = () => {
             // Only auto-save if they've at least typed a Company Name or something basic, to avoid blank drafts.
             const n = document.getElementById('v-name')?.value.trim();
             if (!n) return;
             clearTimeout(draftTimeout);
             draftTimeout = setTimeout(() => {
                // Determine ID: if we opened an edit modal, vendorId is passed. 
                // Wait, openVendorModal passes vendorId into the HTML string: saveVendor('\${vendorId || ''}')
                // We need to know the active ID. Let's just parse it from the submit button.
                const btn = document.getElementById('v-submit-btn');
                let activeId = null;
                if (btn) {
                  const match = btn.getAttribute('onclick').match(/'([^']+)'/);
                  if (match && match[1]) activeId = match[1];
                }
                
                // If no active ID, generate one and update the submit button so future saves use it!
                if (!activeId) {
                  activeId = 'V-' + Date.now();
                  if (btn) btn.setAttribute('onclick', \`CMS_MASTERS.saveVendor('\${activeId}')\`);
                  vendorForm.setAttribute('onsubmit', \`event.preventDefault(); CMS_MASTERS.saveVendor('\${activeId}');\`);
                }
                
                // Save quietly as draft
                CMS_MASTERS.saveVendor(activeId, false);
             }, 1000); // 1-second debounce
          };

          vendorForm.addEventListener('input', (e) => {
            if (e.target.classList.contains('border-rose-500')) {
              e.target.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-600');
            }
            triggerAutoSave();
          });
          vendorForm.addEventListener('change', (e) => {
            if (e.target.classList.contains('border-rose-500')) {
              e.target.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-600');
            }
            triggerAutoSave();
          });
        }`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Injected Auto-Save logic.');
