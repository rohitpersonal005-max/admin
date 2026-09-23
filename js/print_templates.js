/**
 * Consumable Management System - Print Templates Engine
 * Generates official printable vouchers: Issue Slips, Purchase Orders,
 * Goods Inward Receipts, and Stock Reconciliation Audit Certificates.
 */

window.CMS_PRINT = {
  printIssueSlip(issue) {
    const store = window.CMS_STORE ? window.CMS_STORE.data : null;
    const mat = (store && store.consumables) ? store.consumables.find(m => m.id === issue.materialId) : null;
    
    const assetTag = issue.assetTag || (mat && mat.assetTag) || '';
    const serialNo = issue.serialNo || (mat && mat.serialNo) || '';
    const hasWarranty = Boolean(issue.hasWarranty || (mat && mat.hasWarranty));
    const warrantyPeriod = issue.warrantyPeriod || (mat && mat.warrantyPeriod) || '1 Year';
    const warrantyValidTill = (mat && mat.warrantyValidTill) || '';
    const warrantyVendor = (mat && mat.warrantyVendor) || '';
    const hasPm = Boolean(issue.hasPm || (mat && mat.hasPm));
    const pmFrequency = issue.pmFrequency || (mat && mat.pmFrequency) || 'Quarterly';
    const repairmanName = issue.repairmanName || (mat && mat.repairmanName) || '';
    const repairmanContact = issue.repairmanContact || (mat && mat.repairmanContact) || '';
    const repairmanAgency = (mat && (mat.repairmanAgency || mat.pmVendor)) || '';
    const transferMode = issue.transferMode || 'PULL';
    const sourceDept = issue.sourceDept || 'Central Stores';
    const destDept = issue.department || issue.destDept || 'General Operations';
    const isPush = transferMode === 'PUSH';

    const html = `
      <div class="print-slip-box font-sans p-8 max-w-3xl mx-auto border-2 border-slate-900 bg-white">
        <!-- Header -->
        <div class="border-b-2 border-slate-900 pb-4 mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-slate-900 uppercase">ADMINUTES CENTRAL STORES</h1>
              <p class="text-xs text-slate-600">Enterprise Consumable Management ERP</p>
              <p class="text-xs text-slate-500">Facility Operations, Fixed Assets & Logistics Wing</p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 bg-slate-900 text-white font-bold text-xs tracking-wider uppercase rounded">
                MATERIAL ISSUE SLIP
              </span>
              <p class="text-sm font-bold text-slate-900 mt-2">Slip No: <span class="font-mono text-blue-800">${issue.issueNo}</span></p>
              <p class="text-xs text-slate-600">Date: ${new Date(issue.issuedAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        <!-- Issue & Indent Routing Grid -->
        <div class="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50 p-4 border border-slate-300 rounded">
          <div class="space-y-1.5">
            <p><strong class="text-slate-700">Requisition No:</strong> <span class="font-mono font-semibold">${issue.requestNo || 'DIRECT-REQ'}</span></p>
            <p><strong class="text-slate-700">Transfer Mode:</strong> 
              <span class="inline-block px-2 py-0.5 font-bold uppercase rounded text-[10px] ${isPush ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'}">
                ${isPush ? 'PUSH (Inter-Dept Store Allocation)' : 'PULL (Department Indent Demand)'}
              </span>
            </p>
            <p><strong class="text-slate-700">Source Depot:</strong> <span>${sourceDept}</span></p>
            <p><strong class="text-slate-700">Destination Dept:</strong> <span class="font-semibold text-slate-900">${destDept}</span></p>
          </div>
          <div class="space-y-1.5">
            <p><strong class="text-slate-700">Issued To (Recipient):</strong> <span class="font-semibold text-slate-900">${issue.issuedTo}</span></p>
            <p><strong class="text-slate-700">Issued By (Stores):</strong> <span>${issue.issuedBy || 'Store In-Charge'}</span></p>
            <p><strong class="text-slate-700">Pre-Issue Stock Balance:</strong> <span class="font-mono font-bold text-emerald-700">${issue.availableStockAtIssue || 0} ${issue.unit}</span></p>
            <p><strong class="text-slate-700">Fulfillment Status:</strong> <span class="text-emerald-700 font-bold uppercase">FULFILLED</span></p>
          </div>
        </div>

        <!-- Material Details Table -->
        <table class="w-full text-left border-collapse mb-6 border border-slate-900 text-xs">
          <thead>
            <tr class="bg-slate-200 border-b border-slate-900 font-bold">
              <th class="p-2.5 border-r border-slate-900 w-10 text-center">#</th>
              <th class="p-2.5 border-r border-slate-900">Material Description & Identifiers</th>
              <th class="p-2.5 border-r border-slate-900">Brand</th>
              <th class="p-2.5 border-r border-slate-900 text-center">Unit</th>
              <th class="p-2.5 border-r border-slate-900 text-right">Req. Qty</th>
              <th class="p-2.5 border-slate-900 text-right bg-emerald-50">Issued Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-300">
              <td class="p-3 border-r border-slate-300 text-center font-mono">1</td>
              <td class="p-3 border-r border-slate-300">
                <div class="font-bold text-slate-900 text-sm">${issue.materialName}</div>
                <div class="text-[11px] text-slate-500 font-mono">SKU: ${issue.materialId}</div>
                ${assetTag ? `<div class="text-[11px] font-mono text-purple-900 font-bold mt-0.5">Asset Tag: ${assetTag} ${serialNo ? '| S/N: ' + serialNo : ''}</div>` : ''}
              </td>
              <td class="p-3 border-r border-slate-300 font-medium">${issue.brand || 'Standard'}</td>
              <td class="p-3 border-r border-slate-300 text-center font-mono">${issue.unit}</td>
              <td class="p-3 border-r border-slate-300 text-right font-mono">${issue.requestedQty}</td>
              <td class="p-3 text-right font-mono font-bold text-emerald-800 text-base bg-emerald-50">${issue.issuedQty}</td>
            </tr>
          </tbody>
        </table>

        <!-- Warranty & Preventive Maintenance Metadata Cards (if applicable) -->
        ${(hasWarranty || hasPm) ? `
          <div class="grid grid-cols-2 gap-4 mb-6 text-xs">
            ${hasWarranty ? `
              <div class="p-3 border border-blue-200 bg-blue-50/50 rounded">
                <div class="font-bold text-blue-950 uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                  Warranty Terms
                </div>
                <p class="text-slate-700"><strong>Coverage Period:</strong> ${warrantyPeriod}</p>
                ${warrantyValidTill ? `<p class="text-slate-700 font-mono"><strong>Valid Till:</strong> ${warrantyValidTill}</p>` : ''}
                ${warrantyVendor ? `<p class="text-slate-600 text-[11px]">Partner: ${warrantyVendor}</p>` : ''}
              </div>
            ` : '<div class="p-3 border border-slate-200 rounded text-slate-400 italic text-[11px]">No specific warranty terms.</div>'}

            ${hasPm ? `
              <div class="p-3 border border-purple-200 bg-purple-50/50 rounded">
                <div class="font-bold text-purple-950 uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                  Preventive Maintenance Schedule
                </div>
                <p class="text-slate-700"><strong>Frequency:</strong> ${pmFrequency}</p>
                <p class="text-slate-700"><strong>Technician:</strong> ${repairmanName || 'Assigned Vendor Tech'} ${repairmanContact ? '(' + repairmanContact + ')' : ''}</p>
                ${repairmanAgency ? `<p class="text-slate-600 text-[11px]">Agency: ${repairmanAgency}</p>` : ''}
              </div>
            ` : '<div class="p-3 border border-slate-200 rounded text-slate-400 italic text-[11px]">Consumable item without scheduled PM.</div>'}
          </div>
        ` : ''}

        <!-- Remarks -->
        <div class="text-xs mb-8 p-3 border border-slate-200 rounded bg-slate-50">
          <strong>Store Remarks / Purpose:</strong>
          <span class="text-slate-700 italic ml-1">${issue.remarks || 'Standard store issuance against approved departmental indent.'}</span>
        </div>

        <!-- Signatures Block -->
        <div class="grid grid-cols-3 gap-6 text-center text-xs mt-10 pt-6 border-t border-dashed border-slate-400">
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">${issue.issuedBy || 'Store Incharge'}</p>
            <p class="text-slate-500">Issued by (Central Stores)</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">${issue.issuedTo}</p>
            <p class="text-slate-500">Received by (Department)</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">Store Manager / Custodian</p>
            <p class="text-slate-500">Authorized Signatory</p>
          </div>
        </div>

        <!-- Footer note -->
        <div class="mt-8 text-center text-[10px] text-slate-400">
          Generated via Adminutes ERP • Available Stock checked & certified on issue
        </div>
      </div>
    `;
    this.openPrintWindow('Issue Slip - ' + issue.issueNo, html);
  },

  printPurchaseOrder(po) {
    const html = `
      <div class="print-slip-box font-sans p-8 max-w-4xl mx-auto border-2 border-slate-900 bg-white">
        <!-- Header -->
        <div class="border-b-2 border-slate-900 pb-4 mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-semibold text-slate-900 tracking-tight">ADMINUTES ENTERPRISES LTD</h1>
              <p class="text-xs text-slate-600">Central Procurement & Material Management Department</p>
              <p class="text-xs text-slate-500">GSTIN: 07AAACE0101C1Z4 | Email: purchase@adminutes.com</p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 bg-blue-700 text-white font-bold text-sm tracking-wider uppercase">
                PURCHASE ORDER
              </span>
              <p class="text-base font-bold text-slate-900 mt-2">PO No: <span class="font-mono text-blue-900">${po.poNo}</span></p>
              <p class="text-xs text-slate-600">PO Date: ${new Date(po.createdAt || Date.now()).toLocaleDateString('en-IN')}</p>
              <p class="text-xs font-semibold text-red-600">Delivery Due: ${po.deliveryDate || 'Within 7 Days'}</p>
            </div>
          </div>
        </div>

        <!-- Vendor & Order Info -->
        <div class="grid grid-cols-2 gap-6 text-sm mb-6">
          <div class="border border-slate-300 p-4 rounded bg-slate-50">
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">SUPPLIER / VENDOR DETAILS:</h3>
            <p class="font-bold text-base text-slate-900">${po.vendorName}</p>
            <p class="text-xs text-slate-600 mt-1">Vendor Code: <span class="font-mono font-semibold">${po.vendorId}</span></p>
            <p class="text-xs text-slate-600">Rate Effective Date: <span class="font-semibold text-blue-700">${po.rateEffectiveFrom || 'Current'}</span></p>
            <p class="text-xs text-slate-600">Status: <span class="text-emerald-700 font-bold">Approved Vendor</span></p>
          </div>
          <div class="border border-slate-300 p-4 rounded bg-slate-50 text-xs space-y-1">
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">ORDER CONTEXT & QUOTA:</h3>
            <p><strong>Replenishment Period:</strong> <span class="font-bold text-blue-800">${po.period}</span></p>
            <p><strong>Monthly Consumption (with Buffer):</strong> ${po.monthlyConsumptionWithBuffer} ${po.unit}</p>
            <p><strong>Current Stock in Store:</strong> ${po.currentStock} ${po.unit}</p>
            <p><strong>Computed Net Requirement:</strong> ${po.calculatedSuggestedQty} ${po.unit}</p>
            <p><strong>Terms:</strong> ${po.terms || '30 Days Credit'}</p>
          </div>
        </div>

        <!-- Itemized Order Table -->
        <table class="w-full text-left border-collapse mb-6 border border-slate-900 text-sm">
          <thead>
            <tr class="bg-slate-200 border-b border-slate-900">
              <th class="p-3 border-r border-slate-900 font-bold w-12 text-center">#</th>
              <th class="p-3 border-r border-slate-900 font-bold">Consumable Material Description</th>
              <th class="p-3 border-r border-slate-900 font-bold">Category</th>
              <th class="p-3 border-r border-slate-900 font-bold text-center">Qty / Unit</th>
              <th class="p-3 border-r border-slate-900 font-bold text-right">Approved Rate (₹)</th>
              <th class="p-3 border-r border-slate-900 font-bold text-right">GST %</th>
              <th class="p-3 border-slate-900 font-bold text-right">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-300">
              <td class="p-3 border-r border-slate-300 text-center font-mono">1</td>
              <td class="p-3 border-r border-slate-300">
                <div class="font-bold text-slate-900">${po.materialName}</div>
                <div class="text-xs text-slate-500">Brand: ${po.brand || 'Standard'} | Code: ${po.materialId}</div>
              </td>
              <td class="p-3 border-r border-slate-300">${po.categoryName}</td>
              <td class="p-3 border-r border-slate-300 text-center font-mono font-bold">${po.orderQty} ${po.unit}</td>
              <td class="p-3 border-r border-slate-300 text-right font-mono">₹${Number(po.rate).toFixed(2)}</td>
              <td class="p-3 border-r border-slate-300 text-right font-mono">${po.gstPercent}%</td>
              <td class="p-3 text-right font-mono font-bold text-slate-900">₹${Number(po.totalAmount).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <!-- Calculations & Summary -->
        <div class="flex justify-between items-start mb-8 text-sm">
          <div class="w-1/2 p-4 border border-slate-300 rounded bg-slate-50 text-xs">
            <h4 class="font-bold uppercase text-slate-700 mb-1">Standard Purchase Terms:</h4>
            <ol class="list-decimal list-inside space-y-1 text-slate-600">
              <li>Supplied items must strictly conform to approved brand specifications.</li>
              <li>Delivery Challan and Tax Invoice must accompany the physical consignment.</li>
              <li>Material subject to quality inspection upon arrival at central stores.</li>
            </ol>
            <p class="mt-2 text-slate-500 italic">Special Remarks: ${po.remarks || 'Nil'}</p>
          </div>
          <div class="w-1/3 border border-slate-900 rounded overflow-hidden text-sm">
            <div class="flex justify-between p-2 border-b border-slate-200">
              <span class="text-slate-600">Subtotal:</span>
              <span class="font-mono">₹${Number(po.subtotal).toFixed(2)}</span>
            </div>
            <div class="flex justify-between p-2 border-b border-slate-200 bg-slate-50">
              <span class="text-slate-600">Applicable GST (${po.gstPercent}%):</span>
              <span class="font-mono">₹${Number(po.taxAmount).toFixed(2)}</span>
            </div>
            <div class="flex justify-between p-3 bg-slate-900 text-white font-bold text-base">
              <span>Grand Total:</span>
              <span class="font-mono">₹${Number(po.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Signatures -->
        <div class="grid grid-cols-2 gap-12 text-center text-xs pt-8 border-t border-slate-300">
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">Procurement Officer (Maker)</p>
            <p class="text-slate-500">Prepared & Checked</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">General Manager - Supply Chain (Checker)</p>
            <p class="text-slate-500">Approved & Issued</p>
          </div>
        </div>
      </div>
    `;
    this.openPrintWindow('Purchase Order - ' + po.poNo, html);
  },

  printReconciliationSheet(recon) {
    const rows = (recon.items || []).map((item, idx) => `
      <tr class="border-b border-slate-300">
        <td class="p-2 border-r border-slate-300 text-center font-mono">${idx + 1}</td>
        <td class="p-2 border-r border-slate-300 font-semibold">${item.materialName}</td>
        <td class="p-2 border-r border-slate-300 text-center">${item.unit}</td>
        <td class="p-2 border-r border-slate-300 text-right font-mono">${item.systemQty}</td>
        <td class="p-2 border-r border-slate-300 text-right font-mono font-bold">${item.physicalQty}</td>
        <td class="p-2 border-r border-slate-300 text-right font-mono font-bold ${item.variance < 0 ? 'text-red-600' : item.variance > 0 ? 'text-emerald-600' : 'text-slate-600'}">
          ${item.variance > 0 ? '+' : ''}${item.variance}
        </td>
        <td class="p-2 text-xs italic">${item.remarks || '-'}</td>
      </tr>
    `).join('');

    const html = `
      <div class="print-slip-box font-sans p-8 max-w-4xl mx-auto border-2 border-slate-900 bg-white">
        <div class="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-semibold uppercase text-slate-900">ADMINUTES - STOCK VERIFICATION & RECONCILIATION AUDIT</h1>
            <p class="text-xs text-slate-600">Category: <span class="font-bold">${recon.categoryName}</span> | Audit No: <span class="font-mono font-bold text-blue-800">${recon.reconciliationNo}</span></p>
          </div>
          <div class="text-right">
            <span class="inline-block px-3 py-1 bg-purple-800 text-white font-bold text-xs uppercase">AUDIT CERTIFIED</span>
            <p class="text-xs text-slate-600 mt-1">Audit Date: ${recon.reconciliationDate}</p>
          </div>
        </div>

        <table class="w-full text-left border-collapse mb-6 border border-slate-900 text-xs">
          <thead>
            <tr class="bg-slate-200 border-b border-slate-900 font-bold">
              <th class="p-2 border-r border-slate-900 text-center">#</th>
              <th class="p-2 border-r border-slate-900">Material Name</th>
              <th class="p-2 border-r border-slate-900 text-center">Unit</th>
              <th class="p-2 border-r border-slate-900 text-right">System Qty</th>
              <th class="p-2 border-r border-slate-900 text-right">Physical Count</th>
              <th class="p-2 border-r border-slate-900 text-right">Variance</th>
              <th class="p-2 border-slate-900">Discrepancy Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="text-xs mb-8 p-3 border border-slate-300 rounded bg-slate-50">
          <strong>Auditor Statement:</strong>
          <p class="text-slate-600 mt-1">${recon.remarks || 'Physical stock audit completed across storage bins. Variances calibrated as recorded above.'}</p>
        </div>

        <div class="grid grid-cols-2 gap-12 text-center text-xs pt-6 border-t border-slate-300">
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">Physical Stock Count Auditor</p>
            <p class="text-slate-500">Verified & Counted</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">Store In-Charge / Approver</p>
            <p class="text-slate-500">Calibrated & Approved</p>
          </div>
        </div>
      </div>
    `;
    this.openPrintWindow('Stock Reconciliation - ' + recon.reconciliationNo, html);
  },

  printPmCertificate(serviceRecord) {
    const store = window.CMS_STORE ? window.CMS_STORE.data : null;
    const mat = serviceRecord.material || (store && store.consumables ? store.consumables.find(m => m.id === serviceRecord.materialId) : null) || {};
    
    const jobCardNo = serviceRecord.jobCardNo || serviceRecord.id || ('JC-' + Date.now());
    const serviceDate = serviceRecord.serviceDate || serviceRecord.date || new Date().toISOString().split('T')[0];
    const technician = serviceRecord.servicedBy || serviceRecord.technician || serviceRecord.repairmanName || mat.repairmanName || 'Certified Technician';
    const contact = serviceRecord.contact || serviceRecord.repairmanContact || mat.repairmanContact || 'N/A';
    const agency = serviceRecord.agency || serviceRecord.repairmanAgency || mat.repairmanAgency || mat.pmVendor || 'Authorized Service Partner';
    const cost = Number(serviceRecord.cost || 0);
    const nextDate = serviceRecord.nextScheduledDate || mat.nextPmDate || 'Scheduled per SLA';
    const notes = serviceRecord.notes || 'Routine scheduled preventive maintenance and health inspection completed.';

    const html = `
      <div class="print-slip-box font-sans p-8 max-w-3xl mx-auto border-2 border-purple-900 bg-white">
        <!-- Header -->
        <div class="border-b-2 border-purple-900 pb-4 mb-6">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded bg-purple-800 text-white font-bold flex items-center justify-center text-sm">PM</span>
                <h1 class="text-2xl font-bold tracking-tight text-slate-900 uppercase">ADMINUTES ASSET CARE</h1>
              </div>
              <p class="text-xs text-slate-600 mt-1">Preventive Maintenance & Equipment Health Verification System</p>
              <p class="text-xs text-slate-500">Plant, Fixed Assets & Facilities Engineering Division</p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 bg-purple-900 text-white font-bold text-xs tracking-wider uppercase rounded">
                PM CERTIFICATE & JOB CARD
              </span>
              <p class="text-sm font-bold text-purple-950 mt-2">Job Card: <span class="font-mono text-purple-800">${jobCardNo}</span></p>
              <p class="text-xs text-slate-600">Service Date: ${serviceDate}</p>
            </div>
          </div>
        </div>

        <!-- Equipment Specification Strip -->
        <div class="grid grid-cols-2 gap-4 text-xs mb-6 bg-purple-50/60 p-4 border border-purple-200 rounded">
          <div class="space-y-1.5">
            <p><strong class="text-slate-700">Equipment / Asset:</strong> <span class="font-bold text-slate-900 text-sm">${mat.materialName || 'Capital Equipment'}</span></p>
            <p><strong class="text-slate-700">Material SKU:</strong> <span class="font-mono text-slate-800">${mat.id || 'N/A'}</span></p>
            <p><strong class="text-slate-700">Category:</strong> <span>${mat.categoryName || 'Fixed Asset'}</span></p>
            <p><strong class="text-slate-700">Custodian Dept:</strong> <span>${mat.custodianDept || 'Central Facilities'}</span></p>
          </div>
          <div class="space-y-1.5">
            <p><strong class="text-slate-700">Asset Tag / ID:</strong> <span class="font-mono font-bold text-purple-900">${mat.assetTag || 'N/A'}</span></p>
            <p><strong class="text-slate-700">Serial Number:</strong> <span class="font-mono text-slate-800">${mat.serialNo || 'N/A'}</span></p>
            <p><strong class="text-slate-700">PM Cycle:</strong> <span class="font-semibold text-purple-700">${mat.pmFrequency || 'Quarterly'}</span></p>
            <p><strong class="text-slate-700">Warranty Status:</strong> <span>${mat.warrantyValidTill ? 'Valid till ' + mat.warrantyValidTill : (mat.hasWarranty ? 'Active Warranty' : 'Standard Support')}</span></p>
          </div>
        </div>

        <!-- Service & Engineering Execution Details -->
        <div class="mb-6 border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-4 py-2 border-b border-slate-300 font-bold text-xs uppercase tracking-wider text-slate-700">
            Maintenance & Inspection Execution Details
          </div>
          <div class="p-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p class="text-slate-500 font-medium">Designated Service Agency:</p>
              <p class="font-bold text-slate-900 text-sm mt-0.5">${agency}</p>
              <p class="text-slate-500 font-medium mt-2">Lead Technician / Engineer:</p>
              <p class="font-semibold text-slate-800">${technician} (${contact})</p>
            </div>
            <div>
              <p class="text-slate-500 font-medium">Service / Inspection Billing:</p>
              <p class="font-mono font-bold text-slate-900 text-sm mt-0.5">₹${cost.toFixed(2)}</p>
              <p class="text-slate-500 font-medium mt-2">Next Scheduled Maintenance Due:</p>
              <p class="font-mono font-bold text-purple-800 text-sm mt-0.5">${nextDate}</p>
            </div>
          </div>
        </div>

        <!-- Technician Statement & Work Summary -->
        <div class="mb-6 p-4 border border-slate-300 rounded bg-slate-50 text-xs">
          <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Work Done / Parts Replaced / Calibration Audit:</div>
          <p class="text-slate-700 leading-relaxed">${notes}</p>
        </div>

        <!-- Certification Badge -->
        <div class="p-3 mb-8 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">Approved</span>
            <div>
              <div class="font-bold text-emerald-900">CERTIFICATE OF FITNESS ISSUED</div>
              <div class="text-[11px] text-emerald-700">The above equipment has undergone preventive inspection and is certified operational within safety thresholds.</div>
            </div>
          </div>
          <span class="px-2.5 py-1 bg-emerald-600 text-white font-bold uppercase tracking-wider rounded text-[10px]">VERIFIED OK</span>
        </div>

        <!-- Dual Signatures -->
        <div class="grid grid-cols-3 gap-6 text-center text-xs mt-8 pt-6 border-t border-dashed border-slate-400">
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">${technician}</p>
            <p class="text-slate-500">Service Engineer / Tech</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">${mat.custodianDept || 'Asset Custodian'}</p>
            <p class="text-slate-500">Custodian / Department Head</p>
          </div>
          <div>
            <div class="h-10 mb-1 border-b border-slate-400"></div>
            <p class="font-bold text-slate-900">Store Manager</p>
            <p class="text-slate-500">Adminutes Asset Authority</p>
          </div>
        </div>

        <div class="mt-8 text-center text-[10px] text-slate-400">
          Adminutes ERP • Asset Health & Preventive Maintenance Certification • Document Ref: ${jobCardNo}
        </div>
      </div>
    `;
    this.openPrintWindow('PM Certificate - ' + jobCardNo, html);
  },

  openPrintWindow(title, contentHtml) {
    const printWin = window.open('', '_blank', 'width=950,height=800');
    if (!printWin) {
      alert('Popup was blocked. Please allow popups to print.');
      return;
    }
    printWin.document.open();
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <style>
            @media print {
              body { background: white !important; -webkit-print-color-adjust: exact; }
              @page { margin: 15mm; }
            }
          </style>
        </head>
        <body class="bg-slate-100 p-6 flex flex-col items-center">
          <div class="w-full max-w-4xl flex justify-end gap-3 mb-4 no-print">
            <button onclick="window.print()" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition">
              Print Voucher
            </button>
            <button onclick="window.close()" class="px-5 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold rounded transition">
              Close
            </button>
          </div>
          ${contentHtml}
        </body>
      </html>
    `);
    printWin.document.close();
  }
};
