/**
 * Draft Workspace for vendors, quotations, consumables, and invoice receipts awaiting approval.
 */
window.CMS_DRAFTS = {
  isDraft(record) {
    if (!record || !record.status) return false;
    return ['Draft', 'Pending Approval', 'Pending', 'Revision Required', 'Rejected'].includes(record.status);
  },

  formatDate(value) {
    return value ? new Date(value).toLocaleDateString('en-IN') : '-';
  },

  statusBadge(status) {
    let style = 'bg-slate-100 text-slate-700 border-slate-300';
    if (status === 'Pending Approval' || status === 'Pending') {
      style = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
    } else if (status === 'Revision Required' || status === 'Rejected') {
      style = 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
    } else if (status === 'Draft') {
      style = 'bg-blue-100 text-blue-800 border-blue-300 font-bold';
    }
    return `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wide border ${style}">${status}</span>`;
  },

  render() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const quotations = (store.consumables || []).filter(item => this.isDraft(item));
    const invoices = (store.receipts || []).filter(receipt => this.isDraft(receipt));
    const vendorDrafts = (store.vendors || []).filter(vendor => this.isDraft(vendor));
    const pendingCount = [...quotations, ...invoices, ...vendorDrafts].filter(item => item.status === 'Pending Approval' || item.status === 'Pending').length;

    return `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Top Workspace Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
          <div>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-sm bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <i data-lucide="file-clock" class="w-5 h-5"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Draft Workspace</h2>
                <p class="text-xs text-slate-500 mt-0.5">Central workbench for saving drafts, reviewing pending submissions, and preparing records for Admin governance.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            ${role === 'User' ? `
              <button onclick="CMS_MASTERS.openVendorModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-sm text-xs shadow-sm transition">
                <i data-lucide="building" class="w-3.5 h-3.5"></i>
                New Vendor Draft
              </button>
              <button onclick="CMS_MASTERS.openConsumableModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm text-xs shadow-sm transition">
                <i data-lucide="file-plus-2" class="w-3.5 h-3.5"></i>
                New Quotation / Material
              </button>
              <button onclick="CMS_TRANSACTIONS.openReceiptModal('Invoice')" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs shadow-sm transition">
                <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
                New Invoice Draft
              </button>
            ` : `
              <button onclick="CMS_APP.navigateTo('pending-approvals')" class="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm text-xs shadow-sm transition">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
                Open Approval Governance Hub
              </button>
            `}
          </div>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-purple-600">Vendor Drafts</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${vendorDrafts.length}</div>
            <div class="text-xs text-slate-500 mt-1">Pending or auto-saved vendor records</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-blue-600">Quotation / Material Drafts</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${quotations.length}</div>
            <div class="text-xs text-slate-500 mt-1">Consumables & quotes awaiting sanction</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Invoice Drafts</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${invoices.length}</div>
            <div class="text-xs text-slate-500 mt-1">Inward receipts not yet approved</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-sm shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-amber-600">Awaiting Admin Action</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${pendingCount}</div>
            <div class="text-xs text-slate-500 mt-1">Four-eyes check pending approval</div>
          </div>
        </div>

        <!-- Panels Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
          ${this.renderVendorPanel(vendorDrafts)}
          ${this.renderQuotationPanel(quotations)}
          ${this.renderInvoicePanel(invoices)}
        </div>
      </div>
    `;
  },

  renderVendorPanel(items) {
    const role = window.CMS_STORE.getRole();
    return `
      <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="building" class="w-4 h-4 text-purple-600"></i>Vendor Drafts</h3>
          </div>
          <span class="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100 flex-1">
          ${items.length === 0 ? this.emptyState('No vendor drafts saved.', 'Vendor drafts will auto-save here as you type or click "Save Draft".') : items.map(item => `
            <div class="p-4 hover:bg-slate-50/80 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate" title="${item.name || 'Unnamed Vendor'}">${item.name || 'Unnamed Vendor'}</div>
                  <div class="text-[11px] text-slate-500 font-mono mt-0.5">${item.gstNo || item.id} · ${this.formatDate(item.createdAt || item.updatedAt)}</div>
                </div>
                ${this.statusBadge(item.status)}
              </div>
              <div class="text-xs text-slate-600 mt-2 truncate">${item.addressDistrict ? (item.addressDistrict + ', ') : ''}${item.addressState || 'India'}</div>
              <div class="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
                <span class="text-[11px] text-slate-400 font-mono">ID: ${item.id}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  ${role === 'User' ? `
                    <button onclick="CMS_MASTERS.openVendorModal('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition">Edit Draft</button>
                  ` : `
                    <button onclick="CMS_MASTERS.openVendorSanctionModal('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition">Review & Sanction</button>
                  `}
                  <button onclick="CMS_MASTERS.deleteVendor('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition flex items-center gap-1" title="Delete Draft Vendor">
                    <i data-lucide="trash-2" class="w-3 h-3 text-rose-600"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  renderQuotationPanel(items) {
    const role = window.CMS_STORE.getRole();
    return `
      <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>Quotation / Material Drafts</h3>
          </div>
          <span class="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100 flex-1">
          ${items.length === 0 ? this.emptyState('No quotation drafts saved.', 'Materials and quotes saved as draft will appear here.') : items.map(item => `
            <div class="p-4 hover:bg-slate-50/80 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate" title="${item.materialName}">${item.materialName || 'Unnamed Material'}</div>
                  <div class="text-[11px] text-slate-500 font-mono mt-0.5">${item.quotationNo ? ('Quote: ' + item.quotationNo) : item.id} · ${item.inventoryType || 'Consumer'} · ${this.formatDate(item.quotationDate || item.createdAt)}</div>
                </div>
                ${this.statusBadge(item.status)}
              </div>
              <div class="text-xs text-slate-600 mt-2">Rate: <strong class="font-mono text-slate-900">₹${Number(item.quotationRate || item.vendor1Rate || 0).toFixed(2)}</strong> · MRP: <strong class="font-mono text-slate-900">₹${Number(item.mrpBooked || 0).toFixed(2)}</strong></div>
              <div class="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
                <span class="text-[11px] text-slate-400 font-mono">ID: ${item.id}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  ${role === 'User' ? `
                    <button onclick="CMS_MASTERS.openConsumableModal('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition">Edit Draft</button>
                  ` : `
                    <button onclick="CMS_APP.navigateTo('pending-approvals')" class="px-2.5 py-1 text-[11px] font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition">Review</button>
                  `}
                  <button onclick="CMS_MASTERS.deleteConsumable('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition flex items-center gap-1" title="Delete Draft Quotation / Material">
                    <i data-lucide="trash-2" class="w-3 h-3 text-rose-600"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  renderInvoicePanel(items) {
    const role = window.CMS_STORE.getRole();
    return `
      <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="receipt" class="w-4 h-4 text-emerald-600"></i>Invoice / Inward Drafts</h3>
          </div>
          <span class="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100 flex-1">
          ${items.length === 0 ? this.emptyState('No invoice drafts saved.', 'Invoice drafts will appear here before submission.') : items.map(item => `
            <div class="p-4 hover:bg-slate-50/80 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate">${item.docNo || item.receiptNo || 'Draft Receipt'}</div>
                  <div class="text-[11px] text-slate-500 mt-0.5 truncate">${item.vendorName || 'Vendor not selected'} · ${item.materialName || 'Material not selected'}</div>
                </div>
                ${this.statusBadge(item.status)}
              </div>
              <div class="text-xs text-slate-600 mt-2">Amount: <strong class="font-mono text-slate-900">₹${Number(item.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong> · ${this.formatDate(item.docDate || item.createdAt)}</div>
              <div class="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
                <span class="text-[11px] text-slate-400 font-mono">ID: ${item.id}</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  ${role === 'User' ? `
                    <button onclick="CMS_TRANSACTIONS.openReceiptModal('${item.type || 'Invoice'}', '${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition">Edit</button>
                  ` : `
                    <button onclick="CMS_APP.navigateTo('pending-approvals')" class="px-2.5 py-1 text-[11px] font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition">Review</button>
                  `}
                  <button onclick="CMS_TRANSACTIONS.deleteReceipt('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition flex items-center gap-1" title="Delete Draft Invoice / Receipt">
                    <i data-lucide="trash-2" class="w-3 h-3 text-rose-600"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  emptyState(title, description) {
    return `<div class="p-8 text-center"><i data-lucide="inbox" class="w-8 h-8 mx-auto text-slate-300"></i><div class="text-sm font-semibold text-slate-600 mt-2">${title}</div><div class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">${description}</div></div>`;
  }
};
