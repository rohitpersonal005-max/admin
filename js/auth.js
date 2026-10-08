/**
 * Client App Authentication & Supabase Sync Engine
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

    // 1. Find the Tenant ID for this user
    try {
      const { data: tenants, error } = await window.CMS_SUPABASE
        .from('master_tenants')
        .select('*')
        .eq('admin_uid', user.id);

      if (error) throw error;

      if (!tenants || tenants.length === 0) {
        this.showLogin('No company workspace found for this account.');
        await window.CMS_SUPABASE.auth.signOut();
        return;
      }

      const tenantData = tenants[0];
      window.CMS_TENANT_ID = tenantData.id;
      console.log("Welcome to tenant:", tenantData.company_name);

      // 2. Auto-Migration Logic (Local to Cloud)
      const localData = localStorage.getItem('CMS_DATABASE_V2');
      
      // If cloud DB is empty and local data exists, migrate it
      const isEmpty = !tenantData.cms_db || Object.keys(tenantData.cms_db).length === 0;
      
      if (false) {
        console.log("Auto-migrating local database to Supabase...");
        await window.CMS_SUPABASE
          .from('master_tenants')
          .update({ cms_db: JSON.parse(localData) })
          .eq('id', window.CMS_TENANT_ID);
          
        // Background upload for local files to Supabase Storage
        setTimeout(async () => {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('CMS_FILE_')) {
              const filename = key.replace('CMS_FILE_', '');
              const base64 = localStorage.getItem(key);
              
              if (base64.startsWith('data:')) {
                const arr = base64.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n);
                }
                const blob = new Blob([u8arr], { type: mime });
                
                const safeName = filename.replace(/[.#$\\[\\]]/g, '_');
                await window.CMS_SUPABASE.storage.from('cms-files').upload(window.CMS_TENANT_ID + '/' + safeName, blob, { upsert: true });
              }
            }
          }
          console.log("Migration complete!");
        }, 1000);
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
    if (!window.CMS_SUPABASE) {
      return this.showLogin('Critical System Error: Cannot connect to Supabase Server. Please check your internet connection or contact support.');
    }

    const form = document.getElementById('auth-form');
    const emailInput = document.getElementById('auth-email');
    const userInput = document.getElementById('auth-username');
    const pwdInput = document.getElementById('auth-password');
    const btn = form ? form.querySelector('button[type="submit"]') : null;

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const typedUsername = userInput ? userInput.value.trim() : '';
        const pwd = pwdInput.value;
        if (!email || !pwd || !typedUsername) return;

        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline-block"></i> Authenticating...';
        }

        try {
          const { error, data } = await window.CMS_SUPABASE.auth.signInWithPassword({ email, password: pwd });
          if (error) throw error;
          
          // Verify Username matches
          if (data && data.user) {
            const { data: tenants } = await window.CMS_SUPABASE.from('master_tenants').select('admin_username').eq('admin_uid', data.user.id);
            if (tenants && tenants.length > 0) {
              const realUsername = tenants[0].admin_username;
              if (realUsername !== typedUsername) {
                await window.CMS_SUPABASE.auth.signOut();
                throw new Error("Invalid username for this account.");
              }
            }
          }
          // onAuthStateChange will handle the rest
        } catch (loginError) {
          console.error(loginError);
          this.showLogin(loginError.message || 'Invalid email or password.');
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Sign In to Workspace <i data-lucide="arrow-right" class="w-4 h-4"></i>';
          }
        }
      });
    }

    // Wait for Supabase Auth state
    setTimeout(() => {
      window.CMS_SUPABASE.auth.onAuthStateChange((event, session) => {
        if (session && session.user) {
          this.handleUserLogin(session.user);
        } else {
          this.showLogin();
        }
      });
    }, 500);
  },
  
  async logout() {
    if (window.CMS_SUPABASE) {
      await window.CMS_SUPABASE.auth.signOut();
    }
    window.location.reload();
  }
};

window.addEventListener('DOMContentLoaded', () => window.CMS_AUTH.init());




