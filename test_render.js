const fs = require('fs');

const EMPTY_DATABASE = {
  userRole: 'User',
  categories: [],
  gstSlabs: [],
  vendors: [],
  consumables: [],
  receipts: [],
  requests: [],
  issuances: [],
  returns: [],
  stockAdjustments: [],
  adminTasks: [],
  purchaseOrders: [],
  reconciliations: []
};

global.window = {
  CMS_STORE: {
    data: EMPTY_DATABASE,
    getPendingApprovalsCount: () => 0,
    getStock: () => 0,
    isApprover: () => true,
    getCurrentUser: () => ({role: 'Admin'}),
    getRole: () => 'Admin'
  },
  CMS_APP: {
    navigateTo: () => {}
  }
};
global.document = {
  getElementById: () => null
};

eval(fs.readFileSync('js/dashboard.js', 'utf8'));

try {
  window.CMS_DASHBOARD.render();
  console.log('RENDER SUCCESSFUL');
} catch(e) {
  console.log('CRASH!', e);
}
