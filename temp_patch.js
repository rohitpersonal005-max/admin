const fs = require('fs');
let code = fs.readFileSync('js/auth.js', 'utf8');
code = code.replace(
  'console.log("Welcome to tenant:", tenantData.company_name);',
  console.log("Welcome to tenant:", tenantData.company_name);
        if (window.CMS_STORE) {
          const saasAdmin = {
            id: user.id,
            name: tenantData.admin_username || tenantData.company_name + ' Admin',
            email: user.email,
            role: 'Admin',
            department: tenantData.company_name,
            pin: null
          };
          window.CMS_STORE.setUsers([saasAdmin]);
          window.CMS_STORE.setCurrentUser(user.id);
        }
);
fs.writeFileSync('js/auth.js', code);
