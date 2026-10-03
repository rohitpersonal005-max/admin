const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body><div id="vendor-form"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = { getItem: () => '{}', setItem: () => {} };
global.window.CMS_STORE = {
  data: { vendors: [], consumables: [] },
  getCurrentUser: () => ({ id: 'EMP-2041', role: 'User', name: 'Rajesh' }),
  save: () => console.log('Saved!')
};
global.window.CMS_APP = {
  toast: (msg, type) => console.log('TOAST:', msg),
  closeModal: () => console.log('Modal Closed'),
  refreshView: () => console.log('View Refreshed')
};

global.window.CMS_MASTERS = require('./js/masters.js').CMS_MASTERS || global.window.CMS_MASTERS; // Wait, masters.js adds to window!
require('./js/masters.js');
document.body.innerHTML = window.CMS_MASTERS.renderVendorForm();
window.CMS_MASTERS.saveVendor();
