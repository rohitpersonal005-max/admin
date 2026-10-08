const fs = require('fs');
let code = fs.readFileSync('js/home.js', 'utf8');

const regexAddUser = /addUser\(\) \{\s*window\.CMS_APP\.openModal\('Add New User', `/;

const replaceAddUser = `addUser() {
    const users = window.CMS_STORE.getUsers();
    const seatLimit = window.CMS_TENANT_SEATS || 10;
    const remaining = seatLimit - users.length;
    
    if (remaining <= 0) {
      window.CMS_APP.toast('Seat limit reached. You cannot add more users without upgrading your plan.', 'error');
      return;
    }
    
    window.CMS_APP.openModal('Add New User', \`
      <div class="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-sm text-xs flex gap-2 items-center font-medium">
        <i data-lucide="info" class="w-4 h-4"></i> You have \${remaining} seat(s) remaining out of your \${seatLimit} limit.
      </div>`;

code = code.replace(regexAddUser, replaceAddUser);

const regexSubmitAddUser = /submitAddUser\(\) \{[\s\S]*?const users = window\.CMS_STORE\.getUsers\(\);/;

const replaceSubmitAddUser = `submitAddUser() {
    const name = document.getElementById('add-user-name').value.trim();
    const email = document.getElementById('add-user-email').value.trim();
    const role = document.getElementById('add-user-role').value;
    const password = document.getElementById('add-user-password').value.trim();
    if (!name || !email || !password) {
      window.CMS_APP.toast('Name, Email, and Password are required.', 'error');
      return;
    }
    
    const users = window.CMS_STORE.getUsers();
    const seatLimit = window.CMS_TENANT_SEATS || 10;
    
    if (users.length >= seatLimit) {
      window.CMS_APP.toast('Seat limit reached. Upgrade your plan to add more users.', 'error');
      return;
    }
`;

code = code.replace(regexSubmitAddUser, replaceSubmitAddUser);

code = code.replace(
  "window.CMS_APP.toast(`User ${name} added successfully.`, 'success');",
  "const remaining = seatLimit - (users.length + 1);\n    window.CMS_APP.toast(`User ${name} added successfully! ${remaining} seat(s) remaining.`, 'success');"
);

fs.writeFileSync('js/home.js', code);
