/**
 * Adminutes - Masters Module Engine
 * Handles Vendor Master, Consumable Category Master, Consumable (Material) Master
 * with Rate Effective From & Authorized Consumer Confirmation, and GST/IGST Slabs.
 * Includes Live Search, Category Filters, and Material 360° Inspection Drawers.
 */

window.CMS_MASTERS = {
  vendorSearchQuery: '',
  consumableSearchQuery: '',
  consumableCategoryFilter: '',
  consumableTypeFilter: '',

  // ==========================================
  // VENDOR MASTER
  // ==========================================
  renderVendors() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    let list = store.vendors || [];

    if (this.vendorSearchQuery) {
      const q = this.vendorSearchQuery.toLowerCase();
      list = list.filter(v =>
        (v.name || '').toLowerCase().includes(q) ||
        (v.gstNo || '').toLowerCase().includes(q) ||
        (v.panNo || '').toLowerCase().includes(q) ||
        (v.id || '').toLowerCase().includes(q) ||
        (v.email || '').toLowerCase().includes(q)
      );
    }

    return `
      <div class="space-y-6">
        <!-- Header & Action Bar -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="building-2" class="w-4 h-4"></i>
              </div>
              <span>Vendor</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Manage approved suppliers, GSTIN, PAN cards, compliance certificates, and validity dates.</p>
          </div>
          <button onclick="CMS_MASTERS.openVendorModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Register Vendor</span>
          </button>
        </div>

        <!-- Table Toolbar: Search & Filter -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" value="${this.vendorSearchQuery}" oninput="CMS_MASTERS.onVendorSearch(this.value)" placeholder="Search vendor name, GSTIN, PAN, code..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.vendors.length} vendors
          </div>
        </div>

        <!-- Vendor Table -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Vendor Details</th>
                  <th class="p-4">GST Number</th>
                  <th class="p-4">PAN Card</th>
                  <th class="p-4">Compliance Certificates</th>
                  <th class="p-4">Contact Info</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="7" class="p-12 text-center text-slate-400">
                      <i data-lucide="folder-search" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                      <div class="font-bold text-slate-600">No matching vendors found</div>
                      <p class="text-slate-400 text-xs mt-1">Try clearing your search query or add a new vendor.</p>
                    </td>
                  </tr>
                ` : list.map(v => {
                  return `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="p-4">
                        <div class="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewVendorProfile('${v.id}')">${v.name}</div>
                        <div class="text-[11px] text-slate-400 font-mono mt-0.5">${v.id}</div>
                        <div class="text-slate-500 line-clamp-1 mt-0.5 text-[11px]" title="${v.address}">${v.address}</div>
                      </td>
                      <td class="p-4 font-mono font-bold text-slate-800">
                        ${v.gstNo || '<span class="text-slate-400">Unregistered</span>'}
                      </td>
                      <td class="p-4 font-mono font-bold text-slate-800">
                        ${v.panNo || (v.gstNo && v.gstNo.length >= 12 ? v.gstNo.substring(2, 12).toUpperCase() : '<span class="text-slate-400 font-normal font-sans">Pending</span>')}
                      </td>
                      <td class="p-4">
                        <div class="flex flex-wrap gap-1.5 max-w-sm">
                          ${(!v.certificates || v.certificates.length === 0) ? '<span class="text-slate-400 italic">No certificates attached</span>' : (v.certificates || []).map(c => {
                            const cName = typeof c === 'string' ? c : (c.name || 'Certificate');
                            const hasVal = typeof c === 'object' ? c.hasValidity : false;
                            const valDate = typeof c === 'object' ? (c.validTill || '') : '';
                            const isExpiring = valDate && new Date(valDate) < new Date(Date.now() + 30 * 86400000);
                            return `
                              <div class="inline-flex items-center gap-1.5 text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-medium shadow-xs">
                                <span>${cName}</span>
                                ${hasVal && valDate ? `
                                  <span class="px-1 py-0.2 rounded font-mono font-bold text-[9px] ${isExpiring ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-blue-100 text-blue-700'}" title="Valid Till: ${valDate}">
                                    Exp: ${valDate}
                                  </span>
                                ` : ''}
                              </div>
                            `;
                          }).join('')}
                          ${v.certificateFile ? `
                            <span class="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded" title="${v.certificateFile}">
                              <i data-lucide="paperclip" class="w-3 h-3"></i> Attached
                            </span>
                          ` : ''}
                        </div>
                      </td>
                      <td class="p-4 text-xs space-y-0.5">
                        <div class="text-slate-800 font-medium">Tel: ${v.contactNo || '-'}</div>
                        <div class="text-slate-500">Email: ${v.email || '-'}</div>
                      </td>
                      <td class="p-4">
                        <span class="badge ${v.status === 'Approved' ? 'badge-approved' : v.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                          ${v.status}
                        </span>
                      </td>
                      <td class="p-4 text-right space-x-1">
                        <button onclick="CMS_MASTERS.viewVendorProfile('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="View Profile">
                          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="CMS_MASTERS.openVendorModal('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Modify Vendor">
                          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                        </button>
                        ${v.status === 'Pending Approval' && role === 'Checker' ? `
                          <button onclick="CMS_MASTERS.approveVendor('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition" title="Approve Vendor">
                            Approve
                          </button>
                          <button onclick="CMS_MASTERS.rejectVendor('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition" title="Reject Vendor">
                            Reject
                          </button>
                        ` : ''}
                        ${role === 'Checker' ? `<button onclick="CMS_MASTERS.deleteVendor('${v.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Vendor"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>` : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onVendorSearch(val) {
    this.vendorSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderVendors();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  viewVendorProfile(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;

    const content = `
      <div class="space-y-5 text-xs">
        <div class="p-4 bg-slate-50 rounded-md border border-slate-200 flex items-start justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900">${v.name}</h3>
            <span class="font-mono text-slate-500 font-medium">${v.id}</span>
          </div>
          <span class="badge ${v.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${v.status}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-white border border-slate-200 rounded-md space-y-1">
            <span class="text-slate-400 font-bold uppercase text-[10px]">GSTIN Number</span>
            <div class="font-mono font-bold text-sm text-slate-800">${v.gstNo || 'Not Registered'}</div>
          </div>
          <div class="p-3 bg-white border border-slate-200 rounded-md space-y-1">
            <span class="text-slate-400 font-bold uppercase text-[10px]">PAN Card Number</span>
            <div class="font-mono font-bold text-sm text-blue-700">${v.panNo || (v.gstNo && v.gstNo.length >= 12 ? v.gstNo.substring(2, 12).toUpperCase() : 'Not Recorded')}</div>
          </div>
          <div class="p-3 bg-white border border-slate-200 rounded-md space-y-1">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Contact Phone</span>
            <div class="font-bold text-slate-800">${v.contactNo || '-'}</div>
          </div>
          <div class="p-3 bg-white border border-slate-200 rounded-md space-y-1">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Email Address</span>
            <div class="font-bold text-slate-800 truncate">${v.email || '-'}</div>
          </div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-md space-y-1">
          <span class="text-slate-400 font-bold uppercase text-[10px]">Registered Business Address</span>
          <p class="text-slate-700 font-medium">${[v.address, v.addressTaluka, v.addressDistrict, v.addressState, v.addressCountry, v.addressPinCode].filter(Boolean).join(', ')}</p>
        </div>

        <div class="p-4 bg-blue-50/60 border border-blue-200 rounded-md space-y-2">
          <span class="text-blue-900 font-bold uppercase text-[10px] tracking-wider">Applicable Compliance Certifications</span>
          <div class="flex flex-wrap gap-2">
            ${(!v.certificates || v.certificates.length === 0) ? '<span class="text-slate-400 italic">No certificates recorded</span>' : (v.certificates || []).map(c => {
              const cName = typeof c === 'string' ? c : (c.name || 'Certificate');
              const hasVal = typeof c === 'object' ? c.hasValidity : false;
              const valDate = typeof c === 'object' ? c.validTill : '';
              return `
                <div class="p-2.5 bg-white border border-blue-200 text-blue-900 rounded-md text-xs shadow-xs">
                  <div class="font-bold flex items-center gap-1.5">
                    <i data-lucide="award" class="w-3.5 h-3.5 text-blue-600"></i>
                    <span>${cName}</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">
                    ${hasVal && valDate ? `<span class="text-blue-700 font-mono font-semibold">Expires: ${valDate}</span>` : '<span class="text-slate-400">Lifetime / No Expiry Date</span>'}
                    ${typeof c === 'object' && c.formNo ? `<span class="block">Form: ${c.formNo}</span>` : ''}
                    ${typeof c === 'object' && c.certificateNo ? `<span class="block">No: ${c.certificateNo}</span>` : ''}
                    ${typeof c === 'object' && c.fileName ? `<span class="block text-emerald-700">File: ${c.fileName}</span>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${v.certificateFile || v.gstCertificateFile || v.panCardFile ? `
            <div class="pt-2 text-slate-600 flex items-center gap-1.5 font-medium">
              <i data-lucide="file-check" class="w-4 h-4 text-emerald-600"></i>
              <span>Files on record: <strong>${[v.certificateFile, v.gstCertificateFile, v.panCardFile].filter(Boolean).join(', ')}</strong></span>
            </div>
          ` : ''}
        </div>

        <div class="pt-3 border-t border-slate-200 flex justify-end">
          <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">
            Close
          </button>
        </div>
      </div>
    `;

    window.CMS_APP.openModal('Vendor Profile Overview', content, 'max-w-xl');
  },

  onGstInput(val) {
    const panInput = document.getElementById('v-pan');
    if (!panInput || panInput.disabled) return;
    if (panInput.dataset.autoFilled === 'true' || !panInput.value) {
      panInput.value = val && val.length === 15 ? val.substring(2, 12).toUpperCase() : '';
      panInput.dataset.autoFilled = val && val.length === 15 ? 'true' : 'false';
    }
  },

  addCertificateRow(certData = null) {
    const container = document.getElementById('v-cert-container');
    if (!container) return;
    const rowId = 'cert_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const name = certData ? (typeof certData === 'string' ? certData : (certData.name || '')) : '';
    const hasValidity = certData ? (typeof certData === 'object' ? Boolean(certData.hasValidity) : false) : false;
    const validTill = certData && typeof certData === 'object' ? (certData.validTill || '') : '';
    const formNo = certData && typeof certData === 'object' ? (certData.formNo || '') : '';
    const certificateNo = certData && typeof certData === 'object' ? (certData.certificateNo || '') : '';
    const fileName = certData && typeof certData === 'object' ? (certData.fileName || '') : '';

    const row = document.createElement('div');
    row.className = 'cert-row p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2.5 transition';
    row.id = rowId;
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <label class="block text-[11px] font-bold text-slate-700 mb-1">Regulator / Certification Agency *</label>
          <input type="text" list="cert-suggestions" class="cert-name-input w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter certificate name (e.g. MSME, Pollution Clearance, Factory License)" value="${name.replace(/"/g, '&quot;')}" required />
        </div>
        <button type="button" onclick="CMS_MASTERS.removeCertificateRow('${rowId}')" class="mt-5 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Remove Certificate">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-4 pt-1 text-xs">
        <div class="flex items-center gap-2.5">
          <span class="font-bold text-slate-700 text-[11px]">Validity of Time / Expiry Date?</span>
          <div class="inline-flex items-center gap-3 bg-white px-2.5 py-1 rounded border border-slate-200">
            <label class="inline-flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input type="radio" name="valid_opt_${rowId}" value="yes" ${hasValidity ? 'checked' : ''} onchange="CMS_MASTERS.onCertValidityChange('${rowId}', true)" class="text-blue-600 focus:ring-blue-500" />
              <span>Yes</span>
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input type="radio" name="valid_opt_${rowId}" value="no" ${!hasValidity ? 'checked' : ''} onchange="CMS_MASTERS.onCertValidityChange('${rowId}', false)" class="text-blue-600 focus:ring-blue-500" />
              <span>No</span>
            </label>
          </div>
        </div>

        <!-- Expiry Date Box (shown only if Yes) -->
        <div id="expiry_box_${rowId}" class="cert-expiry-box flex-1 min-w-[200px] ${hasValidity ? '' : 'hidden'}">
          <div class="flex items-center gap-2 bg-blue-50/70 border border-blue-200 p-1.5 rounded-md">
            <label class="text-[11px] font-bold text-blue-900 shrink-0">Valid Till / Expires On:</label>
            <input type="date" min="${new Date().toISOString().split('T')[0]}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="${validTill}" />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <label class="text-[11px] font-bold text-slate-700">Form / Standard No.</label>
        <input type="text" class="cert-form-input w-28 px-2 py-1 border border-slate-300 rounded bg-white text-xs" value="${formNo}" placeholder="9001:2015" />
        <label class="text-[11px] font-bold text-slate-700">License / Certificate No.</label>
        <input type="text" class="cert-number-input w-32 px-2 py-1 border border-slate-300 rounded bg-white text-xs" value="${certificateNo}" required />
        <input type="file" accept=".pdf,image/*" class="cert-file-input max-w-[180px] text-[10px]" data-current="${fileName}" />
        ${fileName ? `<span class="text-[10px] text-slate-500 font-mono truncate" title="${fileName}">${fileName}</span>` : ''}
      </div>
    `;
    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
  },

  onCertValidityChange(rowId, isYes) {
    const box = document.getElementById('expiry_box_' + rowId);
    if (!box) return;
    if (isYes) {
      box.classList.remove('hidden');
      const input = box.querySelector('.cert-expiry-input');
      if (input) input.focus();
    } else {
      box.classList.add('hidden');
      const input = box.querySelector('.cert-expiry-input');
      if (input) input.value = '';
    }
  },

  removeCertificateRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
  },

  openVendorModal(vendorId = null) {
    const isEdit = Boolean(vendorId);
    const regulatorOptions = [
      'AGMARK', 'APEDA / MPEDA', 'BIS', 'CCI', 'CCPA', 'CDSCO', 'CERC / SERC', 'DGCA', 'DGFT', 'FDA', 'ISO',
      'FSSAI', 'IBBI', 'IFSCA', 'IRDAI', 'MCA', 'NABL', 'NABH', 'PESO', 'PFRDA', 'PNGRB', 'RBI', 'SEBI',
      'State FDA', 'TRAI'
    ].sort((a, b) => a.localeCompare(b));
    const vendor = isEdit ? window.CMS_STORE.data.vendors.find(v => v.id === vendorId) : {
      name: '', address: '', addressTaluka: '', addressDistrict: '', addressState: '', addressCountry: 'India', addressPinCode: '', gstNo: '', panNo: '', gstNotApplicable: false, panNotApplicable: false, certificates: [], contactNo: '', email: '', certificateFile: '', gstCertificateFile: '', panCardFile: '', approvedForLimitedPeriod: false, approvalValidTill: ''
    };

    const initialPan = vendor.panNo || (vendor.gstNo && vendor.gstNo.length >= 12 ? vendor.gstNo.substring(2, 12).toUpperCase() : '');

    const content = `
      <form id="vendor-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveVendor('${vendorId || ''}');">
        
        <div class="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-900 font-medium flex items-center gap-2">
          <i data-lucide="info" class="w-4 h-4 shrink-0"></i>
          <span>Enter supplier credentials, GSTIN, PAN card, compliance certificates, and optional expiry dates for approval.</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block font-bold text-slate-700 mb-1">Vendor / Supplier Name *</label>
            <input type="text" id="v-name" required value="${vendor.name || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs" placeholder="e.g. Apex Office Supplies Pvt Ltd" />
          </div>
          <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label class="block font-bold text-slate-700 mb-1">Address *</label><input id="v-address" required value="${vendor.address || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" /></div>
            <div><label class="block font-bold text-slate-700 mb-1">Taluka</label><input id="v-taluka" value="${vendor.addressTaluka || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" /></div>
            <div><label class="block font-bold text-slate-700 mb-1">District *</label><input id="v-district" required value="${vendor.addressDistrict || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" /></div>
            <div><label class="block font-bold text-slate-700 mb-1">State *</label><select id="v-state" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs"><option value="">Select state</option>${['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'].map(s => `<option value="${s}" ${vendor.addressState === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
            <div><label class="block font-bold text-slate-700 mb-1">Country *</label><input id="v-country" required value="${vendor.addressCountry || 'India'}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" /></div>
            <div><label class="block font-bold text-slate-700 mb-1">PIN Code *</label><input id="v-pin" required pattern="[0-9]{6}" maxlength="6" value="${vendor.addressPinCode || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" /></div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">GST Number (GSTIN)</label>
            <div class="flex gap-2"><input type="text" id="v-gst" ${vendor.gstNotApplicable ? 'disabled' : ''} maxlength="15" value="${vendor.gstNo || ''}" oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstInput(this.value);" class="w-full font-mono uppercase px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" placeholder="15 characters" /><button type="button" onclick="CMS_MASTERS.lookupGstData()" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[10px] font-bold" title="Look up registered GST details">Lookup</button></div>
            <label class="mt-1 inline-flex items-center gap-1.5 text-[11px]"><input type="checkbox" id="v-gst-na" ${vendor.gstNotApplicable ? 'checked' : ''} onchange="document.getElementById('v-gst').disabled = this.checked; if (this.checked) document.getElementById('v-gst').value = '';" /> GST registration not applicable</label>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">PAN Card Number</label>
            <input type="text" id="v-pan" ${vendor.panNotApplicable ? 'disabled' : ''} maxlength="10" value="${initialPan}" oninput="this.value = this.value.toUpperCase(); this.dataset.autoFilled = 'false';" class="w-full font-mono uppercase px-3.5 py-2.5 border border-slate-300 rounded-md text-xs" placeholder="10 characters" />
            <label class="mt-1 inline-flex items-center gap-1.5 text-[11px]"><input type="checkbox" id="v-pan-na" ${vendor.panNotApplicable ? 'checked' : ''} onchange="document.getElementById('v-pan').disabled = this.checked; if (this.checked) document.getElementById('v-pan').value = '';" /> PAN not applicable</label>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Contact Number *</label>
            <input type="tel" id="v-contact" required value="${vendor.contactNo || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs" placeholder="+91 98110 45678" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Email ID *</label>
            <input type="email" id="v-email" required value="${vendor.email || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs" placeholder="vendor@example.com" />
          </div>

          <!-- Dynamic Certificates Builder -->
          <div class="md:col-span-2 pt-2 border-t border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <label class="block font-bold text-slate-800 text-xs">Compliance & Regulatory Certificates</label>
                <p class="text-[11px] text-slate-500">Add custom certificates with optional expiry validity dates.</p>
              </div>
              <button type="button" onclick="CMS_MASTERS.addCertificateRow()" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md font-bold text-xs transition">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Add Certificate</span>
              </button>
            </div>

            <datalist id="cert-suggestions">
              ${regulatorOptions.map(option => `<option value="${option}"></option>`).join('')}
            </datalist>

            <div id="v-cert-container" class="space-y-2.5">
              <!-- Rows inserted dynamically -->
            </div>
          </div>

          <div class="md:col-span-2 pt-1 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label class="block font-bold text-slate-700 mb-1">GST Certificate (PDF/Image)</label><input type="file" id="v-gst-file" accept=".pdf,image/*" class="text-xs" />${vendor.gstCertificateFile ? `<span class="block text-[10px] text-slate-500 font-mono">Current: ${vendor.gstCertificateFile}</span>` : ''}</div>
            <div><label class="block font-bold text-slate-700 mb-1">PAN Card (PDF/Image)</label><input type="file" id="v-pan-file" accept=".pdf,image/*" class="text-xs" />${vendor.panCardFile ? `<span class="block text-[10px] text-slate-500 font-mono">Current: ${vendor.panCardFile}</span>` : ''}</div>
          </div>
          <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-200 pt-3">
            <label class="inline-flex items-center gap-2 font-bold"><input type="checkbox" id="v-limited" ${vendor.approvedForLimitedPeriod ? 'checked' : ''} /> Approved for limited period</label>
            <input type="date" id="v-approval-valid-till" min="${new Date().toISOString().split('T')[0]}" value="${vendor.approvalValidTill || ''}" class="px-3 py-2 border border-slate-300 rounded-md text-xs" />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">
            Cancel
          </button>
          <button type="button" onclick="CMS_MASTERS.saveAndSubmitVendor('${vendorId || ''}')" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Submit for Approval</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Vendor Record' : 'Register New Vendor', content, 'max-w-2xl');

    // Populate dynamic certificates
    const certList = vendor.certificates || [];
    if (certList.length > 0) {
      certList.forEach(c => this.addCertificateRow(c));
    } else {
      this.addCertificateRow();
    }
  },

  async lookupGstData() {
    const input = document.getElementById('v-gst');
    const gstNo = input?.value.trim().toUpperCase() || '';
    if (!/^[0-9A-Z]{15}$/.test(gstNo)) {
      window.CMS_APP.toast('Enter a complete 15-character GSTIN before lookup.', 'error');
      return;
    }
    const localVendor = window.CMS_STORE.data.vendors.find(v => v.gstNo === gstNo);
    if (localVendor) {
      const fields = { 'v-name': localVendor.name, 'v-address': localVendor.address, 'v-district': localVendor.addressDistrict, 'v-country': localVendor.addressCountry, 'v-pin': localVendor.addressPinCode, 'v-pan': localVendor.panNo };
      Object.entries(fields).forEach(([id, value]) => { const field = document.getElementById(id); if (field && value) field.value = value; });
      window.CMS_APP.toast('GST details loaded from the local vendor register.', 'success');
      return;
    }
    window.CMS_APP.toast('No GST database service is configured. Connect an authorized GST API to enable external lookup.', 'info');
  },

  saveVendor(vendorId, directSubmit = false) {
    const name = document.getElementById('v-name').value.trim();
    const address = document.getElementById('v-address').value.trim();
    const addressTaluka = document.getElementById('v-taluka').value.trim();
    const addressDistrict = document.getElementById('v-district').value.trim();
    const addressState = document.getElementById('v-state').value;
    const addressCountry = document.getElementById('v-country').value.trim();
    const addressPinCode = document.getElementById('v-pin').value.trim();
    const gstNo = document.getElementById('v-gst').value.trim().toUpperCase();
    const panNo = document.getElementById('v-pan').value.trim().toUpperCase();
    const gstNotApplicable = document.getElementById('v-gst-na').checked;
    const panNotApplicable = document.getElementById('v-pan-na').checked;
    const contactNo = document.getElementById('v-contact').value.trim();
    const email = document.getElementById('v-email').value.trim();

    // Extract dynamic certificates
    const certRows = document.querySelectorAll('.cert-row');
    const certificates = [];
    certRows.forEach(row => {
      const nameInput = row.querySelector('.cert-name-input');
      const certName = nameInput ? nameInput.value.trim() : '';
      if (!certName) return;
      const isYes = row.querySelector('input[type="radio"][value="yes"]')?.checked;
      const validTill = isYes ? (row.querySelector('.cert-expiry-input')?.value || '') : '';
      certificates.push({
        name: certName,
        formNo: row.querySelector('.cert-form-input')?.value.trim() || '',
        certificateNo: row.querySelector('.cert-number-input')?.value.trim() || '',
        fileName: row.querySelector('.cert-file-input')?.files?.[0]?.name || row.querySelector('.cert-file-input')?.dataset.current || '',
        hasValidity: Boolean(isYes),
        validTill: isYes ? validTill : ''
      });
    });

    const store = window.CMS_STORE;
    const status = directSubmit ? 'Pending Approval' : 'Draft';
    const gstFile = document.getElementById('v-gst-file');
    const panFile = document.getElementById('v-pan-file');
    const gstCertificateFile = gstFile?.files?.[0]?.name || '';
    const panCardFile = panFile?.files?.[0]?.name || '';
    const existingVendor = vendorId ? store.data.vendors.find(v => v.id === vendorId) : null;
    const today = new Date().toISOString().split('T')[0];
    const approvedForLimitedPeriod = document.getElementById('v-limited').checked;
    const approvalValidTill = document.getElementById('v-approval-valid-till').value;
    if ((!gstNotApplicable && !/^[0-9A-Z]{15}$/.test(gstNo)) || (!panNotApplicable && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo))) {
      window.CMS_APP.toast('Enter a valid 15-character GSTIN and 10-character PAN, or mark them not applicable.', 'error');
      return;
    }
    if (!gstNotApplicable && !gstCertificateFile && !existingVendor?.gstCertificateFile) { window.CMS_APP.toast('Upload the GST certificate.', 'error'); return; }
    if (!panNotApplicable && !panCardFile && !existingVendor?.panCardFile) { window.CMS_APP.toast('Upload the PAN card.', 'error'); return; }
    if (approvedForLimitedPeriod && (!approvalValidTill || approvalValidTill < today)) { window.CMS_APP.toast('Limited-period approval date cannot be in the past.', 'error'); return; }
    if (certificates.some(c => !c.certificateNo || (!c.fileName && !vendorId))) { window.CMS_APP.toast('Each certificate needs a number and its own PDF/image copy.', 'error'); return; }
    if (certificates.some(c => c.hasValidity && (!c.validTill || c.validTill < today))) { window.CMS_APP.toast('Expired or missing certificate validity dates are not allowed.', 'error'); return; }
    if (!gstNotApplicable && store.data.vendors.some(v => v.gstNo === gstNo && v.id !== vendorId)) { window.CMS_APP.toast('A vendor with this GSTIN already exists.', 'error'); return; }

    if (vendorId) {
      const idx = store.data.vendors.findIndex(v => v.id === vendorId);
      if (idx !== -1) {
        store.data.vendors[idx] = {
          ...store.data.vendors[idx],
          name, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode, gstNo, panNo, gstNotApplicable, panNotApplicable, contactNo, email, certificates,
          gstCertificateFile: gstCertificateFile || store.data.vendors[idx].gstCertificateFile,
          panCardFile: panCardFile || store.data.vendors[idx].panCardFile,
          approvedForLimitedPeriod, approvalValidTill,
          status: directSubmit ? 'Pending Approval' : store.data.vendors[idx].status,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      const nextNumber = store.data.vendors.reduce((max, v) => Math.max(max, Number(String(v.id || '').replace('VEN-', '')) || 0), 0) + 1;
      const newId = 'VEN-' + String(nextNumber).padStart(3, '0');
      store.data.vendors.push({
        id: newId,
        name, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode, gstNo, panNo, gstNotApplicable, panNotApplicable, contactNo, email, certificates,
        gstCertificateFile, panCardFile, approvedForLimitedPeriod, approvalValidTill,
        status,
        createdBy: store.getCurrentUser().id,
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Vendor submitted for approval!' : 'Vendor saved successfully!');
    window.CMS_APP.refreshView();
  },

  saveAndSubmitVendor(vendorId) {
    this.saveVendor(vendorId, true);
  },

  approveVendor(vendorId) {
    const store = window.CMS_STORE;
    const v = store.data.vendors.find(i => i.id === vendorId);
    if (!v) return;
    const check = store.canApprove(v);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    v.status = 'Approved';
    v.approvedAt = new Date().toISOString();
    v.approvedBy = currentUser.id;
    v.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Vendor "${v.name}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  rejectVendor(vendorId) {
    const store = window.CMS_STORE;
    const vendor = store.data.vendors.find(item => item.id === vendorId);
    if (!vendor) return;
    const check = store.canApprove(vendor);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    vendor.status = 'Rejected';
    vendor.rejectedAt = new Date().toISOString();
    vendor.rejectedBy = store.getCurrentUser().id;
    store.save();
    window.CMS_APP.toast(`Vendor "${vendor.name}" rejected for modification.`, 'info');
    window.CMS_APP.refreshView();
  },

  deleteVendor(vendorId) {
        if (!window.CMS_STORE.isApprover()) {
          window.CMS_APP.toast('Only the Store Checker can delete vendors.', 'error');
          return;
        }
    if (confirm('Are you sure you want to delete this vendor record?')) {
      const store = window.CMS_STORE;
      store.data.vendors = store.data.vendors.filter(v => v.id !== vendorId);
      store.save();
      window.CMS_APP.toast('Vendor deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // CONSUMABLE CATEGORY MASTER
  // ==========================================
  renderCategories() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.categories || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="tag" class="w-4 h-4"></i>
              </div>
              <span>Consumable Category</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Define classification types: Stationery, Housekeeping, Packing Material, PPE, Electrical, etc.</p>
          </div>
          <button onclick="CMS_MASTERS.openCategoryModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Add Category</span>
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Category Code</th>
                <th class="p-4">Category Type / Name</th>
                <th class="p-4">Scope & Description</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="5" class="p-12 text-center text-slate-400">No categories found. Click "Add Category" to create one.</td></tr>
              ` : list.map(c => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono text-xs font-semibold text-slate-500">${c.id}</td>
                  <td class="p-4 font-bold text-slate-900 text-sm">${c.name}</td>
                  <td class="p-4 text-slate-600 max-w-md">${c.description || '-'}</td>
                  <td class="p-4">
                    <span class="badge ${c.status === 'Approved' ? 'badge-approved' : c.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                      ${c.status}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    <button onclick="CMS_MASTERS.openCategoryModal('${c.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                    </button>
                    ${c.status === 'Pending Approval' && role === 'Checker' ? `
                      <button onclick="CMS_MASTERS.approveCategory('${c.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition">
                        Approve
                      </button>
                    ` : ''}
                    <button onclick="CMS_MASTERS.deleteCategory('${c.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openCategoryModal(catId = null) {
    const isEdit = Boolean(catId);
    const cat = isEdit ? window.CMS_STORE.data.categories.find(c => c.id === catId) : { name: '', description: '' };

    const content = `
      <form id="cat-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveCategory('${catId || ''}', true);">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Category Type / Name *</label>
          <input type="text" id="cat-name" required value="${cat.name || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Stationery, Housekeeping, Packing Material" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Description / Notes</label>
          <textarea id="cat-desc" rows="3" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Scope of items falling under this category">${cat.description || ''}</textarea>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition">Submit for Approval</button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Category' : 'Add Consumable Category', content);
  },

  saveCategory(catId, directSubmit = false) {
    const name = document.getElementById('cat-name').value.trim();
    const description = document.getElementById('cat-desc').value.trim();
    const store = window.CMS_STORE;

    if (catId) {
      const idx = store.data.categories.findIndex(c => c.id === catId);
      if (idx !== -1) {
        store.data.categories[idx] = {
          ...store.data.categories[idx],
          name, description,
          status: directSubmit ? 'Pending Approval' : store.data.categories[idx].status
        };
      }
    } else {
      const newId = 'CAT-' + String(store.data.categories.length + 1).padStart(3, '0');
      store.data.categories.push({
        id: newId,
        name, description,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Category submitted for approval!' : 'Category saved!');
    window.CMS_APP.refreshView();
  },

  approveCategory(catId) {
    const store = window.CMS_STORE;
    const c = store.data.categories.find(i => i.id === catId);
    if (!c) return;
    const check = store.canApprove(c);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    c.status = 'Approved';
    c.approvedAt = new Date().toISOString();
    c.approvedBy = currentUser.id;
    c.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Category "${c.name}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteCategory(catId) {
    if (confirm('Delete this category?')) {
      const store = window.CMS_STORE;
      store.data.categories = store.data.categories.filter(c => c.id !== catId);
      store.save();
      window.CMS_APP.toast('Category deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // CONSUMABLE (MATERIAL) MASTER
  // ==========================================
  renderConsumables() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const categories = store.categories || [];
    let list = store.consumables || [];

    // Filter by search query
    if (this.consumableSearchQuery) {
      const q = this.consumableSearchQuery.toLowerCase();
      list = list.filter(m =>
        (m.materialName || '').toLowerCase().includes(q) ||
        (m.brand || '').toLowerCase().includes(q) ||
        (m.hsnCode || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q) ||
        (m.supplierProductCode || '').toLowerCase().includes(q) ||
        (m.assetTag || '').toLowerCase().includes(q) ||
        (m.quotationNo || '').toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (this.consumableCategoryFilter) {
      list = list.filter(m => m.categoryId === this.consumableCategoryFilter);
    }

    // Filter by Inventory Type (Consumer vs Fixed)
    if (this.consumableTypeFilter) {
      list = list.filter(m => (m.inventoryType || 'Consumer') === this.consumableTypeFilter);
    }

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="package" class="w-4 h-4"></i>
              </div>
              <span>Material Catalog (Consumer Materials & Fixed Assets)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Unified material catalog supporting vendor quotations, booked MRP, statutory units, warranty periods, and preventive maintenance tracking.</p>
          </div>
          <button onclick="CMS_MASTERS.openConsumableModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Add Catalog Item</span>
          </button>
        </div>

        <!-- Table Toolbar: Live Search, Category & Type Filter -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" value="${this.consumableSearchQuery}" oninput="CMS_MASTERS.onConsumableSearch(this.value)" placeholder="Search item, quote #, SKU, tag..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
            </div>
            <select onchange="CMS_MASTERS.onConsumableTypeFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Inventory Types --</option>
              <option value="Consumer" ${this.consumableTypeFilter === 'Consumer' ? 'selected' : ''}>Consumer Materials</option>
              <option value="Fixed" ${this.consumableTypeFilter === 'Fixed' ? 'selected' : ''}>Fixed Capital Assets</option>
            </select>
            <select onchange="CMS_MASTERS.onConsumableCategoryFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Categories (${store.consumables.length}) --</option>
              ${categories.map(c => `<option value="${c.id}" ${this.consumableCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.consumables.length} items
          </div>
        </div>

        <!-- Material Items Table -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Item & Code</th>
                  <th class="p-4">Type</th>
                  <th class="p-4">Vendor Quotation & MRP</th>
                  <th class="p-4">Category & Unit</th>
                  <th class="p-4">Approved Vendor Rate</th>
                  <th class="p-4">Warranty & PM Coverage</th>
                  <th class="p-4 text-right">Stock / Buffer</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="9" class="p-12 text-center text-slate-400">
                      <i data-lucide="package-open" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                      <div class="font-bold text-slate-600">No matching catalog items found</div>
                      <p class="text-slate-400 text-xs mt-1">Try adjusting your filters or register a new material.</p>
                    </td>
                  </tr>
                ` : list.map(m => {
                  const liveStock = window.CMS_STORE.getStock(m.id);
                  const isFixed = m.inventoryType === 'Fixed';
                  return `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="p-4">
                        <div class="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewMaterial360('${m.id}')">${m.materialName}</div>
                        <div class="text-[11px] text-slate-500 font-mono mt-0.5">Code: ${m.id} | Brand: <span class="font-bold text-slate-700">${m.brand || '-'}</span></div>
                        ${isFixed && m.assetTag ? `<div class="text-[10px] text-blue-700 font-mono mt-0.5 font-bold">Tag: ${m.assetTag} | S/N: ${m.serialNo || '-'}</div>` : ''}
                      </td>
                      <td class="p-4">
                        <span class="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded border ${isFixed ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}">
                          ${isFixed ? 'Fixed' : 'Consumer'}
                        </span>
                      </td>
                      <td class="p-4">
                        <div class="text-slate-900 font-medium">Quote: <span class="font-mono font-bold text-blue-700">₹${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</span></div>
                        <div class="text-[10px] text-slate-500 font-mono">Ref: ${m.quotationNo || 'Direct'} (${m.quotationDate || '-'})</div>
                        <div class="text-[11px] text-slate-800 font-semibold mt-0.5">MRP: <span class="font-mono text-slate-900">₹${Number(m.mrpBooked || 0).toFixed(2)}</span></div>
                      </td>
                      <td class="p-4">
                        <span class="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-md">${m.categoryName || 'General'}</span>
                        <div class="text-slate-500 mt-1">Unit: <span class="font-bold text-slate-800 font-mono">${m.unit}</span></div>
                      </td>
                      <td class="p-4">
                        <div class="font-mono text-xs"><strong class="text-slate-900">₹${Number(m.vendor1Rate || 0).toFixed(2)}</strong></div>
                        <div class="text-[10px] text-slate-500 line-clamp-1">${m.vendor1Name || 'Approved Vendor'}</div>
                      </td>
                      <td class="p-4">
                        <div class="space-y-1">
                          ${m.hasWarranty ? `
                            <span class="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-semibold" title="Valid till: ${m.warrantyValidTill || 'N/A'}">
                               ${m.warrantyPeriod || 'Warranted'}
                            </span>
                          ` : `
                            <span class="text-[10px] text-slate-400">No warranty</span>
                          `}
                          <br />
                          ${m.hasPm ? `
                            <span class="inline-flex items-center gap-1 text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-semibold" title="Tech: ${m.repairmanName || 'Assigned'} (${m.repairmanContact || '-'})">
                              PM: ${m.pmFrequency}
                            </span>
                          ` : `
                            <span class="text-[10px] text-slate-400">No PM</span>
                          `}
                        </div>
                      </td>
                      <td class="p-4 text-right font-mono">
                        <div class="font-bold text-emerald-700 text-sm">${liveStock} <span class="text-slate-500 font-normal text-xs">${m.unit}</span></div>
                        <div class="text-[10px] text-slate-400">Buf: ${m.avgMonthlyConsumption || 0}</div>
                      </td>
                      <td class="p-4">
                        <span class="badge ${m.status === 'Approved' ? 'badge-approved' : m.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                          ${m.status}
                        </span>
                      </td>
                      <td class="p-4 text-right space-x-1">
                        <button onclick="CMS_MASTERS.viewMaterial360('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Inspect 360° Material Details">
                          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="CMS_MASTERS.openConsumableModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Modify Item Master">
                          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                        </button>
                        ${m.status === 'Pending Approval' && role === 'Checker' ? `
                          <button onclick="CMS_MASTERS.approveConsumable('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition" title="Approve Item">
                            Approved
                          </button>
                        ` : ''}
                        <button onclick="CMS_MASTERS.deleteConsumable('${m.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Item">
                          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onConsumableSearch(val) {
    this.consumableSearchQuery = val;
    this.refreshConsumablesTable();
  },

  onConsumableCategoryFilter(val) {
    this.consumableCategoryFilter = val;
    this.refreshConsumablesTable();
  },

  onConsumableTypeFilter(val) {
    this.consumableTypeFilter = val;
    this.refreshConsumablesTable();
  },

  refreshConsumablesTable() {
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderConsumables();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  toggleFixedAssetFields(type) {
    const el = document.getElementById('m-fixed-fields');
    if (el) {
      if (type === 'Fixed') el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  toggleWarrantyFields(checked) {
    const el = document.getElementById('m-warranty-fields');
    if (el) {
      if (checked) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  togglePmFields(checked) {
    const el = document.getElementById('m-pm-fields');
    if (el) {
      if (checked) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  viewMaterial360(matId) {
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);
    if (!m) return;

    const liveStock = window.CMS_STORE.getStock(m.id);
    const buffer = Number(m.avgMonthlyConsumption || 0);
    const pct = Math.min(100, Math.round((liveStock / (buffer || 1)) * 100));
    const isFixed = m.inventoryType === 'Fixed';

    const content = `
      <div class="space-y-5 text-xs">
        
        <!-- Header Banner -->
        <div class="p-5 bg-slate-900 border border-slate-800 text-white rounded-md flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 bg-blue-500/30 border border-blue-400/40 text-blue-200 rounded text-[10px] font-bold uppercase tracking-wider">${m.categoryName}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isFixed ? 'bg-indigo-500/40 text-indigo-200 border border-indigo-400/40' : 'bg-emerald-500/40 text-emerald-200 border border-emerald-400/40'}">
                ${isFixed ? 'Fixed Capital Asset' : 'Consumer Material'}
              </span>
            </div>
            <h3 class="text-lg font-bold text-white mt-1">${m.materialName}</h3>
            <p class="text-blue-200 text-xs font-mono">Code: ${m.id} | Brand: <strong>${m.brand || '-'}</strong> | SKU: ${m.supplierProductCode || '-'}</p>
            ${isFixed && m.assetTag ? `<p class="text-indigo-300 text-xs font-mono font-bold mt-1">Asset Tag: ${m.assetTag} | S/N: ${m.serialNo || '-'} | Dept: ${m.custodianDept || 'General'}</p>` : ''}
          </div>
          <span class="badge ${m.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${m.status}</span>
        </div>

        <!-- Live Stock & Monthly Buffer Meter -->
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <i data-lucide="gauge" class="w-4 h-4 text-blue-600"></i>
              <span>Live Warehouse Stock Balance vs. Target Buffer</span>
            </span>
            <span class="font-mono text-xs font-bold ${liveStock < buffer * 0.5 ? 'text-amber-600' : 'text-emerald-700'}">
              ${liveStock} / ${buffer} ${m.unit} (${pct}%)
            </span>
          </div>
          <div class="w-full stock-progress-track">
            <div class="stock-progress-fill ${liveStock < buffer * 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${pct}%"></div>
          </div>
        </div>

        <!-- Vendor Quotation & Booked MRP Details -->
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
          <h4 class="font-bold text-slate-900 text-xs uppercase flex items-center gap-1.5 text-blue-800">
            <i data-lucide="file-spreadsheet" class="w-4 h-4 text-blue-600"></i>
            <span>Vendor Quotation & MRP Pricing Record</span>
          </h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 border border-slate-200 rounded">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation No:</span>
              <strong class="font-mono text-blue-800 text-xs">${m.quotationNo || 'Direct Tender'}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation Date:</span>
              <strong class="font-mono text-slate-700">${m.quotationDate || '-'}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation Rate:</span>
              <strong class="font-mono text-emerald-700 text-sm">₹${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Booked MRP:</span>
              <strong class="font-mono text-slate-900 text-sm">₹${Number(m.mrpBooked || 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <!-- Approved Vendor Pricing -->
        <div>
          <div class="p-4 border-2 border-blue-200 bg-blue-50/50 rounded-md space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-900 text-xs uppercase flex items-center gap-1">
                <i data-lucide="award" class="w-3.5 h-3.5 text-blue-600"></i> Vendor-1 (Primary)
              </span>
              <span class="font-mono font-semibold text-slate-900 text-sm">₹${Number(m.vendor1Rate || 0).toFixed(2)}</span>
            </div>
            <p class="font-bold text-slate-900 text-xs">${m.vendor1Name || 'Not Assigned'}</p>
            <div class="text-[11px] text-blue-700 font-medium">
              Rate Effective From: <strong class="font-mono">${m.vendor1RateEffectiveFrom || 'Current'}</strong>
            </div>
          </div>

        </div>

        <!-- Warranty & Preventive Maintenance (PM) Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Warranty Card -->
          <div class="p-4 border border-blue-200 bg-blue-50/40 rounded-md space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-blue-950 text-xs uppercase flex items-center gap-1.5">
                <i data-lucide="shield" class="w-4 h-4 text-blue-700"></i>
                <span>Warranty Coverage</span>
              </h4>
              <span class="text-xs font-bold ${m.hasWarranty ? 'text-blue-800' : 'text-slate-400'}">
                ${m.hasWarranty ? 'Active Policy' : 'No Coverage'}
              </span>
            </div>
            ${m.hasWarranty ? `
              <div class="space-y-1 pt-1 text-slate-700">
                <div><strong>Period:</strong> <span class="font-medium">${m.warrantyPeriod || '1 Year'}</span></div>
                <div><strong>Valid Till:</strong> <span class="font-mono font-bold text-blue-900">${m.warrantyValidTill || 'N/A'}</span></div>
                <div><strong>Authorized Vendor:</strong> <span>${m.warrantyVendor || m.vendor1Name || 'Supplier'}</span></div>
              </div>
            ` : `
              <p class="text-slate-500 text-xs italic">Standard consumable without manufacturer warranty coverage.</p>
            `}
          </div>

          <!-- Preventive Maintenance (PM) Card -->
          <div class="p-4 border border-purple-200 bg-purple-50/40 rounded-md space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-purple-950 text-xs uppercase flex items-center gap-1.5">
                <i data-lucide="wrench" class="w-4 h-4 text-purple-700"></i>
                <span>Preventive Maintenance (PM)</span>
              </h4>
              <span class="text-xs font-bold ${m.hasPm ? 'text-purple-800' : 'text-slate-400'}">
                ${m.hasPm ? ` ${m.pmFrequency}` : 'Not Scheduled'}
              </span>
            </div>
            ${m.hasPm ? `
              <div class="space-y-1 pt-1 text-slate-700">
                <div><strong>Technician:</strong> <span class="font-bold text-slate-900">${m.repairmanName || 'General Tech'}</span></div>
                <div><strong>Contact Phone:</strong> <span class="font-mono text-purple-900 font-semibold">${m.repairmanContact || '-'}</span></div>
                <div><strong>Agency:</strong> <span>${m.repairmanAgency || m.pmVendor || 'Authorized Care'}</span></div>
                <div><strong>Next PM Scheduled:</strong> <span class="font-mono font-bold text-purple-900">${m.nextPmDate || 'Upcoming'}</span></div>
              </div>
            ` : `
              <p class="text-slate-500 text-xs italic">No routine preventive maintenance frequency assigned.</p>
            `}
          </div>
        </div>

        <!-- Authorized Consumer Confirmation Box -->
        <div class="p-4 border border-emerald-200 bg-emerald-50/60 rounded-md space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-emerald-950 text-xs uppercase flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700"></i>
              <span>Consumer Rate Authorization Details</span>
            </h4>
            <span class="text-xs font-bold ${m.consumerConfirmed ? 'text-emerald-700' : 'text-amber-700'}">
              ${m.consumerConfirmed ? 'Authenticated & Confirmed' : 'Pending Confirmation'}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-slate-700 pt-1">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Authorized Signatory / Dept Head:</span>
              <span class="font-bold text-slate-900">${m.confirmedBy || '-'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Confirmation Date:</span>
              <span class="font-mono text-slate-900 font-semibold">${m.confirmationDate || '-'}</span>
            </div>
          </div>
          <div class="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-emerald-100">
            <strong>Tender / Contract Reference:</strong> ${m.confirmationRemarks || 'Standard rates verified under rate contract.'}
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="pt-3 border-t border-slate-200 flex justify-between items-center">
          <div class="flex gap-2">
            <button onclick="CMS_PO.openPOModal(); CMS_APP.closeModal();" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-xs flex items-center gap-1.5 shadow">
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
              <span>Generate PO</span>
            </button>
            ${m.hasPm ? `
              <button onclick="CMS_APP.closeModal(); CMS_REPORTS.openLogPmModal('${m.id}');" class="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md text-xs flex items-center gap-1.5 shadow">
                <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                <span>Log PM Service</span>
              </button>
            ` : ''}
            ${(m.pmHistory && m.pmHistory.length > 0) ? `
              <button onclick="CMS_PRINT.printPmCertificate({ materialId: '${m.id}', ...(m.pmHistory[0] || {}) });" class="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 font-bold rounded-md text-xs flex items-center gap-1.5 shadow-sm">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                <span>Print Latest PM Cert</span>
              </button>
            ` : ''}
          </div>
          <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">
            Close
          </button>
        </div>

      </div>
    `;

    window.CMS_APP.openModal('Material 360° Inspection Drawer', content, 'max-w-2xl');
    if (window.lucide) window.lucide.createIcons();
  },

  openConsumableModal(matId = null) {
    const store = window.CMS_STORE.data;
    const isEdit = Boolean(matId);
    const m = isEdit ? store.consumables.find(i => i.id === matId) : {
      inventoryType: 'Consumer',
      categoryId: '', materialName: '', unit: 'Nos', brand: '', supplierProductCode: '', hsnCode: '',
      taxMode: 'CGST_SGST',
      sgst: 9, cgst: 9, igst: 18,
      quotationNo: '', quotationDate: new Date().toISOString().split('T')[0], quotationRate: '',
      mrpBooked: '',
      assetTag: '', serialNo: '', custodianDept: 'Central Stores',
      hasWarranty: false, warrantyPeriod: '1 Year', warrantyValidTill: '', warrantyVendor: '',
      hasPm: false, pmFrequency: 'Quarterly', repairmanName: '', repairmanContact: '', repairmanAgency: '', pmVendor: '', nextPmDate: '',
      vendor1Id: '', vendor1Rate: '', vendor1RateEffectiveFrom: '',
      consumerConfirmed: true,
      confirmedBy: 'Dr. A. Verma (Authorized Department Head)',
      confirmationDate: new Date().toISOString().split('T')[0],
      confirmationRemarks: 'Rates approved based on market rate comparison and contract terms',
      avgMonthlyConsumption: 50, initialStock: 0
    };

    const categories = store.categories || [];
    const vendors = store.vendors || [];

    const content = `
      <form id="mat-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveConsumable('${matId || ''}', true);">
        
        <!-- STEP 1: INVENTORY CLASSIFICATION & IDENTITY -->
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
          <div class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between text-blue-700">
            <span class="flex items-center gap-1.5">
              <i data-lucide="tag" class="w-4 h-4"></i>
              <span>1. Item Identification & Inventory Classification</span>
            </span>
            <div class="flex items-center gap-2">
              <label class="text-slate-600 font-bold text-xs">Inventory Scope:</label>
              <select id="m-inv-type" onchange="CMS_MASTERS.toggleFixedAssetFields(this.value)" class="px-2.5 py-1 border border-slate-300 rounded font-bold text-xs bg-white text-slate-900 focus:ring-2 focus:ring-blue-500">
                <option value="Consumer" ${m.inventoryType !== 'Fixed' ? 'selected' : ''}>Consumer Materials (Consumables)</option>
                <option value="Fixed" ${m.inventoryType === 'Fixed' ? 'selected' : ''}>Fixed Capital Asset / Equipment</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Product Category *</label>
              <select id="m-cat" required class="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">-- Select Category --</option>
                ${categories.map(c => `<option value="${c.id}" ${m.categoryId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block font-bold text-slate-700 mb-1">Material / Item Name *</label>
              <input type="text" id="m-name" required value="${m.materialName || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. A4 Copier Paper 75 GSM or HP LaserJet Printer" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Unit of Measurement *</label>
              <input type="text" id="m-unit" required value="${m.unit || 'Nos'}" class="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Nos, Box, Rim, Kg, Litre, Roll, Set" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Name *</label>
              <input type="text" id="m-brand" required value="${m.brand || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. JK Copier, 3M, Lizol, HP, Daikin" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Supplier Product Code (SKU)</label>
              <input type="text" id="m-sku" value="${m.supplierProductCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md" placeholder="SKU-8910" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">HSN Code *</label>
              <input type="text" id="m-hsn" required value="${m.hsnCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. 4802 or 8443" />
            </div>
            <div class="md:col-span-3 p-3 border border-slate-200 rounded-md bg-white">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label class="block font-bold text-slate-700">Tax Type *</label>
                <div class="flex items-center gap-3 text-[11px] font-semibold">
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="m-tax-mode" value="CGST_SGST" ${window.CMS_STORE.getTaxMode(m) === 'CGST_SGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('m', this.value)" />
                    CGST + SGST (Intra-state)
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="m-tax-mode" value="IGST" ${window.CMS_STORE.getTaxMode(m) === 'IGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('m', this.value)" />
                    IGST (Inter-state)
                  </label>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div id="m-cgst-sgst-fields" class="sm:col-span-2 grid grid-cols-2 gap-1.5 ${window.CMS_STORE.getTaxMode(m) === 'IGST' ? 'tax-fields-disabled' : ''}">
                  <input type="number" step="0.01" id="m-sgst" value="${m.sgst ?? 9}" ${window.CMS_STORE.getTaxMode(m) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('m')" class="w-full px-2 py-2 border border-slate-300 rounded-md font-mono" placeholder="SGST %" />
                  <input type="number" step="0.01" id="m-cgst" value="${m.cgst ?? 9}" ${window.CMS_STORE.getTaxMode(m) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('m')" class="w-full px-2 py-2 border border-slate-300 rounded-md font-mono" placeholder="CGST %" />
                </div>
                <div id="m-igst-field" class="${window.CMS_STORE.getTaxMode(m) === 'CGST_SGST' ? 'tax-fields-disabled' : ''}">
                  <input type="number" step="0.01" id="m-igst" value="${m.igst ?? 18}" ${window.CMS_STORE.getTaxMode(m) === 'CGST_SGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('m')" class="w-full px-2 py-2 border border-slate-300 rounded-md font-mono" placeholder="IGST %" />
                </div>
              </div>
              <div id="m-tax-summary" class="mt-2 text-[11px] font-bold text-blue-800">${window.CMS_STORE.getTaxLabel(m)}</div>
              <p class="text-[10px] text-slate-500 mt-2">Only the selected tax type is active in calculations and purchase orders.</p>
            </div>
          </div>

          <!-- Fixed Asset Specific Inputs (Toggleable) -->
          <div id="m-fixed-fields" class="${m.inventoryType === 'Fixed' ? '' : 'hidden'} p-3 bg-indigo-50 border border-indigo-200 rounded-md grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-indigo-900 mb-1">Asset Tag Number *</label>
              <input type="text" id="m-asset-tag" value="${m.assetTag || ''}" class="w-full font-mono px-3 py-1.5 border border-indigo-300 rounded bg-white" placeholder="e.g. AST-PRN-001" />
            </div>
            <div>
              <label class="block font-bold text-indigo-900 mb-1">Serial Number (S/N)</label>
              <input type="text" id="m-serial-no" value="${m.serialNo || ''}" class="w-full font-mono px-3 py-1.5 border border-indigo-300 rounded bg-white" placeholder="e.g. VNC3K92104" />
            </div>
            <div>
              <label class="block font-bold text-indigo-900 mb-1">Custodian Department</label>
              <input type="text" id="m-custodian-dept" value="${m.custodianDept || 'Accounts & Finance'}" class="w-full px-3 py-1.5 border border-indigo-300 rounded bg-white" placeholder="e.g. Accounts, Facility" />
            </div>
          </div>
        </div>

        <!-- STEP 2: VENDOR QUOTATION & MRP BOOKED -->
        <div class="p-4 bg-blue-50/70 border border-blue-200 rounded-md space-y-3">
          <div class="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>
            <span>2. Vendor Quotation & Booked MRP</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Quotation Number *</label>
              <input type="text" id="m-quote-no" value="${m.quotationNo || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md bg-white" placeholder="e.g. QT-2026-881" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Quotation Date</label>
              <input type="date" id="m-quote-date" value="${m.quotationDate || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md bg-white" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Quotation Rate (₹) *</label>
              <input type="number" step="0.01" id="m-quote-rate" value="${m.quotationRate || m.vendor1Rate || ''}" class="w-full font-mono font-bold px-3 py-2 border border-slate-300 rounded-md bg-white text-blue-900" placeholder="0.00" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">MRP Booked (₹) *</label>
              <input type="number" step="0.01" id="m-mrp" value="${m.mrpBooked || ''}" class="w-full font-mono font-bold px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" placeholder="0.00" />
            </div>
          </div>
        </div>

        <!-- STEP 3: APPROVED VENDOR PRICING & EFFECTIVE DATE -->
        <div>
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
            <h4 class="font-bold text-slate-900 text-xs uppercase flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-blue-600"></i>
              <span>Approved Vendor Details</span>
            </h4>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Select Vendor</label>
              <select id="m-v1" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white">
                <option value="">-- Choose Vendor --</option>
                ${vendors.map(v => `<option value="${v.id}" ${m.vendor1Id === v.id ? 'selected' : ''}>${v.name}</option>`).join('')}
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Approved Rate (₹) *</label>
                <input type="number" step="0.01" id="m-v1-rate" value="${m.vendor1Rate || ''}" class="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-md" placeholder="250.00" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Rate Effective From *</label>
                <input type="date" id="m-v1-eff" value="${m.vendor1RateEffectiveFrom || ''}" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-md" />
              </div>
            </div>
          </div>

        </div>

        <!-- STEP 4: WARRANTY TRACKING (BOTH CONSUMER & FIXED) -->
        <div class="p-4 bg-blue-50/50 border border-blue-200 rounded-md space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-blue-950 text-xs uppercase flex items-center gap-1.5">
              <i data-lucide="shield" class="w-4 h-4 text-blue-700"></i>
              <span>Warranty Tracking (Consumer & Fixed)</span>
            </h4>
            <label class="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="m-has-warranty" ${m.hasWarranty ? 'checked' : ''} onchange="CMS_MASTERS.toggleWarrantyFields(this.checked)" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <span class="text-xs font-bold text-blue-900">Warranty Applicable?</span>
            </label>
          </div>

          <div id="m-warranty-fields" class="${m.hasWarranty ? '' : 'hidden'} grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-blue-200">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Warranty Period *</label>
              <input type="text" id="m-warranty-period" value="${m.warrantyPeriod || '1 Year Comprehensive'}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. 1 Year, 3 Years Onsite" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Warranty Valid Till</label>
              <input type="date" id="m-warranty-till" value="${m.warrantyValidTill || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Warranty Partner / Vendor</label>
              <input type="text" id="m-warranty-vendor" value="${m.warrantyVendor || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. HP Authorised Care" />
            </div>
          </div>
        </div>

        <!-- STEP 5: PREVENTIVE MAINTENANCE (PM) TRACKING -->
        <div class="p-4 bg-purple-50/50 border border-purple-200 rounded-md space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-purple-950 text-xs uppercase flex items-center gap-1.5">
              <i data-lucide="wrench" class="w-4 h-4 text-purple-700"></i>
              <span>Preventive Maintenance (PM) Schedule & Repairman Details</span>
            </h4>
            <label class="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="m-has-pm" ${m.hasPm ? 'checked' : ''} onchange="CMS_MASTERS.togglePmFields(this.checked)" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
              <span class="text-xs font-bold text-purple-900">PM Required?</span>
            </label>
          </div>

          <div id="m-pm-fields" class="${m.hasPm ? '' : 'hidden'} space-y-3 pt-2 border-t border-purple-200">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">PM Frequency *</label>
                <select id="m-pm-freq" class="w-full px-3 py-2 border border-slate-300 rounded bg-white">
                  <option value="Monthly" ${m.pmFrequency === 'Monthly' ? 'selected' : ''}>Monthly (Every 30 Days)</option>
                  <option value="Bi-Monthly" ${m.pmFrequency === 'Bi-Monthly' ? 'selected' : ''}>Bi-Monthly (Every 60 Days)</option>
                  <option value="Quarterly" ${m.pmFrequency === 'Quarterly' ? 'selected' : ''}>Quarterly (Every 90 Days)</option>
                  <option value="Half-Yearly" ${m.pmFrequency === 'Half-Yearly' ? 'selected' : ''}>Half-Yearly (Every 180 Days)</option>
                  <option value="Annual" ${m.pmFrequency === 'Annual' ? 'selected' : ''}>Annual (Every 365 Days)</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Designated Repairman / Technician *</label>
                <input type="text" id="m-pm-repairman-name" value="${m.repairmanName || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. Sanjay Rawat" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Repairman Contact Phone *</label>
                <input type="text" id="m-pm-repairman-contact" value="${m.repairmanContact || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" placeholder="+91 98114 99012" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Repairman Agency / Provider</label>
                <input type="text" id="m-pm-repairman-agency" value="${m.repairmanAgency || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. Kent Commercial Service Care" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">PM Authorized Vendor</label>
                <input type="text" id="m-pm-vendor" value="${m.pmVendor || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. GreenClean Sanitation Corp" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Next Scheduled PM Date</label>
                <input type="date" id="m-pm-next-date" value="${m.nextPmDate || ''}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" />
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 6: CHECKER CONFIRMATION -->
        <div class="p-4 bg-emerald-50/70 border border-emerald-200 rounded-md space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700"></i>
              <span>Checker Rate Confirmation (Security Vetting)</span>
            </h4>
            <label class="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="m-conf" ${m.consumerConfirmed ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
              <span class="text-xs font-bold text-emerald-900">Confirmed by Checker</span>
            </label>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-emerald-900 mb-1">Checker Name / Post *</label>
              <input type="text" id="m-conf-by" value="${m.confirmedBy || ''}" class="w-full px-3 py-2 text-xs border border-emerald-300 rounded-md bg-white focus:outline-none" placeholder="e.g. Col. Anita Sharma (Store Checker)" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-emerald-900 mb-1">Confirmation Date *</label>
              <input type="date" id="m-conf-date" value="${m.confirmationDate || ''}" class="w-full px-3 py-2 text-xs border border-emerald-300 rounded-md bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-emerald-900 mb-1">Tender / Rate Contract Ref</label>
              <input type="text" id="m-conf-remarks" value="${m.confirmationRemarks || ''}" class="w-full px-3 py-2 text-xs border border-emerald-300 rounded-md bg-white" placeholder="e.g. Annual Rate Contract Q3 Ref #77" />
            </div>
          </div>
        </div>

        <!-- STEP 7: MONTHLY CONSUMPTION & SAFETY BUFFER -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Average Monthly Consumption (Buffer Target) *</label>
            <input type="number" id="m-monthly" required value="${m.avgMonthlyConsumption || 0}" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="100" />
            <p class="text-[10px] text-slate-500 mt-0.5">Used by Purchase Order assistant to calculate reorder quotas.</p>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Initial Opening Stock Balance</label>
            <input type="number" id="m-init-stock" value="${m.initialStock || 0}" class="w-full px-3 py-2 border border-slate-300 rounded-md" ${isEdit ? 'disabled title="Stock is adjusted via Inward Receipts and Stock Adjustments."' : ''} />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Save to Master & Submit</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Material' : 'Add Material', content, 'max-w-4xl');
  },

  toggleTaxMode(prefix, mode) {
    const intraState = mode === 'CGST_SGST';
    const cgstSgstFields = document.getElementById(`${prefix}-cgst-sgst-fields`);
    const igstField = document.getElementById(`${prefix}-igst-field`);
    const sgst = document.getElementById(`${prefix}-sgst`);
    const cgst = document.getElementById(`${prefix}-cgst`);
    const igst = document.getElementById(`${prefix}-igst`);

    [sgst, cgst].forEach(input => {
      if (!input) return;
      input.disabled = !intraState;
      input.closest('div')?.classList.toggle('tax-fields-disabled', !intraState);
    });
    if (igst) {
      igst.disabled = intraState;
      igstField?.classList.toggle('tax-fields-disabled', intraState);
    }
    cgstSgstFields?.classList.toggle('tax-fields-disabled', !intraState);
    this.updateTaxSummary(prefix);
  },

  updateTaxSummary(prefix) {
    const mode = document.querySelector(`input[name="${prefix}-tax-mode"]:checked`)?.value || 'CGST_SGST';
    const sgst = mode === 'CGST_SGST' ? (parseFloat(document.getElementById(`${prefix}-sgst`)?.value) || 0) : 0;
    const cgst = mode === 'CGST_SGST' ? (parseFloat(document.getElementById(`${prefix}-cgst`)?.value) || 0) : 0;
    const igst = mode === 'IGST' ? (parseFloat(document.getElementById(`${prefix}-igst`)?.value) || 0) : 0;
    const summary = document.getElementById(`${prefix}-tax-summary`);
    if (summary) summary.innerText = mode === 'IGST'
      ? `IGST: ${igst}%`
      : `SGST: ${sgst}% + CGST: ${cgst}% = ${sgst + cgst}%`;
  },

  saveConsumable(matId, directSubmit = false) {
    const store = window.CMS_STORE;
    const inventoryType = document.getElementById('m-inv-type').value;
    const catId = document.getElementById('m-cat').value;
    const category = store.data.categories.find(c => c.id === catId);
    const materialName = document.getElementById('m-name').value.trim();
    const unit = document.getElementById('m-unit').value.trim();
    const brand = document.getElementById('m-brand').value.trim();
    const supplierProductCode = document.getElementById('m-sku').value.trim();
    const hsnCode = document.getElementById('m-hsn').value.trim();
    const taxMode = document.querySelector('input[name="m-tax-mode"]:checked')?.value || 'CGST_SGST';
    const sgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('m-sgst').value) || 0) : 0;
    const cgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('m-cgst').value) || 0) : 0;
    const igst = taxMode === 'IGST' ? (parseFloat(document.getElementById('m-igst').value) || 0) : 0;

    const quotationNo = document.getElementById('m-quote-no').value.trim();
    const quotationDate = document.getElementById('m-quote-date').value;
    const quotationRate = parseFloat(document.getElementById('m-quote-rate').value) || 0;
    const mrpBooked = parseFloat(document.getElementById('m-mrp').value) || 0;

    const assetTag = document.getElementById('m-asset-tag')?.value.trim() || '';
    const serialNo = document.getElementById('m-serial-no')?.value.trim() || '';
    const custodianDept = document.getElementById('m-custodian-dept')?.value.trim() || 'Central Stores';

    const hasWarranty = document.getElementById('m-has-warranty').checked;
    const warrantyPeriod = document.getElementById('m-warranty-period')?.value.trim() || '';
    const warrantyValidTill = document.getElementById('m-warranty-till')?.value || '';
    const warrantyVendor = document.getElementById('m-warranty-vendor')?.value.trim() || '';

    const hasPm = document.getElementById('m-has-pm').checked;
    const pmFrequency = document.getElementById('m-pm-freq')?.value || 'Quarterly';
    const repairmanName = document.getElementById('m-pm-repairman-name')?.value.trim() || '';
    const repairmanContact = document.getElementById('m-pm-repairman-contact')?.value.trim() || '';
    const repairmanAgency = document.getElementById('m-pm-repairman-agency')?.value.trim() || '';
    const pmVendor = document.getElementById('m-pm-vendor')?.value.trim() || '';
    const nextPmDate = document.getElementById('m-pm-next-date')?.value || '';

    const v1Id = document.getElementById('m-v1').value;
    const v1 = store.data.vendors.find(v => v.id === v1Id);
    const v1Rate = parseFloat(document.getElementById('m-v1-rate').value) || quotationRate;
    const v1RateEffectiveFrom = document.getElementById('m-v1-eff').value;

    const consumerConfirmed = document.getElementById('m-conf').checked;
    const confirmedBy = document.getElementById('m-conf-by').value.trim();
    const confirmationDate = document.getElementById('m-conf-date').value;
    const confirmationRemarks = document.getElementById('m-conf-remarks').value.trim();

    const avgMonthlyConsumption = parseFloat(document.getElementById('m-monthly').value) || 0;
    const initStockEl = document.getElementById('m-init-stock');
    const initialStock = initStockEl ? (parseFloat(initStockEl.value) || 0) : 0;

    if (!materialName || !unit) {
      alert('Please fill all required fields');
      return;
    }

    if (matId) {
      const idx = store.data.consumables.findIndex(m => m.id === matId);
      if (idx !== -1) {
        store.data.consumables[idx] = {
          ...store.data.consumables[idx],
          inventoryType,
          categoryId: catId,
          categoryName: category ? category.name : store.data.consumables[idx].categoryName,
          materialName, unit, brand, supplierProductCode, hsnCode,
          taxMode, sgst, cgst, igst,
          quotationNo, quotationDate, quotationRate, mrpBooked,
          assetTag, serialNo, custodianDept,
          hasWarranty, warrantyPeriod, warrantyValidTill, warrantyVendor,
          hasPm, pmFrequency, repairmanName, repairmanContact, repairmanAgency, pmVendor, nextPmDate,
          vendor1Id: v1Id, vendor1Name: v1 ? v1.name : '', vendor1Rate: v1Rate, vendor1RateEffectiveFrom: v1RateEffectiveFrom,
          consumerConfirmed, confirmedBy, confirmationDate, confirmationRemarks,
          avgMonthlyConsumption,
          status: directSubmit ? 'Pending Approval' : store.data.consumables[idx].status,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      const prefix = inventoryType === 'Fixed' ? 'MAT-FIX-' : 'MAT-';
      const count = store.data.consumables.filter(c => (c.inventoryType || 'Consumer') === inventoryType).length + 1;
      const newId = prefix + String(count).padStart(3, '0');
      store.data.consumables.push({
        id: newId,
        inventoryType,
        categoryId: catId,
        categoryName: category ? category.name : 'General',
        materialName, unit, brand, supplierProductCode, hsnCode,
        taxMode, sgst, cgst, igst,
        quotationNo, quotationDate, quotationRate, mrpBooked,
        assetTag: assetTag || (inventoryType === 'Fixed' ? `AST-${newId}` : ''),
        serialNo, custodianDept,
        hasWarranty, warrantyPeriod, warrantyValidTill, warrantyVendor,
        hasPm, pmFrequency, repairmanName, repairmanContact, repairmanAgency, pmVendor, nextPmDate,
        vendor1Id: v1Id, vendor1Name: v1 ? v1.name : '', vendor1Rate: v1Rate, vendor1RateEffectiveFrom: v1RateEffectiveFrom,
        consumerConfirmed, confirmedBy, confirmationDate, confirmationRemarks,
        avgMonthlyConsumption, initialStock,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Material saved and submitted for approval!' : 'Material saved successfully!');
    window.CMS_APP.refreshView();
  },

  approveConsumable(matId) {
    const store = window.CMS_STORE;
    const m = store.data.consumables.find(i => i.id === matId);
    if (!m) return;
    const check = store.canApprove(m);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    m.status = 'Approved';
    m.approvedAt = new Date().toISOString();
    m.approvedBy = currentUser.id;
    m.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Consumable "${m.materialName}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteConsumable(matId) {
    if (confirm('Delete this consumable material?')) {
      const store = window.CMS_STORE;
      store.data.consumables = store.data.consumables.filter(m => m.id !== matId);
      store.save();
      window.CMS_APP.toast('Consumable deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // GST / IGST SLAB MASTER
  // ==========================================
  renderGstSlabs() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.gstSlabs || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="percent" class="w-4 h-4"></i>
              </div>
              <span>GST / IGST Slab Master</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Configure statutory tax slabs for CGST + SGST or IGST, with optional statutory notes.</p>
          </div>
          <button onclick="CMS_MASTERS.openGstModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Add GST Slab</span>
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Slab Code</th>
                <th class="p-4">Slab Name</th>
                <th class="p-4">Active Tax Mode</th>
                <th class="p-4">Active Rate(s)</th>
                <th class="p-4">Custom Notes / Statutory Scope</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-12 text-center text-slate-400">No GST slabs defined.</td></tr>
              ` : list.map(g => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono font-semibold text-slate-500">${g.id}</td>
                  <td class="p-4 font-bold text-slate-900 text-sm">${g.name}</td>
                  <td class="p-4 font-semibold">${window.CMS_STORE.getTaxMode(g) === 'IGST' ? 'IGST (Inter-state)' : 'CGST + SGST (Intra-state)'}</td>
                  <td class="p-4 font-mono font-bold text-blue-700">${window.CMS_STORE.getTaxLabel(g)}</td>
                  <td class="p-4 text-slate-600">${g.remarks || '-'}</td>
                  <td class="p-4">
                    <span class="badge ${g.status === 'Approved' ? 'badge-approved' : g.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                      ${g.status}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    <button onclick="CMS_MASTERS.openGstModal('${g.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                    </button>
                    ${g.status === 'Pending Approval' && role === 'Checker' ? `
                      <button onclick="CMS_MASTERS.approveGst('${g.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition">
                        Approve
                      </button>
                    ` : ''}
                    <button onclick="CMS_MASTERS.deleteGst('${g.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openGstModal(gstId = null) {
    const isEdit = Boolean(gstId);
    const slab = isEdit ? window.CMS_STORE.data.gstSlabs.find(g => g.id === gstId) : {
      name: '', taxMode: 'CGST_SGST', sgst: 9, cgst: 9, igst: 18, remarks: ''
    };

    const content = `
      <form id="gst-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveGst('${gstId || ''}', true);">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Slab Name *</label>
          <input type="text" id="g-name" required value="${slab.name || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. GST 18%, GST 5%, Exempted" />
        </div>
        <div class="p-3 border border-slate-200 rounded-md bg-white">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <label class="block font-bold text-slate-700">Tax Type *</label>
            <div class="flex items-center gap-3 text-[11px] font-semibold">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="g-tax-mode" value="CGST_SGST" ${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('g', this.value)" />
                CGST + SGST (Intra-state)
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="g-tax-mode" value="IGST" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('g', this.value)" />
                IGST (Inter-state)
              </label>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div id="g-cgst-sgst-fields" class="sm:col-span-2 grid grid-cols-2 gap-1.5 ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'tax-fields-disabled' : ''}">
              <input type="number" step="0.01" id="g-sgst" value="${slab.sgst ?? 9}" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('g')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="SGST %" />
              <input type="number" step="0.01" id="g-cgst" value="${slab.cgst ?? 9}" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('g')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="CGST %" />
            </div>
            <div id="g-igst-field" class="${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'tax-fields-disabled' : ''}">
              <input type="number" step="0.01" id="g-igst" value="${slab.igst ?? 18}" ${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'disabled' : ''} oninput="CMS_MASTERS.updateTaxSummary('g')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="IGST %" />
            </div>
          </div>
          <div id="g-tax-summary" class="mt-2 text-[11px] font-bold text-blue-800">${window.CMS_STORE.getTaxLabel(slab)}</div>
          <p class="text-[10px] text-slate-500 mt-2">Only the selected tax type is active for this slab.</p>
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Custom Notes / Statutory Scope</label>
          <input type="text" id="g-remarks" value="${slab.remarks || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="Applicable commodity scope or special statutory rules" />
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition">Submit for Approval</button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify GST Slab' : 'Add GST / IGST Slab', content);
  },

  saveGst(gstId, directSubmit = false) {
    const name = document.getElementById('g-name').value.trim();
    const taxMode = document.querySelector('input[name="g-tax-mode"]:checked')?.value || 'CGST_SGST';
    const sgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('g-sgst').value) || 0) : 0;
    const cgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('g-cgst').value) || 0) : 0;
    const igst = taxMode === 'IGST' ? (parseFloat(document.getElementById('g-igst').value) || 0) : 0;
    const remarks = document.getElementById('g-remarks').value.trim();
    const store = window.CMS_STORE;

    if (gstId) {
      const idx = store.data.gstSlabs.findIndex(g => g.id === gstId);
      if (idx !== -1) {
        store.data.gstSlabs[idx] = {
          ...store.data.gstSlabs[idx],
          name, taxMode, sgst, cgst, igst, remarks,
          status: directSubmit ? 'Pending Approval' : store.data.gstSlabs[idx].status
        };
      }
    } else {
      const newId = 'GST-' + String(store.data.gstSlabs.length + 1).padStart(3, '0');
      store.data.gstSlabs.push({
        id: newId,
        name, taxMode, sgst, cgst, igst, remarks,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'GST slab submitted for approval!' : 'GST slab saved!');
    window.CMS_APP.refreshView();
  },

  approveGst(gstId) {
    const store = window.CMS_STORE;
    const g = store.data.gstSlabs.find(i => i.id === gstId);
    if (!g) return;
    const check = store.canApprove(g);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    g.status = 'Approved';
    g.approvedAt = new Date().toISOString();
    g.approvedBy = currentUser.id;
    g.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`GST Slab "${g.name}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteGst(gstId) {
    if (confirm('Delete this GST slab?')) {
      const store = window.CMS_STORE;
      store.data.gstSlabs = store.data.gstSlabs.filter(g => g.id !== gstId);
      store.save();
      window.CMS_APP.toast('GST slab deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  }
};
