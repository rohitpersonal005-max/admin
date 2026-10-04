const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const oldGstPanFallback = `// Fallback document filenames for records if user did not pick a local disk file
    if (!gstNotApplicable && gstNo && !gstCertificateFile) {
      gstCertificateFile = \`\${gstNo}_GST_Certificate.pdf\`;
    }
    if (!panNotApplicable && panNo && !panCardFile) {
      panCardFile = \`\${panNo}_PAN_Card.pdf\`;
    }`;

const newGstPanStrict = `// Strict Document Upload Validation
    if (!gstNotApplicable && gstNo && !gstCertificateFile) {
      if (window.CMS_MASTERS.switchVendorTab) window.CMS_MASTERS.switchVendorTab(2);
      return window.CMS_APP.toast('GST Certificate document is mandatory. Please upload the file.', 'error');
    }
    if (!panNotApplicable && panNo && !panCardFile) {
      if (window.CMS_MASTERS.switchVendorTab) window.CMS_MASTERS.switchVendorTab(2);
      return window.CMS_APP.toast('PAN Card document is mandatory. Please upload the file.', 'error');
    }`;

code = code.replace(oldGstPanFallback, newGstPanStrict);

const oldBankFallback = `let bankDoc = (bankFileInput && bankFileInput.files[0]) ? bankFileInput.files[0].name : (existingVendor?.bankDoc || '');
    if (accountNo && !bankDoc) {
      bankDoc = \`\${accountNo}_Bank_Mandate.pdf\`; // Mock auto-attachment if none uploaded
    }`;

const newBankStrict = `let bankDoc = (bankFileInput && bankFileInput.files[0]) ? bankFileInput.files[0].name : (existingVendor?.bankDoc || '');
    if (accountNo && !bankDoc) {
      if (window.CMS_MASTERS.switchVendorTab) window.CMS_MASTERS.switchVendorTab(4);
      return window.CMS_APP.toast('Bank Mandate or Cancelled Cheque is mandatory when providing bank details.', 'error');
    }`;

code = code.replace(oldBankFallback, newBankStrict);

const oldQuoteFallback = `} else {
                docName = \`\${qno}_Quotation.pdf\`; // fallback
            }`;

const newQuoteStrict = `} else {
                if (window.CMS_MASTERS.switchVendorTab) window.CMS_MASTERS.switchVendorTab(3);
                return window.CMS_APP.toast(\`Quotation document is mandatory for quotation \${qno}.\`, 'error');
            }`;

code = code.replace(oldQuoteFallback, newQuoteStrict);

fs.writeFileSync('js/masters.js', code);
console.log('Fixed vendor document validation.');
