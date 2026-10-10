const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /checkRateVsMrp\(element\) \{[\s\S]*?\}\s*\},/g;
const replace = `checkRateVsMrp(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const rateInput = row.querySelector('.q-rate');
    const mrpInput = row.querySelector('.q-mrp');
    const mrpNa = row.querySelector('.q-mrp-na')?.checked;

    if (mrpNa) return;

    const rate = parseFloat(rateInput.value) || 0;
    const mrp = parseFloat(mrpInput.value) || 0;
    
    if (rate > 0 && mrp > 0 && rate > mrp) {
       setTimeout(() => {
           const proceed = confirm('Approved rate is more than MRP, do you want to continue with entered rate?\\n\\n[OK] = Yes, continue with entered rate\\n[Cancel] = No, allow me to enter revised rate');
           if (!proceed) {
              rateInput.value = '';
              rateInput.focus();
           }
       }, 50);
    }
  },`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed checkRateVsMrp.');
