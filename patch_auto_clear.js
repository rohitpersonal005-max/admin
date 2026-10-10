const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const modalRegex = /window\.CMS_APP\.openModal\(isEdit \? 'Modify Vendor Record' : 'Register New Vendor', content, 'max-w-4xl'\);/;

const newModalCode = `window.CMS_APP.openModal(isEdit ? 'Modify Vendor Record' : 'Register New Vendor', content, 'max-w-4xl');

      // Auto-clear error styling on input
      const vendorForm = document.getElementById('vendor-form');
      if (vendorForm) {
        vendorForm.addEventListener('input', (e) => {
          if (e.target.classList.contains('border-rose-500')) {
            e.target.classList.remove('border-rose-500', 'bg-rose-50');
          }
        });
        vendorForm.addEventListener('change', (e) => {
          if (e.target.classList.contains('border-rose-500')) {
            e.target.classList.remove('border-rose-500', 'bg-rose-50');
          }
        });
      }`;

code = code.replace(modalRegex, newModalCode);
fs.writeFileSync('js/masters.js', code);
