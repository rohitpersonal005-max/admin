// Master Console Logic

let tenants = [];

// Wait for Supabase to initialize from config
setTimeout(() => {
  if (window.CMS_SUPABASE) {
    loadTenants();
  } else {
    alert("Supabase not connected. Check config.");
  }
}, 500);

async function loadTenants() {
  const { data, error } = await window.CMS_SUPABASE.from('master_tenants').select('*');
  if (error) {
    console.error("Error loading tenants:", error);
    return;
  }
  tenants = data || [];
  let totalSeats = 0;
  tenants.forEach(t => {
    const seatLimit = t.seat_limit || t.seatLimit || 0;
    totalSeats += parseInt(seatLimit);
    t.companyName = t.company_name || t.companyName;
    t.adminEmail = t.admin_email || t.adminEmail;
    t.seatLimit = seatLimit;
    t.status = t.status || 'Active';
  });
  document.getElementById('stat-companies').innerText = tenants.length;
  document.getElementById('stat-seats').innerText = totalSeats;
  renderTable();
}

window.editTenant = function(id) {
  const t = tenants.find(x => x.id === id);
  if (!t) return;
  document.getElementById('e-id').value = t.id;
  document.getElementById('e-name').value = t.companyName || '';
  document.getElementById('e-username').value = t.admin_username || '';
  document.getElementById('e-seats').value = t.seatLimit || 10;
      const modal = document.getElementById('edit-modal');
    const content = document.getElementById('edit-modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); }, 10);
};

window.submitEdit = async function() {
  const id = document.getElementById('e-id').value;
  const name = document.getElementById('e-name').value;
  const username = document.getElementById('e-username').value;
  const seats = document.getElementById('e-seats').value;
  
  const { error } = await window.CMS_SUPABASE.from('master_tenants').update({
    company_name: name,
    admin_username: username,
    seat_limit: parseInt(seats)
  }).eq('id', id);
  
  if (error) {
    alert("Error updating client: " + error.message);
  } else {
    if(typeof closeEditModal === 'function') closeEditModal();
    loadTenants();
  }
};

window.deleteTenant = async function(id) {
  if (!confirm('CRITICAL WARNING: Are you absolutely sure you want to permanently delete this client? All their data will be destroyed forever. This cannot be undone.')) return;
  
  const { error } = await window.CMS_SUPABASE.from('master_tenants').delete().eq('id', id);
  if (error) {
    alert("Error deleting client: " + error.message);
  } else {
    loadTenants();
  }
};

window.toggleTenantStatus = async function(id, currentStatus) {
  const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
  if (newStatus === 'Suspended') {
    if (!confirm('Are you sure you want to suspend this client? They will instantly lose access to the system.')) return;
  }
  
  const { error } = await window.CMS_SUPABASE.from('master_tenants').update({
    status: newStatus
  }).eq('id', id);
  
  if (error) {
    alert("Error updating status: " + error.message);
  } else {
    loadTenants();
  }
};

function renderTable() {
  const tbody = document.getElementById('tenants-list');
  tbody.innerHTML = '';
  
  if (tenants.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-slate-500">No client companies provisioned yet.</td></tr>';
    return;
  }

  tenants.forEach(t => {
    const statusClass = t.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm' : 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm';
    
        let deleteBtn = '';
    if (t.status === 'Suspended') {
      deleteBtn = '<button onclick="deleteTenant(\'' + t.id + '\')" class="px-3 py-1.5 rounded text-xs font-semibold bg-white text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 shadow-sm transition">Delete</button>';
    }
    let tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition group border-b border-slate-100 last:border-0';
    
    tr.innerHTML = '<td class="px-6 py-4 font-semibold text-slate-800">' + t.companyName + '</td>' +
                   '<td class="px-6 py-4 text-slate-500 font-mono text-xs">' + t.id + '</td>' +
                   '<td class="px-6 py-4 text-slate-600">' + t.adminEmail + '</td>' +
                   '<td class="px-6 py-4 text-slate-600 font-mono text-xs">' + (t.admin_username || '-') + '</td>' +
                   '<td class="px-6 py-4 text-center"><span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-xs border border-slate-200 shadow-sm">' + t.seatLimit + '</span></td>' +
                   '<td class="px-6 py-4 text-center"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ' + statusClass + '">' + t.status + '</span></td>' +
                   '<td class="px-6 py-4 text-right flex justify-end gap-2">' +
                   '<button onclick="editTenant(\'' + t.id + '\')" class="px-3 py-1.5 rounded text-xs font-semibold bg-white text-blue-600 hover:bg-blue-50 border border-slate-200 group-hover:border-blue-200 shadow-sm transition">Edit</button>' +
                   '<button onclick="toggleTenantStatus(\'' + t.id + '\', \'' + t.status + '\')" class="px-3 py-1.5 rounded text-xs font-semibold ' + (t.status === 'Active' ? 'bg-white text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 shadow-sm' : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 shadow-sm') + ' transition">' +
                   (t.status === 'Active' ? 'Suspend' : 'Activate') + '</button>' + deleteBtn + '</td>';
    tbody.appendChild(tr);
  });
}

// Tab Switching Logic
function switchTab(tabId) {
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('provision-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.provisionTenant();
    });
  }
});

window.provisionTenant = async function() {
  const btn = document.getElementById('p-btn');
  if (btn && btn.disabled) return;
  if (btn) btn.disabled = true;

  const originalBtnText = btn ? btn.innerHTML : '';
  const statusDiv = document.getElementById('provision-status');
  if (statusDiv) statusDiv.innerHTML = '';
  
  function updateStatus(msg) {
    console.log(msg);
    if (statusDiv) {
      statusDiv.innerHTML += msg + '<br/>';
      statusDiv.style.display = 'block';
    }
  }

  try {
    updateStatus('Starting provision...');
    const name = document.getElementById('p-company').value.trim();
    const email = document.getElementById('p-email').value.trim();
    const username = document.getElementById('p-username') ? document.getElementById('p-username').value.trim() : '';
        const seats = document.getElementById('p-seats').value;
    const manualPassword = document.getElementById('p-password') ? document.getElementById('p-password').value : '';

    if (!name || !email || !seats) {
      alert("Please fill in all fields (Company Name, Email, and Seats).");
      if (btn) btn.disabled = false;
      return;
    }

    if (!window.CMS_SUPABASE) {
      alert("ERROR: Supabase is not connected.");
      if (btn) btn.disabled = false;
      return;
    }

    if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Provisioning...';

        const tempPassword = manualPassword || ("Welcome@" + Math.floor(1000 + Math.random() * 9000));
    
    updateStatus('Connecting to Supabase Auth...');

    const { data: authData, error: authError } = await window.CMS_SUPABASE.auth.signUp({
      email,
      password: tempPassword
    });

    if (authError) {
      throw new Error('Auth Error: ' + authError.message);
    }

    const user = authData.user;
    if (!user) {
      throw new Error('User creation failed, no user returned.');
    }

    updateStatus('Auth user created successfully! UID: ' + user.id);
    updateStatus('Connecting to Supabase Database...');

    const { error: dbError } = await window.CMS_SUPABASE.from('master_tenants').insert({
      admin_uid: user.id,
      company_name: name,
      cms_db: {},
      admin_email: email,
      admin_username: username,
      seat_limit: parseInt(seats),
      status: 'Active'
    });

    if (dbError) {
      throw new Error('DB Error: ' + dbError.message);
    }

    updateStatus('Database record saved successfully!');
    document.getElementById('p-company').value = "";
    document.getElementById('p-email').value = "";
    if (btn) { btn.innerHTML = originalBtnText; btn.disabled = false; }
    if (statusDiv) statusDiv.innerHTML = '';
    
    closeProvisionModal();
    alert('Tenant ' + name + ' successfully provisioned!\n\nAdmin Email: ' + email + '\nTemporary Password: ' + tempPassword);
    
    loadTenants(); // Refresh table

  } catch (e) {
    updateStatus('ERROR: ' + e.message);
    console.error("ERROR:", e);
    alert("ERROR: " + e.message);
    if (btn) { btn.innerHTML = originalBtnText; btn.disabled = false; }
  }
};
















