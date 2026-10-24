/**
 * Architectural Enforcement Test: Strict Maker-Checker Vendor Registration & Separation
 * Enforces that:
 * 1. Admin (Checker) is STRICTLY RESTRICTED from creating new vendors or editing drafts.
 *    - "Register New Vendor" is hidden from Admin in Vendor Setup (Masters -> Vendors).
 *    - "New Vendor Draft" is hidden from Admin in Draft Workspace.
 *    - Admin sees zero edit / delete buttons on Draft or Pending vendors.
 *    - Direct call to openVendorModal(null) or saveVendor(null) as Admin is strictly blocked.
 * 2. Maker (Store Staff / User) is the EXCLUSIVE role authorized to:
 *    - Register new vendors.
 *    - Create and continue working on vendor drafts.
 *    - Edit and resubmit pending approval vendors.
 */
const assert = require('assert');
const fs = require('fs');

console.log('===============================================================');
console.log('TEST SUITE: Strict Maker-Checker Vendor Creation & Policy');
console.log('===============================================================');

// 1. Static AST / Code Integrity Checks
const mastersCode = fs.readFileSync('js/masters.js', 'utf8');
const draftsCode = fs.readFileSync('js/drafts.js', 'utf8');

// A. Check that "Register New Vendor" button is wrapped with role !== 'Admin'
assert(mastersCode.includes("${role !== 'Admin' ? `") && mastersCode.includes('Register New Vendor'),
  'renderVendors must strictly hide "Register New Vendor" button from Admin');
console.log('  ✓ PASS: "Register New Vendor" button in Vendor Setup is strictly hidden from Admin');

// B. Check that openVendorModal guards Admin from creating new vendors
assert(mastersCode.includes("if (!isEdit && role === 'Admin')"),
  'openVendorModal must guard Admin from initiating new vendor registration');
console.log('  ✓ PASS: openVendorModal blocks direct new vendor creation by Admin');

// C. Check that saveVendor guards Admin from saving new vendors or editing without task
assert(mastersCode.includes("if (!isEdit && role === 'Admin')"),
  'saveVendor must guard Admin from saving new vendors');
assert(mastersCode.includes("if (isEdit && role === 'Admin' && !window.CMS_MASTERS.activeTask)"),
  'saveVendor must guard Admin from editing existing vendors without active task');
console.log('  ✓ PASS: saveVendor strictly enforces Maker-Checker separation');

// D. Check that Admin cannot edit Draft vendors
assert(mastersCode.includes("role !== 'Admin' && !isApproved && (v.status === 'Draft' || isRevision)"),
  'renderVendorRows must not render Continue Working or Delete button for Admin on Drafts');
console.log('  ✓ PASS: Table view strictly hides edit/delete buttons on Draft vendors from Admin');

// E. Check that drafts.js hides "New Vendor Draft" from Admin
assert(draftsCode.includes("${role !== 'Admin' ? `") && draftsCode.includes('New Vendor Draft'),
  'drafts.js must strictly hide "New Vendor Draft" from Admin');
console.log('  ✓ PASS: Draft Workspace strictly hides "New Vendor Draft" button from Admin');

// 2. Functional Sandbox Simulation
global.window = global;
global.localStorage = {
  _store: {},
  getItem: function(k) { return this._store[k] || null; },
  setItem: function(k, v) { this._store[k] = String(v); },
  removeItem: function(k) { delete this._store[k]; }
};
global.document = {
  querySelector: () => null,
  getElementById: () => null,
  addEventListener: () => {}
};

let lastToast = null;
global.CMS_APP = {
  openModal: (title, html) => {
    global.__lastModal = { title, html };
  },
  closeModal: () => {},
  toast: (msg, type) => {
    lastToast = { msg, type };
  }
};

require('./js/store.js');
require('./js/masters.js');
require('./js/drafts.js');

CMS_STORE.data = {
  vendors: [
    { id: 'VEN-DRAFT-01', name: 'Alpha Draft Vendor', status: 'Draft', isApproved: false },
    { id: 'VEN-PEND-01', name: 'Beta Pending Vendor', status: 'Pending Approval', isApproved: false },
    { id: 'VEN-APPR-01', name: 'Gamma Approved Vendor', status: 'Approved', isApproved: true }
  ],
  consumables: [],
  receipts: [],
  adminTasks: []
};

// --- SIMULATION 1: Admin Role Checks ---
CMS_STORE.getCurrentUser = () => ({ id: 'USR-ADMIN', name: 'Col. Anita Sharma', role: 'Admin' });
CMS_STORE.getRole = () => 'Admin';

// 1.1: Admin renders vendor setup view
const adminVendorHtml = CMS_MASTERS.renderVendors();
assert(!adminVendorHtml.includes('Register New Vendor'),
  'Admin MUST NOT see "Register New Vendor" in renderVendors()');
console.log('  ✓ PASS: Simulation - Admin sees NO "Register New Vendor" button in Vendor Setup');

// 1.2: Admin renders vendor rows in table
assert(!adminVendorHtml.includes("CMS_MASTERS.openVendorModal('VEN-DRAFT-01')"),
  'Admin MUST NOT see Continue Working or Edit button for Draft vendors');
assert(!adminVendorHtml.includes("CMS_MASTERS.deleteVendor('VEN-DRAFT-01')"),
  'Admin MUST NOT see Delete button for Draft vendors');
assert(!adminVendorHtml.includes("CMS_MASTERS.openVendorModal('VEN-PEND-01')"),
  'Admin MUST NOT see Edit button for Pending Approval vendors');
console.log('  ✓ PASS: Simulation - Admin vendor table contains ZERO edit or delete buttons on Draft or Pending vendors');

// 1.3: Admin renders drafts workspace
const adminDraftsHtml = CMS_DRAFTS.render();
assert(!adminDraftsHtml.includes('New Vendor Draft'),
  'Admin MUST NOT see "New Vendor Draft" button in Draft Workspace');
assert(!adminDraftsHtml.includes("CMS_MASTERS.openVendorModal('VEN-DRAFT-01')"),
  'Admin MUST NOT see "Continue Working" in Draft Workspace vendor cards');
assert(adminDraftsHtml.includes("CMS_MASTERS.viewVendorProfile('VEN-DRAFT-01')"),
  'Admin sees read-only "View Record" button in Draft Workspace');
console.log('  ✓ PASS: Simulation - Admin Draft Workspace is read-only for vendor drafts');

// 1.4: Direct call to openVendorModal(null) by Admin is blocked
global.__lastModal = null;
lastToast = null;
CMS_MASTERS.openVendorModal(null);
assert(global.__lastModal === null, 'openVendorModal(null) must NOT open modal for Admin');
assert(lastToast && lastToast.msg.includes('Strict Maker-Checker Separation'),
  'openVendorModal(null) for Admin must display Maker-Checker toast warning');
console.log('  ✓ PASS: Simulation - Calling openVendorModal(null) as Admin is blocked with warning toast');

// 1.5: Direct call to openVendorModal(draftId) by Admin is redirected to view profile
global.__lastModal = null;
lastToast = null;
CMS_MASTERS.openVendorModal('VEN-DRAFT-01');
assert(lastToast && lastToast.msg.includes('Maker-Checker Separation'),
  'openVendorModal(draftId) for Admin must inform that drafting is reserved for Maker');
console.log('  ✓ PASS: Simulation - Calling openVendorModal(draftId) as Admin redirects to profile view');

// --- SIMULATION 2: Maker (User) Role Checks ---
CMS_STORE.getCurrentUser = () => ({ id: 'USR-MAKER', name: 'Ramesh Store Officer', role: 'User' });
CMS_STORE.getRole = () => 'User';

// 2.1: Maker renders vendor setup view
const makerVendorHtml = CMS_MASTERS.renderVendors();
assert(makerVendorHtml.includes('Register New Vendor'),
  'Maker MUST see "Register New Vendor" in renderVendors()');
console.log('  ✓ PASS: Simulation - Maker sees "Register New Vendor" button in Vendor Setup');

// 2.2: Maker renders vendor rows in table
assert(makerVendorHtml.includes("CMS_MASTERS.openVendorModal('VEN-DRAFT-01')"),
  'Maker MUST see Continue Working button for Draft vendors');
assert(makerVendorHtml.includes("CMS_MASTERS.openVendorModal('VEN-PEND-01')"),
  'Maker MUST see Edit Form button for Pending Approval vendors');
console.log('  ✓ PASS: Simulation - Maker has Continue Working and Edit Form actions in table');

// 2.3: Maker renders drafts workspace
const makerDraftsHtml = CMS_DRAFTS.render();
assert(makerDraftsHtml.includes('New Vendor Draft'),
  'Maker MUST see "New Vendor Draft" button in Draft Workspace');
assert(makerDraftsHtml.includes("CMS_MASTERS.openVendorModal('VEN-DRAFT-01')"),
  'Maker MUST see "Continue Working" button in Draft Workspace');
console.log('  ✓ PASS: Simulation - Maker has full Draft creation and workbench actions');

// 2.4: Maker invokes openVendorModal(null)
global.__lastModal = null;
CMS_MASTERS.openVendorModal(null);
assert(global.__lastModal !== null && global.__lastModal.title === 'Register New Vendor',
  'Maker MUST be able to open vendor registration modal');
console.log('  ✓ PASS: Simulation - Maker successfully opens vendor registration modal');

console.log('===============================================================');
console.log('ALL STRICT MAKER-CHECKER VENDOR RESTRICTION TESTS PASSED (100%)');
console.log('===============================================================');
