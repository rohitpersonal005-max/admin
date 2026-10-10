const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regexRate = /<input type="number" step="0\.01" class="q-rate w-full font-mono font-bold text-blue-600 px-2\.5 py-1\.5 border border-slate-300 rounded text-xs" value="\$\{rate\}" placeholder="0\.00" \/>/g;
const newRate = `<input type="number" step="0.01" class="q-rate w-full font-mono font-bold text-blue-600 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${rate}" placeholder="0.00" oninput="CMS_MASTERS.checkRateVsMrp(this)" />`;
code = code.replace(regexRate, newRate);

const regexMrp = /<input type="number" step="0\.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2\.5 py-1\.5 border border-slate-300 rounded text-xs" value="\$\{mrp\}" placeholder="0\.00" \/>/g;
const newMrp = `<input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${mrp}" placeholder="0.00" oninput="CMS_MASTERS.checkRateVsMrp(this)" />`;
code = code.replace(regexMrp, newMrp);

fs.writeFileSync('js/masters.js', code);
