const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexFooter = /<div class="flex gap-2\.5">/;
const replaceFooter = `<div class="flex items-center justify-between w-full"><div id="v-autosave-status" class="flex-1 text-xs text-emerald-600 font-semibold italic"></div><div class="flex gap-2.5">`;

code = code.replace(regexFooter, replaceFooter);
// Fix the closing div for the new wrapper
const regexFooterClose = /<\/button>\s*<\/div>\s*<\/form>/;
const replaceFooterClose = `</button>\s*</div></div>\s*</form>`;
code = code.replace(regexFooterClose, `</button></div></div></form>`);

const regexAutosave = /CMS_MASTERS\.saveVendor\(activeId, false\);/g;
const replaceAutosave = `CMS_MASTERS.saveVendor(activeId, false);
                const statusEl = document.getElementById('v-autosave-status');
                if (statusEl) {
                   statusEl.innerText = 'Draft auto-saved at ' + new Date().toLocaleTimeString();
                   setTimeout(() => { if (statusEl.innerText.includes('auto-saved')) statusEl.innerText = ''; }, 3000);
                }
                if (!vendorForm.dataset.toastShown) {
                   window.CMS_APP.toast('Draft successfully auto-saved in the background!', 'success');
                   vendorForm.dataset.toastShown = 'true';
                }`;

code = code.replace(regexAutosave, replaceAutosave);

fs.writeFileSync('js/masters.js', code);
console.log('Patched UI indicator.');
