const fs = require('fs');
let code = fs.readFileSync('js/home.js', 'utf8');

code = code.replace(
  '<button onclick="CMS_HOME.addCustomRole()"',
  '<div class="flex items-center gap-2"><button onclick="CMS_HOME.addUser()" class="text-xs bg-brand-600 hover:bg-brand-700 border border-brand-700 text-white font-bold px-3 py-1.5 rounded-sm transition flex items-center gap-1.5 shadow-sm"><i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Add User</button><button onclick="CMS_HOME.addCustomRole()"'
);

code = code.replace(
  '</button>\n          </div>\n          <div class="overflow-x-auto',
  '</button></div>\n          </div>\n          <div class="overflow-x-auto'
);

// If the second replace failed due to line endings (\r\n vs \n), let's make it robust
code = code.replace(/<\/button>\s*<\/div>\s*<div class="overflow-x-auto/g, '</button></div></div><div class="overflow-x-auto');

const addUserFunc = `addUser() {
    window.CMS_APP.openModal('Add New User', \`
      <div class="space-y-4">
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
          <input type="text" id="add-user-name" class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. John Doe">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
          <input type="email" id="add-user-email" class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. john@example.com">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Role</label>
          <select id="add-user-role" class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            \${this.getCustomRoles().map(r => \`<option value="\${r}">\${r}</option>\`).join('')}
          </select>
        </div>
      </div>
    \`, async () => {
      const name = document.getElementById('add-user-name').value.trim();
      const email = document.getElementById('add-user-email').value.trim();
      const role = document.getElementById('add-user-role').value;
      if (!name || !email) {
        window.CMS_APP.toast('Name and Email are required.', 'error');
        return false;
      }
      
      const users = window.CMS_STORE.getUsers();
      const newId = 'EMP-' + Math.floor(1000 + Math.random() * 9000);
      const newUser = {
        id: newId,
        name: name,
        email: email,
        role: role,
        department: 'General',
        pin: null
      };
      
      window.CMS_STORE.setUsers([...users, newUser]);
      window.CMS_APP.toast(\`User \${name} added successfully.\`, 'success');
      this.render();
      if(window.lucide) window.lucide.createIcons();
      return true;
    });
  },

  addCustomRole() {`;

code = code.replace('addCustomRole() {', addUserFunc);

fs.writeFileSync('js/home.js', code);
