const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexBankDocUI = /<label class="block font-bold text-slate-700 mb-1 text-\[11px\]">Upload Supporting Document \(Cancelled Cheque, Passbook, or Bank Statement\) <span class="text-rose-600 font-bold">\*<\/span><\/label>\s*<input type="file" id="v-bank-file" accept="\.pdf,image\/\*" class="text-xs" \$\{\!vendor\.bankDoc \? 'required' : ''\} \/>\s*<input type="text" id="v-bank-title" placeholder="Document Title" class="w-full mt-1\.5 px-2 py-1 text-xs border border-slate-300 rounded" value="\$\{vendor\.bankDocTitle \|\| ''\}" \/>/;

const newBankDocUI = `<label class="block font-bold text-slate-700 mb-1 text-[11px]">Upload Supporting Document <span class="text-rose-600 font-bold">*</span></label>
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input type="file" id="v-bank-file" accept=".pdf,image/*" class="text-xs shrink-0" \${!vendor.bankDoc ? 'required' : ''} />
                  <select id="v-bank-title" class="w-full sm:w-64 mt-1.5 sm:mt-0 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option value="" \${!vendor.bankDocTitle ? 'selected' : ''}>-- Select Document Type --</option>
                    <option value="Cancelled Cheque" \${vendor.bankDocTitle === 'Cancelled Cheque' ? 'selected' : ''}>Cancelled Cheque</option>
                    <option value="Passbook" \${vendor.bankDocTitle === 'Passbook' ? 'selected' : ''}>Passbook</option>
                    <option value="Bank Statement" \${vendor.bankDocTitle === 'Bank Statement' ? 'selected' : ''}>Bank Statement</option>
                    <option value="Other Bank Document" \${vendor.bankDocTitle === 'Other Bank Document' ? 'selected' : ''}>Other Bank Document</option>
                  </select>
                </div>`;

code = code.replace(regexBankDocUI, newBankDocUI);
fs.writeFileSync('js/masters.js', code);
