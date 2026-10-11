const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /toggleGstApplicable\(isNotApplicable\) \{[\s\S]*?if \(box\) box\.classList\.toggle\('hidden', isNotApplicable\);\s*\}/;

const replacement = `toggleGstApplicable(isNotApplicable) {
    const panNa = document.getElementById('v-pan-na');
    if (!isNotApplicable && panNa && panNa.checked) {
      window.CMS_APP.toast('Cannot enable GSTIN because PAN card is marked as Not Applicable.', 'error');
      const gstNa = document.getElementById('v-gst-na');
      if (gstNa) gstNa.checked = true;
      return;
    }
    const input = document.getElementById('v-gst');
    const sInput = document.getElementById('v-gst-state');
    const pInput = document.getElementById('v-gst-pan');
    const sufInput = document.getElementById('v-gst-suffix');
    const box = document.getElementById('v-gst-file-box');
    
    [input, sInput, pInput, sufInput].forEach(el => {
      if (!el) return;
      el.disabled = isNotApplicable;
      if (isNotApplicable) {
        el.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        el.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    });

    if (isNotApplicable) {
      if (input) input.value = '';
      if (pInput) pInput.value = '';
      if (sufInput) sufInput.value = '';
      const displayEl = document.getElementById('v-gst-full-display');
      if (displayEl) displayEl.innerText = 'Exempt (N/A)';
    } else {
      const stateVal = document.getElementById('v-state')?.value;
      if (stateVal) this.onStateChange(stateVal);
      const panVal = document.getElementById('v-pan')?.value;
      if (panVal && pInput) pInput.value = panVal;
      this.assembleGst();
    }

    if (box) box.classList.toggle('hidden', isNotApplicable);
  }`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('js/masters.js', code, 'utf8');
  console.log('Successfully updated toggleGstApplicable');
} else {
  console.error('Could not match toggleGstApplicable');
}
