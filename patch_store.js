const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const regexSetCurrentUser = /setCurrentUser\(userId\) \{[\s\S]*?this\.save\(\);\s*return true;\s*\}/;

const newSetCurrentUser = `setCurrentUser(userId) {
    const user = this.getUsers().find(u => u.id === userId);
    if (!user) return false;
    localStorage.setItem(USER_KEY, user.id);
    localStorage.setItem(ROLE_KEY, user.role);
    this.data.userRole = user.role;
    this.save();
    return true;
  }`;

code = code.replace(regexSetCurrentUser, newSetCurrentUser);

const regexVerifyManagerPin = /verifyManagerPin\(pin\) \{[\s\S]*?return mgr && String\(pin\)\.trim\(\) === String\(mgr\.pin\);\s*\}/;

const newVerifyManagerPin = `verifyManagerPin(pin) {
    const mgr = this.getUsers().find(u => u.role === 'Admin');
    return mgr && String(pin).trim() === String(mgr.pin);
  }`;

code = code.replace(regexVerifyManagerPin, newVerifyManagerPin);

const regexSetRole = /setRole\(role\) \{[\s\S]*?this\.setCurrentUser\(user\.id\);\s*\}\s*\}/;

const newSetRole = `setRole(role) {
    const user = this.getUsers().find(u => u.role === role);
    if (user) {
      this.setCurrentUser(user.id);
    }
  }`;

code = code.replace(regexSetRole, newSetRole);

fs.writeFileSync('js/store.js', code);
