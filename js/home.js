window.CMS_HOME = {
  companyInfo: JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}'),
  companyDocs: JSON.parse(localStorage.getItem('CMS_COMPANY_DOCS') || '[]'),

  uploadDocument(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      return window.CMS_APP.toast('File is too large! Please upload a file smaller than 2MB.', 'error');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const docData = {
        name: file.name,
        type: file.type,
        data: e.target.result,
        uploadedAt: new Date().toISOString()
      };
      
      this.companyDocs = this.companyDocs || [];
      this.companyDocs.push(docData);
      localStorage.setItem('CMS_COMPANY_DOCS', JSON.stringify(this.companyDocs));
      window.CMS_APP.toast('Document uploaded successfully!', 'success');
      this.render();
    };
    reader.readAsDataURL(file);
  },

  deleteDocument(index) {
    if (!confirm('Are you sure you want to delete this document?')) return;
    this.companyDocs.splice(index, 1);
    localStorage.setItem('CMS_COMPANY_DOCS', JSON.stringify(this.companyDocs));
    window.CMS_APP.toast('Document deleted.', 'success');
    this.render();
  },

  getCustomRoles() {
    const roles = JSON.parse(localStorage.getItem('CMS_CUSTOM_ROLES') || '["Admin", "User"]');
    if (!roles.includes('Admin')) roles.unshift('Admin');
    if (!roles.includes('User')) roles.push('User');
    return [...new Set(roles)];
  },

  addCustomRole() {
    const role = prompt('Enter new role name (e.g., Auditor, Manager):');
    if (!role || role.trim() === '') return;
    const roles = this.getCustomRoles();
    if (!roles.includes(role.trim())) {
      roles.push(role.trim());
      localStorage.setItem('CMS_CUSTOM_ROLES', JSON.stringify(roles));
      window.CMS_APP.toast(`Role '${role}' added successfully.`, 'success');
      this.render();
    } else {
      window.CMS_APP.toast('Role already exists.', 'warning');
    }
  },

  onCountryChange(countryName) {
    const codes = { 'India': '+91', 'United States': '+1', 'United Kingdom': '+44', 'United Arab Emirates': '+971', 'Singapore': '+65', 'Australia': '+61', 'Canada': '+1', 'Germany': '+49', 'Japan': '+81' };
    const ccInput = document.getElementById('home-comp-country-code');
    if (ccInput) ccInput.value = codes[countryName] || '+91';
  },

  onStateChange(stateName) {
    if (window.CMS_MASTERS) {
      const stateObj = window.CMS_MASTERS.indianStates.find(s => s.name === stateName);
      if (stateObj) {
        const codeInput = document.getElementById('home-comp-state-code');
        if (codeInput) {
          codeInput.value = stateObj.code;
        }
      }
    }
  },

  onCountryChange(countryName) {
    const codes = { 'India': '+91', 'United States': '+1', 'United Kingdom': '+44', 'United Arab Emirates': '+971', 'Singapore': '+65', 'Australia': '+61', 'Canada': '+1', 'Germany': '+49', 'Japan': '+81' };
    const ccInput = document.getElementById('home-comp-country-code');
    if (ccInput) ccInput.value = codes[countryName] || '+91';
  },

  onStateChange(stateName) {
    if (window.CMS_MASTERS) {
      const stateObj = window.CMS_MASTERS.indianStates.find(s => s.name === stateName);
      if (stateObj) {
        const codeInput = document.getElementById('home-comp-state-code');
        if (codeInput) {
          codeInput.value = stateObj.code;
        }
      }
    }
  },

  render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const currentUser = window.CMS_STORE.getCurrentUser() || {};
    const users = window.CMS_STORE.getUsers() || [];
    const roles = this.getCustomRoles();
    
    if (!this.companyInfo.name) {
      this.companyInfo = {
        name: 'Adminutes Enterprises',
        address: '123 Enterprise Way, Business District',
        gstin: '29ABCDE1234F1Z5',
        contact: 'contact@adminutes.corp'
      };
    }

    let html = `
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Admin Headquarters</h2>
        <p class="text-slate-500 mt-1">Manage your profile, company settings, custom roles, and user module access.</p>
      </div>

      <div class="flex flex-col gap-6">
        <!-- Profile Section -->
        <div class="stat-card p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <i data-lucide="user" class="w-5 h-5 text-blue-600"></i>
            <h3 class="font-bold text-slate-800 text-base">My Admin Profile</h3>
          </div>
          <form onsubmit="event.preventDefault(); CMS_HOME.saveProfile();" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Employee ID</label>
                <input type="text" id="home-prof-id" value="${currentUser.id || ''}" class="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-md font-mono" readonly disabled />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Gmail / Email</label>
                <input type="email" id="home-prof-email" value="${currentUser.email || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="example@gmail.com" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input type="text" id="home-prof-name" value="${currentUser.name || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Username</label>
                <input type="text" id="home-prof-username" value="${currentUser.username || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required />
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">New Password (leave blank to keep current)</label>
              <input type="password" id="home-prof-password" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="Enter new password" />
            </div>
            <div class="pt-2">
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-sm transition shadow">Update Profile</button>
            </div>
          </form>
        </div>

        <!-- Company Section -->
        <div class="stat-card p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <i data-lucide="building-2" class="w-5 h-5 text-indigo-600"></i>
            <h3 class="font-bold text-slate-800 text-base">Company Information</h3>
          </div>
          <form onsubmit="event.preventDefault(); CMS_HOME.saveCompany();" class="space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Company Name <span class="text-rose-600">*</span></label>
              <input type="text" id="home-comp-name" value="${this.companyInfo.name || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required placeholder="e.g. Adminutes Enterprises" />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Street / Building Address <span class="text-rose-600">*</span></label>
              <input type="text" id="home-comp-address" value="${this.companyInfo.address || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required placeholder="Plot / Flat / Street / Area" />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Taluka / Tehsil</label>
                <input type="text" id="home-comp-taluka" value="${this.companyInfo.taluka || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="Taluka name" />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">District <span class="text-rose-600">*</span></label>
                <input type="text" id="home-comp-district" value="${this.companyInfo.district || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required placeholder="District name" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">State <span class="text-rose-600">*</span></label>
                <select id="home-comp-state" class="w-full border border-slate-200 px-3 py-2 rounded-md bg-white" required onchange="window.CMS_HOME.onStateChange(this.value)">
                  <option value="">-- Choose State --</option>
                  ${(window.CMS_MASTERS ? window.CMS_MASTERS.indianStates : []).map(s => `<option value="${s.name}" ${this.companyInfo.state === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">State Code</label>
                <input type="text" id="home-comp-state-code" value="${this.companyInfo.stateCode || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md font-mono" placeholder="e.g. 27" maxlength="2" />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">PIN Code <span class="text-rose-600">*</span></label>
                <input type="text" id="home-comp-pin" value="${this.companyInfo.pin || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" required placeholder="PIN Code" maxlength="6" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Contact No</label>
                <input type="text" id="home-comp-contact" value="${this.companyInfo.contact || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="Contact number" />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Company Email</label>
                <input type="email" id="home-comp-email" value="${this.companyInfo.email || ''}" class="w-full border border-slate-200 px-3 py-2 rounded-md" placeholder="example@domain.com" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">GSTIN</label>
                <input type="text" id="home-comp-gstin" value="${this.companyInfo.gstin || ''}" class="w-full font-mono uppercase border border-slate-200 px-3 py-2 rounded-md" />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">PAN</label>
                <input type="text" id="home-comp-pan" value="${this.companyInfo.pan || ''}" class="w-full font-mono uppercase border border-slate-200 px-3 py-2 rounded-md" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Certificate / Reg. No.</label>
                <input type="text" id="home-comp-cert" value="${this.companyInfo.cert || ''}" class="w-full font-mono border border-slate-200 px-3 py-2 rounded-md" placeholder="Incorporation or Registration No." />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Operating License No.</label>
                <input type="text" id="home-comp-license" value="${this.companyInfo.license || ''}" class="w-full font-mono border border-slate-200 px-3 py-2 rounded-md" placeholder="Trade / Local License No." />
              </div>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded p-3 mt-4">
              <label class="block text-[11px] font-bold text-slate-500 uppercase mb-2">Company Documents & Certificates</label>
              <div class="flex gap-2 items-center mb-3 flex-wrap" id="company-docs-container">
                ${(this.companyDocs || []).map((doc, i) => `
                  <div class="group relative flex items-center gap-1.5 text-xs bg-white border border-slate-300 px-2 py-1.5 rounded shadow-sm text-slate-700 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition" onclick="CMS_APP.previewDocument('${i}')">
                    <i data-lucide="${doc.type.includes('pdf') ? 'file-text' : 'image'}" class="w-3.5 h-3.5 text-blue-500"></i> 
                    <span class="font-medium truncate max-w-[150px]">${doc.name}</span>
                    <button type="button" class="ml-1 text-slate-400 hover:text-red-600 transition" onclick="event.stopPropagation(); window.CMS_HOME.deleteDocument(${i});" title="Delete Document">
                      <i data-lucide="x" class="w-3 h-3"></i>
                    </button>
                  </div>
                `).join('')}
                ${(this.companyDocs || []).length === 0 ? '<span class="text-xs text-slate-400 italic">No documents uploaded yet.</span>' : ''}
              </div>
              <button type="button" class="text-xs bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-blue-800 font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition" onclick="document.getElementById('home-upload-doc').click()">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i> Upload Document
              </button>
              <input type="file" id="home-upload-doc" accept="image/*,application/pdf" class="hidden" onchange="window.CMS_HOME.uploadDocument(event)" />
            </div>
            <div class="pt-2">
              <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-sm transition shadow">Save Details</button>
            </div>
          </form>
        </div>
      </div>

      <!-- User & Module Management -->
      <div class="mt-6 stat-card p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <i data-lucide="users-2" class="w-5 h-5 text-emerald-600"></i>
            <h3 class="font-bold text-slate-800 text-base">User & Module Access Control</h3>
          </div>
          <button onclick="CMS_HOME.addCustomRole()" class="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold px-3 py-1.5 rounded-md transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> New Custom Role
          </button>
        </div>
        <div class="overflow-x-auto rounded-lg border border-slate-200">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="py-2 px-3 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th class="py-2 px-3 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th class="py-2 px-3 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Module Access</th>
                <th class="py-2 px-3 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr class='border-b border-slate-100 hover:bg-slate-50 transition-colors'>
                  <td class='py-3 px-3'>
                    <div class='font-bold text-slate-800 text-sm'>${u.name}</div>
                    <div class='text-[10px] text-slate-500 font-mono mt-0.5'>${u.id} | ${u.username}</div>
                    <div class='mt-1'>
                      <input type='text' id='pwd-${u.id}' value='${u.password || ""}' class='border border-slate-200 px-1 py-0.5 rounded text-[10px] w-full' placeholder='New/Current Password' title='Current Password' />
                    </div>
                  </td>
                  <td class='py-3 px-3'>
                    <select class="role-sel-${u.id} border border-slate-300 rounded px-2 py-1 text-xs font-bold ${u.role === 'Admin' ? 'text-purple-700 bg-purple-50' : 'text-blue-700 bg-blue-50'}" ${u.id === currentUser.id ? 'disabled' : ''}>
                      ${roles.map(r => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                  </td>
                  <td class='py-3 px-3'>
                    <div class='flex gap-2 flex-wrap'>
                      ${['Inventory', 'Transactions', 'Reports'].map(mod => `
                        <label class='inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm hover:bg-slate-50 cursor-pointer transition'>
                          <input type='checkbox' class='mod-chk-${u.id} accent-emerald-600' value='${mod}' ${(u.role === 'Admin' || (u.modules || ['Inventory', 'Transactions', 'Reports']).includes(mod)) ? 'checked' : ''} ${u.role === 'Admin' ? 'disabled' : ''} />
                          ${mod}
                        </label>
                      `).join('')}
                    </div>
                  </td>
                  <td class='py-3 px-3'>
                    ${u.id !== currentUser.id ? `<button onclick="CMS_HOME.saveUserSettings('${u.id}')" class='block w-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1.5 rounded-md font-bold transition shadow-sm mb-1'>Save Setup</button><button onclick="CMS_HOME.deleteUser('${u.id}')" class='block w-full text-[11px] bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:text-red-800 px-3 py-1 rounded-md font-bold transition shadow-sm'>Delete</button>` : `<span class='text-[10px] text-slate-400 italic font-medium'>Current Session (Full Access)</span>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  async saveProfile() {
    const name = document.getElementById('home-prof-name').value.trim();
    const username = document.getElementById('home-prof-username').value.trim().toLowerCase();
    const email = document.getElementById('home-prof-email').value.trim();
    const password = document.getElementById('home-prof-password').value;
    const currentUser = window.CMS_STORE.getCurrentUser();

    if (!name || !username) return window.CMS_APP.toast('Name and username are required', 'error');

    try {
      const response = await fetch('/api/users/' + currentUser.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password: password || undefined })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update profile.');
      
      window.CMS_APP.toast('Profile updated successfully!', 'success');
      currentUser.name = name;
      currentUser.username = username;
      currentUser.email = email;
      this.render();
      window.CMS_APP.updateUserProfile(); 
    } catch (e) {
      window.CMS_APP.toast(e.message, 'error');
    }
  },

  saveCompany() {
    this.companyInfo = {
      name: document.getElementById('home-comp-name').value,
      address: document.getElementById('home-comp-address').value,
      taluka: document.getElementById('home-comp-taluka').value,
      district: document.getElementById('home-comp-district').value,
      state: document.getElementById('home-comp-state').value,
      stateCode: document.getElementById('home-comp-state-code').value.trim(),
      pin: document.getElementById('home-comp-pin').value,
      contact: document.getElementById('home-comp-contact').value,
      email: document.getElementById('home-comp-email').value,
      gstin: document.getElementById('home-comp-gstin').value,
      pan: document.getElementById('home-comp-pan').value,
      cert: document.getElementById('home-comp-cert').value,
      license: document.getElementById('home-comp-license').value
    };
    localStorage.setItem('CMS_COMPANY_INFO', JSON.stringify(this.companyInfo));
    window.CMS_APP.toast('Company profile saved successfully! This info will be used in transactions.', 'success');
  },

  async saveUserSettings(userId) {
    const checkboxes = document.querySelectorAll('.mod-chk-' + userId);
    const roleSel = document.querySelector('.role-sel-' + userId);
    const pwdInput = document.getElementById('pwd-' + userId);
    
    const modules = Array.from(checkboxes).filter(chk => chk.checked).map(chk => chk.value);
    const role = roleSel ? roleSel.value : 'User';
    const password = pwdInput && pwdInput.value.trim() !== '' ? pwdInput.value : undefined;
    
    try {
      const response = await fetch('/api/users/' + userId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modules, role, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update user.');
      
      window.CMS_APP.toast('User settings updated successfully!', 'success');
      window.CMS_AUTH.loadUsers().then(() => this.render());
    } catch (e) {
      window.CMS_APP.toast(e.message, 'error');
    }
  },

  async deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user completely?')) return;
    try {
      const response = await fetch('/api/users/' + userId, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete user.');
      
      window.CMS_APP.toast('User deleted successfully.', 'success');
      window.CMS_AUTH.loadUsers().then(() => this.render());
    } catch (e) {
      window.CMS_APP.toast(e.message, 'error');
    }
  }
};






