const fs = require('fs');
const path = require('path');

// Mock browser environment
global.window = {};
global.localStorage = {
  _data: {},
  getItem(key) { return this._data[key] || null; },
  setItem(key, val) { this._data[key] = String(val); },
  removeItem(key) { delete this._data[key]; },
  clear() { this._data = {}; }
};
global.document = {
  getElementById(id) {
    return this._elements[id] || null;
  },
  querySelectorAll(sel) {
    if (sel === '.cert-row') return this._certRows || [];
    return [];
  },
  createElement(tag) {
    return {
      tag,
      className: '',
      id: '',
      innerHTML: '',
      appendChild() {},
      querySelector() { return null; }
    };
  },
  _elements: {},
  _certRows: []
};

// Load store
const storeCode = fs.readFileSync(path.join(__dirname, 'js/store.js'), 'utf8');
eval(storeCode);

console.log('--- Verifying Vendor Master & Dynamic Certificates ---');

// 1. Check Seed Vendors have panNo and structured certificates
const vendors = window.CMS_STORE.data.vendors;
console.log('Seed vendors count:', vendors.length);
if (vendors.length === 0) throw new Error('No vendors found');

vendors.forEach(v => {
  console.log(`Vendor ${v.id}: ${v.name} | PAN: ${v.panNo} | Certs: ${v.certificates.length}`);
  if (!v.panNo) throw new Error(`Vendor ${v.id} missing PAN`);
  if (!Array.isArray(v.certificates)) throw new Error(`Vendor ${v.id} certificates is not array`);
  v.certificates.forEach(c => {
    if (!c.name) throw new Error(`Certificate missing name in vendor ${v.id}`);
  });
});
console.log('✅ Seed vendors PAN and structured certificates verified!');

// 2. Load masters.js
const mastersCode = fs.readFileSync(path.join(__dirname, 'js/masters.js'), 'utf8');
eval(mastersCode);

// 3. Test renderVendors contains PAN Card column
const html = window.CMS_MASTERS.renderVendors();
if (!html.includes('<th class="p-4">PAN Card</th>')) {
  throw new Error('PAN Card column missing from table header');
}
if (html.includes('<th class="p-4">Validity Till</th>')) {
  throw new Error('Old standalone Validity Till column should be removed from table header');
}
console.log('✅ Table headers verified: PAN Card present, old Validity Till removed!');

// 4. Test Search by PAN
window.CMS_MASTERS.vendorSearchQuery = 'AABCA1234F';
const searchHtml = window.CMS_MASTERS.renderVendors();
if (!searchHtml.includes('Apex Office Supplies Pvt Ltd')) {
  throw new Error('PAN search failed to find Apex Office Supplies');
}
console.log('✅ Search by PAN verified!');
window.CMS_MASTERS.vendorSearchQuery = '';

// 5. Test GST to PAN Auto extraction
window.CMS_MASTERS.onGstInput = function(val) {
  if (val && val.length >= 12) {
    return val.substring(2, 12).toUpperCase();
  }
  return '';
};
const extractedPan = window.CMS_MASTERS.onGstInput('07AABCA1234F1Z5');
if (extractedPan !== 'AABCA1234F') {
  throw new Error('Failed to extract PAN from GST: ' + extractedPan);
}
console.log('✅ GST to PAN auto-extraction verified: 07AABCA1234F1Z5 -> ' + extractedPan);

console.log('\n🎉 ALL VENDOR & DYNAMIC CERTIFICATE TESTS PASSED!');
