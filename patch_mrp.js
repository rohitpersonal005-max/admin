const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. Replace checkRateVsMrp logic
const checkRateRegex = /checkRateVsMrp\(el\) \{[\s\S]*?\}\s*\},/g;
const checkRateReplace = `checkRateVsMrp(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const rateInput = row.querySelector('.q-rate');
    const mrpInput = row.querySelector('.q-mrp');
    const mrpNa = row.querySelector('.q-mrp-na')?.checked;

    rateInput.classList.remove('border-rose-500', 'bg-rose-50');

    if (mrpNa) return; // Ignore validation if MRP is Not Applicable

    const rate = parseFloat(rateInput.value) || 0;
    const mrp = parseFloat(mrpInput.value) || 0;
    
    if (rate > 0 && mrp > 0 && rate > mrp) {
       setTimeout(() => {
           const proceed = confirm('Approved rate is more than MRP, do you want to continue with entered rate? \\n\\n[OK] = Yes, continue \\n[Cancel] = No, allow me to enter revised rate');
           if (!proceed) {
              rateInput.value = '';
              rateInput.focus();
           }
       }, 50);
    }
  },`;

code = code.replace(checkRateRegex, checkRateReplace);

// 2. Replace HTML for Rate and MRP inputs to use onchange instead of oninput, and add MRP N/A checkbox
const rateHtmlRegex = /<input type="number" step="0\.01" class="q-rate([\s\S]*?)oninput="CMS_MASTERS\.checkRateVsMrp\(this\)" \/>/g;
const rateHtmlReplace = `<input type="number" step="0.01" class="q-rate$1onchange="CMS_MASTERS.checkRateVsMrp(this)" />`;
code = code.replace(rateHtmlRegex, rateHtmlReplace);

const mrpHtmlRegex = /<label class="block font-semibold text-slate-700 mb-1 text-\[10px\]">MRP<\/label>\s*<input type="number" step="0\.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2\.5 py-1\.5 border border-slate-300 rounded text-xs" value="\$\{mrp\}" placeholder="0\.00" oninput="CMS_MASTERS\.checkRateVsMrp\(this\)" \/>/g;
const mrpHtmlReplace = `<label class="flex justify-between items-center font-semibold text-slate-700 mb-1 text-[10px]">
            <span>MRP</span>
            <label class="flex items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-700" title="MRP is not applicable">
              <input type="checkbox" class="q-mrp-na" onchange="CMS_MASTERS.toggleMrp(this)" \${qData && qData.mrpNotApplicable ? 'checked' : ''} />
              <span class="text-[9px]">N/A</span>
            </label>
          </label>
          <input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${mrp}" placeholder="0.00" onchange="CMS_MASTERS.checkRateVsMrp(this)" \${qData && qData.mrpNotApplicable ? 'disabled' : ''} />`;
code = code.replace(mrpHtmlRegex, mrpHtmlReplace);

// 3. Remove the strict validation from saveVendor that blocked form submission
// The validation block looks like:
// const mrpNa = row.querySelector('.q-mrp-na')?.checked;
// if (directSubmit && !mrpNa && rateVal > mrpVal) {
//    window.CMS_APP.toast('Error: Approved Rate cannot be higher than MRP...
const strictValidationRegex = /if \(directSubmit && \!mrpNa && rateVal > mrpVal\) \{[\s\S]*?this\.switchVendorTab\(3\);\s*return;\s*\}/g;
code = code.replace(strictValidationRegex, `// MRP vs Rate strict blocking removed; handled by confirm prompt onchange.`);

// 4. Ensure mrpNotApplicable is saved to quotedItems array in saveVendor
const quotedItemsPushRegex = /mrp: row\.querySelector\('\.q-mrp'\)\?\.value \|\| 0,/g;
const quotedItemsPushReplace = `mrp: row.querySelector('.q-mrp')?.value || 0,\n        mrpNotApplicable: row.querySelector('.q-mrp-na')?.checked || false,`;
code = code.replace(quotedItemsPushRegex, quotedItemsPushReplace);

fs.writeFileSync('js/masters.js', code);
console.log('Patched MRP vs Rate logic.');
