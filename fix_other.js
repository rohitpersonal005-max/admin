const fs = require('fs');
let masters = fs.readFileSync('js/masters.js', 'utf8');

// 1. Add the other input in render row
const searchHtml = `<select class="cert-regulator-select w-full px-3 py-2 border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 font-medium" onchange="CMS_MASTERS.onRegulatorChange('\${rowId}', this.value)">
                <option value="">-- Choose Agency --</option>
                \${regulators.map(r => \`<option value="\${r}" \${regulator === r ? 'selected' : ''}>\${r}</option>\`).join('')}
              </select>`;

// We need to determine if 'regulator' is custom.
const newHtml = `\${(() => {
                const isCustom = regulator && !regulators.includes(regulator);
                return \`
                  <select class="cert-regulator-select w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-medium" onchange="CMS_MASTERS.onRegulatorChange('\${rowId}', this.value)">
                    <option value="">-- Choose Agency --</option>
                    \${regulators.map(r => \`<option value="\${r}" \${regulator === r || (isCustom && r === 'Other') ? 'selected' : ''}>\${r}</option>\`).join('')}
                  </select>
                  <input type="text" class="cert-regulator-other-input \${isCustom ? '' : 'hidden'} mt-2 w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" value="\${isCustom ? regulator : ''}" placeholder="Specify Agency Name" />
                \`;
              })()}`;

if (masters.includes(searchHtml)) {
    masters = masters.replace(searchHtml, newHtml);
} else {
    // try regex
    masters = masters.replace(/<select class="cert-regulator-select[\s\S]*?<\/select>/, newHtml);
}

// 2. Modify onRegulatorChange
const searchOnReg = `onRegulatorChange(rowId, val) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const formInput = row.querySelector('.cert-form-input');
    if (formInput && val === 'ISO' && !formInput.value) {
      formInput.value = '9001:2015';
    }
  },`;

const replaceOnReg = `onRegulatorChange(rowId, val) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const otherInput = row.querySelector('.cert-regulator-other-input');
    if (otherInput) {
      if (val === 'Other') {
        otherInput.classList.remove('hidden');
        otherInput.focus();
      } else {
        otherInput.classList.add('hidden');
      }
    }
    const formInput = row.querySelector('.cert-form-input');
    if (formInput && val === 'ISO' && !formInput.value) {
      formInput.value = '9001:2015';
    }
  },`;

if (masters.includes(searchOnReg)) {
    masters = masters.replace(searchOnReg, replaceOnReg);
} else {
    masters = masters.replace(/onRegulatorChange\(rowId, val\) {[\s\S]*?},/, replaceOnReg);
}

// 3. Modify saveVendor certificate loop
const searchSaveLoop = `const reg = row.querySelector('.cert-regulator-select')?.value || '';`;
const replaceSaveLoop = `let reg = row.querySelector('.cert-regulator-select')?.value || '';
      if (reg === 'Other') {
        const otherVal = row.querySelector('.cert-regulator-other-input')?.value.trim();
        if (otherVal) reg = otherVal;
        else return window.CMS_APP.toast('Please specify the agency name for "Other".', 'error');
      }`;

if (masters.includes(searchSaveLoop)) {
    masters = masters.replace(searchSaveLoop, replaceSaveLoop);
}

fs.writeFileSync('js/masters.js', masters);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
