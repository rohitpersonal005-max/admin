const fs = require('fs');

const searchMasters = `              <div>
                <label class="block font-bold text-slate-700 mb-1">PIN Code (6 Digits) <span class="text-rose-600 font-bold">*</span></label>
                <input id="v-pin" required maxlength="6" pattern="[0-9]{6}" value="\${vendor.addressPinCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. 110020" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Phone Number <span class="text-rose-600 font-bold">*</span></label>
                  
  <div class="flex items-stretch border border-slate-300 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
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
  </div>
  
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Email Address <span class="text-rose-600 font-bold">*</span></label>
                  <input type="email" id="v-email" required value="\${vendor.email || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="vendor@..." />
                </div>
              </div>`;


const replaceMasters = `              <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-10 gap-3">
                <div class="md:col-span-2">
                  <label class="block font-bold text-slate-700 mb-1">PIN Code (6 Digits) <span class="text-rose-600 font-bold">*</span></label>
                  <input id="v-pin" required maxlength="6" pattern="[0-9]{6}" value="\${vendor.addressPinCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="110020" />
                </div>
                <div class="md:col-span-4">
                  <label class="block font-bold text-slate-700 mb-1">Phone Number <span class="text-rose-600 font-bold">*</span></label>
                  <div class="flex items-stretch border border-slate-300 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
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
                  </div>
                </div>
                <div class="md:col-span-4">
                  <label class="block font-bold text-slate-700 mb-1">Email Address <span class="text-rose-600 font-bold">*</span></label>
                  <input type="email" id="v-email" required value="\${vendor.email || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="vendor@..." />
                </div>
              </div>`;

let masters = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<div>\s*<label class="block font-bold text-slate-700 mb-1">PIN Code \(6 Digits\)[\s\S]*?<input id="v-pin"[\s\S]*?<\/div>\s*<div class="grid grid-cols-2 gap-2">\s*<div>\s*<label class="block font-bold text-slate-700 mb-1">Phone Number[\s\S]*?<input type="email" id="v-email"[\s\S]*?<\/div>\s*<\/div>/;

if (masters.includes(searchMasters)) {
    masters = masters.replace(searchMasters, replaceMasters);
} else if (masters.includes(searchMasters.replace(/\r\n/g, '\n'))) {
    masters = masters.replace(searchMasters.replace(/\r\n/g, '\n'), replaceMasters);
} else {
    masters = masters.replace(regex, replaceMasters);
}
fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
