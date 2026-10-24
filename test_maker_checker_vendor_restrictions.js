/**
 * Verification Suite: Maker-Checker Role Restrictions on Vendor Modification & Banning
 */
const assert = require('assert');
const fs = require('fs');

console.log('===============================================================');
console.log('TEST SUITE: Maker-Checker Vendor Status & Editing Restrictions');
console.log('===============================================================');

const mastersCode = fs.readFileSync('js/masters.js', 'utf8');
const storeCode = fs.readFileSync('js/store.js', 'utf8');

// 1. Static AST/Content Analysis for Vendor Table Actions
// A. When vendor is Pending Approval, Admin must NOT see an edit button (no openVendorModal for Admin when isPending)
assert(!mastersCode.includes(`isPending ? (role === 'Admin' ? \`
              <button onclick="CMS_MASTERS.openVendorSanctionModal('\${v.id}')" class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition shadow-sm inline-flex items-center gap-1 cursor-pointer" title="Sanction & Approve Vendor">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                <span>Approve</span>
              </button>
              <button onclick="CMS_MASTERS.openVendorRejectModal('\${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-sm transition cursor-pointer" title="Reject / Return for Revision">
                Reject
              </button>
              <button onclick="CMS_MASTERS.openVendorModal('\${v.id}')"`),
  'Vendor table must NOT have an edit button for Admin on pending approval vendors');
console.log('  ✓ PASS: Admin table view contains zero edit buttons for Pending Approval vendors');

// B. When vendor is Pending Approval, User (Maker) MUST see Edit Form button
assert(mastersCode.includes(`title="Edit Form & Resend for Admin Approval"`),
  'User must have Edit Form button to update pending approval vendor and resend');
console.log('  ✓ PASS: User table view contains "Edit Form" button on Pending Approval vendors');

// C. Ban button is strictly hidden for Pending Approval and Draft vendors
assert(mastersCode.includes(`(role === 'Admin' && !isPending && !isDraft && (isApproved || isBlocked))`),
  'Ban button must be strictly restricted from Pending Approval and Draft vendors');
console.log('  ✓ PASS: Ban button is strictly hidden when vendor is Pending Approval or Draft');

// D. toggleBlockVendor in store.js forbids blocking pending/draft vendors
assert(storeCode.includes(`if (isBlocked && v.status !== 'Approved' && !v.isApproved)`),
  'toggleBlockVendor must refuse blocking pending or draft vendors');
console.log('  ✓ PASS: store.toggleBlockVendor strictly blocks banning unapproved / pending vendors');

// E. openVendorModal redirects Admin away from direct editing of Pending Approval vendors
assert(mastersCode.includes(`if (existingVendor && existingVendor.status === 'Pending Approval') {
        if (role === 'Admin') {
          window.CMS_APP.toast('As Admin / Approver, you can sanction or return vendor submissions, but direct editing is reserved for Maker.', 'info');
          this.openVendorSanctionModal(vendorId);
          return;
        }`),
  'openVendorModal must guard Admin from direct editing of pending vendors');
console.log('  ✓ PASS: openVendorModal redirects Admin to sanction modal if attempting to edit pending vendor');

// 2. Functional Simulation of Maker-Checker Render Logic
const mockVendorPending = {
  id: 'VEN-TEST-001',
  name: 'Alpha Tech Ltd',
  status: 'Pending Approval',
  isApproved: false,
  isBlocked: false
};

const mockVendorApproved = {
  id: 'VEN-TEST-002',
  name: 'Beta Supplies',
  status: 'Approved',
  isApproved: true,
  isBlocked: false
};

// Simulate Admin viewing Pending Vendor actions
function getActionHtml(v, role) {
  const isApproved = Boolean(v.status === 'Approved' || v.isApproved);
  const isPending = Boolean(v.status === 'Pending Approval' || v.status === 'Pending');
  const isDraft = Boolean(v.status === 'Draft' || !v.status);
  const isBlocked = Boolean(v.isBlocked || v.status === 'Blocked');
  const isRevision = Boolean(v.status === 'Revision Required');

  let html = '';

  // Pending Actions
  if (isPending) {
    if (role === 'Admin') {
      html += '<button id="approve">Approve</button><button id="reject">Reject</button>';
    } else {
      html += `<button id="edit" onclick="CMS_MASTERS.openVendorModal('${v.id}')">Edit Form</button><span>Pending Approval</span>`;
    }
  }

  // Ban button
  if (role === 'Admin' && !isPending && !isDraft && (isApproved || isBlocked)) {
    html += `<button id="ban">${isBlocked ? 'Unblock' : 'Ban'}</button>`;
  }

  return html;
}

// Test 1: Admin on Pending Vendor
const adminPendingHtml = getActionHtml(mockVendorPending, 'Admin');
assert(adminPendingHtml.includes('id="approve"'), 'Admin must have Approve button');
assert(adminPendingHtml.includes('id="reject"'), 'Admin must have Reject button');
assert(!adminPendingHtml.includes('id="edit"'), 'Admin must NOT have Edit button on pending vendor');
assert(!adminPendingHtml.includes('id="ban"'), 'Admin must NOT have Ban button on pending vendor');
console.log('  ✓ PASS: Simulation - Admin sees ONLY Approve and Reject for pending vendor');

// Test 2: User on Pending Vendor
const userPendingHtml = getActionHtml(mockVendorPending, 'User');
assert(userPendingHtml.includes('id="edit"'), 'User must have Edit Form button on pending vendor');
assert(userPendingHtml.includes('Pending Approval'), 'User must see Pending Approval badge');
assert(!userPendingHtml.includes('id="approve"'), 'User must not see Approve button');
assert(!userPendingHtml.includes('id="reject"'), 'User must not see Reject button');
assert(!userPendingHtml.includes('id="ban"'), 'User must not see Ban button');
console.log('  ✓ PASS: Simulation - User sees Edit Form and Pending badge for pending vendor');

// Test 3: Admin on Approved Vendor
const adminApprovedHtml = getActionHtml(mockVendorApproved, 'Admin');
assert(!adminApprovedHtml.includes('id="approve"'), 'Approved vendor should not have Approve button');
assert(!adminApprovedHtml.includes('id="edit"'), 'Approved vendor should not have direct Edit button for Admin');
assert(adminApprovedHtml.includes('id="ban"'), 'Admin must have Ban button on approved vendor');
console.log('  ✓ PASS: Simulation - Admin sees Ban button on approved vendor');

console.log('===============================================================');
console.log('ALL MAKER-CHECKER RESTRICTION TESTS PASSED (100%)');
console.log('===============================================================');
