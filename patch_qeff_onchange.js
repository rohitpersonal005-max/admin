const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex = /<input type="date" class="q-eff([\s\S]*?)value="\$\{eff\}" \$\{\!dt \? 'disabled' : \`min="\\\$\{dt\}"\`\} \/>/g;
const replace = `<input type="date" class="q-eff$1value="\${eff}" \${!dt ? 'disabled' : \`min="\${dt}"\`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />`;

code = code.replace(regex, replace);

// If the regex failed because of exact string mismatches, let's just do a string replace on the exact snippet.
const oldString = `<input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${eff}" ${!dt ? 'disabled' : \`min="${dt}"\`} />`;
const newString = `<input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${eff}" ${!dt ? 'disabled' : \`min="${dt}"\`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />`;

if (code.includes(oldString)) {
    code = code.replace(oldString, newString);
    fs.writeFileSync('js/masters.js', code);
    console.log('Fixed q-eff onchange via exact string replacement.');
} else {
    console.log('Could not find the exact string to replace.');
}

