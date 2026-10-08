const fs = require('fs');
let home = fs.readFileSync('js/home.js', 'utf8');

home = home.replace(
  '<label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>',
  '<label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email / Username</label>'
);

home = home.replace(
  'placeholder="e.g. john@example.com">',
  'placeholder="e.g. john@example.com">\n        </div>\n        <div>\n          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>\n          <input type="text" id="add-user-password" class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none font-mono" placeholder="Default Password">'
);

home = home.replace(
  "const role = document.getElementById('add-user-role').value;",
  "const role = document.getElementById('add-user-role').value;\n      const password = document.getElementById('add-user-password').value.trim();"
);

home = home.replace(
  "email: email,",
  "username: email,\n        email: email,\n        password: password,"
);

fs.writeFileSync('js/home.js', home);
