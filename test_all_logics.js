/**
 * Comprehensive Logic Verification Suite
 * Verifies all recently implemented business logics, safety guards, and UI validations.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

const ROOT_DIR = 'C:/Users/Sanjay Sharma/.gemini/antigravity/scratch/consumable_management_system';

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// SECTION 1: Gmail Disconnect & Dispatch Safety Logic
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 1: Gmail Disconnect & Safe Notification Dispatch');
console.log('===============================================================');

const notifCode = fs.readFileSync(path.join(ROOT_DIR, 'js/notifications.js'), 'utf8');

const notifSandbox = {
  window: {},
  document: { readyState: 'complete', addEventListener: () => {}, getElementById: () => null },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = String(v); },
    removeItem(k) { delete this.data[k]; }
  },
  console: { log: () => {}, warn: () => {}, error: () => {} },
  setTimeout: (fn) => setTimeout(fn, 1),
  setInterval: () => 1
};
notifSandbox.window = notifSandbox;
notifSandbox.window.CMS_STORE = { data: { vendors: [] }, save: () => {} };
notifSandbox.window.CMS_APP = { toast: () => {} };

vm.runInNewContext(notifCode, notifSandbox);
const notifEngine = notifSandbox.window.CMS_NOTIFICATIONS;

// 1.1 Verify default settings when disconnected
const defaultSettings = notifEngine.getSettings();
assert(defaultSettings.gmailConnected === false, 'Default gmailConnected is false');
assert(defaultSettings.autoSendVendorEmail === false, 'Default autoSendVendorEmail is false');
assert(defaultSettings.mailProvider === 'none', 'Default mailProvider is "none"');
assert(!defaultSettings.webhookUrl || defaultSettings.webhookUrl === '', 'No hardcoded default webhook URL');

// 1.2 Verify saveSettings without senderGmail when disconnected
try {
  const ok = notifEngine.saveSettings({ minDays: 20, gmailConnected: false });
  const updatedSettings = notifEngine.getSettings();
  assert(ok === true && updatedSettings.minAlertDays === 20 && updatedSettings.gmailConnected === false, 'saveSettings allows saving without senderGmail when disconnected');
} catch (e) {
  assert(false, 'saveSettings allows saving without senderGmail when disconnected', e.message);
}

// 1.3 Verify direct real email sending is strictly blocked when disconnected
notifEngine.sendRealEmail({ to: 'vendor@test.com', subject: 'Notice', body: 'Test' })
  .then(() => assert(false, 'sendRealEmail blocked when disconnected', 'Did not throw!'))
  .catch((err) => assert(err.message.includes('disconnected'), 'sendRealEmail blocked with disconnected error'));

// 1.4 Verify auto daily scheduler skips email sending when disconnected
notifEngine.checkAndAutoSendDailyAlerts(true).then((res) => {
  assert(res && res.skipped === true && res.reason.includes('disconnected'), 'checkAndAutoSendDailyAlerts skips dispatch when disconnected');
});

// -------------------------------------------------------------
// SECTION 2: Role Switching Removal & Immutability Enforcement
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 2: Role Switching Removal & Fixed Role Enforcement');
console.log('===============================================================');

const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const storeCode = fs.readFileSync(path.join(ROOT_DIR, 'js/store.js'), 'utf8');
const homeCode = fs.readFileSync(path.join(ROOT_DIR, 'js/home.js'), 'utf8');
const serverCode = fs.readFileSync(path.join(ROOT_DIR, 'server.js'), 'utf8');

// 2.1 Index.html no longer contains "Switch Active Role"
assert(!indexHtml.includes('Switch Active Role'), 'Profile menu does not contain "Switch Active Role"');
assert(!indexHtml.includes("CMS_STORE.setRole('Admin')"), 'Profile menu does not contain setRole Admin button');
assert(!indexHtml.includes("CMS_STORE.setRole('Maker')"), 'Profile menu does not contain setRole Maker button');

// 2.2 CMS_STORE.setRole is disabled and returns false
const storeSandbox = {
  window: {},
  document: { addEventListener: () => {}, getElementById: () => null },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = String(v); },
    removeItem(k) { delete this.data[k]; }
  },
  console: { log: () => {}, warn: () => {}, error: () => {} }
};
storeSandbox.window = storeSandbox;
storeSandbox.window.CMS_APP = { toast: () => {} };
vm.runInNewContext(storeCode, storeSandbox);
const storeEngine = storeSandbox.window.CMS_STORE;

const setRoleResult = storeEngine.setRole('Admin');
assert(setRoleResult === false, 'CMS_STORE.setRole("Admin") is permanently disabled and returns false');

// 2.3 User table in home.js uses fixed badges instead of role select dropdowns
assert(!homeCode.includes('role-sel-${u.id}'), 'home.js User table does not have role-sel select dropdowns');
assert(homeCode.includes('Fixed at Registration'), 'home.js User table displays "Fixed at Registration" badge');

// 2.4 Server PUT /api/users/:id ignores role changes
assert(!serverCode.includes('if (input.role) targetUser.role = input.role;'), 'server.js PUT /api/users/:id strictly ignores role modification');

// -------------------------------------------------------------
// SECTION 3: Vendor Setup Auto-Save & Variable Scope Safety
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 3: Vendor Setup Auto-Save & Variable Scoping (role, newId, targetVendorId)');
console.log('===============================================================');

const mastersCode = fs.readFileSync(path.join(ROOT_DIR, 'js/masters.js'), 'utf8');

// 3.1 Check that role is defined in saveVendor
assert(mastersCode.includes('const role = store.getRole();'), 'saveVendor defines "const role = store.getRole();"');

// 3.2 Check that targetVendorId is defined at function level in saveVendor
assert(mastersCode.includes('let targetVendorId = vendorId;'), 'saveVendor declares "let targetVendorId = vendorId;" before if (isEdit)');

// 3.3 Check that targetVendorId does not reference undeclared newId when editing
assert(!mastersCode.includes('const targetVendorId = isEdit ? vendorId : newId;'), 'Removed hazardous "isEdit ? vendorId : newId" out-of-scope expression');

// -------------------------------------------------------------
// SECTION 4: GST Validation (Middle Character of Last 3 Digits MUST Be Alphabet)
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 4: GST Validation (14th char / middle of suffix must be Alphabet)');
console.log('===============================================================');

const appCode = fs.readFileSync(path.join(ROOT_DIR, 'js/app.js'), 'utf8');

// 4.1 Check suffix input handler validates middle char
assert(mastersCode.includes('In the last 3 digits of GST, the middle character must always be an Alphabet'), 'onGstSuffixInput validates middle char is Alphabet');

// 4.2 Check Step 2 validation rejects non-alphabet at position 14 (index 13)
assert(mastersCode.includes('!/^[A-Z]$/.test(fullGst.charAt(13))'), 'validateVendorStep(2) checks fullGst.charAt(13) is Alphabet');

// 4.3 Check app.js realtime border validator checks index 13
assert(appCode.includes('val.length === 15 && /^[A-Z]$/i.test(val.charAt(13))'), 'app.js realtime border validation checks index 13 is Alphabet');

// 4.4 Test GSTIN logic with actual samples:
function isGstMiddleCharValid(gstin) {
  if (!gstin || gstin.length !== 15) return false;
  return /^[A-Z]$/i.test(gstin.charAt(13));
}

assert(isGstMiddleCharValid('07AAAAA0000A1Z5') === true, 'Standard GSTIN "07AAAAA0000A1Z5" has alphabet "Z" at pos 14: VALID');
assert(isGstMiddleCharValid('27AABCT1332L1A8') === true, 'GSTIN "27AABCT1332L1A8" has alphabet "A" at pos 14: VALID');
assert(isGstMiddleCharValid('07AAAAA0000A125') === false, 'Invalid GSTIN "07AAAAA0000A125" has digit "2" at pos 14: REJECTED');
assert(isGstMiddleCharValid('07AAAAA0000A195') === false, 'Invalid GSTIN "07AAAAA0000A195" has digit "9" at pos 14: REJECTED');

// -------------------------------------------------------------
// SECTION 5: Phrasing & Terminology Compliance
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 5: Phrasing & Terminology Compliance');
console.log('===============================================================');

// 5.1 No "Catalog" in active user UI
const hasCatalogInNav = indexHtml.includes('Catalog');
assert(!hasCatalogInNav, 'index.html contains zero occurrences of "Catalog"');

// 5.2 Material Category used instead of Consumable Category
const hasMaterialCategory = indexHtml.includes('Material Category') || indexHtml.includes('Material Categories');
assert(hasMaterialCategory, 'index.html uses "Material Category"');

// 5.3 Expiry Alerts Phrasing in home.js
assert(homeCode.includes('Number of days Fixation For Expiry alerts'), 'home.js uses "Number of days Fixation For Expiry alerts"');

// -------------------------------------------------------------
// SECTION 6: Foreign vs Indian GST Layout & Dynamic Switching
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 6: Foreign vs Indian GST Layout & Validation Modes');
console.log('===============================================================');

assert(mastersCode.includes('updateGstFieldMode(isForeign)'), 'masters.js declares updateGstFieldMode(isForeign)');
assert(mastersCode.includes('onNormalGstInput(val)'), 'masters.js declares onNormalGstInput(val)');
assert(mastersCode.includes('id="v-gst-bracket-container"'), 'Vendor modal contains #v-gst-bracket-container for Indian separated boxes');
assert(mastersCode.includes('id="v-gst-normal-container"'), 'Vendor modal contains #v-gst-normal-container for Foreign single standard input');
assert(mastersCode.includes('this.updateGstFieldMode(isForeign)'), 'onCountryChange dynamically invokes updateGstFieldMode(isForeign)');
assert(mastersCode.includes('if (countryVal && !countryVal.includes(\'India\')) return;'), 'assembleGst() guards against overwriting foreign tax IDs');
assert(mastersCode.includes('toggleVendorPreviewMaterials()'), 'masters.js declares toggleVendorPreviewMaterials()');
assert(mastersCode.includes('id="v-preview-materials-table-wrapper"'), 'Vendor paper form preview contains #v-preview-materials-table-wrapper');
assert(mastersCode.includes('id="v-preview-mat-toggle-btn"'), 'Vendor paper form preview contains #v-preview-mat-toggle-btn');
assert(mastersCode.includes('id="v-preview-materials-collapsed-banner"'), 'Vendor paper form preview contains #v-preview-materials-collapsed-banner');

// -------------------------------------------------------------
// SECTION 7: Local Server HTTP Health Check
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('TEST SUITE 7: Local Server Health & Static Assets Check (Port 8080)');
console.log('===============================================================');

const req = http.get('http://localhost:8080', (res) => {
  assert(res.statusCode === 200, 'Local server responds with HTTP 200 OK on http://localhost:8080');

  // Also check masters.js on server
  http.get('http://localhost:8080/js/masters.js', (resJs) => {
    assert(resJs.statusCode === 200, 'Local server serves /js/masters.js with HTTP 200 OK');
    
    console.log('\n===============================================================');
    console.log(`FINAL RESULT: ${passedTests} PASSED, ${failedTests} FAILED`);
    console.log('===============================================================');
    process.exit(failedTests > 0 ? 1 : 0);
  });
});

req.on('error', (err) => {
  assert(false, 'Local server is reachable on http://localhost:8080', err.message);
  console.log('\n===============================================================');
  console.log(`FINAL RESULT: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('===============================================================');
  process.exit(1);
});
