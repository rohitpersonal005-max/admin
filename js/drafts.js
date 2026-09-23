/**
 * Draft Workspace for quotations and invoice receipts awaiting approval.
 */
window.CMS_DRAFTS = {
  isDraft(record) {
    return ['Draft', 'Pending Approval'].includes(record.status);
  },

  formatDate(value) {
    return value ? new Date(value).toLocaleDateString('en-IN') : '-';
  },

  statusBadge(status) {
    const style = status === 'Pending Approval' ? 'badge-pending' : 'badge-draft';
    return `<span class="badge ${style}">${status}</span>`;
  },

  render() {
    const store = window.CMS_STORE.data;
    const quotations = (store.consumables || []).filter(item => this.isDraft(item) && item.quotationNo);
    const invoices = (store.receipts || []).filter(receipt => receipt.type === 'Invoice' && this.isDraft(receipt));
    const pendingCount = [...quotations, ...invoices].filter(item => item.status === 'Pending Approval').length;

    return `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <i data-lucide="file-clock" class="w-5 h-5"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Draft Workspace</h2>
                <p class="text-xs text-slate-500 mt-0.5">Keep quotations and invoice receipts here until they are ready for approval.</p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="CMS_MASTERS.openConsumableModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-xs transition">
              <i data-lucide="file-plus-2" class="w-3.5 h-3.5"></i>
              New Quotation
            </button>
            <button onclick="CMS_TRANSACTIONS.openReceiptModal('Invoice')" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md text-xs transition">
              <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
              New Invoice Draft
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-blue-600">Quotation Drafts</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${quotations.length}</div>
            <div class="text-xs text-slate-500 mt-1">Unapproved consumer or workstation quotes</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Invoice Drafts</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${invoices.length}</div>
            <div class="text-xs text-slate-500 mt-1">Invoice receipts not yet approved</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
            <div class="text-[10px] uppercase tracking-wider font-bold text-amber-600">Awaiting Approval</div>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${pendingCount}</div>
            <div class="text-xs text-slate-500 mt-1">Submitted for Checker review</div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
          ${this.renderQuotationPanel(quotations)}
          ${this.renderInvoicePanel(invoices)}
        </div>
      </div>
    `;
  },

  renderQuotationPanel(items) {
    return `
      <section class="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>Quotation Drafts</h3>
            <p class="text-[11px] text-slate-500 mt-1">Consumer materials and workstations awaiting authorization.</p>
          </div>
          <span class="font-mono text-xs font-bold text-blue-700">${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100">
          ${items.length === 0 ? this.emptyState('No quotation drafts saved.', 'Create a quotation from the button above.') : items.map(item => `
            <div class="p-4 hover:bg-slate-50 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate">${item.materialName}</div>
                  <div class="text-[11px] text-slate-500 font-mono mt-0.5">${item.quotationNo} · ${item.inventoryType || 'Consumer'} · ${this.formatDate(item.quotationDate || item.createdAt)}</div>
                </div>
                ${this.statusBadge(item.status)}
              </div>
              <div class="flex items-center justify-between gap-3 mt-3">
                <div class="text-xs text-slate-600">Quote rate <strong class="font-mono text-slate-900">₹${Number(item.quotationRate || item.vendor1Rate || 0).toFixed(2)}</strong> · MRP <strong class="font-mono text-slate-900">₹${Number(item.mrpBooked || 0).toFixed(2)}</strong></div>
                <div class="flex gap-1.5 shrink-0">
                  <button onclick="CMS_MASTERS.openConsumableModal('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200">Edit</button>
                  <button onclick="CMS_MASTERS.deleteConsumable('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200">Delete</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  renderInvoicePanel(items) {
    return `
      <section class="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="receipt" class="w-4 h-4 text-emerald-600"></i>Invoice Drafts</h3>
            <p class="text-[11px] text-slate-500 mt-1">Tax invoices saved before stock-credit approval.</p>
          </div>
          <span class="font-mono text-xs font-bold text-emerald-700">${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100">
          ${items.length === 0 ? this.emptyState('No invoice drafts saved.', 'Create an invoice draft from the button above.') : items.map(item => `
            <div class="p-4 hover:bg-slate-50 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate">${item.docNo || item.receiptNo}</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">${item.vendorName || 'Vendor not selected'} · ${item.materialName || 'Material not selected'} · ${this.formatDate(item.docDate || item.createdAt)}</div>
                </div>
                ${this.statusBadge(item.status)}
              </div>
              <div class="flex items-center justify-between gap-3 mt-3">
                <div class="text-xs text-slate-600">Invoice value <strong class="font-mono text-slate-900">₹${Number(item.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></div>
                <div class="flex gap-1.5 shrink-0">
                  <button onclick="CMS_TRANSACTIONS.openReceiptModal('Invoice', '${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200">Edit</button>
                  <button onclick="CMS_TRANSACTIONS.deleteReceipt('${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200">Delete</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  emptyState(title, description) {
    return `<div class="p-8 text-center"><i data-lucide="inbox" class="w-7 h-7 mx-auto text-slate-300"></i><div class="text-sm font-semibold text-slate-600 mt-2">${title}</div><div class="text-xs text-slate-400 mt-1">${description}</div></div>`;
  }
};