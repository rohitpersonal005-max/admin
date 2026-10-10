const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// I'll extract the HTML block for step 1 and rewrite it to match the requested layout.
const regex = /<div class="grid grid-cols-1 md:grid-cols-2 gap-3">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<!-- STEP 2:/;
const match = code.match(regex);

if (match) {
    const layout = `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Constitution Type <span class="text-rose-600 font-bold">*</span></label>
                    <select id="v-constitution" required class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-sm">
                      <option value="">-- Select Constitution --</option>
                      \${['Proprietorship', 'Partnership', 'Limited Liability Partnership (LLP)', 'Private Limited Company', 'Public Limited Company', 'HUF', 'Trust / Society / NGO', 'Government Entity', 'Others'].map(c => \`<option value="\${c}" \${vendor.constitution === c ? 'selected' : ''}>\${c}</option>\`).join('')}
                    </select>
                  </div>
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Vendor / Supplier Company Name <span class="text-rose-600 font-bold">*</span></label>
                    <input type="text" id="v-name" required value="\${vendor.name || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" placeholder="e.g. Apex Office Supplies Pvt Ltd" />
                  </div>

                  <!-- Sequence: Nationality -> State -> District -> Taluka -> Street -->
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Nationality / Country of Vendor <span class="text-rose-600 font-bold">*</span></label>
                    <select id="v-country" required onchange="CMS_MASTERS.onCountryChange(this.value)" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white">
                      \${this.countries.map(c => \`<option value="\${c.name}" \${(vendor.addressCountry || 'India').includes(c.name) ? 'selected' : ''}>\${c.flag} \${c.name}</option>\`).join('')}
                    </select>
                  </div>
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">State / Province <span class="text-rose-600 font-bold">*</span></label>
                    <div id="v-state-container">
                      \${!(vendor.addressCountry || 'India').includes('India') ? 
                        \`<input id="v-state" required value="\${vendor.addressState || ''}" placeholder="State / Province" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />\` 
                      : 
                        \`<select id="v-state" required onchange="CMS_MASTERS.onStateChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium">
                          <option value="">-- Choose State / UT --</option>
                          \${this.indianStates.map(s => '<option value="' + s.name + '" ' + ((vendor.addressState || 'Delhi') === s.name ? 'selected' : '') + '>' + s.code + ' - ' + s.name + '</option>').join('')}
                        </select>\`
                      }
                    </div>
                  </div>

                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">District <span class="text-rose-600 font-bold">*</span></label>
                    <input id="v-district" required value="\${vendor.addressDistrict || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="District name" />
                  </div>
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Taluka / Tehsil</label>
                    <input id="v-taluka" value="\${vendor.addressTaluka || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Taluka name" />
                  </div>

                  <div class="md:col-span-2">
                    <label class="block font-bold text-slate-700 mb-1">Street / Building Address <span class="text-rose-600 font-bold">*</span></label>
                    <input id="v-address" required value="\${vendor.address || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Plot / Flat / Street / Area" />
                  </div>

                  <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-10 gap-3">
                    <div class="md:col-span-2">
                      <label class="block font-bold text-slate-700 mb-1">PIN Code (6 Digits) <span class="text-rose-600 font-bold">*</span></label>
                      <input id="v-pin" required maxlength="6" pattern="[0-9]{6}" value="\${vendor.addressPinCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="110020" />
                    </div>
                    <div class="md:col-span-4">
                      <label class="block font-bold text-slate-700 mb-1">Phone Number <span class="text-rose-600 font-bold">*</span></label>
                      <div class="flex items-stretch border border-slate-300 rounded-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
                        <input type="text" id="v-country-code" list="country-codes-list" value="\${vendor.countryCode || '+91'}" class="w-[80px] px-2 py-2 bg-slate-50 border-r border-slate-300 text-slate-700 font-mono text-xs focus:outline-none" placeholder="+91" />
                          <datalist id="country-codes-list">
                            \${this.countries.map(c => \`<option value="\${c.code}">\${c.name}</option>\`).join('')}
                          </datalist>
                        <input type="tel" id="v-contact" required maxlength="10" pattern="[0-9]{10}" value="\${vendor.contactNo || ''}" class="flex-1 min-w-0 px-3 py-2 font-mono text-sm border-none focus:ring-0 focus:outline-none bg-transparent" placeholder="10-digit number" />
                      </div>
                    </div>
                    <div class="md:col-span-4">
                      <label class="block font-bold text-slate-700 mb-1">Email Address <span class="text-rose-600 font-bold">*</span></label>
                      <input type="email" id="v-email" required value="\${vendor.email || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="vendor@..." />
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <!-- STEP 2:`;
    code = code.replace(regex, layout);
    fs.writeFileSync('js/masters.js', code);
    console.log('Reordered successfully.');
} else {
    console.log('Regex failed to match.');
}
