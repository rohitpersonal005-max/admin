const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// The opening wrapper is: `<div class="flex items-center justify-between w-full"><div id="v-autosave-status" class="flex-1 text-xs text-emerald-600 font-semibold italic"></div><div class="flex gap-2.5">`
// Let's close it safely.
const regex = /<\/button>\s*<\/div>\s*<\/div>\s*<\/form>/g;
const replace = `</button>\n            </div>\n          </div>\n          </div>\n        </form>`;
code = code.replace(regex, replace);

fs.writeFileSync('js/masters.js', code);
console.log('Fixed missing closing div.');
