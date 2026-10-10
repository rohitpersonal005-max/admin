const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /if \(directSubmit\) \{[\s\S]*?\} else \{[\s\S]*?\} else \{[\s\S]*?\}\s*\},/g;

const match = code.match(regex);
if (match) {
    console.log("Matched the broken block!");
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
  },`;
    code = code.replace(regex, validBlock);
    fs.writeFileSync('js/masters.js', code);
} else {
    console.log("Did not match regex.");
}
