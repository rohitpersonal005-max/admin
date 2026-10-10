const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<label class="block font-bold text-slate-800 mb-1 text-\[10px\]">Valid Till \/ Expiry<\/label>\s*<input type="date" class="q-valid w-full font-mono px-2\.5 py-1\.5 border border-slate-300 rounded text-xs" value="\$\{exp\}" \$\{\!eff \? 'disabled' : `min="\$\{eff\}"`\} \/>\s*<div>\s*<label class="block font-bold text-amber-700 mb-1 text-\[10px\]">Alert Date<\/label>\s*<input type="date" class="q-alert w-full font-mono px-2\.5 py-1\.5 border border-amber-300 bg-amber-50 rounded text-xs" value="\$\{qData \? \(qData\.alertDate \|\| ''\) : ''\}" \/>\s*<\/div>\s*<\/div>\s*<div class="grid grid-cols-1 sm:grid-cols-12 gap-2\.5">/;

const replacement = `<label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>
          <input type="date" class="q-valid w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${exp}" \${!eff ? 'disabled' : \`min="\${eff}"\`} />
        </div>
        <div>
          <label class="block font-bold text-amber-700 mb-1 text-[10px]">Alert Date</label>
          <input type="date" class="q-alert w-full font-mono px-2.5 py-1.5 border border-amber-300 bg-amber-50 rounded text-xs" value="\${qData ? (qData.alertDate || '') : ''}" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mt-2">`;

code = code.replace(regex, replacement);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed missing div.');
