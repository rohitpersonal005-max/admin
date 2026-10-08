const fs = require('fs');
let code = fs.readFileSync('js/home.js', 'utf8');

const searchRegex = /addUser\(\) \{[\s\S]*?if\(window\.lucide\) window\.lucide\.createIcons\(\);\s*return true;\s*\}\);\s*\}/;

const replacement = `addUser() {
    window.CMS_APP.openModal('Add New User', \`
      <form class="space-y-4" onsubmit="event.preventDefault(); CMS_HOME.submitAddUser();">
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
          <input type="text" id="add-user-name" required class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none" placeholder="e.g. John Doe">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email / Username</label>
          <input type="email" id="add-user-email" required class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none" placeholder="e.g. john@example.com">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>
          <input type="text" id="add-user-password" required class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none font-mono" placeholder="Default Password">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Role</label>
          <select id="add-user-role" class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            \${this.getCustomRoles().map(r => \`<option value="\${r}">\${r}</option>\`).join('')}
          </select>
        </div>
        <div class="pt-4 mt-6 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onclick="CMS_APP.closeStackedModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-sm transition">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-sm shadow-sm transition">Confirm Add User</button>
        </div>
      </form>
    \`, 'max-w-lg');
  },

  submitAddUser() {
    const name = document.getElementById('add-user-name').value.trim();
    const email = document.getElementById('add-user-email').value.trim();
    const role = document.getElementById('add-user-role').value;
    const password = document.getElementById('add-user-password').value.trim();
    if (!name || !email || !password) {
      window.CMS_APP.toast('Name, Email, and Password are required.', 'error');
      return;
    }
    
    const users = window.CMS_STORE.getUsers();
    const newId = 'EMP-' + Math.floor(1000 + Math.random() * 9000);
    const newUser = {
      id: newId,
      name: name,
      username: email,
      email: email,
      password: password,
      role: role,
      department: 'General',
      pin: null
    };
    
    window.CMS_STORE.setUsers([...users, newUser]);
    window.CMS_APP.toast(\`User \${name} added successfully.\`, 'success');
    this.render();
    if(window.lucide) window.lucide.createIcons();
    window.CMS_APP.closeStackedModal();
  }`;

code = code.replace(searchRegex, replacement);
fs.writeFileSync('js/home.js', code);
