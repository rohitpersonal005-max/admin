// Unit test for Vendor Material List Minimize & Download Confirmation Popup
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('===============================================================');
console.log('TEST SUITE: Vendor Material List Minimize & Download Confirmation');
console.log('===============================================================');

// Mock DOM & Browser environment
const sandbox = {
  window: {},
  document: {
    getElementById: (id) => null,
    createElement: (tag) => ({ style: {}, classList: { add() {}, remove() {}, contains() { return false; } } }),
    body: { appendChild() {}, style: {} }
  },
  localStorage: {
    getItem() { return null; },
    setItem() {}
  },
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {}
};
sandbox.window = sandbox;

// Load store and masters
const storeCode = fs.readFileSync(path.join(__dirname, 'js/masters.js'), 'utf8');

// Assertions
let passed = 0;
let failed = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Static code assertions
assert(
  storeCode.includes('confirmDownloadVendorForm(vendorId, openNewTab = false)'),
  'CMS_MASTERS declares confirmDownloadVendorForm(vendorId, openNewTab = false)'
);

assert(
  storeCode.includes('CMS_MASTERS.confirmDownloadVendorForm('),
  'viewVendorProfile calls CMS_MASTERS.confirmDownloadVendorForm'
);

assert(
  storeCode.includes('async downloadVendorForm(vendorId = null, minimizeMaterials = false)'),
  'downloadVendorForm accepts minimizeMaterials argument'
);

assert(
  storeCode.includes('async openVendorPrintWindow(vendorId, minimizeMaterials = false)'),
  'openVendorPrintWindow accepts minimizeMaterials argument'
);

// 2. Dual expand button removal check
assert(
  !storeCode.includes('View Full Material List'),
  'Secondary "View Full Material List" button in collapsed banner is completely removed'
);

// 3. Renderer logic check
const mockVendor = {
  id: 'VEND-TEST-001',
  vendorName: 'Acme Supplies Global Ltd',
  country: 'India',
  quotedItems: [
    { materialName: 'Copier Paper A4 75 GSM', rate: 250, mrp: 280, uom: 'Ream', hsn: '4802', quoteNo: 'QT-101', validTill: '2027-12-31' },
    { materialName: 'Ballpoint Pen Blue', rate: 10, mrp: 12, uom: 'Box', hsn: '9608', quoteNo: 'QT-102', validTill: '2027-12-31' },
    { materialName: 'Sticky Notes 3x3', rate: 45, mrp: 50, uom: 'Pad', hsn: '4820', quoteNo: 'QT-103', validTill: '2027-12-31' }
  ]
};

// Check HTML output under both modes
// Evaluate in vm sandbox
vm.createContext(sandbox);
sandbox.window.CMS_STORE = {
  data: { vendors: [mockVendor] },
  getRole: () => 'Admin',
  getSettings: () => ({})
};
sandbox.window.CMS_APP = {
  toast: () => {},
  openModal: () => {},
  closeStackedModal: () => {}
};

vm.runInContext(storeCode, sandbox);
const CMS_MASTERS = sandbox.window.CMS_MASTERS;

// Full output (minimizeMaterials = false)
const fullHtml = CMS_MASTERS.renderVendorPaperFormHtml(mockVendor, { forPrint: true, minimizeMaterials: false });
assert(
  fullHtml.includes('Copier Paper A4 75 GSM') && fullHtml.includes('v-preview-materials-table-wrapper'),
  'Standard render includes itemized material table and items'
);
assert(
  !fullHtml.includes('Itemized material list omitted per download selection'),
  'Standard render does NOT include omitted disclaimer'
);

// Minimized output (minimizeMaterials = true)
const compactHtml = CMS_MASTERS.renderVendorPaperFormHtml(mockVendor, { forPrint: true, minimizeMaterials: true });
assert(
  compactHtml.includes('Approved Material List (Summary)') && compactHtml.includes('Itemized material list omitted per download selection'),
  'Minimized render includes clean 1-line Approved Material List (Summary) block'
);
assert(
  !compactHtml.includes('Copier Paper A4 75 GSM'),
  'Minimized render excludes the itemized rows from output'
);

console.log('===============================================================');
console.log(`RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('===============================================================');

if (failed > 0) process.exit(1);
