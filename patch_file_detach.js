const fs = require('fs');
let code = fs.readFileSync('js/store.js', 'utf8');

const targetFiles = `      // Load Files (Option 2 Sync)
      const filesSnap = await window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_files').once('value');
      if (filesSnap.exists()) {
        filesSnap.forEach(child => {
          const safeName = child.key;
          const base64 = child.val();
          localStorage.setItem('CMS_FILE_' + safeName, base64);
          
          const dotName = safeName.replace(/_pdf$/i, '.pdf').replace(/_jpg$/i, '.jpg').replace(/_png$/i, '.png');
          localStorage.setItem('CMS_FILE_' + dotName, base64);
        });
      }`;

const replaceFiles = `      // Load Files (Option 2 Sync) - RUN IN BACKGROUND to prevent login freeze
      window.CMS_FIREBASE_DB.ref('master_tenants/' + window.CMS_TENANT_ID + '/cms_files').once('value').then(filesSnap => {
        if (filesSnap.exists()) {
          filesSnap.forEach(child => {
            const safeName = child.key;
            const base64 = child.val();
            localStorage.setItem('CMS_FILE_' + safeName, base64);
            
            const dotName = safeName.replace(/_pdf$/i, '.pdf').replace(/_jpg$/i, '.jpg').replace(/_png$/i, '.png');
            localStorage.setItem('CMS_FILE_' + dotName, base64);
          });
          console.log("Background file sync complete.");
        }
      }).catch(console.error);`;

code = code.replace(targetFiles, replaceFiles);
fs.writeFileSync('js/store.js', code);
console.log('Successfully detached file sync from critical path');
