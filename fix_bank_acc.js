const fs = require('fs');

let masters = fs.readFileSync('js/masters.js', 'utf8');

// Update HTML
const searchHtml = `<input type="text" id="v-account-no" required minlength="9" maxlength="18" value="\${vendor.accountNo || ''}" class="w-full font-mono px-3 py-1.5 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="9-18 digit account" />`;
const replaceHtml = `<input type="text" id="v-account-no" required minlength="5" maxlength="22" value="\${vendor.accountNo || ''}" class="w-full font-mono px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Account Number" />`;

if (masters.includes(searchHtml)) {
    masters = masters.replace(searchHtml, replaceHtml);
} else {
    masters = masters.replace(/<input type="text" id="v-account-no"[\s\S]*?\/>/, replaceHtml);
}

// Update JS Logic
const searchJs = `if (!accountNo || accountNo.length < 9 || accountNo.length > 18) {
      return window.CMS_APP.toast(\`Bank Account Number must be between 9 and 18 digits (currently \${accountNo.length} digits).\`, 'error');
    }`;
const replaceJs = `if (!accountNo || accountNo.length < 5 || accountNo.length > 22) {
      return window.CMS_APP.toast(\`Bank Account Number must be between 5 and 22 digits (currently \${accountNo.length} digits).\`, 'error');
    }`;

if (masters.includes(searchJs)) {
    masters = masters.replace(searchJs, replaceJs);
} else {
    // regex fallback
    masters = masters.replace(/if \(!accountNo \|\| accountNo\.length < 9 \|\| accountNo\.length > 18\) \{[\s\S]*?\}/, replaceJs);
}

fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
