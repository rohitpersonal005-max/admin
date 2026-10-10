const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexSaveVendor = /if \(\!bankDoc\) \{\s*window\.CMS_APP\.toast\('Supporting Bank Document \(Cancelled Cheque, Passbook, or Bank Statement\) is mandatory\.', 'error'\);\s*this\.switchVendorTab\(4\);\s*return;\s*\}/;

const newSaveVendor = `if (!bankDoc || !bankDocTitle) {
          window.CMS_APP.toast('Supporting Bank Document and its Document Type are mandatory.', 'error');
          this.switchVendorTab(4);
          return;
        }`;

code = code.replace(regexSaveVendor, newSaveVendor);
fs.writeFileSync('js/masters.js', code);
