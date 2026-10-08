const fs = require('fs');

let store = fs.readFileSync('js/store.js', 'utf8');

store = store.replace(
  /getUsers\(\) \{[\s\S]*?return current \? \[current\] : \[\];\s*\}/,
  "getUsers() {\n      return this.data.users || [];\n    }"
);

store = store.replace(
  /setUsers\(users\) \{[\s\S]*?\}\);\s*\}/,
  "setUsers(users) {\n      if (!Array.isArray(users) || users.length === 0) return;\n      this.data.users = users.map(user => {\n        return {\n          ...user,\n          roleTitle: user.role === 'Admin' ? 'Store In-Charge (Admin)' : 'Store Staff (' + user.role + ')',\n          badgeLabel: user.role === 'Admin' ? 'STORE IN-CHARGE / ADMIN' : (user.role + ' / USER').toUpperCase(),\n          avatarText: (user.name || 'User').split(/\\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(),\n          avatarBg: 'bg-slate-900',\n          avatarTextCol: 'text-white',\n          pin: user.pin || null,\n          description: user.role === 'Admin' ? 'Store approval authority.' : 'Operational store maker.'\n        };\n      });\n      this.save();\n    }"
);

store = store.replace(
  /getCurrentUser\(\) \{[\s\S]*?return user \|\| ENTERPRISE_USERS\[0\];\s*\}/,
  "getCurrentUser() {\n      const savedUserId = localStorage.getItem(USER_KEY);\n      const users = this.getUsers();\n      const user = users.find(u => u.id === savedUserId);\n      return user || users[0] || { role: 'User', name: 'Unknown' };\n    }"
);

store = store.replace(
  /setCurrentUser\(userId\) \{[\s\S]*?localStorage\.setItem\(ROLE_KEY, user\.role\);\s*\}/,
  "setCurrentUser(userId) {\n      const users = this.getUsers();\n      const user = users.find(u => u.id === userId);\n      if (!user) return false;\n      localStorage.setItem(USER_KEY, user.id);\n      localStorage.setItem(ROLE_KEY, user.role);\n    }"
);

fs.writeFileSync('js/store.js', store);


let auth = fs.readFileSync('js/auth.js', 'utf8');

auth = auth.replace(
  /window\.CMS_STORE\.setUsers\(\[saasAdmin\]\);/,
  "const existingUsers = window.CMS_STORE.getUsers();\n          if (existingUsers.length === 0 || !existingUsers.find(u => u.id === user.id)) {\n            window.CMS_STORE.setUsers([saasAdmin, ...existingUsers]);\n          } else {\n             const updated = existingUsers.map(u => u.id === user.id ? { ...u, name: saasAdmin.name } : u);\n             window.CMS_STORE.setUsers(updated);\n          }"
);

fs.writeFileSync('js/auth.js', auth);

