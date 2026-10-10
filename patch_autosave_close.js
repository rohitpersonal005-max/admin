const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /window\.CMS_APP\.closeModal\(\);\s*window\.CMS_APP\.toast\(directSubmit \? 'Vendor credentials and statutory certificates submitted for Admin approval!' : 'Vendor saved successfully!', 'success'\);\s*window\.CMS_APP\.refreshView\(\);/g;

const replace = `if (directSubmit) {
      window.CMS_APP.closeModal();
      window.CMS_APP.toast('Vendor credentials and statutory certificates submitted for Admin approval!', 'success');
      window.CMS_APP.refreshView();
    } else {
      // Quiet background save for drafts: just refresh the background table if needed, or don't do anything disruptive.
      const vendorCountDisplay = document.getElementById('vendor-count-display');
      if (vendorCountDisplay) {
         window.CMS_APP.refreshView(true); // Assuming soft refresh exists, or just do nothing UI-wise to avoid focus loss.
      }
    }`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed Modal Close on Autosave.');
