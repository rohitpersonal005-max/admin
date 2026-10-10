const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// I will match everything from the first `if (directSubmit) {` up to `},` before `openVendorSanctionModal(vendorId) {`
const startIdx = code.lastIndexOf('if (directSubmit) {\n        store.save(); // full UI update');
const endIdx = code.indexOf('openVendorSanctionModal(vendorId) {', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const validBlock = `if (directSubmit) {
      store.save(); // full UI update
      window.CMS_APP.closeModal();
      window.CMS_APP.toast('Vendor credentials and statutory certificates submitted for Admin approval!', 'success');
      window.CMS_APP.refreshView();
    } else {
      // Quiet background save for drafts: update localStorage directly without triggering global UI rebuilds
      const storageKey = window.CMS_TENANT_ID ? 'CMS_DATA_' + window.CMS_TENANT_ID : 'CMS_DATA';
      localStorage.setItem(storageKey, JSON.stringify(store.data));
      if (window.CMS_TENANT_ID && window.CMS_SUPABASE) {
          window.CMS_SUPABASE.from('master_tenants').update({ cms_db: store.data }).eq('id', window.CMS_TENANT_ID).then(() => {});
      }
    }
  },

  `;
    const oldBlock = code.substring(startIdx, endIdx);
    code = code.replace(oldBlock, validBlock);
    fs.writeFileSync('js/masters.js', code);
    console.log('Fixed duplicate block successfully');
} else {
    console.log('Failed to find start or end index.', startIdx, endIdx);
}
