/**
 * Adminutes - Transactions Module Engine
 * Handles Goods Inward Receipts (Challan & Invoice), Departmental Requisitions,
 * Store Issuance with Live Stock Display & Print Slips, Return to Store,
 * Delivery Challan to Invoice Conversion, and Stock Adjustments (+/-).
 * Enhanced with Live Search Toolbars, Lucide Icons, and Form Validations.
 */

window.CMS_TRANSACTIONS = {
  receiptSearchQuery: '',
  requestSearchQuery: '',
  issuanceSearchQuery: '',

  // ==========================================
  // RECEIPTS (INWARD) - BY CHALLAN & BY INVOICE
  // ==========================================
  renderReceipts() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    let list = store.receipts || [];

    if (this.receiptSearchQuery) {
      const q = this.receiptSearchQuery.toLowerCase();
      list = list.filter(r =>
        (r.receiptNo || '').toLowerCase().includes(q) ||
        (r.vendorName || '').toLowerCase().includes(q) ||
        (r.docNo || '').toLowerCase().includes(q) ||
        (r.materialName || '').toLowerCase().includes(q)
      );
    }

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="package-check" class="w-4 h-4"></i>
              </div>
              <span>Goods Inward Receipts</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Record incoming consignments by Delivery Challan or Tax Invoice. Approving restocks warehouse inventory.</p>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <button onclick="CMS_TRANSACTIONS.openReceiptModal('Challan')" class="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-md shadow transition text-xs">
              <i data-lucide="truck" class="w-4 h-4"></i>
              <span>Receipt by Challan</span>
            </button>
            <button onclick="CMS_TRANSACTIONS.openReceiptModal('Invoice')" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
              <i data-lucide="receipt" class="w-4 h-4"></i>
              <span>Receipt by Invoice</span>
            </button>
          </div>
        </div>

        <!-- Table Toolbar: Search -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" value="${this.receiptSearchQuery}" oninput="CMS_TRANSACTIONS.onReceiptSearch(this.value)" placeholder="Search receipt, vendor, doc no., item..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.receipts.length} receipts
          </div>
        </div>

        <!-- Receipts Table -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Receipt Ref & Mode</th>
                  <th class="p-4">Vendor Details</th>
                  <th class="p-4">Doc No. & Date</th>
                  <th class="p-4">Material & Brand</th>
                  <th class="p-4 text-right">Received Qty</th>
                  <th class="p-4 text-right">Total Amount</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-12 text-center text-slate-400">
                      <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                      <div class="font-bold text-slate-600">No goods inward receipts recorded</div>
                    </td>
                  </tr>
                ` : list.map(r => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4">
                      <div class="font-bold text-slate-900 font-mono text-sm">${r.receiptNo}</div>
                      <span class="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-semibold ${r.type === 'Challan' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                        ${r.type === 'Challan' ? 'Delivery Challan' : 'Tax Invoice'}
                      </span>
                      ${r.isConvertedToInvoice ? `
                        <div class="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                          <i data-lucide="check" class="w-3 h-3"></i> Converted: #${r.linkedInvoiceNo}
                        </div>
                      ` : ''}
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-slate-900">${r.vendorName}</div>
                      <div class="text-[11px] text-slate-400 font-mono">${r.vendorId}</div>
                    </td>
                    <td class="p-4 font-mono text-xs">
                      <div class="font-bold text-slate-800">${r.docNo}</div>
                      <div class="text-slate-500 text-[11px]">${r.docDate}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-slate-900 text-sm">${r.materialName}</div>
                      <div class="text-slate-500 text-[11px]">Brand: <span class="font-semibold text-slate-700">${r.brand || '-'}</span></div>
                    </td>
                    <td class="p-4 text-right font-mono font-semibold text-emerald-700 text-sm">
                      +${r.qty} <span class="text-slate-500 font-normal text-xs">${r.unit}</span>
                    </td>
                    <td class="p-4 text-right font-mono font-bold text-slate-900 text-xs">
                      ₹${Number(r.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td class="p-4">
                      <span class="badge ${r.status === 'Approved' ? 'badge-approved' : r.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                        ${r.status}
                      </span>
                    </td>
                    <td class="p-4 text-right space-x-1">
                      <button onclick="CMS_TRANSACTIONS.openReceiptModal('${r.type}', '${r.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Modify Receipt">
                        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                      </button>
                      ${r.status === 'Pending Approval' && role === 'Checker' ? `
                        <button onclick="CMS_TRANSACTIONS.approveReceipt('${r.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition" title="Approve Receipt & Restock Inventory">
                          Approve
                        </button>
                      ` : ''}
                      ${r.type === 'Challan' && !r.isConvertedToInvoice && r.status === 'Approved' ? `
                        <button onclick="CMS_TRANSACTIONS.openChallanConversionModal('${r.id}')" class="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg transition" title="Convert to Invoice">
                          Convert
                        </button>
                      ` : ''}
                      <button onclick="CMS_TRANSACTIONS.deleteReceipt('${r.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Receipt">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onReceiptSearch(val) {
    this.receiptSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderReceipts();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openReceiptModal(type = 'Challan', receiptId = null) {
    const store = window.CMS_STORE.data;
    const isEdit = Boolean(receiptId);
    const r = isEdit ? store.receipts.find(i => i.id === receiptId) : {
      type, vendorId: '', docNo: '', docDate: new Date().toISOString().split('T')[0],
      materialId: '', qty: '', rate: '', remarks: ''
    };

    const vendors = store.vendors || [];
    const categories = store.categories || [];
    const consumables = store.consumables || [];

    const content = `
      <form id="receipt-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.saveReceipt('${receiptId || ''}', false);">
        <input type="hidden" id="r-type" value="${r.type}" />
        
        <div class="p-3.5 rounded-md ${r.type === 'Challan' ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-blue-50 border border-blue-200 text-blue-900'} font-medium flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <i data-lucide="${r.type === 'Challan' ? 'truck' : 'receipt'}" class="w-4 h-4"></i>
            <span>Receiving Consignment via <strong>${r.type === 'Challan' ? 'Delivery Challan' : 'Tax Invoice'}</strong></span>
          </span>
          <span class="text-[10px] text-slate-500 font-normal">Approved items immediately credit stock ledger</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Select Vendor *</label>
            <select id="r-vendor" required onchange="CMS_TRANSACTIONS.updateReceiptTaxMode(this.value)" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
              <option value="">-- Choose Vendor --</option>
              ${vendors.map(v => `<option value="${v.id}" ${r.vendorId === v.id ? 'selected' : ''}>${v.name}</option>`).join('')}
            </select>
            <span id="r-tax-mode" class="block text-[10px] text-slate-500 mt-1">Tax mode will be selected from vendor state.</span>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Type ${r.type === 'Challan' ? 'Delivery Challan No.' : 'Tax Invoice No.'} *</label>
            <input type="text" id="r-docno" required value="${r.docNo || ''}" class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="${r.type === 'Challan' ? 'e.g. DC/2026/102' : 'e.g. INV/2026/501'}" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Receipt Date *</label>
            <input type="date" id="r-date" required value="${r.docDate || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <!-- Material Selection Mode: Existing Material vs Auto Material Filing -->
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200">
            <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <i data-lucide="database" class="w-4 h-4 text-blue-600"></i>
              <span>Item Selection & Master Filing Mode</span>
            </span>
            ${!isEdit ? `
              <label class="inline-flex items-center gap-2 cursor-pointer bg-white px-2.5 py-1 rounded border border-blue-300 shadow-sm">
                <input type="checkbox" id="r-auto-master" onchange="CMS_TRANSACTIONS.toggleAutoMasterFiling(this.checked)" class="w-4 h-4 text-blue-600 rounded" />
                <span class="text-xs font-bold text-blue-900">+ Auto-File New Item into Master</span>
              </label>
            ` : ''}
          </div>

          <!-- OPTION A: EXISTING MASTER SAVED ITEM -->
          <div id="r-existing-mat-sec">
            <label class="block font-bold text-slate-700 mb-1">Select Existing Material (Consumer or Fixed Asset) *</label>
            <select id="r-mat" onchange="CMS_TRANSACTIONS.onReceiptMaterialChange()" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
              <option value="">-- Choose Material --</option>
              ${consumables.map(m => `<option value="${m.id}" data-brand="${m.brand || ''}" data-unit="${m.unit}" data-rate="${m.quotationRate || m.vendor1Rate || 0}" ${r.materialId === m.id ? 'selected' : ''}>[${m.inventoryType || 'Consumer'}] ${m.materialName} (${m.brand || 'No Brand'}) - Code: ${m.id}</option>`).join('')}
            </select>
          </div>

          <!-- OPTION B: AUTO MATERIAL FILING (NEW ITEM REGISTRATION DIRECTLY FROM RECEIPT) -->
          <div id="r-auto-master-sec" class="hidden space-y-3 p-3.5 bg-blue-50/70 border border-blue-200 rounded-md">
            <div class="text-[11px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Auto Material Filing: Enter details to simultaneously register in Material Catalog</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Inventory Type *</label>
                <select id="r-new-inv-type" onchange="CMS_TRANSACTIONS.toggleNewItemFixedFields(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-bold">
                  <option value="Consumer">Consumer Materials</option>
                  <option value="Fixed">Fixed Capital Asset</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-700 mb-1">Item / Material Name *</label>
                <input type="text" id="r-new-name" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. Heavy Duty Laminator Machine" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Product Category *</label>
                <select id="r-new-cat" class="w-full px-3 py-2 border border-slate-300 rounded bg-white">
                  ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Brand Name</label>
                <input type="text" id="r-new-brand" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="e.g. GBC, Scotch, Canon" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Unit of Measurement *</label>
                <input type="text" id="r-new-unit" value="Nos" class="w-full px-3 py-2 border border-slate-300 rounded bg-white" placeholder="Nos, Box, Set, Rim" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">HSN Code *</label>
                <input type="text" id="r-new-hsn" value="8472" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Booked MRP (₹)</label>
                <input type="number" step="0.01" id="r-new-mrp" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" placeholder="0.00" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Vendor Quotation No.</label>
                <input type="text" id="r-new-quoteno" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono" placeholder="e.g. QT-2026-NEW" />
              </div>
            </div>

            <!-- Fixed Asset Sub-fields for New Item -->
            <div id="r-new-fixed-fields" class="hidden grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-blue-200">
              <div>
                <label class="block font-bold text-indigo-900 mb-1">Asset Tag *</label>
                <input type="text" id="r-new-asset-tag" class="w-full px-3 py-1.5 border border-indigo-300 rounded bg-white font-mono" placeholder="AST-EQP-001" />
              </div>
              <div>
                <label class="block font-bold text-indigo-900 mb-1">Serial Number</label>
                <input type="text" id="r-new-serial-no" class="w-full px-3 py-1.5 border border-indigo-300 rounded bg-white font-mono" placeholder="S/N-998811" />
              </div>
              <div>
                <label class="block font-bold text-indigo-900 mb-1">Custodian Dept</label>
                <input type="text" id="r-new-custodian-dept" value="Central Stores" class="w-full px-3 py-1.5 border border-indigo-300 rounded bg-white" />
              </div>
            </div>

            <!-- Warranty & PM Toggles for Auto-Filing -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blue-200">
              <div class="p-2.5 bg-white border border-blue-200 rounded space-y-2">
                <label class="flex items-center gap-2 font-bold text-blue-900 cursor-pointer">
                  <input type="checkbox" id="r-new-has-warranty" onchange="document.getElementById('r-new-warr-box').classList.toggle('hidden', !this.checked)" class="w-3.5 h-3.5 text-blue-600 rounded" />
                  <span>Warranty Coverage?</span>
                </label>
                <div id="r-new-warr-box" class="hidden space-y-1.5 pt-1 text-xs">
                  <input type="text" id="r-new-warr-period" value="1 Year Comprehensive" class="w-full px-2 py-1 border border-slate-300 rounded" placeholder="Warranty Period" />
                  <input type="date" id="r-new-warr-till" class="w-full px-2 py-1 border border-slate-300 rounded font-mono" />
                </div>
              </div>

              <div class="p-2.5 bg-white border border-purple-200 rounded space-y-2">
                <label class="flex items-center gap-2 font-bold text-purple-900 cursor-pointer">
                  <input type="checkbox" id="r-new-has-pm" onchange="document.getElementById('r-new-pm-box').classList.toggle('hidden', !this.checked)" class="w-3.5 h-3.5 text-purple-600 rounded" />
                  <span>Preventive Maintenance (PM)?</span>
                </label>
                <div id="r-new-pm-box" class="hidden space-y-1.5 pt-1 text-xs">
                  <select id="r-new-pm-freq" class="w-full px-2 py-1 border border-slate-300 rounded">
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly" selected>Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Annual">Annual</option>
                  </select>
                  <input type="text" id="r-new-pm-tech" class="w-full px-2 py-1 border border-slate-300 rounded" placeholder="Repairman / Tech Name" />
                  <input type="text" id="r-new-pm-contact" class="w-full px-2 py-1 border border-slate-300 rounded font-mono" placeholder="Tech Contact (+91...)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Received Quantity *</label>
            <input type="number" step="0.01" id="r-qty" required value="${r.qty || ''}" oninput="CMS_TRANSACTIONS.recalcReceiptTotal()" class="w-full px-3 py-2 border border-slate-300 rounded-md font-mono font-semibold text-sm" placeholder="0" />
            <span id="r-unit-label" class="text-[10px] text-slate-500 mt-1 block">Unit: -</span>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Unit Rate (₹) *</label>
            <input type="number" step="0.01" id="r-rate" required value="${r.rate || ''}" oninput="CMS_TRANSACTIONS.recalcReceiptTotal()" class="w-full px-3 py-2 border border-slate-300 rounded-md font-mono font-bold text-blue-900" placeholder="0.00" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Calculated Total (₹)</label>
            <input type="text" id="r-total" readonly value="${r.totalAmount || '0.00'}" class="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-100 font-mono font-semibold text-slate-900" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Remarks / Quality Inspection Notes</label>
          <input type="text" id="r-remarks" value="${r.remarks || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Inspection passed, batch details, etc." />
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Submit for Approval</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? `Modify Receipt (${r.type})` : `New Inward Receipt (${r.type})`, content, 'max-w-3xl');
    setTimeout(() => this.onReceiptMaterialChange(), 50);
    setTimeout(() => this.updateReceiptTaxMode(r.vendorId), 50);
  },

  updateReceiptTaxMode(vendorId) {
    const vendor = window.CMS_STORE.data.vendors.find(item => item.id === vendorId);
    const mode = window.CMS_STORE.getVendorTaxMode(vendor);
    const label = document.getElementById('r-tax-mode');
    if (label) label.innerText = mode === 'IGST' ? 'IGST (inter-state supply)' : 'CGST + SGST (intra-state supply)';
  },

  toggleAutoMasterFiling(checked) {
    const existingSec = document.getElementById('r-existing-mat-sec');
    const autoSec = document.getElementById('r-auto-master-sec');
    const matSelect = document.getElementById('r-mat');
    if (checked) {
      if (existingSec) existingSec.classList.add('hidden');
      if (autoSec) autoSec.classList.remove('hidden');
      if (matSelect) matSelect.removeAttribute('required');
      const unitEl = document.getElementById('r-unit-label');
      if (unitEl) unitEl.innerText = `Unit: ${document.getElementById('r-new-unit')?.value || 'Nos'}`;
    } else {
      if (existingSec) existingSec.classList.remove('hidden');
      if (autoSec) autoSec.classList.add('hidden');
      if (matSelect) matSelect.setAttribute('required', 'required');
      this.onReceiptMaterialChange();
    }
  },

  toggleNewItemFixedFields(type) {
    const el = document.getElementById('r-new-fixed-fields');
    if (el) {
      if (type === 'Fixed') el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  onReceiptMaterialChange() {
    const select = document.getElementById('r-mat');
    if (!select) return;
    const opt = select.options[select.selectedIndex];
    if (opt && opt.value) {
      const unit = opt.getAttribute('data-unit') || '';
      const rate = opt.getAttribute('data-rate') || 0;
      const unitLabel = document.getElementById('r-unit-label');
      if (unitLabel) unitLabel.innerText = `Unit: ${unit}`;
      const rateInput = document.getElementById('r-rate');
      if (rateInput && (!rateInput.value || parseFloat(rateInput.value) === 0)) rateInput.value = rate;
      this.recalcReceiptTotal();
    }
  },

  recalcReceiptTotal() {
    const qty = parseFloat(document.getElementById('r-qty')?.value) || 0;
    const rate = parseFloat(document.getElementById('r-rate')?.value) || 0;
    const totalEl = document.getElementById('r-total');
    if (totalEl) totalEl.value = (qty * rate).toFixed(2);
  },

  saveReceipt(receiptId, directSubmit = false) {
    const store = window.CMS_STORE;
    const type = document.getElementById('r-type').value;
    const vendorId = document.getElementById('r-vendor').value;
    const vendor = store.data.vendors.find(v => v.id === vendorId);
    const taxMode = store.getVendorTaxMode(vendor);
    const docNo = document.getElementById('r-docno').value.trim();
    const docDate = document.getElementById('r-date').value;
    const qty = parseFloat(document.getElementById('r-qty').value) || 0;
    const rate = parseFloat(document.getElementById('r-rate').value) || 0;
    const totalAmount = parseFloat(document.getElementById('r-total').value) || (qty * rate);
    const remarks = document.getElementById('r-remarks').value.trim();

    if (!vendorId || !docNo || qty <= 0) {
      alert('Please fill all mandatory fields with valid quantity.');
      return;
    }

    const isAutoMaster = document.getElementById('r-auto-master')?.checked;
    let materialId = '';
    let materialName = '';
    let brand = '';
    let unit = 'Nos';

    if (isAutoMaster) {
      const newName = document.getElementById('r-new-name')?.value.trim();
      const newCatId = document.getElementById('r-new-cat')?.value;
      const newCat = store.data.categories.find(c => c.id === newCatId);
      const newUnit = document.getElementById('r-new-unit')?.value.trim() || 'Nos';

      if (!newName) {
        alert('Please enter the Item Name for Auto Material Filing.');
        return;
      }

      const created = store.autoCreateMasterItemFromReceipt({
        inventoryType: document.getElementById('r-new-inv-type')?.value || 'Consumer',
        materialName: newName,
        categoryId: newCatId,
        categoryName: newCat ? newCat.name : 'General',
        brand: document.getElementById('r-new-brand')?.value.trim() || '',
        unit: newUnit,
        hsnCode: document.getElementById('r-new-hsn')?.value.trim() || '8472',
        mrpBooked: parseFloat(document.getElementById('r-new-mrp')?.value) || (rate * 1.25),
        quotationNo: document.getElementById('r-new-quoteno')?.value.trim() || `QT-${docNo}`,
        quotationDate: docDate,
        quotationRate: rate,
        vendor1Id,
        vendor1Name: vendor ? vendor.name : '',
        vendor1Rate: rate,
        vendor1RateEffectiveFrom: docDate,
        hasWarranty: document.getElementById('r-new-has-warranty')?.checked || false,
        warrantyPeriod: document.getElementById('r-new-warr-period')?.value.trim() || '',
        warrantyValidTill: document.getElementById('r-new-warr-till')?.value || '',
        warrantyVendor: vendor ? vendor.name : '',
        hasPm: document.getElementById('r-new-has-pm')?.checked || false,
        pmFrequency: document.getElementById('r-new-pm-freq')?.value || 'Quarterly',
        repairmanName: document.getElementById('r-new-pm-tech')?.value.trim() || '',
        repairmanContact: document.getElementById('r-new-pm-contact')?.value.trim() || '',
        assetTag: document.getElementById('r-new-asset-tag')?.value.trim() || '',
        serialNo: document.getElementById('r-new-serial-no')?.value.trim() || '',
        custodianDept: document.getElementById('r-new-custodian-dept')?.value.trim() || 'Central Stores'
      });

      materialId = created.id;
      materialName = created.materialName;
      brand = created.brand;
      unit = created.unit;
    } else {
      materialId = document.getElementById('r-mat').value;
      const mat = store.data.consumables.find(m => m.id === materialId);
      if (!materialId || !mat) {
        alert('Please select an existing material from Master.');
        return;
      }
      materialName = mat.materialName;
      brand = mat.brand;
      unit = mat.unit;
    }

    if (receiptId) {
      const idx = store.data.receipts.findIndex(r => r.id === receiptId);
      if (idx !== -1) {
        store.data.receipts[idx] = {
          ...store.data.receipts[idx],
          vendorId, vendorName: vendor ? vendor.name : '',
          docNo, docDate,
          materialId, materialName,
          brand, unit,
          qty, rate, totalAmount, remarks,
          status: directSubmit ? 'Pending Approval' : store.data.receipts[idx].status,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      const newId = 'REC-' + String(store.data.receipts.length + 1).padStart(3, '0');
      const recNo = `REC-${new Date().getFullYear()}-${String(store.data.receipts.length + 1).padStart(3, '0')}`;
      store.data.receipts.push({
        id: newId,
        receiptNo: recNo,
        type,
        vendorId, vendorName: vendor ? vendor.name : '', taxMode,
        docNo, docDate,
        materialId, materialName,
        brand, unit,
        qty, rate, totalAmount, remarks,
        isConvertedToInvoice: false,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(isAutoMaster ? `Receipt recorded & new item auto-filed into Master (${materialId})!` : (directSubmit ? 'Receipt submitted for approval!' : 'Receipt saved!'));
    window.CMS_APP.refreshView();
  },

  approveReceipt(receiptId) {
    const store = window.CMS_STORE;
    const r = store.data.receipts.find(i => i.id === receiptId);
    if (!r) return;
    const check = store.canApprove(r);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    r.status = 'Approved';
    r.approvedAt = new Date().toISOString();
    r.approvedBy = currentUser.id;
    r.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Receipt ${r.receiptNo} sanctioned by ${currentUser.name} and warehouse stock credited!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteReceipt(receiptId) {
    if (confirm('Delete this receipt entry?')) {
      const store = window.CMS_STORE;
      store.data.receipts = store.data.receipts.filter(r => r.id !== receiptId);
      store.save();
      window.CMS_APP.toast('Receipt deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // DELIVERY CHALLAN TO INVOICE CONVERSION
  // ==========================================
  renderChallanConversion() {
    const store = window.CMS_STORE.data;
    const list = (store.receipts || []).filter(r => r.type === 'Challan');

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              </div>
              <span>Delivery Challan to Invoice Conversion</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Formalize Delivery Challans into official Tax Invoices upon receipt of vendor billing without double-counting stock.</p>
          </div>
        </div>

        <div class="p-3.5 bg-cyan-50 border border-cyan-200 rounded-md text-cyan-950 text-xs flex items-start gap-2.5">
          <i data-lucide="info" class="w-4 h-4 text-cyan-700 shrink-0 mt-0.5"></i>
          <div>
            <strong>Conversion direction:</strong> Delivery Challan can be finalized as an Invoice when vendor billing arrives.
            Invoice-to-Challan reversal is not available because an Invoice is the final billing document and reversing it could duplicate stock or accounting records.
          </div>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Challan Ref & Date</th>
                <th class="p-4">Vendor Name</th>
                <th class="p-4">Material & Qty</th>
                <th class="p-4">Challan Status</th>
                <th class="p-4">Conversion State</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="6" class="p-12 text-center text-slate-400">No Delivery Challans found in system.</td></tr>
              ` : list.map(c => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono text-xs">
                    <div class="font-bold text-slate-900">${c.docNo}</div>
                    <div class="text-slate-500 text-[11px]">${c.docDate} (${c.receiptNo})</div>
                  </td>
                  <td class="p-4 font-bold text-slate-900">${c.vendorName}</td>
                  <td class="p-4">
                    <div class="font-semibold text-slate-800">${c.materialName}</div>
                    <div class="text-[11px] font-mono font-bold text-emerald-700">${c.qty} ${c.unit}</div>
                  </td>
                  <td class="p-4">
                    <span class="badge ${c.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${c.status}</span>
                  </td>
                  <td class="p-4">
                    ${c.isConvertedToInvoice ? `
                      <span class="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 text-xs">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i> Invoiced: #${c.linkedInvoiceNo}
                      </span>
                      <div class="text-[10px] text-slate-500 mt-1">Dated: ${c.linkedInvoiceDate}</div>
                    ` : `
                      <span class="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-xs">
                        <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-600"></i> Pending Invoice
                      </span>
                    `}
                  </td>
                  <td class="p-4 text-right">
                    ${!c.isConvertedToInvoice ? `
                      <button onclick="CMS_TRANSACTIONS.openChallanConversionModal('${c.id}')" class="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition flex items-center gap-1 ml-auto">
                        <i data-lucide="repeat" class="w-3.5 h-3.5"></i>
                        <span>Convert to Invoice</span>
                      </button>
                    ` : `
                      <span class="text-xs text-slate-400 font-medium">Converted</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openChallanConversionModal(challanId) {
    const store = window.CMS_STORE.data;
    const c = store.receipts.find(i => i.id === challanId);
    if (!c) return;

    const content = `
      <form id="conv-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.executeChallanConversion('${c.id}');">
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-md text-purple-900 space-y-1">
          <strong>Convert Delivery Challan to Official Tax Invoice:</strong>
          <div class="mt-1">Challan No: <span class="font-mono font-bold">${c.docNo}</span> | Vendor: <span class="font-semibold">${c.vendorName}</span></div>
          <div>Material: <strong>${c.materialName}</strong> (${c.qty} ${c.unit})</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Vendor Tax Invoice Number *</label>
            <input type="text" id="conv-inv-no" required class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. INV/2026/099" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Tax Invoice Date *</label>
            <input type="date" id="conv-inv-date" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Final Invoiced Value (₹) *</label>
          <input type="number" step="0.01" id="conv-inv-amt" required value="${c.totalAmount || 0}" class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Conversion Remarks / Billing Verification</label>
          <input type="text" id="conv-remarks" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="Rates verified against PO and physical challan" />
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Finalize Conversion</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('Delivery Challan to Invoice Conversion', content);
  },

  executeChallanConversion(challanId) {
    const store = window.CMS_STORE;
    const c = store.data.receipts.find(i => i.id === challanId);
    if (!c) return;

    const invoiceNo = document.getElementById('conv-inv-no').value.trim();
    const invoiceDate = document.getElementById('conv-inv-date').value;
    const finalAmount = parseFloat(document.getElementById('conv-inv-amt').value) || c.totalAmount;
    const convRemarks = document.getElementById('conv-remarks').value.trim();

    if (!invoiceNo || !invoiceDate) {
      alert('Please fill required invoice number and date');
      return;
    }

    c.isConvertedToInvoice = true;
    c.linkedInvoiceNo = invoiceNo;
    c.linkedInvoiceDate = invoiceDate;
    c.totalAmount = finalAmount;
    c.remarks = (c.remarks ? c.remarks + ' | ' : '') + `Converted to Invoice #${invoiceNo} on ${invoiceDate} (${convRemarks})`;

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Challan converted to Invoice #${invoiceNo}!`, 'success');
    window.CMS_APP.refreshView();
  },

  // ==========================================
  // REQUEST (REQUISITION / INDENT - PUSH & PULL)
  // ==========================================
  renderRequests() {
    const store = window.CMS_STORE.data;
    let list = store.requests || [];

    if (this.requestSearchQuery) {
      const q = this.requestSearchQuery.toLowerCase();
      list = list.filter(r =>
        (r.requestNo || '').toLowerCase().includes(q) ||
        (r.materialName || '').toLowerCase().includes(q) ||
        (r.requestedBy || '').toLowerCase().includes(q) ||
        (r.department || '').toLowerCase().includes(q) ||
        (r.sourceDept || '').toLowerCase().includes(q) ||
        (r.destDept || '').toLowerCase().includes(q) ||
        (r.transferMode || '').toLowerCase().includes(q)
      );
    }

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="git-pull-request" class="w-4 h-4"></i>
              </div>
              <span>Department Material Requests (Push & Pull)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Inter-departmental material logistics supporting <strong>PULL</strong> (store requisitions) and <strong>PUSH</strong> (inter-departmental allocations).</p>
          </div>
          <button onclick="CMS_TRANSACTIONS.openRequestModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Raise Push / Pull Request</span>
          </button>
        </div>

        <!-- Toolbar -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" value="${this.requestSearchQuery}" oninput="CMS_TRANSACTIONS.onRequestSearch(this.value)" placeholder="Search req no, push/pull, item, dept..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.requests.length} requests
          </div>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Req No.</th>
                <th class="p-4">Transfer Mode & Flow</th>
                <th class="p-4">Material Requested</th>
                <th class="p-4 text-center">Req. Qty</th>
                <th class="p-4">Initiator & Dept</th>
                <th class="p-4">Needed By</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="8" class="p-12 text-center text-slate-400">No requisitions match your criteria.</td></tr>
              ` : list.map(req => {
                const stock = window.CMS_STORE.getStock(req.materialId);
                const isPending = req.status === 'Pending' || req.status === 'Approved for Issue';
                const isPush = req.transferMode === 'PUSH';
                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4 font-mono font-bold text-slate-900 text-xs">${req.requestNo}</td>
                    <td class="p-4">
                      <span class="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded border ${isPush ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}">
                        ${isPush ? 'PUSH Allocation' : 'PULL Requisition'}
                      </span>
                      <div class="text-[11px] font-semibold text-slate-700 mt-1 flex items-center gap-1">
                        <span>${req.sourceDept || 'Central Stores'}</span>
                        <span class="text-blue-500 font-bold">-></span>
                        <span>${req.destDept || req.department}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-slate-900 text-sm">${req.materialName}</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Brand: ${req.brand || 'Standard'} | Store Stock: <strong class="text-emerald-700">${stock} ${req.unit}</strong></div>
                    </td>
                    <td class="p-4 text-center font-mono font-semibold text-slate-800 text-sm">${req.qty} ${req.unit}</td>
                    <td class="p-4">
                      <div class="font-bold text-slate-900">${req.requestedBy}</div>
                      <div class="text-[11px] text-slate-500">${req.department}</div>
                    </td>
                    <td class="p-4 text-xs">
                      <div class="font-mono">${req.requiredDate || '-'}</div>
                      <span class="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded font-semibold ${req.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'}">
                        ${req.priority || 'Routine'}
                      </span>
                    </td>
                    <td class="p-4">
                      <span class="badge ${req.status === 'Fulfilled' ? 'badge-approved' : req.status === 'Approved for Issue' ? 'badge-pending' : 'badge-draft'}">
                        ${req.status}
                      </span>
                    </td>
                    <td class="p-4 text-right space-x-1">
                      ${isPending ? `
                        <button onclick="CMS_TRANSACTIONS.openIssuanceModal('${req.id}')" class="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition inline-flex items-center gap-1 shadow-sm" title="Issue Material from Store">
                          <i data-lucide="file-output" class="w-3.5 h-3.5"></i>
                          <span>Issue Slip</span>
                        </button>
                      ` : ''}
                      <button onclick="CMS_TRANSACTIONS.openRequestModal('${req.id}')" class="px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                      </button>
                      <button onclick="CMS_TRANSACTIONS.deleteRequest('${req.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
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
    `;
  },

  onRequestSearch(val) {
    this.requestSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderRequests();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openRequestModal(reqId = null) {
    const store = window.CMS_STORE.data;
    const isEdit = Boolean(reqId);
    const r = isEdit ? store.requests.find(i => i.id === reqId) : {
      transferMode: 'PULL',
      sourceDept: 'Central Stores',
      destDept: 'Accounts & Finance',
      materialId: '', qty: 1, requestedBy: '', department: 'Accounts & Finance',
      requiredDate: new Date().toISOString().split('T')[0], priority: 'Routine', remarks: ''
    };

    const consumables = store.consumables || [];
    const depts = ['Central Stores', 'Accounts & Finance', 'Operations Wing', 'IT & Systems', 'Facility Management', 'HR & Administration', 'Quality Control', 'Laboratory Wing'];

    const content = `
      <form id="req-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.saveRequest('${reqId || ''}');">
        
        <!-- PUSH vs PULL MODE SELECTION -->
        <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-2">
          <label class="block font-bold text-slate-800 text-xs">Select Inter-Departmental Transfer Mode *</label>
          <div class="grid grid-cols-2 gap-3">
            <label class="flex items-start gap-2.5 p-3 rounded-md border-2 border-blue-300 bg-blue-50/70 cursor-pointer">
              <input type="radio" name="req-mode" value="PULL" ${r.transferMode !== 'PUSH' ? 'checked' : ''} onchange="CMS_TRANSACTIONS.onTransferModeChange('PULL')" class="mt-0.5 text-blue-600 focus:ring-blue-500" />
              <div>
                <div class="font-bold text-blue-900 text-xs flex items-center gap-1">
                  <span>PULL Mode (Indent)</span>
                </div>
                <p class="text-[10px] text-blue-700 mt-0.5">Department requests material to be pulled from Central Stores or another wing.</p>
              </div>
            </label>

            <label class="flex items-start gap-2.5 p-3 rounded-md border-2 border-purple-300 bg-purple-50/70 cursor-pointer">
              <input type="radio" name="req-mode" value="PUSH" ${r.transferMode === 'PUSH' ? 'checked' : ''} onchange="CMS_TRANSACTIONS.onTransferModeChange('PUSH')" class="mt-0.5 text-purple-600 focus:ring-purple-500" />
              <div>
                <div class="font-bold text-purple-900 text-xs flex items-center gap-1">
                  <span>PUSH Mode (Allocation)</span>
                </div>
                <p class="text-[10px] text-purple-700 mt-0.5">Store or Department actively allocates and pushes equipment/material to target department.</p>
              </div>
            </label>
          </div>
        </div>

        <!-- ROUTING: SOURCE & DESTINATION DEPARTMENTS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 border border-slate-200 rounded-md">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Source Location / Department *</label>
            <input type="text" id="rq-src" list="dept-list" required value="${r.sourceDept || 'Central Stores'}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-medium" placeholder="Source Dept (e.g. Central Stores)" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Target / Destination Department *</label>
            <input type="text" id="rq-dest" list="dept-list" required value="${r.destDept || r.department || 'Accounts & Finance'}" class="w-full px-3 py-2 border border-slate-300 rounded bg-white font-medium" placeholder="Destination Dept (e.g. IT, Facility)" />
          </div>
          <datalist id="dept-list">
            ${depts.map(d => `<option value="${d}">`).join('')}
          </datalist>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Select Consumable / Equipment *</label>
          <select id="rq-mat" required onchange="CMS_TRANSACTIONS.onRequestMaterialChange()" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
            <option value="">-- Choose Consumable or Asset --</option>
            ${consumables.map(m => {
              const liveStock = window.CMS_STORE.getStock(m.id);
              return `<option value="${m.id}" data-stock="${liveStock}" data-unit="${m.unit}" ${r.materialId === m.id ? 'selected' : ''}>[${m.inventoryType || 'Consumer'}] ${m.materialName} (Available Stock: ${liveStock} ${m.unit})</option>`;
            }).join('')}
          </select>
          <div id="rq-stock-indicator" class="text-xs font-semibold text-slate-600 mt-1"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Type Required Quantity *</label>
            <input type="number" step="0.01" id="rq-qty" required value="${r.qty || 1}" class="w-full font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="1" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Priority</label>
            <select id="rq-prio" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md bg-white">
              <option value="Routine" ${r.priority === 'Routine' ? 'selected' : ''}>Routine</option>
              <option value="Urgent" ${r.priority === 'Urgent' ? 'selected' : ''}>Urgent</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Requested / Authorizing Person *</label>
            <input type="text" id="rq-person" required value="${r.requestedBy || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="e.g. Ramesh Chandra / Officer In-Charge" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Needed By Date *</label>
            <input type="date" id="rq-date" required value="${r.requiredDate || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Remarks / Purpose of Requisition / Push Allocation</label>
          <input type="text" id="rq-remarks" value="${r.remarks || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="Reason for requirement or inter-dept push allocation" />
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Submit Request</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Department Request' : 'Raise Department Request (Push / Pull)', content);
    setTimeout(() => this.onRequestMaterialChange(), 50);
  },

  onTransferModeChange(mode) {
    const srcEl = document.getElementById('rq-src');
    const destEl = document.getElementById('rq-dest');
    if (mode === 'PULL') {
      if (srcEl) srcEl.value = 'Central Stores';
      if (destEl && destEl.value === 'Central Stores') destEl.value = 'Accounts & Finance';
    } else {
      if (srcEl && srcEl.value === 'Accounts & Finance') srcEl.value = 'Central Stores';
    }
  },

  onRequestMaterialChange() {
    const sel = document.getElementById('rq-mat');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const ind = document.getElementById('rq-stock-indicator');
    if (opt && opt.value && ind) {
      const stock = opt.getAttribute('data-stock');
      const unit = opt.getAttribute('data-unit');
      ind.innerHTML = `Available Stock in Central Store: <span class="font-mono text-emerald-700 font-bold">${stock} ${unit}</span>`;
    }
  },

  saveRequest(reqId) {
    const store = window.CMS_STORE;
    const modeRadio = document.querySelector('input[name="req-mode"]:checked');
    const transferMode = modeRadio ? modeRadio.value : 'PULL';
    const sourceDept = document.getElementById('rq-src').value.trim() || 'Central Stores';
    const destDept = document.getElementById('rq-dest').value.trim() || 'General Admin';

    const materialId = document.getElementById('rq-mat').value;
    const mat = store.data.consumables.find(m => m.id === materialId);
    const qty = parseFloat(document.getElementById('rq-qty').value) || 0;
    const requestedBy = document.getElementById('rq-person').value.trim();
    const department = destDept;
    const requiredDate = document.getElementById('rq-date').value;
    const priority = document.getElementById('rq-prio').value;
    const remarks = document.getElementById('rq-remarks').value.trim();

    if (!materialId || qty <= 0 || !requestedBy || !destDept) {
      alert('Please fill all mandatory fields with positive quantity.');
      return;
    }

    if (reqId) {
      const idx = store.data.requests.findIndex(r => r.id === reqId);
      if (idx !== -1) {
        store.data.requests[idx] = {
          ...store.data.requests[idx],
          transferMode, sourceDept, destDept,
          materialId, materialName: mat ? mat.materialName : '',
          brand: mat ? mat.brand : '',
          unit: mat ? mat.unit : 'Nos',
          qty, requestedBy, department, requiredDate, priority, remarks
        };
      }
    } else {
      const reqNo = `REQ-${new Date().getFullYear()}-${String(store.data.requests.length + 101)}`;
      store.data.requests.push({
        id: 'REQ-' + String(store.data.requests.length + 1).padStart(3, '0'),
        requestNo: reqNo,
        transferMode,
        sourceDept,
        destDept,
        materialId, materialName: mat ? mat.materialName : '',
        brand: mat ? mat.brand : '',
        unit: mat ? mat.unit : 'Nos',
        qty, requestedBy, department, requiredDate, priority, remarks,
        status: 'Approved for Issue',
        issuedQty: 0,
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`${transferMode === 'PUSH' ? 'Push allocation' : 'Requisition'} submitted successfully!`);
    window.CMS_APP.refreshView();
  },

  deleteRequest(reqId) {
    if (confirm('Delete this request?')) {
      const store = window.CMS_STORE;
      store.data.requests = store.data.requests.filter(r => r.id !== reqId);
      store.save();
      window.CMS_APP.toast('Request deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // ISSUANCE (STORE OUTWARD WITH LIVE STOCK & ISSUE SLIP)
  // ==========================================
  renderIssuances() {
    const store = window.CMS_STORE.data;
    let list = store.issuances || [];

    if (this.issuanceSearchQuery) {
      const q = this.issuanceSearchQuery.toLowerCase();
      list = list.filter(iss =>
        (iss.issueNo || '').toLowerCase().includes(q) ||
        (iss.requestNo || '').toLowerCase().includes(q) ||
        (iss.materialName || '').toLowerCase().includes(q) ||
        (iss.issuedTo || '').toLowerCase().includes(q) ||
        (iss.department || '').toLowerCase().includes(q)
      );
    }

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i data-lucide="file-output" class="w-4 h-4"></i>
              </div>
              <span>Material Store Issuance</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Issue requested consumables from central store. Available stock is shown against each request with printable issue slips.</p>
          </div>
          <button onclick="CMS_TRANSACTIONS.openIssuanceModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>New Store Issuance</span>
          </button>
        </div>

        <!-- Toolbar -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" value="${this.issuanceSearchQuery}" oninput="CMS_TRANSACTIONS.onIssuanceSearch(this.value)" placeholder="Search issue slip, item, recipient..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.issuances.length} issuances
          </div>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Issue Slip No.</th>
                <th class="p-4">Material & Brand</th>
                <th class="p-4 text-center">Issued Qty</th>
                <th class="p-4">Issued To & Dept</th>
                <th class="p-4">Available Stock at Issue</th>
                <th class="p-4">Issue Date</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-12 text-center text-slate-400">No store issuances found.</td></tr>
              ` : list.map(iss => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4">
                    <div class="font-bold text-blue-900 font-mono text-sm">${iss.issueNo}</div>
                    <div class="text-[10px] text-slate-400 font-mono mt-0.5">Req Ref: ${iss.requestNo || '-'}</div>
                    ${iss.transferMode === 'PUSH' ? `
                      <span class="inline-block text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200 mt-1">PUSH</span>
                    ` : ''}
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-slate-900 text-sm">${iss.materialName}</div>
                    <div class="text-[11px] text-slate-500">Brand: ${iss.brand || 'Standard'}</div>
                    ${iss.assetTag ? `<div class="text-[10px] text-blue-700 font-mono font-bold mt-0.5">Tag: ${iss.assetTag}</div>` : ''}
                  </td>
                  <td class="p-4 text-center font-mono font-semibold text-red-700 text-sm">
                    -${iss.issuedQty} <span class="text-slate-500 font-normal text-xs">${iss.unit}</span>
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-slate-900">${iss.issuedTo}</div>
                    <div class="text-[11px] text-slate-500">${iss.department}</div>
                  </td>
                  <td class="p-4 font-mono text-xs text-emerald-700 font-bold">
                    ${iss.availableStockAtIssue || '-'} ${iss.unit}
                  </td>
                  <td class="p-4 text-xs text-slate-600 font-mono">
                    ${new Date(iss.issuedAt || Date.now()).toLocaleDateString('en-IN')}
                  </td>
                  <td class="p-4 text-right space-x-1">
                    <button onclick="CMS_PRINT.printIssueSlip(${JSON.stringify(iss).replace(/"/g, '&quot;')})" class="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition inline-flex items-center gap-1 shadow-sm" title="Print Official Issue Slip">
                      <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                      <span>Print Slip</span>
                    </button>
                    <button onclick="CMS_TRANSACTIONS.deleteIssuance('${iss.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
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

  onIssuanceSearch(val) {
    this.issuanceSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderIssuances();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openIssuanceModal(preselectedReqId = null) {
    const store = window.CMS_STORE.data;
    const pendingReqs = store.requests.filter(r => r.status === 'Approved for Issue' || r.status === 'Pending');

    const content = `
      <form id="issue-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.executeIssuance();">
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-950 font-medium flex items-center gap-2">
          <i data-lucide="info" class="w-4 h-4 text-emerald-600 shrink-0"></i>
          <span>Available stock is dynamically shown against each request. You may modify the issued quantity as required.</span>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Select Pending Request * (Available stock shown)</label>
          <select id="iss-req" required onchange="CMS_TRANSACTIONS.onIssuanceRequestChange()" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
            <option value="">-- Choose Approved Requisition --</option>
            ${pendingReqs.map(r => {
              const liveStock = window.CMS_STORE.getStock(r.materialId);
              return `
                <option value="${r.id}" 
                  data-mat-id="${r.materialId}"
                  data-mat-name="${r.materialName}"
                  data-brand="${r.brand || ''}"
                  data-unit="${r.unit}"
                  data-req-qty="${r.qty}"
                  data-stock="${liveStock}"
                  data-person="${r.requestedBy}"
                  data-dept="${r.department}"
                  ${preselectedReqId === r.id ? 'selected' : ''}>
                  ${r.requestNo} - ${r.materialName} (Req: ${r.qty} ${r.unit} | Live Stock: ${liveStock} ${r.unit}) - ${r.requestedBy} [${r.department}]
                </option>
              `;
            }).join('')}
          </select>
        </div>

        <!-- Dynamic Request Info & Live Stock Callout -->
        <div id="iss-detail-panel" class="hidden p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Material:</span>
              <strong id="iss-disp-mat" class="text-slate-900 font-bold">-</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Requested Qty:</span>
              <strong id="iss-disp-reqqty" class="text-slate-900 font-mono text-sm">-</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Available In Store:</span>
              <strong id="iss-disp-stock" class="text-emerald-700 font-mono text-base">-</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Indenter & Dept:</span>
              <strong id="iss-disp-user" class="text-slate-900 font-bold">-</strong>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Modify Qty if Required (Qty to Issue) *</label>
              <input type="number" step="0.01" id="iss-qty" required class="w-full font-mono font-semibold text-sm px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500" />
              <span id="iss-stock-warning" class="text-xs text-red-600 font-bold hidden mt-1 block">Issue quantity exceeds available warehouse stock!</span>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Issue Remarks / Purpose</label>
              <input type="text" id="iss-remarks" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="Issued for monthly audit work" />
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="printer" class="w-4 h-4"></i>
            <span>Issue & Print Slip</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('Store Outward Issuance', content, 'max-w-3xl');
    setTimeout(() => this.onIssuanceRequestChange(), 50);
  },

  onIssuanceRequestChange() {
    const sel = document.getElementById('iss-req');
    const panel = document.getElementById('iss-detail-panel');
    if (!sel || !panel) return;

    const opt = sel.options[sel.selectedIndex];
    if (opt && opt.value) {
      panel.classList.remove('hidden');
      const matName = opt.getAttribute('data-mat-name');
      const unit = opt.getAttribute('data-unit');
      const reqQty = parseFloat(opt.getAttribute('data-req-qty')) || 0;
      const stock = parseFloat(opt.getAttribute('data-stock')) || 0;
      const user = opt.getAttribute('data-person') + ' (' + opt.getAttribute('data-dept') + ')';

      document.getElementById('iss-disp-mat').innerText = matName;
      document.getElementById('iss-disp-reqqty').innerText = `${reqQty} ${unit}`;
      document.getElementById('iss-disp-stock').innerText = `${stock} ${unit}`;
      document.getElementById('iss-disp-user').innerText = user;

      const qtyInput = document.getElementById('iss-qty');
      qtyInput.value = Math.min(reqQty, stock);
      qtyInput.oninput = () => {
        const val = parseFloat(qtyInput.value) || 0;
        const warn = document.getElementById('iss-stock-warning');
        if (warn) {
          if (val > stock) warn.classList.remove('hidden');
          else warn.classList.add('hidden');
        }
      };
    } else {
      panel.classList.add('hidden');
    }
  },

  executeIssuance() {
    const store = window.CMS_STORE;
    const reqSel = document.getElementById('iss-req');
    const reqId = reqSel.value;
    const req = store.data.requests.find(r => r.id === reqId);
    if (!req) {
      alert('Please select a valid requisition');
      return;
    }

    const availableStock = store.getStock(req.materialId);
    const qtyToIssue = parseFloat(document.getElementById('iss-qty').value) || 0;
    const remarks = document.getElementById('iss-remarks').value.trim();

    if (qtyToIssue <= 0) {
      alert('Issued quantity must be greater than zero.');
      return;
    }

    if (qtyToIssue > availableStock) {
      if (!confirm(`Warning: Requested issue quantity (${qtyToIssue}) exceeds live available store stock (${availableStock}). Proceed anyway?`)) {
        return;
      }
    }

    const mat = store.data.consumables.find(m => m.id === req.materialId);

    const issueNo = `ISS-${new Date().getFullYear()}-${String(store.data.issuances.length + 1).padStart(3, '0')}`;
    const newIssue = {
      id: 'ISS-' + String(store.data.issuances.length + 1).padStart(3, '0'),
      issueNo,
      requestId: req.id,
      requestNo: req.requestNo,
      transferMode: req.transferMode || 'PULL',
      sourceDept: req.sourceDept || 'Central Stores',
      materialId: req.materialId,
      materialName: req.materialName,
      brand: req.brand,
      unit: req.unit,
      assetTag: mat && mat.assetTag ? mat.assetTag : '',
      serialNo: mat && mat.serialNo ? mat.serialNo : '',
      hasWarranty: Boolean(mat && mat.hasWarranty),
      warrantyPeriod: mat ? (mat.warrantyPeriod || '') : '',
      hasPm: Boolean(mat && mat.hasPm),
      pmFrequency: mat ? (mat.pmFrequency || '') : '',
      repairmanName: mat ? (mat.repairmanName || '') : '',
      repairmanContact: mat ? (mat.repairmanContact || '') : '',
      requestedQty: req.qty,
      issuedQty: qtyToIssue,
      availableStockAtIssue: availableStock,
      issuedTo: req.requestedBy,
      department: req.destDept || req.department,
      remarks,
      issuedBy: 'Store In-Charge (' + store.getRole() + ')',
      issuedAt: new Date().toISOString(),
      status: 'Issued'
    };

    store.data.issuances.push(newIssue);

    // Update request state
    req.issuedQty = (req.issuedQty || 0) + qtyToIssue;
    req.status = req.issuedQty >= req.qty ? 'Fulfilled' : 'Partially Fulfilled';

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Material issued successfully! Issue Slip: ${issueNo}`, 'success');
    window.CMS_APP.refreshView();

    setTimeout(() => {
      if (confirm(`Material issued! Would you like to print Issue Slip ${issueNo} now?`)) {
        window.CMS_PRINT.printIssueSlip(newIssue);
      }
    }, 250);
  },

  deleteIssuance(issueId) {
    if (confirm('Delete this issuance? (This will restore the store balance)')) {
      const store = window.CMS_STORE;
      store.data.issuances = store.data.issuances.filter(i => i.id !== issueId);
      store.save();
      window.CMS_APP.toast('Issuance deleted and stock restored!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // RETURN TO STORE
  // ==========================================
  renderReturns() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.returns || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              </div>
              <span>Return to Store</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Record unused or excess consumables returned back to store. Approval replenishes available inventory.</p>
          </div>
          <button onclick="CMS_TRANSACTIONS.openReturnModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Record Return</span>
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Return No.</th>
                <th class="p-4">Material Returned</th>
                <th class="p-4 text-center">Qty Returned</th>
                <th class="p-4">Returned By & Dept</th>
                <th class="p-4">Condition</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-12 text-center text-slate-400">No returns recorded yet.</td></tr>
              ` : list.map(ret => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono font-bold text-slate-900 text-xs">${ret.returnNo}</td>
                  <td class="p-4">
                    <div class="font-bold text-slate-900 text-sm">${ret.materialName}</div>
                    <div class="text-[11px] text-slate-500">Brand: ${ret.brand || 'Standard'}</div>
                  </td>
                  <td class="p-4 text-center font-mono font-semibold text-emerald-700 text-sm">
                    +${ret.qty} <span class="text-slate-500 font-normal text-xs">${ret.unit}</span>
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-slate-900">${ret.returnedBy}</div>
                    <div class="text-[11px] text-slate-500">${ret.department}</div>
                  </td>
                  <td class="p-4 font-medium text-slate-700">${ret.condition || 'Good Condition'}</td>
                  <td class="p-4">
                    <span class="badge ${ret.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${ret.status}</span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    ${ret.status === 'Pending Approval' && role === 'Checker' ? `
                      <button onclick="CMS_TRANSACTIONS.approveReturn('${ret.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition">
                        Approve
                      </button>
                    ` : ''}
                    <button onclick="CMS_TRANSACTIONS.deleteReturn('${ret.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
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

  openReturnModal() {
    const store = window.CMS_STORE.data;
    const consumables = store.consumables || [];

    const content = `
      <form id="ret-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.saveReturn();">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Select Consumable Material *</label>
          <select id="rt-mat" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
            <option value="">-- Choose Consumable --</option>
            ${consumables.map(m => `<option value="${m.id}">${m.materialName} (${m.brand || 'Standard'})</option>`).join('')}
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Type Returned Quantity *</label>
            <input type="number" step="0.01" id="rt-qty" required class="w-full font-mono font-bold px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="1" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Condition of Returned Goods</label>
            <select id="rt-cond" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md bg-white">
              <option value="Good Condition (Direct Restock)">Good Condition (Direct Restock)</option>
              <option value="Partially Used / Usable">Partially Used / Usable</option>
              <option value="Under Repair / Service Due">Under Repair / Service Due</option>
              <option value="Packaging Damaged but Usable">Packaging Damaged but Usable</option>
              <option value="Damaged / Scrap Discard">Damaged / Scrap Discard</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Returned By (Person Name) *</label>
            <input type="text" id="rt-person" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="e.g. Amitabh Sen" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Department *</label>
            <input type="text" id="rt-dept" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="e.g. Accounts & Finance" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Remarks / Reason for Return</label>
          <input type="text" id="rt-remarks" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md" placeholder="Excess quantity unconsumed" />
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Submit Return for Approval</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('Record Return to Store', content);
  },

  saveReturn() {
    const store = window.CMS_STORE;
    const matId = document.getElementById('rt-mat').value;
    const mat = store.data.consumables.find(m => m.id === matId);
    const qty = parseFloat(document.getElementById('rt-qty').value) || 0;
    const condition = document.getElementById('rt-cond').value;
    const returnedBy = document.getElementById('rt-person').value.trim();
    const department = document.getElementById('rt-dept').value.trim();
    const remarks = document.getElementById('rt-remarks').value.trim();

    if (!matId || qty <= 0 || !returnedBy || !department) {
      alert('Please fill all mandatory fields with positive quantity.');
      return;
    }

    const returnNo = `RET-${new Date().getFullYear()}-${String(store.data.returns.length + 1).padStart(3, '0')}`;
    store.data.returns.push({
      id: 'RET-' + String(store.data.returns.length + 1).padStart(3, '0'),
      returnNo,
      materialId: mat.id,
      materialName: mat.materialName,
      brand: mat.brand,
      unit: mat.unit,
      qty, condition, returnedBy, department, remarks,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    });

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast('Return recorded and submitted for approval!');
    window.CMS_APP.refreshView();
  },

  approveReturn(returnId) {
    const store = window.CMS_STORE;
    const ret = store.data.returns.find(r => r.id === returnId);
    if (!ret) return;
    const check = store.canApprove(ret);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    ret.status = 'Approved';
    ret.approvedAt = new Date().toISOString();
    ret.approvedBy = currentUser.id;
    ret.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Return ${ret.returnNo} sanctioned by ${currentUser.name} and stock replenished!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteReturn(returnId) {
    if (confirm('Delete this return entry?')) {
      const store = window.CMS_STORE;
      store.data.returns = store.data.returns.filter(r => r.id !== returnId);
      store.save();
      window.CMS_APP.toast('Return deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // STOCK ADJUSTMENT (+ / -) [Page 6 User Request]
  // ==========================================
  renderStockAdjustments() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.stockAdjustments || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <i data-lucide="scale" class="w-4 h-4"></i>
              </div>
              <span>Stock Adjustment (+ / -)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Directly increase (+) or decrease (-) material quantities for damaged goods, expired stock, or count corrections.</p>
          </div>
          <button onclick="CMS_TRANSACTIONS.openStockAdjustmentModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>New Stock Adjustment</span>
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Adjustment No.</th>
                <th class="p-4">Material Details</th>
                <th class="p-4 text-center">Action & Qty</th>
                <th class="p-4">Reason Category</th>
                <th class="p-4">Stock Before Adj.</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-12 text-center text-slate-400">No stock adjustments recorded.</td></tr>
              ` : list.map(adj => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono font-bold text-slate-900 text-xs">${adj.adjustmentNo}</td>
                  <td class="p-4">
                    <div class="font-bold text-slate-900 text-sm">${adj.materialName}</div>
                    <div class="text-[11px] text-slate-500">Brand: ${adj.brand || 'Standard'} • <span class="italic">${adj.remarks || 'No remarks'}</span></div>
                  </td>
                  <td class="p-4 text-center font-mono font-bold text-sm">
                    ${adj.type === 'ADD' ? `
                      <span class="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">+${adj.qty} ${adj.unit}</span>
                    ` : `
                      <span class="text-red-800 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">-${adj.qty} ${adj.unit}</span>
                    `}
                  </td>
                  <td class="p-4">
                    <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                      ${adj.reason}
                    </span>
                  </td>
                  <td class="p-4 font-mono text-slate-700">
                    ${adj.systemStockBefore ?? '-'} ${adj.unit}
                  </td>
                  <td class="p-4">
                    <span class="badge ${adj.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${adj.status}</span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    ${adj.status === 'Pending Approval' && role === 'Checker' ? `
                      <button onclick="CMS_TRANSACTIONS.approveStockAdjustment('${adj.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition">
                        Approve
                      </button>
                    ` : ''}
                    <button onclick="CMS_TRANSACTIONS.deleteStockAdjustment('${adj.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition">
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

  openStockAdjustmentModal() {
    const store = window.CMS_STORE.data;
    const consumables = store.consumables || [];

    const content = `
      <form id="adj-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_TRANSACTIONS.saveStockAdjustment();">
        <div class="p-3.5 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-950 font-medium flex items-center gap-2">
          <i data-lucide="scale" class="w-4 h-4 text-indigo-600 shrink-0"></i>
          <span>Direct Manual Stock Adjustment allows calibrating physical inventory with an audit trail and maker-checker approval.</span>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Select Material *</label>
          <select id="adj-mat" required onchange="CMS_TRANSACTIONS.onAdjustmentMaterialChange()" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white">
            <option value="">-- Choose Material to Adjust --</option>
            ${consumables.map(m => {
              const liveStock = window.CMS_STORE.getStock(m.id);
              return `<option value="${m.id}" data-stock="${liveStock}" data-unit="${m.unit}">${m.materialName} (Current Stock: ${liveStock} ${m.unit})</option>`;
            }).join('')}
          </select>
          <div id="adj-stock-info" class="text-xs font-semibold text-slate-600 mt-1"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Adjustment Operation *</label>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center gap-2 p-3 border-2 border-emerald-300 rounded-md bg-emerald-50/70 cursor-pointer">
                <input type="radio" name="adj-type" value="ADD" onchange="CMS_TRANSACTIONS.recalcAdjustedStockPreview()" checked class="text-emerald-600 focus:ring-emerald-500" />
                <span class="font-bold text-emerald-900 text-xs">Add (+) Stock</span>
              </label>
              <label class="flex items-center gap-2 p-3 border-2 border-red-300 rounded-md bg-red-50/70 cursor-pointer">
                <input type="radio" name="adj-type" value="DEDUCT" onchange="CMS_TRANSACTIONS.recalcAdjustedStockPreview()" class="text-red-600 focus:ring-red-500" />
                <span class="font-bold text-red-900 text-xs">Deduct (-) Stock</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Adjustment Quantity *</label>
            <input type="number" step="0.01" id="adj-qty" required oninput="CMS_TRANSACTIONS.recalcAdjustedStockPreview()" class="w-full font-mono font-semibold text-sm px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="0" />
          </div>
        </div>

        <!-- Live Calculation Preview -->
        <div class="p-3.5 bg-slate-100 border border-slate-200 rounded-md flex justify-between items-center text-xs">
          <div>Current Store Balance: <strong id="adj-prev-curr" class="font-mono text-slate-800">0</strong></div>
          <div>Resulting New Stock: <strong id="adj-prev-new" class="font-mono text-indigo-700 text-sm">0</strong></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Reason Category *</label>
            <select id="adj-reason" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md bg-white">
              <option value="Damaged Goods">Damaged Goods / Spoilage</option>
              <option value="Expired / Shelf-life End">Expired / Shelf-life End</option>
              <option value="Found Unrecorded Stock">Found Unrecorded Stock</option>
              <option value="Inventory Count Correction">Inventory Count Correction</option>
              <option value="Quality Inspection Rejection">Quality Inspection Rejection</option>
              <option value="Sample Testing / Demo">Sample Testing / Demo Discard</option>
              <option value="Other Discrepancy">Other Discrepancy</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Remarks / Justification *</label>
            <input type="text" id="adj-remarks" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Liquid leakage found during bin inspection" />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Submit for Approval</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('New Stock Adjustment (+ / -)', content);
    setTimeout(() => this.onAdjustmentMaterialChange(), 50);
  },

  onAdjustmentMaterialChange() {
    const sel = document.getElementById('adj-mat');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const info = document.getElementById('adj-stock-info');
    if (opt && opt.value && info) {
      const stock = opt.getAttribute('data-stock');
      const unit = opt.getAttribute('data-unit');
      info.innerHTML = `Current Store Stock: <span class="font-mono text-indigo-700 font-bold">${stock} ${unit}</span>`;
      document.getElementById('adj-prev-curr').innerText = `${stock} ${unit}`;
      this.recalcAdjustedStockPreview();
    }
  },

  recalcAdjustedStockPreview() {
    const sel = document.getElementById('adj-mat');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const currentStock = opt && opt.value ? parseFloat(opt.getAttribute('data-stock')) || 0 : 0;
    const unit = opt && opt.value ? opt.getAttribute('data-unit') : '';

    const typeRadio = document.querySelector('input[name="adj-type"]:checked');
    const type = typeRadio ? typeRadio.value : 'ADD';
    const qty = parseFloat(document.getElementById('adj-qty')?.value) || 0;

    let resulting = type === 'ADD' ? currentStock + qty : currentStock - qty;
    resulting = Math.max(0, resulting);

    const newEl = document.getElementById('adj-prev-new');
    if (newEl) {
      newEl.innerText = `${resulting} ${unit}`;
    }
  },

  saveStockAdjustment() {
    const store = window.CMS_STORE;
    const matId = document.getElementById('adj-mat').value;
    const mat = store.data.consumables.find(m => m.id === matId);
    if (!mat) {
      alert('Please select a material.');
      return;
    }

    const typeRadio = document.querySelector('input[name="adj-type"]:checked');
    const type = typeRadio ? typeRadio.value : 'ADD';
    const qty = parseFloat(document.getElementById('adj-qty').value) || 0;
    const reason = document.getElementById('adj-reason').value;
    const remarks = document.getElementById('adj-remarks').value.trim();
    const currentStock = store.getStock(matId);

    if (qty <= 0) {
      alert('Adjustment quantity must be greater than zero.');
      return;
    }

    if (type === 'DEDUCT' && qty > currentStock) {
      if (!confirm(`Warning: Deducting ${qty} ${mat.unit} will exceed current available stock of ${currentStock} ${mat.unit}. Continue?`)) {
        return;
      }
    }

    const adjNo = `ADJ-${new Date().getFullYear()}-${String(store.data.stockAdjustments.length + 1).padStart(3, '0')}`;
    store.data.stockAdjustments.push({
      id: 'ADJ-' + String(store.data.stockAdjustments.length + 1).padStart(3, '0'),
      adjustmentNo: adjNo,
      materialId: mat.id,
      materialName: mat.materialName,
      brand: mat.brand,
      unit: mat.unit,
      type,
      qty,
      systemStockBefore: currentStock,
      reason,
      remarks,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    });

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Stock adjustment ${adjNo} submitted for approval!`, 'success');
    window.CMS_APP.refreshView();
  },

  approveStockAdjustment(adjId) {
    const store = window.CMS_STORE;
    const adj = store.data.stockAdjustments.find(a => a.id === adjId);
    if (!adj) return;
    const check = store.canApprove(adj);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    adj.status = 'Approved';
    adj.approvedAt = new Date().toISOString();
    adj.approvedBy = currentUser.id;
    adj.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Stock adjustment ${adj.adjustmentNo} sanctioned by ${currentUser.name} and live stock updated!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteStockAdjustment(adjId) {
    if (confirm('Delete this stock adjustment?')) {
      const store = window.CMS_STORE;
      store.data.stockAdjustments = store.data.stockAdjustments.filter(a => a.id !== adjId);
      store.save();
      window.CMS_APP.toast('Adjustment deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  }
};
