const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const addRowTarget = "const exp = qData ? (qData.quotationValidTill || '') : '';";
if (code.includes(addRowTarget)) {
    code = code.replace(addRowTarget, addRowTarget + '\n    const eff = qData ? (qData.effectiveFrom || \'\') : \'\';');
}

const htmlGridTarget = '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">';
if (code.includes(htmlGridTarget)) {
    code = code.replace(htmlGridTarget, '<div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-6">');
}

const htmlExpTarget = `<div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>
          <input type="date" class="q-exp w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\\\${exp}" />
        </div>`;
if (code.includes(htmlExpTarget)) {
    const newHtmlExp = `<div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Effective From</label>
          <input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\\\${eff}" />
        </div>\n        ` + htmlExpTarget;
    code = code.replace(htmlExpTarget, newHtmlExp);
}

// 2. Update saveVendor extract logic
if (code.includes("quotationValidTill: row.querySelector('.q-exp')?.value || '',")) {
    code = code.replace("quotationValidTill: row.querySelector('.q-exp')?.value || '',", 
      "quotationValidTill: row.querySelector('.q-exp')?.value || '',\n          effectiveFrom: row.querySelector('.q-eff')?.value || '',");
}

// 3. Update sync logic
const syncTarget1 = "vendor1RateEffectiveFrom: q.quotationDate || today,";
if (code.includes(syncTarget1)) {
    code = code.replace(syncTarget1, "vendor1RateEffectiveFrom: q.effectiveFrom || q.quotationDate || today,");
}

// 4. Update Profile view
const profileTarget = '<span class="text-slate-500 text-[10px] ml-3">Valid Till:</span>';
if (code.includes(profileTarget)) {
    code = code.replace(profileTarget, '<span class="text-slate-500 text-[10px] ml-3">Effective:</span> <strong class="font-mono">\\${window.CMS_STORE.formatDate(q.effectiveFrom) || \'-\'}</strong>\n                      <span class="text-slate-500 text-[10px] ml-3">Valid Till:</span>');
}

fs.writeFileSync('js/masters.js', code);
