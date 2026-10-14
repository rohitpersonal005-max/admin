const fs = require('fs');

let code = fs.readFileSync('js/masters.js', 'utf8');

// Mock browser objects
global.window = {
  CMS_STORE: {
    getRole: () => 'Maker',
    getCurrentUser: () => ({ id: 'U-01', name: 'John Doe', department: 'Stores' }),
    data: { vendors: [] }
  },
  CMS_HOME: { companyInfo: { name: 'ACME Corp' } },
  lucide: { createIcons: () => {} }
};
global.localStorage = {
  getItem: () => null,
  setItem: () => null
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

eval(code);

console.log('Testing renderVendorPaperFormHtml in masters.js:');

// Test 1: 4 documents: PAN, GST, 1 Certificate, 1 Bank Doc
const v1 = {
  id: 'VEN-01',
  name: 'Vendor 1',
  status: 'Pending Approval',
  panCardFile: 'pan.pdf',
  gstCertificateFile: 'gst.pdf',
  bankDoc: 'bank.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-101', fileName: 'iso.pdf' }]
};
const res1 = window.CMS_MASTERS.renderVendorPaperFormHtml(v1);
const match1 = res1.match(/(\d+)\s+Attachments?/i);
console.log('Test 1 (PAN, GST, 1 Cert, Bank):', match1 ? match1[1] : 'not found');

// Test 2: User uploaded identical file names (e.g. test.pdf) for all 4 slots
const v2 = {
  id: 'VEN-02',
  name: 'Vendor 2',
  status: 'Pending Approval',
  panCardFile: 'test.pdf',
  gstCertificateFile: 'test.pdf',
  bankDoc: 'test.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-102', fileName: 'test.pdf' }]
};
const res2 = window.CMS_MASTERS.renderVendorPaperFormHtml(v2);
const match2 = res2.match(/(\d+)\s+Attachments?/i);
console.log('Test 2 (All test.pdf):', match2 ? match2[1] : 'not found');

// Test 3: Certificate has filename/file property
const v3 = {
  id: 'VEN-03',
  name: 'Vendor 3',
  status: 'Pending Approval',
  panCardFile: 'pan.pdf',
  gstCertificateFile: 'gst.pdf',
  bankDoc: 'bank.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-103', filename: 'iso.pdf' }]
};
const res3 = window.CMS_MASTERS.renderVendorPaperFormHtml(v3);
const match3 = res3.match(/(\d+)\s+Attachments?/i);
console.log('Test 3 (cert.filename):', match3 ? match3[1] : 'not found');

// Test 4: Top-level certificateFile
const v4 = {
  id: 'VEN-04',
  name: 'Vendor 4',
  status: 'Pending Approval',
  panCardFile: 'pan.pdf',
  gstCertificateFile: 'gst.pdf',
  bankDoc: 'bank.pdf',
  certificateFile: 'iso.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-104' }]
};
const res4 = window.CMS_MASTERS.renderVendorPaperFormHtml(v4);
const match4 = res4.match(/(\d+)\s+Attachments?/i);
console.log('Test 4 (v.certificateFile):', match4 ? match4[1] : 'not found');

// Test 5: 4 documents: PAN, GST, 1 Certificate, Quotation Copy (no bank doc)
const v5 = {
  id: 'VEN-05',
  name: 'Vendor 5',
  status: 'Pending Approval',
  panCardFile: 'pan.pdf',
  gstCertificateFile: 'gst.pdf',
  quotationDoc: 'quote.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-105', fileName: 'iso.pdf' }],
  quotedItems: [{ quotationNo: 'Q-05', materialName: 'Paper', doc: 'quote.pdf' }]
};
const res5 = window.CMS_MASTERS.renderVendorPaperFormHtml(v5);
const match5 = res5.match(/(\d+)\s+Attachments?/i);
console.log('Test 5 (PAN, GST, Cert, Quote):', match5 ? match5[1] : 'not found');

// Test 6: 5 documents: PAN, GST, 1 Certificate, Quotation Copy, Bank Doc
const v6 = {
  id: 'VEN-06',
  name: 'Vendor 6',
  status: 'Pending Approval',
  panCardFile: 'pan.pdf',
  gstCertificateFile: 'gst.pdf',
  quotationDoc: 'quote.pdf',
  bankDoc: 'bank.pdf',
  certificates: [{ regulator: 'ISO', certificateNo: 'ISO-106', fileName: 'iso.pdf' }],
  quotedItems: [{ quotationNo: 'Q-06', materialName: 'Paper', doc: 'quote.pdf' }]
};
const res6 = window.CMS_MASTERS.renderVendorPaperFormHtml(v6);
const match6 = res6.match(/(\d+)\s+Attachments?/i);
console.log('Test 6 (All 5 docs):', match6 ? match6[1] : 'not found');

// Check Annexure headers inside res1
const annexures1 = [...res1.matchAll(/Annexure\s+#(\d+)/g)].map(m => m[0]);
console.log('Annexures mentioned in Test 1 HTML:', annexures1.join(', '));
