const fs = require('fs');

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

// Mock dependencies
require('./js/store.js');
require('./js/masters.js');

try {
  console.log('===============================================================');
  console.log('TEST SUITE: Vendor Dashboard & Masters Render Integrity');
  console.log('===============================================================');

  // Set store data with every permutation of vendor status & attributes
  CMS_STORE.data = {
    vendors: [
      { id: 'V001', name: 'Pending Vendor', status: 'Pending Approval' },
      { id: 'V002', name: 'Draft Vendor', status: 'Draft' },
      { id: 'V003', name: 'Approved Vendor', status: 'Approved', isApproved: true },
      { id: 'V004', name: 'Blocked Vendor', status: 'Blocked', isBlocked: true },
      { id: 'V005', name: 'Revision Vendor', status: 'Revision Required', checkerMistakeRemark: 'GSTIN mismatch' },
      { id: 'V006', name: 'Expired Hold Vendor', status: 'Approved', autoBlockedOnExpiry: true },
      { id: 'V007', name: 'Limited Period Vendor', status: 'Approved', approvedForLimitedPeriod: true, approvalValidTill: '2027-12-31' },
      { id: 'V008', name: 'Active Task Vendor', status: 'Approved', pendingModificationTaskId: 'TASK-101' }
    ],
    items: [],
    departments: []
  };

  // Test Admin rendering
  CMS_STORE.getRole = () => 'Admin';
  const adminHtml = CMS_MASTERS.renderVendors();
  if (!adminHtml || typeof adminHtml !== 'string') {
    throw new Error('Admin render returned invalid output');
  }
  console.log('  ✓ PASS: Admin renderVendors() executed cleanly without reference errors');

  // Test User rendering
  CMS_STORE.getRole = () => 'User';
  const userHtml = CMS_MASTERS.renderVendors();
  if (!userHtml || typeof userHtml !== 'string') {
    throw new Error('User render returned invalid output');
  }
  console.log('  ✓ PASS: User renderVendors() executed cleanly without reference errors');

  // Verify that Admin does NOT see Ban buttons for Pending or Draft
  if (adminHtml.includes("promptBlockVendor('V001'") || adminHtml.includes("promptBlockVendor('V002'")) {
    throw new Error('Admin view illegally contains Ban button for Pending or Draft vendor');
  }
  console.log('  ✓ PASS: Ban button strictly excluded for Pending/Draft vendors in Admin view');

  // Verify that Admin sees Ban button for Approved / Blocked vendor
  if (!adminHtml.includes("promptBlockVendor('V003'")) {
    throw new Error('Admin view missing Ban button for Approved vendor');
  }
  console.log('  ✓ PASS: Ban button correctly available for Approved vendor in Admin view');

  console.log('===============================================================');
  console.log('ALL VENDOR RENDERING INTEGRITY TESTS PASSED (100%)');
  console.log('===============================================================');
} catch (err) {
  console.error('TEST FAILED:', err);
  process.exit(1);
}
