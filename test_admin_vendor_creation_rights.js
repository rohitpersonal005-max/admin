/**
 * Architectural Enforcement Test: Admin Vendor Creation & Setup Rights
 * Ensures Admin always retains full authority to register and sanction new vendors in Vendor Setup
 */
const assert = require('assert');
const fs = require('fs');

console.log('===============================================================');
console.log('TEST SUITE: Admin Vendor Creation & Direct Sanction Rights');
console.log('===============================================================');

// 1. Static AST / Code Integrity Checks
const mastersCode = fs.readFileSync('js/masters.js', 'utf8');

// A. Check that Admin modal title indicates direct approval authority
assert(mastersCode.includes(`role === 'Admin' ? 'Register New Vendor (Admin Direct Approval)' : 'Register New Vendor'`),
  'openVendorModal must show Admin Direct Approval title for Admin role');
console.log('  ✓ PASS: Admin sees "Register New Vendor (Admin Direct Approval)" title');

// B. Check that Admin submit button says "Register & Approve Vendor"
assert(mastersCode.includes(`role === 'Admin' ? (isEdit ? 'Save & Approve Vendor' : 'Register & Approve Vendor')`),
  'openVendorModal submit button must display direct approval action for Admin');
console.log('  ✓ PASS: Admin submit button displays "Register & Approve Vendor"');

// C. Check that Admin direct registration sets isApproved: true and status: 'Approved'
assert(mastersCode.includes(`status: (role === 'Admin') ? 'Approved' : (directSubmit ? 'Pending Approval' : 'Draft')`),
  'saveVendor must set status to Approved when created by Admin');
assert(mastersCode.includes(`isApproved: (role === 'Admin') ? true : false`),
  'saveVendor must set isApproved: true when created by Admin');
console.log('  ✓ PASS: saveVendor grants immediate isApproved: true and status: "Approved" for Admin');

// D. Check that Admin can edit draft vendors without being redirected
assert(!mastersCode.includes(`if (existingVendor && (existingVendor.status === 'Draft' || existingVendor.status === 'Revision Required')) {
        if (role === 'Admin') {
          window.CMS_APP.toast('Vendor form editing is reserved for Maker`),
  'openVendorModal must NOT block Admin from editing Draft vendors');
console.log('  ✓ PASS: openVendorModal permits Admin to edit and complete draft vendors');

// E. Check that Admin sees "Continue Working" button on Draft vendors in table
assert(mastersCode.includes(`(role !== 'Admin' || v.status === 'Draft')`),
  'renderVendorRows must render Continue Working button on Draft vendors for Admin');
console.log('  ✓ PASS: Admin table view contains "Continue Working" button on Draft vendors');

// 2. Functional Sandbox Simulation
global.window = global;
global.localStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null
};
global.document = {
  querySelector: () => null,
  getElementById: () => null
};

global.CMS_APP = {
  openModal: (title, html) => {},
  closeModal: () => {},
  toast: () => {}
};

require('./js/store.js');
require('./js/masters.js');

CMS_STORE.data = {
  vendors: [
    { id: 'VEN-DRAFT-01', name: 'Admin Draft Vendor', status: 'Draft', isApproved: false }
  ],
  consumables: [],
  adminTasks: []
};
CMS_STORE.getCurrentUser = () => ({ id: 'USR-ADMIN', name: 'Col. Anita Sharma', role: 'Admin' });
CMS_STORE.getRole = () => 'Admin';

// Verify Admin table render contains Continue Working for draft
const adminHtml = CMS_MASTERS.renderVendors();
assert(adminHtml.includes("CMS_MASTERS.openVendorModal('VEN-DRAFT-01')"),
  'Admin must see Edit / Continue Working button for Draft vendors in the table');
console.log('  ✓ PASS: Simulation - Admin table renders active edit action on Draft vendor');

// Verify Admin modal can be invoked for new vendor without throwing
let openedTitle = null;
let openedHtml = null;
CMS_APP.openModal = (title, html) => {
  openedTitle = title;
  openedHtml = html;
};

CMS_MASTERS.openVendorModal(null);
assert(openedTitle && openedTitle.includes('Admin Direct Approval'),
  'Opening new vendor modal as Admin must set Admin Direct Approval title');
assert(openedHtml && openedHtml.includes('Register & Approve Vendor'),
  'New vendor modal as Admin must contain "Register & Approve Vendor" button');
console.log('  ✓ PASS: Simulation - openVendorModal(null) creates modal with direct sanction button for Admin');

// Verify Admin can reopen draft vendor
CMS_MASTERS.openVendorModal('VEN-DRAFT-01');
assert(openedTitle && openedTitle.includes('Draft'),
  'Admin must be able to open Draft vendor modal without redirection');
console.log('  ✓ PASS: Simulation - openVendorModal(draftId) opens draft form for Admin');

console.log('===============================================================');
console.log('ALL ADMIN VENDOR CREATION RIGHTS VERIFIED & LOCKED (100%)');
console.log('===============================================================');
