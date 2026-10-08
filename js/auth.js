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
        if (window.CMS_STORE) { await window.CMS_STORE.loadFromCloud(); const saasAdmin = { id: user.id, name: tenantData.admin_username || tenantData.company_name + ' Admin', email: user.email, role: 'Admin', department: tenantData.company_name, pin: null }; window.CMS_STORE.setUsers([saasAdmin]); window.CMS_STORE.setCurrentUser(user.id); }
        
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







