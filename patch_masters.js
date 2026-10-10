const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexLabel = /<label class="block font-bold text-slate-700 mb-1 text-\[11px\]">Upload Supporting Document \(Cancelled Cheque, Passbook, or Bank Statement\)<\/label>\s*<input type="file" id="v-bank-file" accept="\.pdf,image\/\*" class="text-xs" \/>/;

const newLabel = `<label class="block font-bold text-slate-700 mb-1 text-[11px]">Upload Supporting Document (Cancelled Cheque, Passbook, or Bank Statement) <span class="text-rose-600 font-bold">*</span></label>
                <input type="file" id="v-bank-file" accept=".pdf,image/*" class="text-xs" \${!vendor.bankDoc ? 'required' : ''} />`;

code = code.replace(regexLabel, newLabel);

const regexSaveVendor = /const bankFileInput = document\.getElementById\('v-bank-file'\);\s*let bankDoc = \(bankFileInput && bankFileInput\.files\[0\]\) \? bankFileInput\.files\[0\]\.name : \(existingVendor\?\.bankDoc \|\| ''\);\s*if \(accountNo && !bankDoc\) \{\s*bankDoc = `\$\{accountNo\}_Bank_Statement\.pdf`; \/\/ Mock auto-attachment if none uploaded\s*\}/;

const newSaveVendor = `const bankFileInput = document.getElementById('v-bank-file');
      let bankDoc = (bankFileInput && bankFileInput.files[0]) ? bankFileInput.files[0].name : (existingVendor?.bankDoc || '');
      
      if (!bankDoc) {
        window.CMS_APP.toast('Supporting Bank Document (Cancelled Cheque, Passbook, or Bank Statement) is mandatory.', 'error');
        this.switchVendorTab(4);
        return;
      }`;

code = code.replace(regexSaveVendor, newSaveVendor);
fs.writeFileSync('js/masters.js', code);
