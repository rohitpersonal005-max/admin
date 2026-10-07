const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const target = `        let val = snap.val();
        // Firebase drops empty arrays, so we must restore them
        const arrayKeys = ['categories', 'consumables', 'departments', 'gstSlabs', 'indentApprovals', 'indents', 'issues', 'pullRequisitions', 'purchaseOrders', 'receipts', 'reconciliations', 'returns', 'stockAdjustments', 'vendors'];
        arrayKeys.forEach(k => {
          if (!val[k]) val[k] = [];
        });
        
        this.data = val;`;

const replace = `        let val = snap.val();
        
        // Merge with EMPTY_DATABASE to ensure no arrays/objects are missing because Firebase drops empty ones
        this.data = {
          ...EMPTY_DATABASE,
          ...val,
          vendors: (val.vendors || []).map(normalizeVendor),
          consumables: (val.consumables || []).map(normalizeConsumable)
        };
        
        // Preserve userRole if it existed locally so UI stays correct for the current user
        this.data.userRole = this.getRole();`;

code = code.replace(target, replace);
fs.writeFileSync('js/store.js', code);
console.log('Successfully patched loadFromCloud with full data normalization');
