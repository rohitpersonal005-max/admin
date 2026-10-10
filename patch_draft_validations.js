const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// Replace all `return window.CMS_APP.toast` with `if (directSubmit) return window.CMS_APP.toast`
code = code.replace(/return window\.CMS_APP\.toast\(/g, 'if (directSubmit) return window.CMS_APP.toast(');

// Replace block returns:
// if (!bankDoc || !bankDocTitle) { window.CMS_APP.toast... this.switchVendorTab... return; }
code = code.replace(/if \(!bankDoc \|\| !bankDocTitle\) \{/g, 'if (directSubmit && (!bankDoc || !bankDocTitle)) {');

// if (!mrpNa && rateVal > mrpVal) { window.CMS_APP.toast... this.switchVendorTab... return; }
code = code.replace(/if \(!mrpNa && rateVal > mrpVal\) \{/g, 'if (directSubmit && !mrpNa && rateVal > mrpVal) {');

// The first admin check should probably NOT be bypassed, but it doesn't matter much. We can leave it since admin shouldn't be editing anyway, but wait, `return window.CMS_APP.toast(` was replaced globally!
// Let's revert the first one:
code = code.replace(/if \(currentUser && currentUser\.role === 'Admin'\) \{\s*if \(directSubmit\) return window\.CMS_APP\.toast/g, `if (currentUser && currentUser.role === 'Admin') {\n      return window.CMS_APP.toast`);

// Also fix inline `if (!name) if (directSubmit) return ...`
code = code.replace(/if \(!name\) if \(directSubmit\)/g, 'if (directSubmit && !name)');
code = code.replace(/if \(!address\) if \(directSubmit\)/g, 'if (directSubmit && !address)');
code = code.replace(/if \(!addressDistrict\) if \(directSubmit\)/g, 'if (directSubmit && !addressDistrict)');
code = code.replace(/if \(!addressState\) if \(directSubmit\)/g, 'if (directSubmit && !addressState)');
code = code.replace(/if \(!bankName\) if \(directSubmit\)/g, 'if (directSubmit && !bankName)');
code = code.replace(/if \(!reg\) if \(directSubmit\)/g, 'if (directSubmit && !reg)');
code = code.replace(/if \(!certNo\) if \(directSubmit\)/g, 'if (directSubmit && !certNo)');
code = code.replace(/if \(hasVal && !expiry\) if \(directSubmit\)/g, 'if (directSubmit && hasVal && !expiry)');
code = code.replace(/if \(hasVal && expiry < today\) if \(directSubmit\)/g, 'if (directSubmit && hasVal && expiry < today)');
code = code.replace(/if \(!fileName\) if \(directSubmit\)/g, 'if (directSubmit && !fileName)');
code = code.replace(/else if \(directSubmit\) return window\.CMS_APP/g, 'else if (directSubmit) return window.CMS_APP');

fs.writeFileSync('js/masters.js', code);
console.log('Patched validations for directSubmit');
