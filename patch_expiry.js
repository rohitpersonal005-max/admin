const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. Rename q-exp to q-valid and add disabled/min logic
const qExpRegex = /<input type="date" class="q-exp([\s\S]*?)value="\$\{exp\}" \/>/g;
const qExpReplace = `<input type="date" class="q-valid$1value="\${exp}" \${!eff ? 'disabled' : \`min="\${eff}"\`} />`;
code = code.replace(qExpRegex, qExpReplace);

// 2. Add onchange to q-eff
const qEffRegex = /<input type="date" class="q-eff([\s\S]*?)value="\$\{eff\}" \$\{\!dt \? 'disabled' : `min="\\\$\{dt\}"`\} \/>/g;
const qEffReplace = `<input type="date" class="q-eff$1value="\${eff}" \${!dt ? 'disabled' : \`min="\${dt}"\`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />`;
code = code.replace(qEffRegex, qEffReplace);

// 3. Add onEffectiveDateChange and update onQuotationDateChange
const funcRegex = /onQuotationDateChange\(el\) \{([\s\S]*?)addVendorQuotationRow\(qData = null\) \{/g;
const funcReplace = `onQuotationDateChange(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const eff = row.querySelector('.q-eff');
    const valid = row.querySelector('.q-valid');
    if (!eff) return;
    
    if (!el.value) {
       eff.disabled = true;
       eff.value = '';
       eff.removeAttribute('min');
       if (valid) {
           valid.disabled = true;
           valid.value = '';
           valid.removeAttribute('min');
       }
    } else {
       eff.disabled = false;
       eff.min = el.value;
       if (eff.value && eff.value < el.value) {
          eff.value = ''; 
          window.CMS_APP.toast('Effective date reset as it was older than the new quotation date.', 'warning');
          if (valid) {
              valid.disabled = true;
              valid.value = '';
              valid.removeAttribute('min');
          }
       }
    }
  },

  onEffectiveDateChange(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const valid = row.querySelector('.q-valid');
    if (!valid) return;
    
    if (!el.value) {
       valid.disabled = true;
       valid.value = '';
       valid.removeAttribute('min');
    } else {
       valid.disabled = false;
       valid.min = el.value;
       if (valid.value && valid.value < el.value) {
          valid.value = '';
          window.CMS_APP.toast('Valid Till date reset as it was older than the new Effective date.', 'warning');
       }
    }
  },

  addVendorQuotationRow(qData = null) {`;

code = code.replace(funcRegex, funcReplace);

fs.writeFileSync('js/masters.js', code);
console.log('Patched q-exp and added effective date chronological constraints.');
