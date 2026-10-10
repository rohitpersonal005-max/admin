const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const dateHtmlRegex = /<input type="date" class="q-date([\s\S]*?)max="\$\{today\}" \/>/g;
const replaceDateHtml = `<input type="date" class="q-date$1max="\${today}" onchange="CMS_MASTERS.onQuotationDateChange(this)" />`;
code = code.replace(dateHtmlRegex, replaceDateHtml);

const effHtmlRegex = /<input type="date" class="q-eff([\s\S]*?)value="\$\{qData \? \(qData\.effectiveFrom \|\| ''\) : ''\}" \/>/g;
const replaceEffHtml = `<input type="date" class="q-eff$1value="\${eff}" \${!dt ? 'disabled' : \`min="\${dt}"\`} />`;
code = code.replace(effHtmlRegex, replaceEffHtml);

// Insert the new onQuotationDateChange function before addVendorQuotationRow
const insertFuncRegex = /addVendorQuotationRow\(qData = null\) \{/;
const insertFuncReplace = `onQuotationDateChange(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const eff = row.querySelector('.q-eff');
    if (!eff) return;
    
    if (!el.value) {
       eff.disabled = true;
       eff.value = '';
       eff.removeAttribute('min');
    } else {
       eff.disabled = false;
       eff.min = el.value;
       if (eff.value && eff.value < el.value) {
          eff.value = ''; 
          window.CMS_APP.toast('Effective date reset as it was older than the new quotation date.', 'warning');
       }
    }
  },

  addVendorQuotationRow(qData = null) {`;

code = code.replace(insertFuncRegex, insertFuncReplace);

fs.writeFileSync('js/masters.js', code);
console.log('Patched q-date logic successfully.');
