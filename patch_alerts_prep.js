const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. Add alert inputs to Vendor Limited Approval
const limitHtml = `<div id="v-limited-date-box" class="\\\$\\{vendor.approvedForLimitedPeriod \\? '' : 'hidden'\\} mt-2">\\s*<label class="block text-\\[11px\\] font-bold text-slate-700 mb-1">Approval Valid Till / Expiry Date \\* \\(No past dates\\)<\\/label>\\s*<input type="date" id="v-approval-valid-till" min="\\\$\\{today\\}" value="\\\$\\{vendor.approvalValidTill \\|\\| ''\\}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" \\/>\\s*<\\/div>`;
// Wait, regex might fail with all those spaces and newlines. I will use exact string replacement.
