const fs = require('fs');
let code = fs.readFileSync('js/drafts.js', 'utf8');

const regex1 = /const invoices = \(store\.receipts \|\| \[\]\)\.filter\(receipt => receipt\.type === 'Invoice' && this\.isDraft\(receipt\)\);/g;
const replace1 = `const invoices = (store.receipts || []).filter(receipt => receipt.type === 'Invoice' && this.isDraft(receipt));
      const vendorDrafts = (store.vendors || []).filter(vendor => this.isDraft(vendor));`;

code = code.replace(regex1, replace1);

const regex2 = /const pendingCount = \[\.\.\.quotations, \.\.\.invoices\]\.filter\(item => item\.status === 'Pending Approval'\)\.length;/g;
const replace2 = `const pendingCount = [...quotations, ...invoices, ...vendorDrafts].filter(item => item.status === 'Pending Approval').length;`;

code = code.replace(regex2, replace2);

const regex3 = /<div class="grid grid-cols-1 xl:grid-cols-2 gap-5">/g;
const replace3 = `<div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
          \${this.renderVendorPanel(vendorDrafts)}`;

code = code.replace(regex3, replace3);

const regex4 = /renderQuotationPanel\(items\) \{/g;
const replace4 = `renderVendorPanel(items) {
    return \`
      <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2"><i data-lucide="building" class="w-4 h-4 text-purple-600"></i>Vendor Drafts</h3>
          </div>
          <span class="font-mono text-xs font-bold text-purple-700">\${items.length}</span>
        </div>
        <div class="divide-y divide-slate-100">
          \${items.length === 0 ? this.emptyState('No vendor drafts saved.', 'Create a new vendor from the Master Catalog.') : items.map(item => \`
            <div class="p-4 hover:bg-slate-50 transition">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm text-slate-900 truncate">\${item.name || 'Unnamed Vendor'}</div>
                  <div class="text-[11px] text-slate-500 font-mono mt-0.5">\${item.gstNo || 'No GST'} A \${this.formatDate(item.createdAt)}</div>
                </div>
                \${this.statusBadge(item.status)}
              </div>
              <div class="flex items-center justify-between gap-3 mt-3">
                <div class="text-xs text-slate-600">\${item.addressDistrict || ''} \${item.addressState || ''}</div>
                \${window.CMS_STORE.getRole() === 'User' ? \`
                  <div class="flex gap-1.5 shrink-0">
                    <button onclick="CMS_APP.navigateTo('vendors'); setTimeout(()=>CMS_MASTERS.openVendorModal('\${item.id}'), 100);" class="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded border border-purple-200">Edit</button>
                    <button onclick="CMS_MASTERS.deleteVendor('\${item.id}')" class="px-2.5 py-1 text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200">Delete</button>
                  </div>
                \` : ''}
              </div>
            </div>
          \`).join('')}
        </div>
      </section>
    \`;
  },

  renderQuotationPanel(items) {`;

code = code.replace(regex4, replace4);

fs.writeFileSync('js/drafts.js', code);
console.log('Patched drafts.js with vendors logic.');
