const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const target = "window.CMS_APP.toast(directSubmit ? 'Material saved and submitted for approval!' : 'Material saved successfully!');";
if (code.includes(target)) {
    const patch = \
      // Update any open Vendor setup material dropdowns dynamically
      const dropdowns = document.querySelectorAll('.q-mat-id');
      if (dropdowns.length > 0) {
        const mats = store.data.consumables;
        const latest = mats[mats.length - 1];
        dropdowns.forEach(dd => {
           const opt = document.createElement('option');
           opt.value = latest.id;
           opt.dataset.name = latest.materialName;
           opt.dataset.rate = latest.quotationRate || latest.vendor1Rate || 0;
           opt.dataset.mrp = latest.mrpBooked || '';
           opt.dataset.unit = latest.unit || 'Nos';
           opt.dataset.hsn = latest.hsnCode || '';
           opt.text = \\\[\\\] \\\ - Code: \\\\\\;
           dd.appendChild(opt);
           dd.value = latest.id;
           // Trigger change
           dd.dispatchEvent(new Event('change'));
        });
      }\;
      
    code = code.replace(target, target + '\\n' + patch);
    fs.writeFileSync('js/masters.js', code);
}
