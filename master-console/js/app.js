// Master Console Logic

let db = null;
let tenants = [];

// Wait for Firebase to initialize from config
setTimeout(() => {
  if (window.CMS_FIREBASE_DB) {
    db = window.CMS_FIREBASE_DB;
    loadTenants();
  } else {
    alert("Firebase not connected. Check firebase-config.js");
  }
}, 500);


function loadTenants() {
  db.ref('master_tenants').on('value', (snapshot) => {
    tenants = [];
    let totalSeats = 0;
    if (snapshot.exists()) {
      snapshot.forEach(child => {
        const t = child.val();
        t.id = child.key;
        tenants.push(t);
        totalSeats += parseInt(t.seatLimit || 0);
      });
    }
    document.getElementById('stat-companies').innerText = tenants.length;
    document.getElementById('stat-seats').innerText = totalSeats;
    renderTable();
  });
}

function renderTable() {
  const tbody = document.getElementById('tenants-list');
  tbody.innerHTML = '';
  
  if (tenants.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-500">No client companies provisioned yet.</td></tr>`;
    return;
  }

  tenants.forEach(t => {
    const statusClass = t.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    
    tbody.innerHTML += `
      <tr class="hover:bg-slate-800/30 transition">
        <td class="px-6 py-4 font-semibold text-white">${t.companyName}</td>
        <td class="px-6 py-4 text-slate-400 font-mono text-xs">${t.id}</td>
        <td class="px-6 py-4 text-slate-300">${t.adminEmail}</td>
        <td class="px-6 py-4 text-center">
          <span class="px-2.5 py-1 bg-slate-800 rounded-md font-mono text-xs border border-slate-700">${t.seatLimit}</span>
        </td>
        <td class="px-6 py-4 text-center">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusClass}">${t.status}</span>
        </td>
        <td class="px-6 py-4 text-right">
          <button onclick="toggleTenantStatus('${t.id}', '${t.status}')" class="px-3 py-1.5 rounded text-xs font-semibold ${t.status === 'Active' ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'} transition">
            ${t.status === 'Active' ? 'Suspend' : 'Activate'}
          </button>
        </td>
      </tr>
    `;
  });
}

// Modal Handling


function openProvisionModal() {
  const modal = document.getElementById('provision-modal');
  const modalContent = document.getElementById('provision-modal-content');
  modal.classList.remove('hidden');
  setTimeout(() => {
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  }, 10);
}

function closeProvisionModal() {
  const modal = document.getElementById('provision-modal');
  const modalContent = document.getElementById('provision-modal-content');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.getElementById('provision-form').reset();
  }, 200);
}

function toggleTenantStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
  if (confirm(`Are you sure you want to ${newStatus.toLowerCase()} this tenant?`)) {
    db.ref('master_tenants/' + id).update({ status: newStatus });
  }
}


// Tab Switching Logic
function switchTab(tabId) {
  // Update nav UI
  const navs = ['tenants', 'billing', 'logs'];
  navs.forEach(nav => {
    const el = document.getElementById('nav-' + nav);
    if (!el) return;
    if (nav === tabId) {
      el.className = 'flex items-center gap-3 px-3 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg transition font-medium text-sm border border-indigo-500/30';
    } else {
      el.className = 'flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition font-medium text-sm';
    }
  });

  // Update Sections
  const sections = ['sec-tenants', 'sec-billing', 'sec-logs'];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (!el) return;
    if (sec === 'sec-' + tabId) {
      el.classList.remove('hidden');
      el.classList.add('block');
    } else {
      el.classList.remove('block');
      el.classList.add('hidden');
    }
  });
}

window.submitProvision = function() {
  try {
    const name = document.getElementById('p-company').value.trim();
    const email = document.getElementById('p-email').value.trim();
    const seats = document.getElementById('p-seats').value;

    if (!name || !email || !seats) {
      alert("Please fill in all fields.");
      return;
    }

    if (!db) {
      alert("ERROR: Firebase database is not connected. Did you paste your keys in firebase-config.js?");
      return;
    }

    const tenantId = 'tenant_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

    const newTenant = {
      companyName: name,
      adminEmail: email,
      seatLimit: parseInt(seats),
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    db.ref('master_tenants/' + tenantId).set(newTenant).then(() => {
      closeProvisionModal();
      alert(`Tenant ${name} successfully provisioned!Tenant ID: ${tenantId}Admin: ${email}Seats: ${seats}`);
    }).catch(err => {
      console.error("FIREBASE ERROR:", err);
      alert('Firebase Error: ' + err.message + 'Did you set your Realtime Database Rules to True?');
    });
  } catch (e) {
    alert("CRITICAL ERROR: " + e.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('provision-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.submitProvision();
    });
  }
});

window.forceSubmitProvision = async function() {
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
      alert('Firebase Database Error: ' + dbErr.message + '\nDid you set your Realtime Database Rules to True?');
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
    
    alert('Tenant ' + name + ' successfully provisioned!\n\nTenant ID: ' + tenantId + '\nAdmin Email: ' + email + '\nTemporary Password: ' + tempPassword + '\n\nPlease securely share these credentials with the client.');
    
    // Cleanup
    await tempApp.auth().signOut();
    await tempApp.delete();
    
  } catch (e) {
    console.error("CRITICAL ERROR:", e);
    alert("CRITICAL ERROR: " + e.message);
    document.getElementById('p-company').value = "";
    if (btn) btn.innerHTML = originalBtnText;
  }
};
