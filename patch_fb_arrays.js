const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const target = `      const snap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').once('value');
      if (snap.exists()) {
        this.data = snap.val();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifySubscribers();
      }`;

const replace = `      const snap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').once('value');
      if (snap.exists()) {
        let val = snap.val();
        // Firebase drops empty arrays, so we must restore them
        const arrayKeys = ['categories', 'consumables', 'departments', 'gstSlabs', 'indentApprovals', 'indents', 'issues', 'pullRequisitions', 'purchaseOrders', 'receipts', 'reconciliations', 'returns', 'stockAdjustments', 'vendors'];
        arrayKeys.forEach(k => {
          if (!val[k]) val[k] = [];
        });
        
        this.data = val;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifySubscribers();
      }`;

code = code.replace(target, replace);
fs.writeFileSync('js/store.js', code);
console.log('Successfully patched loadFromCloud for missing Firebase arrays');
