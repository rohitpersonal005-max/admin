const fs = require('fs');

const searchMasters = `<div class="flex items-center gap-2">
  <input type="text" id="v-country-code" class="w-[70px] px-2 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-center bg-slate-50 text-slate-600 cursor-not-allowed" readonly value="+91" tabindex="-1" />
  <input type="tel" id="v-contact" required value="\${vendor.contactNo || ''}" class="flex-1 px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" placeholder="10-digit number" />
</div>`;

const searchMastersAlternate = searchMasters.replace(/\r\n/g, '\n');

const replaceMasters = `<div class="flex items-stretch border border-slate-300 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
  <select id="v-country-code" class="w-[90px] px-2 py-2 bg-slate-50 border-r border-slate-300 text-slate-700 font-mono text-xs focus:outline-none cursor-pointer">
    <option value="+91">IN (+91)</option>
    <option value="+1">US (+1)</option>
    <option value="+44">UK (+44)</option>
    <option value="+971">AE (+971)</option>
    <option value="+65">SG (+65)</option>
    <option value="+61">AU (+61)</option>
    <option value="+49">DE (+49)</option>
    <option value="+81">JP (+81)</option>
  </select>
  <input type="tel" id="v-contact" required value="\${vendor.contactNo || ''}" class="flex-1 min-w-0 px-3 py-2 font-mono text-sm border-none focus:ring-0 focus:outline-none bg-transparent" placeholder="10-digit number" />
</div>`;

let masters = fs.readFileSync('js/masters.js', 'utf8');
if (masters.includes(searchMasters)) {
    masters = masters.replace(searchMasters, replaceMasters);
} else if (masters.includes(searchMastersAlternate)) {
    masters = masters.replace(searchMastersAlternate, replaceMasters);
} else {
    // Regex fallback
    masters = masters.replace(/<div class="flex items-center gap-2">\s*<input type="text" id="v-country-code"[\s\S]*?<\/div>/, replaceMasters);
}
fs.writeFileSync('js/masters.js', masters);


// Home
const searchHome = `<div class="flex items-center gap-2">
  <input type="text" id="home-comp-country-code" class="w-[70px] px-2 py-2 border border-slate-200 rounded-md bg-slate-50 text-center font-mono text-slate-600 cursor-not-allowed" readonly value="+91" tabindex="-1" />
  <input type="tel" id="home-comp-contact" value="\${this.companyInfo.contact || ''}" class="flex-1 border border-slate-200 px-3 py-2 rounded-md font-mono" placeholder="10-digit number" />
</div>`;

const searchHomeAlt = searchHome.replace(/\r\n/g, '\n');

const replaceHome = `<div class="flex items-stretch border border-slate-200 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 w-full bg-white">
  <select id="home-comp-country-code" class="w-[90px] px-2 py-2 bg-slate-50 border-r border-slate-200 text-slate-700 font-mono text-xs focus:outline-none cursor-pointer">
    <option value="+91">IN (+91)</option>
    <option value="+1">US (+1)</option>
    <option value="+44">UK (+44)</option>
    <option value="+971">AE (+971)</option>
    <option value="+65">SG (+65)</option>
    <option value="+61">AU (+61)</option>
    <option value="+49">DE (+49)</option>
    <option value="+81">JP (+81)</option>
  </select>
  <input type="tel" id="home-comp-contact" value="\${this.companyInfo.contact || ''}" class="flex-1 min-w-0 px-3 py-2 font-mono text-sm border-none focus:ring-0 focus:outline-none bg-transparent" placeholder="10-digit number" />
</div>`;

let home = fs.readFileSync('js/home.js', 'utf8');
if (home.includes(searchHome)) {
    home = home.replace(searchHome, replaceHome);
} else if (home.includes(searchHomeAlt)) {
    home = home.replace(searchHomeAlt, replaceHome);
} else {
    home = home.replace(/<div class="flex items-center gap-2">\s*<input type="text" id="home-comp-country-code"[\s\S]*?<\/div>/, replaceHome);
}
fs.writeFileSync('js/home.js', home);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
