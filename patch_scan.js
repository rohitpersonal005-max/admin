const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexNextTab = /window\.CMS_MASTERS\.nextVendorTab = function\(\) \{[\s\S]*?if \(window\.CMS_MASTERS\.currentVendorStep < 4\) \{/;

const newNextTab = `window.CMS_MASTERS.nextVendorTab = function() {
      const currentStepDiv = document.getElementById('v-step-' + window.CMS_MASTERS.currentVendorStep);
      let isValid = true;
      if (currentStepDiv) {
        const inputs = currentStepDiv.querySelectorAll('input, select, textarea');
        let firstInvalid = null;
        for (const input of inputs) {
          input.classList.remove('border-rose-500', 'bg-rose-50');
          if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('border-rose-500', 'bg-rose-50');
            if (!firstInvalid) firstInvalid = input;
          }
        }
        if (!isValid) {
          window.CMS_APP.toast('Please complete all highlighted mandatory fields before proceeding.', 'error');
          if (firstInvalid) firstInvalid.reportValidity();
          return; 
        }
      }

      if (window.CMS_MASTERS.currentVendorStep < 4) {`;

code = code.replace(regexNextTab, newNextTab);

const regexSaveVendor = /const form = document\.getElementById\('vendor-form'\);\s*if \(form && !form\.checkValidity\(\)\) \{\s*const firstInvalid = form\.querySelector\(':invalid'\);\s*if \(firstInvalid\) \{\s*const stepDiv = firstInvalid\.closest\('\[id\^="v-step-"\]'\);\s*if \(stepDiv\) \{\s*const stepNum = parseInt\(stepDiv\.id\.replace\('v-step-', ''\), 10\);\s*this\.switchVendorTab\(stepNum\);\s*\}\s*firstInvalid\.reportValidity\(\);\s*\}\s*return;\s*\}/;

const newSaveVendorBlock = `const form = document.getElementById('vendor-form');
      if (form && !form.checkValidity()) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let firstInvalid = null;
        for (const input of inputs) {
          input.classList.remove('border-rose-500', 'bg-rose-50');
          if (!input.checkValidity()) {
            input.classList.add('border-rose-500', 'bg-rose-50');
            if (!firstInvalid) firstInvalid = input;
          }
        }
        if (firstInvalid) {
          window.CMS_APP.toast('Submission blocked. Please fill all highlighted mandatory fields.', 'error');
          const stepDiv = firstInvalid.closest('[id^="v-step-"]');
          if (stepDiv) {
            const stepNum = parseInt(stepDiv.id.replace('v-step-', ''), 10);
            this.switchVendorTab(stepNum);
          }
          firstInvalid.reportValidity();
        }
        return;
      }`;

code = code.replace(regexSaveVendor, newSaveVendorBlock);

fs.writeFileSync('js/masters.js', code);
