const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

let currentRole = 'Admin';
let toastMessages = [];

global.window = {
  CMS_STORE: {
    getRole: () => currentRole,
    getCurrentUser: () => ({ id: 'U-01', name: 'Admin', role: currentRole }),
    data: { vendors: [] }
  },
  CMS_APP: {
    toast: (msg, type) => { toastMessages.push({ msg, type }); },
    openModal: () => {}
  },
  CMS_HOME: { companyInfo: { name: 'ACME Corp' } },
  lucide: { createIcons: () => {} }
};
global.localStorage = { getItem: () => null, setItem: () => null };
global.document = { getElementById: () => null, querySelectorAll: () => [] };

eval(code);

console.log('--- ADMIN VENDOR CREATION & PRINT TEST ---');

// Test 1: Admin role in renderVendors
currentRole = 'Admin';
const adminHtml = window.CMS_MASTERS.renderVendors();
console.log('1. Admin sees Register New Vendor button?:', adminHtml.includes('Register New Vendor'));

// Test 2: User role in renderVendors
currentRole = 'User';
const userHtml = window.CMS_MASTERS.renderVendors();
console.log('2. User sees Register New Vendor button?:', userHtml.includes('Register New Vendor'));

// Test 3: Admin calls openVendorModal
currentRole = 'Admin';
toastMessages = [];
window.CMS_MASTERS.openVendorModal();
console.log('3. Admin openVendorModal blocked?:', toastMessages.some(t => t.msg.includes('cannot create or edit')));

// Test 4: Admin calls saveVendor
toastMessages = [];
window.CMS_MASTERS.saveVendor();
console.log('4. Admin saveVendor blocked?:', toastMessages.some(t => t.msg.includes('cannot create or modify')));

// Test 5: Print preview document does not have header/footer lines
const v = { id: 'VEN-01', name: 'Test Vendor', status: 'Approved' };
const printHtml = window.CMS_MASTERS.renderVendorPaperFormHtml(v, { forPrint: true });
console.log('5. Print HTML has Document Footer?:', printHtml.includes('Document Footer'));
console.log('6. Print HTML has border-b-2 border-slate-900?:', printHtml.includes('border-b-2 border-slate-900'));
console.log('7. Print HTML has Generated: timestamp?:', printHtml.includes('Generated:'));

const fullDoc = window.CMS_MASTERS.buildVendorPrintDocument(v, printHtml);
console.log('8. Full print doc has @page margin 0?:', fullDoc.includes('margin: 0 !important;'));
