const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// I will just rewrite the `addVendorQuotationRow` innerHTML up to the file upload to ensure perfect structure.
const startMarker = `row.innerHTML = \``;
const endMarker = `        <div>\n          <label class="block font-bold text-slate-700 mb-1 text-[10px]">Upload Quotation Copy (PDF / Image)</label>`;

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex > -1 && endIndex > -1) {
    const fixedHTML = `
        <button type="button" onclick="this.parentElement.remove()" class="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition" title="Remove row"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-3 pr-6">
          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Ref No</label>
            <input type="text" class="q-no w-full font-mono uppercase font-bold text-blue-600 px-2.5 py-1.5 border border-blue-300 rounded text-xs bg-white" value="\${no}" placeholder="e.g. QT-101" />
          </div>
          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Date</label>
            <input type="date" class="q-date w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${dt}" max="\${today}" onchange="CMS_MASTERS.onQuotationDateChange(this)" />
          </div>
          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Effective From</label>
            <input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${eff}" \${!dt ? 'disabled' : \`min="\${dt}"\`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />
          </div>
          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>
            <input type="date" class="q-valid w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${exp}" \${!eff ? 'disabled' : \`min="\${eff}"\`} />
          </div>
          <div>
            <label class="block font-bold text-amber-700 mb-1 text-[10px]">Alert Date</label>
            <input type="date" class="q-alert w-full font-mono px-2.5 py-1.5 border border-amber-300 bg-amber-50 rounded text-xs" value="\${qData ? (qData.alertDate || '') : ''}" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mt-2">
          <div class="col-span-12 sm:col-span-6 lg:col-span-8">
            <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Select Existing Material</label>
            <select class="q-mat-id w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white" onchange="const o=this.options[this.selectedIndex]; if(!o.value)return; const r=this.closest('.quote-row'); r.querySelector('.q-mat-name').value=o.dataset.name; r.querySelector('.q-rate').value=o.dataset.rate; r.querySelector('.q-mrp').value=o.dataset.mrp; r.querySelector('.q-unit').value=o.dataset.unit; r.querySelector('.q-hsn').value=o.dataset.hsn;">
              <option value="">-- Choose Existing Material --</option>
              \${(window.CMS_STORE.data.consumables || []).map(m => \`<option value="\${m.id}" data-name="\${m.materialName}" data-rate="\${m.quotationRate || m.vendor1Rate || 0}" data-mrp="\${m.mrpBooked || ''}" data-unit="\${m.unit || 'Nos'}" data-hsn="\${m.hsnCode || ''}" \${matId === m.id ? 'selected' : ''}>[\${m.inventoryType || 'Consumer'}] \${m.materialName} - Code: \${m.id}</option>\`).join('')}
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col justify-end">
            <input type="hidden" class="q-mat-name" value="\${matName}" />
            <button type="button" onclick="CMS_MASTERS.openConsumableModal(null)" class="w-full px-2.5 py-1.5 bg-slate-50 border border-blue-300 rounded text-xs text-blue-600 font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5">
              <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add New Material
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">
          <div class="flex flex-col justify-end">
            <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Approved Rate</label>
            <input type="number" step="0.01" class="q-rate w-full font-mono font-bold text-blue-600 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${rate}" placeholder="0.00" onchange="CMS_MASTERS.checkRateVsMrp(this)" />
          </div>
          <div class="flex flex-col justify-end">
            <label class="flex justify-between items-center font-semibold text-slate-700 mb-1 text-[10px] w-full">
              <span>MRP</span>
              <label class="flex items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-700" title="MRP is not applicable">
                <input type="checkbox" class="q-mrp-na m-0 h-3 w-3" onchange="CMS_MASTERS.toggleMrp(this)" \${qData && qData.mrpNotApplicable ? 'checked' : ''} />
                <span class="text-[9px]">N/A</span>
              </label>
            </label>
            <input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${mrp}" placeholder="0.00" onchange="CMS_MASTERS.checkRateVsMrp(this)" \${qData && qData.mrpNotApplicable ? 'disabled' : ''} />
          </div>
          <div class="flex flex-col justify-end">
            <label class="block font-semibold text-slate-700 mb-1 text-[10px]">UOM</label>
            <input type="text" class="q-unit w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${unit}" placeholder="Nos, Rim, Box" />
          </div>
          <div class="flex flex-col justify-end">
            <label class="block font-semibold text-slate-700 mb-1 text-[10px]">HSN / SAC</label>
            <input type="text" class="q-hsn w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${hsn}" placeholder="e.g. 4802" />
          </div>
        </div>
`;

    code = code.substring(0, startIndex + startMarker.length) + '\n' + fixedHTML + '\n' + code.substring(endIndex);
    fs.writeFileSync('js/masters.js', code);
    console.log("Fixed deeply nested grid issue.");
}
