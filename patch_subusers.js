const fs = require('fs');
let code = fs.readFileSync('js/auth.js', 'utf8');

const regexLoginBlock = /const \{ error, data \} = await window\.CMS_SUPABASE\.auth\.signInWithPassword\(\{ email, password: pwd \}\);\s*if \(error\) throw error;/;

const newLoginBlock = `let { error, data } = await window.CMS_SUPABASE.auth.signInWithPassword({ email, password: pwd });
          
          if (error) {
            // Sub-user fallback auth
            const { data: allTenants, error: tErr } = await window.CMS_SUPABASE.from('master_tenants').select('id, company_name, cms_db, seat_limit');
            if (!tErr && allTenants) {
              let foundSubUser = null;
              let foundTenant = null;
              for (const t of allTenants) {
                if (t.cms_db && t.cms_db.users) {
                  const match = t.cms_db.users.find(u => u.email === email && u.username === typedUsername && u.password === pwd);
                  if (match) {
                    foundSubUser = match;
                    foundTenant = t;
                    break;
                  }
                }
              }
              
              if (foundSubUser) {
                 localStorage.setItem('CMS_SUBUSER_SESSION', JSON.stringify({ tenantId: foundTenant.id, userId: foundSubUser.id }));
                 this.handleSubUserLogin({ tenantId: foundTenant.id, userId: foundSubUser.id });
                 return; // bypass normal auth
              }
            }
            throw error;
          }`;

code = code.replace(regexLoginBlock, newLoginBlock);

const regexTimeout = /setTimeout\(\(\) => \{[\s\S]*?\}, 500\);/;

const newTimeout = `setTimeout(() => {
      window.CMS_SUPABASE.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('CMS_SUBUSER_SESSION');
          this.showLogin();
          return;
        }
        if (session && session.user) {
          this.handleUserLogin(session.user);
        } else {
          const subSessionStr = localStorage.getItem('CMS_SUBUSER_SESSION');
          if (subSessionStr) {
             try {
               const subSession = JSON.parse(subSessionStr);
               if (subSession.tenantId && subSession.userId) {
                  this.handleSubUserLogin(subSession);
                  return;
               }
             } catch(e){}
          }
          this.showLogin();
        }
      });
    }, 500);`;

code = code.replace(regexTimeout, newTimeout);

const regexLogout = /async logout\(\) \{[\s\S]*?window\.location\.reload\(\);\s*\}/;

const newLogout = `async logout() {
    if (window.CMS_SUPABASE) {
      await window.CMS_SUPABASE.auth.signOut();
    }
    localStorage.removeItem('CMS_SUBUSER_SESSION');
    window.location.reload();
  }`;

code = code.replace(regexLogout, newLogout);


// Add handleSubUserLogin method right before init()
const regexInit = /init\(\) \{/;
const newInit = `async handleSubUserLogin(subSession) {
    try {
      const { data: tenants, error } = await window.CMS_SUPABASE
        .from('master_tenants')
        .select('*')
        .eq('id', subSession.tenantId);
        
      if (error || !tenants || tenants.length === 0) throw new Error("Workspace not found.");
      
      const tenantData = tenants[0];
      window.CMS_TENANT_ID = tenantData.id;
      window.CMS_TENANT_SEATS = tenantData.seat_limit || 10;
      
      if (window.CMS_STORE) {
        await window.CMS_STORE.loadFromCloud();
        window.CMS_STORE.setCurrentUser(subSession.userId);
      }
      
      this.hideLogin();
    } catch (err) {
      console.error(err);
      this.showLogin('Error syncing workspace: ' + err.message);
    }
  },

  init() {`;

code = code.replace(regexInit, newInit);

fs.writeFileSync('js/auth.js', code);
