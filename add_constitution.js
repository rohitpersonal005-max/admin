const fs = require('fs');

let masters = fs.readFileSync('js/masters.js', 'utf8');

// 1. Add Constitution field in renderVendorForm
const searchNameHtml = `<div class="md:col-span-2">
                <label class="block font-bold text-slate-700 mb-1">Vendor / Supplier Company Name <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-name" required value="\${vendor.name || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. Apex Office Supplies Pvt Ltd" />
              </div>`;

const replaceNameHtml = `<div class="md:col-span-1">
                <label class="block font-bold text-slate-700 mb-1">Constitution Type <span class="text-rose-600 font-bold">*</span></label>
                <select id="v-constitution" required class="w-full px-3.5 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-sm">
                  <option value="">-- Select Constitution --</option>
                  \${['Proprietorship', 'Partnership', 'Limited Liability Partnership (LLP)', 'Private Limited Company', 'Public Limited Company', 'HUF', 'Trust / Society / NGO', 'Government Entity', 'Others'].map(c => \`<option value="\${c}" \${vendor.constitution === c ? 'selected' : ''}>\${c}</option>\`).join('')}
                </select>
              </div>
              <div class="md:col-span-1">
                <label class="block font-bold text-slate-700 mb-1">Vendor / Supplier Company Name <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-name" required value="\${vendor.name || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" placeholder="e.g. Apex Office Supplies Pvt Ltd" />
              </div>`;

if (masters.includes(searchNameHtml)) {
    masters = masters.replace(searchNameHtml, replaceNameHtml);
} else {
    // try regex
    masters = masters.replace(/<div class="md:col-span-2">\s*<label class="block font-bold text-slate-700 mb-1">Vendor \/ Supplier Company Name[\s\S]*?<\/div>/, replaceNameHtml);
}

// 2. Add Constitution logic in saveVendor
const searchSaveHtml = `const addressTaluka = document.getElementById('v-taluka')?.value.trim() || '';`;
const replaceSaveHtml = `const constitution = document.getElementById('v-constitution')?.value || '';
      const addressTaluka = document.getElementById('v-taluka')?.value.trim() || '';`;

masters = masters.replace(searchSaveHtml, replaceSaveHtml);

const searchSavePayload = `name, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,`;
const replaceSavePayload = `name, constitution, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,`;
masters = masters.replace(searchSavePayload, replaceSavePayload);

// Also update the payload where it saves `stateCode: stateInfo.code` etc.
// Look for where we push or update the array:
const searchUpdatePayload = `Object.assign(existingVendor, {
        name, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,`;
const replaceUpdatePayload = `Object.assign(existingVendor, {
        name, constitution, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,`;
masters = masters.replace(searchUpdatePayload, replaceUpdatePayload);

fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
