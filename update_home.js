const fs = require('fs');
let home = fs.readFileSync('js/home.js', 'utf8');

const oldHomeContact = /<input type="text" id="home-comp-contact".*?\/>/g;
const newHomeContact = `
<div class="flex items-center gap-2">
  <input type="text" id="home-comp-country-code" class="w-[70px] px-2 py-2 border border-slate-200 rounded-md bg-slate-50 text-center font-mono text-slate-600 cursor-not-allowed" readonly value="+91" tabindex="-1" />
  <input type="tel" id="home-comp-contact" value="\${this.companyInfo.contact || ''}" class="flex-1 border border-slate-200 px-3 py-2 rounded-md font-mono" placeholder="10-digit number" />
</div>
`;
home = home.replace(oldHomeContact, newHomeContact);

const oldHomeCountry = /<input type="text" id="home-comp-country".*?\/>/g;
const newHomeCountry = '<input type="text" id="home-comp-country" list="home-country-options" onchange="CMS_HOME.onCountryChange(this.value)" value="${this.companyInfo.country || \'India\'}" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="Enter country name" />';
home = home.replace(oldHomeCountry, newHomeCountry);

fs.writeFileSync('js/home.js', home);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
