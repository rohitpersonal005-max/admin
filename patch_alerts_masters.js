const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// --- 1. Quotation Row ---
const quoteGridRegex = /<div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-6">([\s\S]*?)<\/div>\s*<div class="grid grid-cols-1 sm:grid-cols-12 gap-2\.5">/g;
const quoteGridReplace = `<div class="grid grid-cols-1 sm:grid-cols-5 gap-3 pr-6">
$1
          <div>
            <label class="block font-bold text-amber-700 mb-1 text-[10px]" title="Timer & Email alert start date">Alert Date</label>
            <input type="date" class="q-alert w-full font-mono px-2.5 py-1.5 border border-amber-300 bg-amber-50 rounded text-xs" value="\${qData ? (qData.alertDate || '') : ''}" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">`;
code = code.replace(quoteGridRegex, quoteGridReplace);

const quotePushRegex = /validTill: qValid,\s*alertDays:[\s\S]*?alertFreq:[\s\S]*?materialId:/g;
const quotePushReplace = `validTill: qValid,\n          alertDate: row.querySelector('.q-alert') ? row.querySelector('.q-alert').value : '',\n          materialId:`;
code = code.replace(quotePushRegex, quotePushReplace);

// --- 2. Vendor Limited Approval ---
const limHtmlRegex = /<div id="v-limited-date-box" class="\\\$\\{vendor\.approvedForLimitedPeriod \? '' : 'hidden'\\} mt-2">\s*<label class="block text-\[11px\] font-bold text-slate-700 mb-1">Approval Valid Till \/ Expiry Date \* \(No past dates\)<\/label>\s*<input type="date" id="v-approval-valid-till" min="\\\$\\{today\\}" value="\\\$\\{vendor\.approvalValidTill \|\| ''\\}" class="w-full px-3 py-1\.5 border border-slate-300 rounded-sm px-3 py-1\.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" \/>\s*<\/div>/g;
const limHtmlReplace = `<div id="v-limited-date-box" class="\${vendor.approvedForLimitedPeriod ? '' : 'hidden'} mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">Approval Valid Till *</label>
                    <input type="date" id="v-approval-valid-till" min="\${today}" value="\${vendor.approvalValidTill || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-amber-700 mb-1">Alert Date (Start Email)</label>
                    <input type="date" id="v-approval-alert-date" value="\${vendor.approvalAlertDate || ''}" class="w-full px-3 py-1.5 border border-amber-300 bg-amber-50 rounded-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-mono" />
                  </div>
                </div>`;
code = code.replace(limHtmlRegex, limHtmlReplace);

// Save the v-approval-alert-date in saveVendor
const vAlertSaveRegex = /approvalValidTill: document\.getElementById\('v-approval-valid-till'\)\?\.value \|\| '',/g;
const vAlertSaveReplace = `approvalValidTill: document.getElementById('v-approval-valid-till')?.value || '',\n          approvalAlertDate: document.getElementById('v-approval-alert-date')?.value || '',`;
code = code.replace(vAlertSaveRegex, vAlertSaveReplace);


// --- 3. Certificate Expiry ---
const certHtmlRegex = /<div id="expiry_box_\$\{rowId\}" class="cert-expiry-box \$\\{hasValidity \? '' : 'hidden'\\}">\s*<div class="flex items-center gap-2 bg-slate-50\/70 border border-slate-200 p-1\.5 rounded-sm">\s*<label class="text-\[11px\] font-bold text-blue-600 shrink-0">Expiry Date \*:</label>\s*<input type="date" min="\$\{today\}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="\$\{validTill\}" \/>\s*<\/div>\s*<\/div>/g;
const certHtmlReplace = `<div id="expiry_box_\${rowId}" class="cert-expiry-box \${hasValidity ? '' : 'hidden'} flex gap-2">
            <div class="flex items-center gap-2 bg-slate-50/70 border border-slate-200 p-1.5 rounded-sm flex-1">
              <label class="text-[11px] font-bold text-blue-600 shrink-0">Expiry Date *:</label>
              <input type="date" min="\${today}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="\${validTill}" />
            </div>
            <div class="flex items-center gap-2 bg-amber-50/70 border border-amber-200 p-1.5 rounded-sm flex-1">
              <label class="text-[11px] font-bold text-amber-700 shrink-0">Alert Date:</label>
              <input type="date" class="cert-alert-input w-full px-2 py-1 border border-amber-300 rounded bg-white text-xs font-mono" value="\${certData && typeof certData === 'object' ? (certData.alertDate || '') : ''}" />
            </div>
          </div>`;
code = code.replace(certHtmlRegex, certHtmlReplace);

// Save certificate alert date
const certPushRegex = /const certValidTill = r\.querySelector\('\.cert-expiry-input'\)\.value;/g;
const certPushReplace = `const certValidTill = r.querySelector('.cert-expiry-input').value;\n        const certAlertDate = r.querySelector('.cert-alert-input').value;`;
code = code.replace(certPushRegex, certPushReplace);

const certSaveDataRegex = /validTill: certValidYes \? certValidTill : ''/g;
const certSaveDataReplace = `validTill: certValidYes ? certValidTill : '',\n            alertDate: certValidYes ? certAlertDate : ''`;
code = code.replace(certSaveDataRegex, certSaveDataReplace);


fs.writeFileSync('js/masters.js', code);
console.log('Patched masters.js for all alert inputs.');
