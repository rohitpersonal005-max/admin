const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /store\.save\(\);\s*if \(directSubmit\) \{/g;
const replace = `
    if (directSubmit) {
      store.save(); // full UI update
      window.CMS_APP.closeModal();
      window.CMS_APP.toast('Vendor credentials and statutory certificates submitted for Admin approval!', 'success');
      window.CMS_APP.refreshView();
    } else {
      // Quiet background save for drafts: update localStorage directly without triggering global UI rebuilds
      localStorage.setItem('cms_data_' + store.tenantId, JSON.stringify(store.data));
      
      const vendorCountDisplay = document.getElementById('vendor-count-display');
      if (vendorCountDisplay) {
         // Optionally update row count in background silently
      }
    }`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed quiet save!');
