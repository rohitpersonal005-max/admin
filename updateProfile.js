const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const profileStart = code.indexOf('<i data-lucide="file-text" class="w-3.5 h-3.5 text-blue-600"></i> Approved Commercial Quotation');
const profileEnd = code.indexOf('<!-- Regulatory & Compliance Certificates -->');

if (profileStart > -1 && profileEnd > -1) {
  let pScript = `
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-blue-600"></i> Approved Commercial Quotations & Materials
            </span>
            <div class="space-y-3">
              \${(v.quotedItems && v.quotedItems.length > 0) ? v.quotedItems.map(q => \`
                <div class="border border-blue-200 bg-white rounded p-2 text-xs">
                  <div class="flex items-center justify-between mb-1.5 pb-1.5 border-b border-blue-100">
                    <div>
                      <span class="text-slate-500 text-[10px]">Quote Ref:</span> <strong class="text-blue-900">\${q.quotationNo || 'Direct'}</strong>
                      <span class="text-slate-500 text-[10px] ml-3">Date:</span> <strong class="font-mono">\${window.CMS_STORE.formatDate(q.quotationDate)}</strong>
                      <span class="text-slate-500 text-[10px] ml-3">Valid Till:</span> 
                      <strong class="font-mono \${q.quotationValidTill && new Date(q.quotationValidTill) < new Date() ? 'text-red-700' : 'text-emerald-700'}">
                        \${window.CMS_STORE.formatDate(q.quotationValidTill)} \${q.quotationValidTill && new Date(q.quotationValidTill) < new Date() ? '(Expired)' : ''}
                      </strong>
                    </div>
                  </div>
                  <div class="grid grid-cols-4 gap-2 text-[10px]">
                    <div class="col-span-2"><span class="text-slate-500 block">Item / Material:</span><strong class="text-sm">\${q.materialName || q.materialId || '-'}</strong></div>
                    <div><span class="text-slate-500 block">Approved Rate:</span><strong class="text-sm text-blue-700">₹\${Number(q.rate || 0).toFixed(2)}</strong></div>
                    <div><span class="text-slate-500 block">MRP (UOM):</span><strong class="text-emerald-700">₹\${Number(q.mrp || 0).toFixed(2)}</strong> <span class="text-slate-400">(\${q.unit || 'Nos'})</span></div>
                  </div>
                  \${q.doc ? \`
                    <div class="pt-2 mt-2 border-t border-blue-50">
                      <button type="button" onclick="CMS_APP.viewDocument('\${q.doc}', 'Vendor Quotation', { partyName: '\${v.name.replace(/'/g, "\\\\'")}', id: '\${v.id}', validTill: '\${q.quotationValidTill}' })" class="text-[10px] text-blue-800 bg-blue-50 border border-blue-200 px-2 py-1 rounded font-bold hover:bg-blue-100 transition flex items-center gap-1.5 inline-flex">
                        <i data-lucide="eye" class="w-3 h-3"></i> Inspect \${q.doc}
                      </button>
                    </div>
                  \` : ''}
                </div>
              \`).join('') : \`
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div><span class="text-slate-500 text-[10px] block">Quote Ref / No.</span><strong>\${v.quotationNo || 'Direct Order'}</strong></div>
                  <div><span class="text-slate-500 text-[10px] block">Quotation Date</span><strong class="font-mono">\${window.CMS_STORE.formatDate(v.quotationDate)}</strong></div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">Valid Till</span>
                    <strong class="font-mono \${v.quotationValidTill && new Date(v.quotationValidTill) < new Date() ? 'text-red-700' : 'text-emerald-700'}">
                      \${window.CMS_STORE.formatDate(v.quotationValidTill)}
                      \${v.quotationValidTill && new Date(v.quotationValidTill) < new Date() ? ' (Expired)' : ''}
                    </strong>
                  </div>
                </div>
                \${v.quotationDoc ? \`
                  <div class="pt-2">
                    <button type="button" onclick="CMS_APP.viewDocument('\${v.quotationDoc}', 'Approved Vendor Quotation', { partyName: '\${v.name.replace(/'/g, "\\\\'")}', id: '\${v.id}', validTill: '\${v.quotationValidTill}' })" class="text-[11px] text-blue-800 bg-white border border-blue-300 px-3 py-1 rounded font-bold hover:bg-blue-50 transition flex items-center gap-1.5">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i> Inspect Uploaded Quotation Copy (\${v.quotationDoc})
                    </button>
                  </div>
                \` : '<div class="text-[10px] text-slate-400 italic pt-1">No quotation copy uploaded</div>'}
              \`}
            </div>
          </div>

          `;
  code = code.substring(0, profileStart - 18) + pScript + code.substring(profileEnd);
}

fs.writeFileSync('js/masters.js', code);
