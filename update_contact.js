const fs = require('fs');

// --- MASTERS.JS ---
let masters = fs.readFileSync('js/masters.js', 'utf8');

// 1. Create a datalist for countries at the start of renderVendorForm
const datalistSnippet = `
  <datalist id="country-options">
    ${'${this.countries.map(c => `<option value="${c.name}"></option>`).join(\'\')}'}
  </datalist>
`;
if (!masters.includes('id="country-options"')) {
    masters = masters.replace('let html = `', 'let html = `' + datalistSnippet);
}

// 2. Wire the country input
const oldCountry = '<input id="v-country" required value="${vendor.addressCountry || \'India\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />';
const newCountry = '<input id="v-country" list="country-options" onchange="CMS_MASTERS.onCountryChange(this.value)" required value="${vendor.addressCountry || \'India\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />';
masters = masters.replace(oldCountry, newCountry);

// 3. Add the country code box next to the phone number
const oldContact = '<input type="tel" id="v-contact" required value="${vendor.contactNo || \'\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" placeholder="10-digit number" />';
const newContact = `
<div class="flex items-center gap-2">
  <input type="text" id="v-country-code" class="w-[70px] px-2 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-center bg-slate-50 text-slate-600 cursor-not-allowed" readonly value="+91" tabindex="-1" />
  <input type="tel" id="v-contact" required value="\${vendor.contactNo || ''}" class="flex-1 px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" placeholder="10-digit number" />
</div>
`;
masters = masters.replace(oldContact, newContact);

fs.writeFileSync('js/masters.js', masters);


// --- HOME.JS ---
let home = fs.readFileSync('js/home.js', 'utf8');

const homeDatalist = `
  <datalist id="home-country-options">
    <option value="India"></option>
    <option value="United States"></option>
    <option value="United Kingdom"></option>
    <option value="United Arab Emirates"></option>
    <option value="Singapore"></option>
    <option value="Australia"></option>
    <option value="Canada"></option>
    <option value="Germany"></option>
    <option value="Japan"></option>
  </datalist>
`;
if (!home.includes('id="home-country-options"')) {
    home = home.replace('let html = `', 'let html = `' + homeDatalist);
}

const oldHomeCountry = '<input id="home-comp-country" required value="${this.companyInfo.country || \'India\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />';
const newHomeCountry = '<input id="home-comp-country" list="home-country-options" onchange="CMS_HOME.onCountryChange(this.value)" required value="${this.companyInfo.country || \'India\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />';
home = home.replace(oldHomeCountry, newHomeCountry);

const oldHomeContact = '<input type="tel" id="home-comp-contact" required value="${this.companyInfo.contact || \'\'}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" placeholder="10-digit number" />';
const newHomeContact = `
<div class="flex items-center gap-2">
  <input type="text" id="home-comp-country-code" class="w-[70px] px-2 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-center bg-slate-50 text-slate-600 cursor-not-allowed" readonly value="+91" tabindex="-1" />
  <input type="tel" id="home-comp-contact" required value="\${this.companyInfo.contact || ''}" class="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" placeholder="10-digit number" />
</div>
`;
home = home.replace(oldHomeContact, newHomeContact);

fs.writeFileSync('js/home.js', home);
console.log('Update successful');
