const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /localStorage\.setItem\('cms_data_' \+ store\.tenantId, JSON\.stringify\(store\.data\)\);/g;
const replace = `const storageKey = window.CMS_TENANT_ID ? 'CMS_DATA_' + window.CMS_TENANT_ID : 'CMS_DATA';
      localStorage.setItem(storageKey, JSON.stringify(store.data));
      if (window.CMS_TENANT_ID && window.CMS_SUPABASE) {
          window.CMS_SUPABASE.from('master_tenants').update({ cms_db: store.data }).eq('id', window.CMS_TENANT_ID).then(() => {});
      }`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed storage key and added quiet cloud sync.');
