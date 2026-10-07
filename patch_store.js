const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const targetSave = `  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      const currentUser = this.getCurrentUser();
      localStorage.setItem(ROLE_KEY, currentUser.role);
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
        window.dispatchEvent(new CustomEvent('cms-store-updated', { detail: this.data }));
      }
    } catch (e) {
      console.error('Error saving store', e);
    }
  }`;

const replaceSave = `  async loadFromCloud() {
    if (window.CMS_TENANT_ID && window.CMS_FIREBASE_DB) {
      const snap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').once('value');
      if (snap.exists()) {
        this.data = snap.val();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifySubscribers();
      }
    }
  }

  notifySubscribers() {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('cms-store-updated', { detail: this.data }));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      const currentUser = this.getCurrentUser();
      localStorage.setItem(ROLE_KEY, currentUser.role);
      
      // FIREBASE SYNC: If authenticated to a tenant, push changes up
      if (window.CMS_TENANT_ID && window.CMS_FIREBASE_DB) {
        window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_db').set(this.data).catch(console.error);
      }
      
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving store', e);
    }
  }`;

code = code.replace(targetSave, replaceSave);
fs.writeFileSync('js/store.js', code);
console.log('Successfully patched store.js with cloud sync capability');
