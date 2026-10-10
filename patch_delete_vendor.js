const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const targetMethod = /promptBlockVendor\(vendorId, willBlock\) \{/;
const replaceMethod = `deleteVendor(vendorId) {
    if (confirm('Delete this draft vendor? This action cannot be undone.')) {
      const store = window.CMS_STORE;
      const idx = store.data.vendors.findIndex(v => v.id === vendorId);
      if (idx !== -1) {
        store.data.vendors.splice(idx, 1);
        store.save();
        window.CMS_APP.toast('Draft vendor deleted successfully.', 'success');
        window.CMS_APP.refreshView();
      }
    }
  },
  
  promptBlockVendor(vendorId, willBlock) {`;

code = code.replace(targetMethod, replaceMethod);

fs.writeFileSync('js/masters.js', code);
console.log('Added deleteVendor.');
