/**
 * Client App Authentication & Firebase Sync Engine
 */
window.CMS_AUTH = {
  db: null,

  showLogin(message = '') {
    const gate = document.getElementById('auth-gate');
    const error = document.getElementById('auth-error');
    if (gate) gate.classList.remove('hidden');
    if (error) {
      error.textContent = message;
      error.classList.toggle('hidden', !message);
    }
  },

  hideLogin() {
    const gate = document.getElementById('auth-gate');
    if (gate) gate.classList.add('hidden');
    if (window.CMS_APP) window.CMS_APP.init();
  },

  async handleUserLogin(user) {
    console.log("Logged in as:", user.email);
    this.db = firebase.database();
    window.CMS_FIREBASE_DB = this.db;

    // 1. Find the Tenant ID for this user
    try {
      const snapshot = await this.db.ref('master_tenants').orderByChild('adminUid').equalTo(user.uid).once('value');
      if (!snapshot.exists()) {
        this.showLogin('No company workspace found for this account.');
        await firebase.auth().signOut();
        return;
      }

      let tenantId = null;
      let tenantData = null;
      snapshot.forEach(child => {
        tenantId = child.key;
        tenantData = child.val();
      });

      window.CMS_TENANT_ID = tenantId;
      console.log("Welcome to tenant:", tenantData.companyName);

      // 2. Auto-Migration Logic
      const localData = localStorage.getItem('CMS_DATABASE_V2');
      const cloudSnap = await this.db.ref('master_tenants/' + tenantId + '/cms_db').once('value');
      
      if (!cloudSnap.exists() && localData) {
        console.log("Auto-migrating local database to Firebase...");
        await this.db.ref('master_tenants/' + tenantId + '/cms_db').set(JSON.parse(localData));
        
        // Migrate files
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('CMS_FILE_')) {
            const filename = key.replace('CMS_FILE_', '');
            const base64 = localStorage.getItem(key);
            // Firebase keys cannot contain . # $ [ ]
            const safeName = filename.replace(/[.#$\\[\\]]/g, '_');
            await this.db.ref('master_tenants/' + tenantId + '/cms_files/' + safeName).set(base64);
          }
        }
        console.log("Migration complete!");
      }

      // 3. Load final data into store and start app
      if (window.CMS_STORE) {
        await window.CMS_STORE.loadFromCloud();
      }
      
      this.hideLogin();
      
    } catch (err) {
      console.error(err);
      this.showLogin('Error syncing workspace: ' + err.message);
    }
  },

  init() {
    const form = document.getElementById('auth-form');
    const submit = document.getElementById('auth-submit');
    const error = document.getElementById('auth-error');

    // Make sure Firebase is initialized via firebase-config.js before doing this
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.handleUserLogin(user);
        } else {
          this.showLogin();
        }
      });
    }, 500);

    if (form) {
      form.addEventListener('submit', async event => {
        event.preventDefault();
        error.classList.add('hidden');
        submit.disabled = true;
        submit.textContent = 'Signing in...';
        
        const email = document.getElementById('auth-username').value.trim();
        const pwd = document.getElementById('auth-password').value;

        try {
          await firebase.auth().signInWithEmailAndPassword(email, pwd);
          // onAuthStateChanged will handle the rest
        } catch (loginError) {
          this.showLogin(loginError.message);
          submit.disabled = false;
          submit.textContent = 'Sign in';
        }
      });
    }
  }
};

window.addEventListener('DOMContentLoaded', () => window.CMS_AUTH.init());
