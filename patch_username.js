const fs = require('fs');
let code = fs.readFileSync('js/home.js', 'utf8');

const regexForm = /<label class="block text-\[11px\] font-bold text-slate-500 uppercase tracking-wider mb-1">Email \/ Username<\/label>[\s\S]*?id="add-user-email"[\s\S]*?placeholder="e\.g\. john@example\.com">/;

const newFormInputs = `<label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Username</label>
          <input type="text" id="add-user-username" required class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none" placeholder="e.g. john_doe">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
          <input type="email" id="add-user-email" required class="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-2 focus:ring-slate-500 outline-none" placeholder="e.g. john@example.com">`;

code = code.replace(regexForm, newFormInputs);

const regexSubmit1 = /const email = document\.getElementById\('add-user-email'\)\.value\.trim\(\);/;
const newSubmit1 = `const email = document.getElementById('add-user-email').value.trim();\n    const username = document.getElementById('add-user-username').value.trim().toLowerCase();`;
code = code.replace(regexSubmit1, newSubmit1);

const regexSubmit2 = /if \(!name \|\| !email \|\| !password\) \{/;
const newSubmit2 = `if (!name || !username || !email || !password) {\n      window.CMS_APP.toast('Name, Username, Email, and Password are required.', 'error');\n      return;\n    }`;
code = code.replace(regexSubmit2, newSubmit2);
code = code.replace("window.CMS_APP.toast('Name, Email, and Password are required.', 'error');\n      return;\n    }", ""); // Clean up old toast if left behind

const regexSubmit3 = /username: email,/;
const newSubmit3 = `username: username,`;
code = code.replace(regexSubmit3, newSubmit3);

fs.writeFileSync('js/home.js', code);
