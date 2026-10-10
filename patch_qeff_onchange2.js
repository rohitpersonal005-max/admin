const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<input type="date" class="q-eff w-full font-mono px-2\.5 py-1\.5 border border-slate-300 rounded text-xs" value="\$\{eff\}" \$\{\!dt \? 'disabled' : `min="\$\{dt\}"`\} \/>/g;
const replace = `<input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="\${eff}" \${!dt ? 'disabled' : \`min="\${dt}"\`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />`;

code = code.replace(regex, replace);
fs.writeFileSync('js/masters.js', code);
console.log('Fixed q-eff onchange.');
