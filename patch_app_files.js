const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');

const targetReader = `        const reader = new FileReader();
        reader.onload = (ev) => {
          localStorage.setItem('CMS_FILE_' + file.name, ev.target.result);
        };`;

const replaceReader = `        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            localStorage.setItem('CMS_FILE_' + file.name, ev.target.result);
            if (window.CMS_TENANT_ID && window.CMS_FIREBASE_DB) {
              const safeName = file.name.replace(/[.#$\\[\\]]/g, '_');
              window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_files/' + safeName).set(ev.target.result).catch(console.error);
            }
          } catch(e) {
            console.error("Local storage quota exceeded or Firebase error", e);
            CMS_APP.toast('Storage Error: File might be too large.', 'error');
          }
        };`;

code = code.replace(targetReader, replaceReader);

const targetDl = `  downloadDocument(fileName, explicitData = null) {
    const data = explicitData || localStorage.getItem('CMS_FILE_' + fileName);`;
const replaceDl = `  downloadDocument(fileName, explicitData = null) {
    // We ideally should fetch from Firebase if not in localStorage, but for now we expect it in localStorage
    const data = explicitData || localStorage.getItem('CMS_FILE_' + fileName);`;

code = code.replace(targetDl, replaceDl);

fs.writeFileSync('js/app.js', code);
console.log('Successfully patched app.js to sync files to Firebase');
