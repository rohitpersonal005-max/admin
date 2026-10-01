const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const addMethod = `
  addVendorQuotationRow(qData = null) {
    const container = document.getElementById('v-quotations-container');
    if (!container) return;
    const rowId = 'quote_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    
    const no = qData ? (qData.quotationNo || '') : '';
    const dt = qData ? (qData.quotationDate || '') : '';
    const exp = qData ? (qData.quotationValidTill || '') : '';
    const matId = qData ? (qData.materialId || '') : '';
    const matName = qData ? (qData.materialName || '') : '';
    const rate = qData ? (qData.rate || '') : '';
    const mrp = qData ? (qData.mrp || '') : '';
    const unit = qData ? (qData.unit || 'Nos') : 'Nos';
    const hsn = qData ? (qData.hsn || '8472') : '8472';
    const doc = qData ? (qData.doc || '') : '';
    
    const row = document.createElement('div');
    row.className = 'quote-row p-3 bg-white border border-blue-200 rounded-md space-y-2.5 relative shadow-sm';
    row.innerHTML = \`
      <button type="button" onclick="this.parentElement.remove()" class="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition" title="Remove row"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Ref No</label>
          <input type="text" class="q-no w-full font-mono uppercase font-bold text-blue-900 px-2.5 py-1.5 border border-blue-300 rounded text-xs bg-white" value="\${no}" placeholder="e.g. QT-101" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Date</label>
          <input type="date" class="q-date w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${dt}" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>
          <input type="date" class="q-exp w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${exp}" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
        <div class="sm:col-span-6">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Select Existing Material (Optional)</label>
          <select class="q-mat-id w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white" onchange="const o=this.options[this.selectedIndex]; if(!o.value)return; const r=this.closest('.quote-row'); r.querySelector('.q-mat-name').value=o.dataset.name; r.querySelector('.q-rate').value=o.dataset.rate; r.querySelector('.q-mrp').value=o.dataset.mrp; r.querySelector('.q-unit').value=o.dataset.unit; r.querySelector('.q-hsn').value=o.dataset.hsn;">
            <option value="">-- Choose Existing Material --</option>
            \${(window.CMS_STORE.data.consumables || []).map(m => \`<option value="\${m.id}" data-name="\${m.materialName}" data-rate="\${m.quotationRate || m.vendor1Rate || 0}" data-mrp="\${m.mrpBooked || ''}" data-unit="\${m.unit || 'Nos'}" data-hsn="\${m.hsnCode || ''}" \${matId === m.id ? 'selected' : ''}>[\${m.inventoryType || 'Consumer'}] \${m.materialName} - Code: \${m.id}</option>\`).join('')}
          </select>
        </div>
        <div class="sm:col-span-6">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Item / Material Description</label>
          <input type="text" class="q-mat-name w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${matName}" placeholder="e.g. A4 Copier Paper (75 GSM)" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Approved Rate</label>
          <input type="number" step="0.01" class="q-rate w-full font-mono font-bold text-blue-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${rate}" placeholder="0.00" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">MRP</label>
          <input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${mrp}" placeholder="0.00" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">UOM</label>
          <input type="text" class="q-unit w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${unit}" placeholder="Nos, Rim, Box" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">HSN / SAC</label>
          <input type="text" class="q-hsn w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${hsn}" placeholder="e.g. 4802" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-slate-700 mb-1 text-[10px]">Upload Quotation Copy (PDF / Image)</label>
        <input type="file" class="q-file text-xs" accept=".pdf,image/*" />
        \${doc ? \`<span class="block text-[10px] text-emerald-700 font-mono mt-0.5">Attached on record: \${doc}</span>\` : ''}
      </div>
    \`;
    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
  },
`;

code = code.replace(/addCertificateRow\(certData = null\) \{/, addMethod + '  addCertificateRow(certData = null) {');

// Render initialization
const popScript = `
      const certList = vendor.certificates || [];
      if (certList.length > 0) {
        certList.forEach(c => this.addCertificateRow(c));
      }

      setTimeout(() => {
        const qList = vendor.quotedItems || [];
        if (qList.length === 0 && (vendor.quotedMaterialId || vendor.quotedMaterialName || vendor.quotationNo)) {
          CMS_MASTERS.addVendorQuotationRow({
            quotationNo: vendor.quotationNo,
            quotationDate: vendor.quotationDate,
            quotationValidTill: vendor.quotationValidTill,
            materialId: vendor.quotedMaterialId,
            materialName: vendor.quotedMaterialName,
            rate: vendor.quotedMaterialRate,
            mrp: vendor.quotedMaterialMrp,
            unit: vendor.quotedMaterialUnit,
            hsn: vendor.quotedMaterialHsn,
            doc: vendor.quotationDoc
          });
        } else if (qList.length > 0) {
          qList.forEach(q => CMS_MASTERS.addVendorQuotationRow(q));
        } else {
          CMS_MASTERS.addVendorQuotationRow();
        }
      }, 0);
`;
code = code.replace(/const certList = vendor\.certificates \|\| \[\];[\s\S]*?this\.addCertificateRow\(c\)\);\s*\}/, popScript);

fs.writeFileSync('js/masters.js', code);
