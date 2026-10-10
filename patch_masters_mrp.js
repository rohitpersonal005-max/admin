const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const checkRateRegex = /if \(!isNaN\(rate\) && !isNaN\(mrp\) && rate > mrp\) \{[\s\S]*?const confirmProceed[\s\S]*?\}\s*\}/;

const newCheckRate = `if (!isNaN(rate) && !isNaN(mrp) && rate > mrp) {
      window.CMS_APP.toast('Error: Approved Rate cannot be higher than MRP.', 'error');
      rateInput.value = '';
      rateInput.focus();
    }`;

code = code.replace(checkRateRegex, newCheckRate);


const loopCheckRegex = /if \(qValid && qEff && qValid < qEff\) \{\s*return window\.CMS_APP\.toast\('Valid till\/expiry date cannot be older than the effective date\.', 'error'\);\s*\}/;

const newLoopCheck = `if (qValid && qEff && qValid < qEff) {
          return window.CMS_APP.toast('Valid till/expiry date cannot be older than the effective date.', 'error');
        }
        
        const rateVal = parseFloat(row.querySelector('.q-rate')?.value || 0);
        const mrpVal = parseFloat(row.querySelector('.q-mrp')?.value || 0);
        const mrpNa = row.querySelector('.q-mrp-na')?.checked;
        if (!mrpNa && rateVal > mrpVal) {
          window.CMS_APP.toast('Error: Approved Rate cannot be higher than MRP for material ' + matName, 'error');
          this.switchVendorTab(3);
          return;
        }`;

code = code.replace(loopCheckRegex, newLoopCheck);

fs.writeFileSync('js/masters.js', code);
