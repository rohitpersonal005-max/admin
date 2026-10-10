const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// Just target the small specific string bits!
code = code.replace('<div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-6">', '<div class="grid grid-cols-1 sm:grid-cols-5 gap-3 pr-6">');

const qExpSearch = `          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>`;

const qExpNew = `          <div>
            <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>`;

// Wait, the easiest is to just find `</div>\n        </div>\n        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">`
const injectQAlert = `
          <div>
            <label class="block font-bold text-amber-700 mb-1 text-[10px]">Alert Date</label>
            <input type="date" class="q-alert w-full font-mono px-2.5 py-1.5 border border-amber-300 bg-amber-50 rounded text-xs" value="\${qData ? (qData.alertDate || '') : ''}" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">`;
code = code.replace(/<\/div>\s*<\/div>\s*<div class="grid grid-cols-1 sm:grid-cols-12 gap-2\.5">/g, injectQAlert);

// Limited Approval
const limSearch = `<label class="block text-[11px] font-bold text-slate-700 mb-1">Approval Valid Till / Expiry Date * (No past dates)</label>`;
const limNew = `</div>
                  <div>
                    <label class="block text-[11px] font-bold text-amber-700 mb-1">Alert Date (Start Email)</label>
                    <input type="date" id="v-approval-alert-date" value="\${vendor.approvalAlertDate || ''}" class="w-full px-3 py-1.5 border border-amber-300 bg-amber-50 rounded-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-mono" />`;
// wait, that's brittle. Let's use regex with matching any space.
code = code.replace(/<div id="v-limited-date-box" class="([^"]+)">/g, `<div id="v-limited-date-box" class="$1 grid grid-cols-2 gap-2">`);
code = code.replace(/<label class="block text-\[11px\] font-bold text-slate-700 mb-1">Approval Valid Till \/ Expiry Date \* \(No past dates\)<\/label>/g, `<label class="block text-[11px] font-bold text-slate-700 mb-1">Approval Valid Till *</label>`);
code = code.replace(/<input type="date" id="v-approval-valid-till" min="([^"]+)" value="([^"]+)" class="w-full px-3 py-1\.5 border border-slate-300 rounded-sm px-3 py-1\.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" \/>/g, `<input type="date" id="v-approval-valid-till" min="$1" value="$2" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-amber-700 mb-1">Alert Date</label>
                    <input type="date" id="v-approval-alert-date" value="\${vendor.approvalAlertDate || ''}" class="w-full px-3 py-1.5 border border-amber-300 bg-amber-50 rounded-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-mono" />`);

// Certificates
code = code.replace(/<div id="expiry_box_\$\{rowId\}" class="cert-expiry-box([^"]*)">/g, `<div id="expiry_box_\${rowId}" class="cert-expiry-box$1 flex gap-2">`);
code = code.replace(/<div class="flex items-center gap-2 bg-slate-50\/70 border border-slate-200 p-1\.5 rounded-sm">/g, `<div class="flex items-center gap-2 bg-slate-50/70 border border-slate-200 p-1.5 rounded-sm flex-1">`);
code = code.replace(/<input type="date" min="\$\{today\}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="\$\{validTill\}" \/>\s*<\/div>/g, `<input type="date" min="\${today}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="\${validTill}" />
            </div>
            <div class="flex items-center gap-2 bg-amber-50/70 border border-amber-200 p-1.5 rounded-sm flex-1">
              <label class="text-[11px] font-bold text-amber-700 shrink-0">Alert Date:</label>
              <input type="date" class="cert-alert-input w-full px-2 py-1 border border-amber-300 rounded bg-white text-xs font-mono" value="\${certData && typeof certData === 'object' ? (certData.alertDate || '') : ''}" />
            </div>`);

// Update JS Logic Data extraction
code = code.replace(/validTill: qValid,/g, `validTill: qValid,\n          alertDate: row.querySelector('.q-alert')?.value || '',`);
code = code.replace(/approvalValidTill: document\.getElementById\('v-approval-valid-till'\)\?\.value \|\| '',/g, `approvalValidTill: document.getElementById('v-approval-valid-till')?.value || '',\n          approvalAlertDate: document.getElementById('v-approval-alert-date')?.value || '',`);
code = code.replace(/const certValidTill = r\.querySelector\('\.cert-expiry-input'\)\.value;/g, `const certValidTill = r.querySelector('.cert-expiry-input').value;\n        const certAlertDate = r.querySelector('.cert-alert-input').value;`);
code = code.replace(/validTill: certValidYes \? certValidTill : ''/g, `validTill: certValidYes ? certValidTill : '',\n            alertDate: certValidYes ? certAlertDate : ''`);

fs.writeFileSync('js/masters.js', code);
console.log('Done!');
