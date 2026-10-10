const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const targetStr = `  saveVendor(vendorId = null, directSubmit = true) {
    const store = window.CMS_STORE;
    const currentUser = store.getCurrentUser();
    if (currentUser && currentUser.role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) cannot create or modify vendors. You are authorized to approve and view vendor records only.', 'error');
    }`;

// Find the exact starting position of saveVendor
const idx = code.indexOf('saveVendor(vendorId = null, directSubmit = true) {');
if (idx !== -1) {
    // Extract the actual block from the file to handle exact whitespace/newlines
    const blockEnd = code.indexOf('const isEdit = Boolean(vendorId);', idx);
    if (blockEnd !== -1) {
        const actualBlock = code.substring(idx, blockEnd);
        const newBlock = actualBlock + `
    const form = document.getElementById('vendor-form');
    if (form && !form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        const stepDiv = firstInvalid.closest('[id^="v-step-"]');
        if (stepDiv) {
          const stepNum = parseInt(stepDiv.id.replace('v-step-', ''), 10);
          this.switchVendorTab(stepNum);
        }
        firstInvalid.reportValidity();
      }
      return;
    }
    `;
        code = code.replace(actualBlock, newBlock);
        fs.writeFileSync('js/masters.js', code);
        console.log('Successfully patched saveVendor');
    }
}

