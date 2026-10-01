const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const sIdx = code.indexOf('<!-- 4. Commercial Quotation');
const eIdx = code.indexOf('<!-- 5. Dynamic Regulatory Certificates Builder -->');

if(sIdx > -1 && eIdx > -1) {
  const newHtml = \<!-- 4. Commercial Quotations & Approved Materials (Auto-Sync with Operations) -->
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg space-y-3.5 shadow-xs">
            <div class="flex items-center justify-between pb-2 border-b border-blue-200">
              <div class="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="file-spreadsheet" class="w-4 h-4 text-blue-700"></i>
                <span>Commercial Quotations & Approved Materials</span>
              </div>
              <button type="button" onclick="CMS_MASTERS.addVendorQuotationRow()" class="px-2.5 py-1 text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition flex items-center gap-1">
                <i data-lucide="plus" class="w-3 h-3"></i> Add Item
              </button>
            </div>
            <div id="v-quotations-container" class="space-y-3">
              <!-- Rendered via JS -->
            </div>
          </div>

          \;
  code = code.substring(0, sIdx) + newHtml + code.substring(eIdx);
}
fs.writeFileSync('js/masters.js', code);
