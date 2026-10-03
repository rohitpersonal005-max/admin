const fs = require('fs');

// --- MASTERS.JS ---
let masters = fs.readFileSync('js/masters.js', 'utf8');

// Using regex to safely inject maxlength and pattern into v-contact
const contactRegex = /<input type="tel" id="v-contact" required value="\$\{vendor\.contactNo \|\| ''\}" class="(.*?)" placeholder="10-digit number" \/>/;
if (masters.match(contactRegex)) {
    masters = masters.replace(contactRegex, '<input type="tel" id="v-contact" required maxlength="10" pattern="[0-9]{10}" value="${vendor.contactNo || \'\'}" class="$1" placeholder="10-digit number" />');
    fs.writeFileSync('js/masters.js', masters);
} else {
    console.log("Could not find v-contact in masters.js");
}

// --- HOME.JS ---
let home = fs.readFileSync('js/home.js', 'utf8');
const homeContactRegex = /<input type="tel" id="home-comp-contact" value="\$\{this\.companyInfo\.contact \|\| ''\}" class="(.*?)" placeholder="10-digit number" \/>/;
if (home.match(homeContactRegex)) {
    home = home.replace(homeContactRegex, '<input type="tel" id="home-comp-contact" maxlength="10" pattern="[0-9]{10}" value="${this.companyInfo.contact || \'\'}" class="$1" placeholder="10-digit number" />');
    fs.writeFileSync('js/home.js', home);
} else {
    console.log("Could not find home-comp-contact in home.js");
}

// Bump cache
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
