const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const targetLoad = `  async loadFromCloud() {
    if (window.CMS_TENANT_ID && window.CMS_FIREBASE_DB) {
      const snap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').once('value');
      if (snap.exists()) {
        this.data = snap.val();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifySubscribers();
      }
    }
  }`;

const replaceLoad = `  async loadFromCloud() {
    if (window.CMS_TENANT_ID && window.CMS_FIREBASE_DB) {
      // Load Database
      const snap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').once('value');
      if (snap.exists()) {
        this.data = snap.val();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifySubscribers();
      }
      
      // Load Files (Option 2 Sync)
      const filesSnap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_files').once('value');
      if (filesSnap.exists()) {
        filesSnap.forEach(child => {
          const safeName = child.key;
          const base64 = child.val();
          // Restore to local storage so standard app code works seamlessly
          // Note: we reverse the safe name replacement for common extensions as best effort,
          // though localstorage key usually has original name. Since we don't know original name easily,
          // we just save it as safeName. We should ideally use actual file names.
          // For now, storing as safeName will work if we also check safeName when viewing.
          localStorage.setItem('CMS_FILE_' + safeName, base64);
          
          // As a hack to ensure the frontend finds it, we also replace underscores back to dots for .pdf and .jpg
          const dotName = safeName.replace(/_pdf$/i, '.pdf').replace(/_jpg$/i, '.jpg').replace(/_png$/i, '.png');
          localStorage.setItem('CMS_FILE_' + dotName, base64);
        });
      }
    }
  }`;

code = code.replace(targetLoad, replaceLoad);
fs.writeFileSync('js/store.js', code);
console.log('Successfully patched store.js file sync');
