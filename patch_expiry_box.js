const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<div id="expiry_box_\$\{rowId\}" class="cert-expiry-box \$\{hasValidity \? '' : 'hidden'\} flex gap-2">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

const newHTML = `<div id="expiry_box_\${rowId}" class="cert-expiry-box \${hasValidity ? '' : 'hidden'} grid grid-cols-1 2xl:grid-cols-2 gap-2 mt-2">
            <div class="bg-blue-50/30 border border-blue-200 p-1.5 rounded-sm">
              <label class="block text-[10px] font-bold text-blue-700 mb-1">Expiry Date *</label>
              <input type="date" min="\${today}" class="cert-expiry-input w-full px-2 py-1.5 border border-blue-300 rounded bg-white text-xs font-mono outline-none focus:border-blue-500" value="\${validTill}" />
            </div>
            <div class="bg-amber-50/50 border border-amber-200 p-1.5 rounded-sm">
              <label class="block text-[10px] font-bold text-amber-700 mb-1">Alert Date</label>
              <input type="date" class="cert-alert-input w-full px-2 py-1.5 border border-amber-300 rounded bg-white text-xs font-mono outline-none focus:border-amber-500" value="\${certData && typeof certData === 'object' ? (certData.alertDate || '') : ''}" />
            </div>
          </div>
        </div>`;
code = code.replace(regex, newHTML);
fs.writeFileSync('js/masters.js', code);
console.log('Done replacement.');
