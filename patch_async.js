const fs = require('fs');
let code = fs.readFileSync('master-console/js/app.js', 'utf8');

// Replace the entire forceSubmitProvision function with a robust async/await version
const startIdx = code.indexOf('window.forceSubmitProvision =');
const endIdx = code.indexOf('};', startIdx) + 2;

if (startIdx !== -1) {
  const newFunc = `window.forceSubmitProvision = async function() {
  const btn = document.querySelector('button[onclick="window.forceSubmitProvision()"]');
  const originalBtnText = btn ? btn.innerHTML : '';
  
  try {
    const name = document.getElementById('p-company').value.trim();
    const email = document.getElementById('p-email').value.trim();
    const seats = document.getElementById('p-seats').value;

    if (!name || !email || !seats) {
      alert("Please fill in all fields (Company Name, Email, and Seats).");
      return;
    }

    if (!email.includes('@')) {
      alert("Please enter a valid email address containing an '@' symbol.");
      return;
    }

    if (!db) {
      alert("ERROR: Firebase database is not connected. Check firebase-config.js");
      return;
    }

    if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Provisioning...';
    document.getElementById('p-company').value = "Loading... Please wait";

    const tenantId = 'tenant_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const tempPassword = "Welcome@" + Math.floor(1000 + Math.random() * 9000);
    
    // 1. Create Auth User
    const tempApp = firebase.initializeApp(firebaseConfig, "TempApp_" + Date.now());
    let userCredential;
    try {
      userCredential = await tempApp.auth().createUserWithEmailAndPassword(email, tempPassword);
    } catch (authErr) {
      console.error("FIREBASE AUTH ERROR:", authErr);
      alert('Authentication Error: ' + authErr.message);
      await tempApp.delete();
      document.getElementById('p-company').value = name;
      if (btn) btn.innerHTML = originalBtnText;
      return;
    }

    // 2. Write to DB
    const newTenant = {
      companyName: name,
      adminEmail: email,
      seatLimit: parseInt(seats),
      status: 'Active',
      createdAt: new Date().toISOString(),
      adminUid: userCredential.user.uid
    };

    try {
      await db.ref('master_tenants/' + tenantId).set(newTenant);
    } catch (dbErr) {
      console.error("FIREBASE DB ERROR:", dbErr);
      alert('Firebase Database Error: ' + dbErr.message + '\\nDid you set your Realtime Database Rules to True?');
      await tempApp.auth().signOut();
      await tempApp.delete();
      document.getElementById('p-company').value = name;
      if (btn) btn.innerHTML = originalBtnText;
      return;
    }

    // Success
    document.getElementById('p-company').value = "";
    document.getElementById('p-email').value = "";
    if (btn) btn.innerHTML = originalBtnText;
    closeProvisionModal();
    
    alert('Tenant ' + name + ' successfully provisioned!\\n\\nTenant ID: ' + tenantId + '\\nAdmin Email: ' + email + '\\nTemporary Password: ' + tempPassword + '\\n\\nPlease securely share these credentials with the client.');
    
    // Cleanup
    await tempApp.auth().signOut();
    await tempApp.delete();
    
  } catch (e) {
    console.error("CRITICAL ERROR:", e);
    alert("CRITICAL ERROR: " + e.message);
    document.getElementById('p-company').value = "";
    if (btn) btn.innerHTML = originalBtnText;
  }
};`;

  code = code.substring(0, startIdx) + newFunc + code.substring(endIdx);
  fs.writeFileSync('master-console/js/app.js', code);
  console.log('Successfully injected robust async forceSubmitProvision');
} else {
  console.log('Could not find forceSubmitProvision');
}
