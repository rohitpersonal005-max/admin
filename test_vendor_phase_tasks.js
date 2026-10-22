const assert = require('assert');

// Mock objects
const store = {
  data: {
    vendors: [
      {
        id: 'VEN-001',
        name: 'Test Vendor Apex',
        status: 'Approved',
        isApproved: true,
        isBlocked: false,
        certificates: [
          { name: 'ISO Cert', validTill: '2026-10-20' } // Expired (today is 2026-10-23)
        ]
      },
      {
        id: 'VEN-002',
        name: 'Valid Vendor Beta',
        status: 'Approved',
        isApproved: true,
        isBlocked: false,
        certificates: [
          { name: 'GST Cert', validTill: '2026-12-31' } // Valid
        ]
      }
    ],
    adminTasks: []
  },
  save() { this.saved = true; },
  getRole() { return this.currentRole || 'Admin'; },
  getCurrentUser() { return { id: 'USR-ADMIN', name: 'Col. Anita Sharma' }; },
  canApprove() { return { allowed: true }; }
};

// 1. Test Auto-Expiry Block
function checkAndApplyAutoExpiryBlocks(today = '2026-10-23') {
  const autoBlockedList = [];
  store.data.vendors.forEach(v => {
    if ((v.status === 'Approved' || v.isApproved) && !v.isBlocked) {
      let expiredDoc = null;
      if (Array.isArray(v.certificates)) {
        for (const c of v.certificates) {
          if (c.validTill && c.validTill < today) {
            expiredDoc = { type: 'Certificate', name: c.name, validTill: c.validTill };
            break;
          }
        }
      }
      if (expiredDoc) {
        v.isBlocked = true;
        v.status = 'Blocked';
        v.blockReason = `Automatic Compliance Hold: Document deadline reached (${expiredDoc.name} expired on ${expiredDoc.validTill}) without verified renewal.`;
        v.autoBlockedOnExpiry = true;
        v.blockedAt = new Date().toISOString();
        autoBlockedList.push({ vendorId: v.id, expiredDoc });
      }
    }
  });
  if (autoBlockedList.length > 0) store.save();
  return autoBlockedList;
}

const blocked = checkAndApplyAutoExpiryBlocks();
assert(blocked.length === 1 && blocked[0].vendorId === 'VEN-001', 'VEN-001 correctly auto-blocked on expired document');
assert(store.data.vendors[0].status === 'Blocked', 'Status is Blocked');
assert(store.data.vendors[1].status === 'Approved', 'Valid vendor remains Approved');
console.log('✓ Auto-blocking logic PASSED');

// 2. Test Admin Unblock
function adminUnblockVendor(vendorId) {
  if (store.getRole() !== 'Admin') throw new Error('Unauthorized');
  const v = store.data.vendors.find(i => i.id === vendorId);
  if (!v) return false;
  v.isBlocked = false;
  v.status = 'Approved';
  v.blockReason = '';
  store.save();
  return true;
}

adminUnblockVendor('VEN-001');
assert(store.data.vendors[0].isBlocked === false && store.data.vendors[0].status === 'Approved', 'Admin successfully unblocks vendor');
console.log('✓ Admin unblock logic PASSED');

// 3. Test Task Generation
function createAdminTask(payload) {
  const v = store.data.vendors.find(i => i.id === payload.vendorId);
  const task = {
    id: 'TASK-' + Date.now(),
    taskType: payload.taskType,
    taskTypeName: payload.taskTypeName,
    vendorId: v.id,
    vendorName: v.name,
    allowedPhases: payload.allowedPhases,
    assignedToUserId: payload.assigneeId,
    instructions: payload.instructions,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  store.data.adminTasks.unshift(task);
  v.activeTaskId = task.id;
  store.save();
  return task;
}

const task = createAdminTask({
  vendorId: 'VEN-001',
  assigneeId: 'USR-STORE-01',
  allowedPhases: [2],
  taskType: 'modify_approved_vendor',
  taskTypeName: 'Modify Approved Vendor',
  instructions: 'Update ISO Certificate'
});

assert(store.data.adminTasks.length === 1, 'Task created');
assert(task.allowedPhases.includes(2) && !task.allowedPhases.includes(1), 'Only Phase 2 authorized');
console.log('✓ Task creation logic PASSED');

// 4. Test Submission for Approval
function submitTaskModification(vendorId, taskId, updatedCertDate) {
  const v = store.data.vendors.find(i => i.id === vendorId);
  const t = store.data.adminTasks.find(i => i.id === taskId);
  v.certificates[0].validTill = updatedCertDate;
  v.status = 'Pending Approval';
  v.isApproved = false;
  v.isModificationRevision = true;
  v.pendingModificationTaskId = taskId;
  t.status = 'Submitted for Approval';
  store.save();
}

submitTaskModification('VEN-001', task.id, '2027-10-20');
assert(store.data.vendors[0].status === 'Pending Approval', 'Vendor routed to Pending Approval');
assert(store.data.adminTasks[0].status === 'Submitted for Approval', 'Task is Submitted for Approval');
console.log('✓ Submit task modification logic PASSED');

// 5. Test Admin Sanction & Finalization
function approveVendor(vendorId) {
  const v = store.data.vendors.find(i => i.id === vendorId);
  v.status = 'Approved';
  v.isApproved = true;
  v.isBlocked = false;
  v.blockReason = '';
  if (v.pendingModificationTaskId) {
    const t = store.data.adminTasks.find(i => i.id === v.pendingModificationTaskId);
    if (t) {
      t.status = 'Completed';
    }
    v.pendingModificationTaskId = null;
    v.isModificationRevision = false;
  }
  store.save();
}

approveVendor('VEN-001');
assert(store.data.vendors[0].status === 'Approved' && store.data.vendors[0].isApproved === true, 'Vendor details finalized and approved');
assert(store.data.adminTasks[0].status === 'Completed', 'Task marked Completed');
console.log('✓ Admin sanction & finalization PASSED');

// 6. Test Executive Dashboard "Add task" Workflow
function simulateExecutiveDashboardAddTask(params) {
  const { title, notes, vendorId, assignedTo, phases } = params;
  assert(title, 'Task title is required');
  assert(notes, 'Notes/Message is required');
  assert(vendorId, 'Vendor selection is required for vendor modification');
  assert(assignedTo, 'Assignee is required');
  assert(phases && phases.length > 0, 'At least one authorized phase is required');

  const vendor = store.data.vendors.find(v => v.id === vendorId);
  const taskId = 'task_exec_' + Date.now();
  const task = {
    id: taskId,
    title,
    taskType: 'modify_vendor',
    targetVendorId: vendorId,
    vendorId,
    targetVendorName: vendor ? vendor.name : '',
    authorizedPhases: phases,
    allowedPhases: phases,
    assignedTo,
    notes,
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  if (vendor) {
    vendor.pendingModificationTaskId = taskId;
    vendor.authorizedPhases = phases;
    vendor.assignedTaskUser = assignedTo;
  }
  store.data.adminTasks.unshift(task);
  store.save();
  return task;
}

const execTask = simulateExecutiveDashboardAddTask({
  title: 'Modify Approved Vendor',
  notes: 'Vendor submitted updated GST and PAN via email. Please update records.',
  vendorId: 'VEN-001',
  assignedTo: 'Rajesh Kumar',
  phases: [2]
});

assert(execTask.targetVendorId === 'VEN-001', 'Task linked to vendor VEN-001');
assert(execTask.assignedTo === 'Rajesh Kumar', 'Task assigned to Rajesh Kumar');
assert(execTask.authorizedPhases.includes(2) && !execTask.authorizedPhases.includes(1), 'Only Phase 2 authorized');
assert(store.data.vendors[0].pendingModificationTaskId === execTask.id, 'Vendor pendingModificationTaskId set');
console.log('✓ Executive Dashboard Add Task workflow PASSED');

// 7. Test Limited Period Approval Document Strictness
function validateLimitedApproval(approvedForLimitedPeriod, validTill, approvalDocFile, directSubmit = true) {
  if (approvedForLimitedPeriod) {
    if (!validTill) {
      if (directSubmit) throw new Error('Approval Expiry Date is mandatory');
      return false;
    }
    if (!approvalDocFile) {
      if (directSubmit) throw new Error('Limited Period Approval Document is strictly mandatory');
      return false;
    }
  }
  return true;
}

// Case A: Missing document when limited period is checked -> Must fail
let errorThrown = false;
try {
  validateLimitedApproval(true, '2027-10-20', '');
} catch (e) {
  errorThrown = true;
  assert(e.message.includes('strictly mandatory'), 'Strict error message thrown');
}
assert(errorThrown === true, 'Validation strictly blocks submission without approval document');

// Case B: Document provided when limited period is checked -> Passes
const validResult = validateLimitedApproval(true, '2027-10-20', 'board_approval_sanction_letter.pdf');
assert(validResult === true, 'Validation passes when approval document is provided');

// Case C: Perpetual vendor without limited period -> Document not required
const perpetualResult = validateLimitedApproval(false, '', '');
assert(perpetualResult === true, 'Perpetual vendor without limited period does not require document');
console.log('✓ Limited Period Approval Document strictness PASSED');

console.log('\nALL 7 SIMULATION CHECKS PASSED 100%!');
