const fs = require('fs');

let masters = fs.readFileSync('js/masters.js', 'utf8');

// Update HTML
const searchHtml = `<input type="text" id="v-account-name" required value="\${vendor.accountName || vendor.name || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Beneficiary Name" />`;
const replaceHtml = `<input type="text" id="v-account-name" required oninput="this.value = this.value.replace(/[^a-zA-Z\\s\\.\\-\\&]/g, '')" value="\${vendor.accountName || vendor.name || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Beneficiary Name" />`;

if (masters.includes(searchHtml)) {
    masters = masters.replace(searchHtml, replaceHtml);
} else {
    masters = masters.replace(/<input type="text" id="v-account-name"[\s\S]*?\/>/, replaceHtml);
}

// Update JS Logic (just in case they somehow bypass the HTML restriction)
const searchJs = `if (!accountNo || accountNo.length < 5 || accountNo.length > 22) {`;
const replaceJs = `if (/[^a-zA-Z\\s\\.\\-\\&]/.test(accountName)) {
        return window.CMS_APP.toast('Bank Account Name cannot contain numbers or special symbols.', 'error');
      }
      if (!accountNo || accountNo.length < 5 || accountNo.length > 22) {`;

if (masters.includes(searchJs)) {
    masters = masters.replace(searchJs, replaceJs);
}

fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
