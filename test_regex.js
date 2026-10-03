const fs = require('fs');
let masters = fs.readFileSync('js/masters.js', 'utf8');
const oldMastersContact = /<div class="flex items-center gap-2">[\\s\\S]*?<input type="tel" id="v-contact"[\\s\\S]*?<\/div>/;
console.log("Match in masters: ", oldMastersContact.test(masters));
