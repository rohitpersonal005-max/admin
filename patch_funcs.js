const fs = require('fs');
let code = fs.readFileSync('js/home.js', 'utf8');

const regexSaveProfile = /async saveProfile\(\) \{[\s\S]*?this\.render\(\);\s*\}/;

const newSaveProfile = `saveProfile() {
    const name = document.getElementById('home-prof-name').value.trim();
    const username = document.getElementById('home-prof-username').value.trim().toLowerCase();
    const email = document.getElementById('home-prof-email').value.trim();
    const password = document.getElementById('home-prof-password').value;
    const currentUser = window.CMS_STORE.getCurrentUser();

    if (!name || !username) return window.CMS_APP.toast('Name and username are required', 'error');

    let users = window.CMS_STORE.getUsers();
    let userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].username = username;
      users[userIndex].email = email;
      if (password) users[userIndex].password = password;
      
      window.CMS_STORE.setUsers(users);
      window.CMS_APP.toast('Profile updated successfully!', 'success');
      this.render();
    }
  }`;

code = code.replace(regexSaveProfile, newSaveProfile);

const regexSaveUserSettings = /async saveUserSettings\(userId\) \{[\s\S]*?this\.render\(\);\s*\}\s*\} catch \(e\) \{\s*window\.CMS_APP\.toast\(e\.message, 'error'\);\s*\}\s*\}/;

const newSaveUserSettings = `saveUserSettings(userId) {
    const checkboxes = document.querySelectorAll('.mod-chk-' + userId);
    const roleSel = document.querySelector('.role-sel-' + userId);
    const pwdInput = document.getElementById('pwd-' + userId);
    
    const modules = Array.from(checkboxes).filter(chk => chk.checked).map(chk => chk.value);
    const role = roleSel ? roleSel.value : 'User';
    const password = pwdInput && pwdInput.value.trim() !== '' ? pwdInput.value : undefined;
    
    let users = window.CMS_STORE.getUsers();
    let userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
       users[userIndex].modules = modules;
       users[userIndex].role = role;
       if (password !== undefined) {
         users[userIndex].password = password;
       }
       window.CMS_STORE.setUsers(users);
       window.CMS_APP.toast('User settings updated successfully!', 'success');
       this.render();
    } else {
       window.CMS_APP.toast('User not found.', 'error');
    }
  }`;

code = code.replace(regexSaveUserSettings, newSaveUserSettings);

const regexDeleteUser = /async deleteUser\(userId\) \{[\s\S]*?window\.CMS_APP\.toast\(e\.message, 'error'\);\s*\}\s*\}/;

const newDeleteUser = `deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user completely?')) return;
    
    let users = window.CMS_STORE.getUsers();
    const currentUser = window.CMS_STORE.getCurrentUser();
    if (userId === currentUser.id) {
      window.CMS_APP.toast('Cannot delete the currently logged in user.', 'error');
      return;
    }
    
    users = users.filter(u => u.id !== userId);
    window.CMS_STORE.setUsers(users);
    
    window.CMS_APP.toast('User deleted successfully.', 'success');
    this.render();
  }`;

code = code.replace(regexDeleteUser, newDeleteUser);

fs.writeFileSync('js/home.js', code);
