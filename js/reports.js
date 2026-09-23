/**
 * Adminutes - Reports & Analytics Engine
 * Generates Live Stock Status with Buffer Progress Meters, Stock Movement Ledger,
 * Maker-Checker Pending Approvals Queue, and CSV Data Export.
 */

window.CMS_REPORTS = {
  stockReportSearch: '',
  stockReportCategoryFilter: '',
  consumerSearchQuery: '',
  consumerCategoryFilter: '',
  fixedSearchQuery: '',
  fixedCategoryFilter: '',

  // ==========================================
  // 1. LIVE STOCK STATUS / INVENTORY SUMMARY
  // ==========================================
  renderStockReport() {
    const store = window.CMS_STORE.data;
    const categories = store.categories || [];
    let list = store.consumables || [];

    // Filter by search
    if (this.stockReportSearch) {
      const q = this.stockReportSearch.toLowerCase();
      list = list.filter(m =>
        (m.materialName || '').toLowerCase().includes(q) ||
        (m.brand || '').toLowerCase().includes(q) ||
        (m.hsnCode || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (this.stockReportCategoryFilter) {
      list = list.filter(m => m.categoryId === this.stockReportCategoryFilter);
    }

    let totalValuation = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    const rows = list.map(m => {
      const stock = window.CMS_STORE.getStock(m.id);
      const rate = Number(m.vendor1Rate || 0);
      const val = stock * rate;
      totalValuation += val;

      const bufferThreshold = Number(m.avgMonthlyConsumption || 0);
      const pct = Math.min(100, Math.round((stock / (bufferThreshold || 1)) * 100));

      let statusBadge = '';
      let progressColor = 'bg-emerald-500';

      if (stock === 0) {
        outOfStockCount++;
        statusBadge = '<span class="badge badge-stock-out"><i data-lucide="x-circle" class="w-3 h-3"></i> Out of Stock</span>';
        progressColor = 'bg-red-500';
      } else if (stock < bufferThreshold * 0.5) {
        lowStockCount++;
        statusBadge = '<span class="badge badge-stock-low"><i data-lucide="alert-triangle" class="w-3 h-3"></i> Low Buffer</span>';
        progressColor = 'bg-amber-500';
      } else {
        statusBadge = '<span class="badge badge-stock-healthy"><i data-lucide="check-circle" class="w-3 h-3"></i> Healthy</span>';
      }

      return {
        ...m,
        liveStock: stock,
        valuation: val,
        statusBadge,
        bufferThreshold,
        pct,
        progressColor
      };
    });

    return `
      <div class="space-y-6">
        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Materials</span>
            <div class="text-2xl font-semibold font-mono text-slate-900 mt-1">${store.consumables.length}</div>
            <div class="text-xs text-slate-400 mt-1">Cataloged SKUs</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Total Stock Value</span>
            <div class="text-2xl font-semibold font-mono text-emerald-700 mt-1">₹${totalValuation.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div class="text-xs text-slate-400 mt-1">At Vendor Approved Rates</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600">Low Buffer Warnings</span>
            <div class="text-2xl font-semibold font-mono text-amber-700 mt-1">${lowStockCount}</div>
            <div class="text-xs text-amber-600 font-medium mt-1">Below safety buffer</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">
            <span class="text-xs font-bold uppercase tracking-wider text-red-600">Out of Stock</span>
            <div class="text-2xl font-semibold font-mono text-red-700 mt-1">${outOfStockCount}</div>
            <div class="text-xs text-red-600 font-medium mt-1">Action required</div>
          </div>
        </div>

        <!-- Table Header & Controls -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
              </div>
              <span>Stock Status & Inventory Summary</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Real-time store inventory levels, monthly safety buffer threshold, stock valuation, and health indicators.</p>
          </div>
          <div class="flex gap-2">
            <button onclick="CMS_REPORTS.exportStockCSV()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md text-xs transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Export CSV</span>
            </button>
            <button onclick="window.print()" class="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold rounded-md text-xs transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print Report</span>
            </button>
          </div>
        </div>

        <!-- Table Toolbar -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" value="${this.stockReportSearch}" oninput="CMS_REPORTS.onStockReportSearch(this.value)" placeholder="Search material name, brand, HSN..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
            </div>
            <select onchange="CMS_REPORTS.onStockReportCategoryFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Categories --</option>
              ${categories.map(c => `<option value="${c.id}" ${this.stockReportCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${rows.length}</strong> of ${store.consumables.length} materials
          </div>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Material Details</th>
                  <th class="p-4">Category</th>
                  <th class="p-4 text-right">Available Stock</th>
                  <th class="p-4 text-right">Target Buffer</th>
                  <th class="p-4">Stock Buffer Progress</th>
                  <th class="p-4">Health Status</th>
                  <th class="p-4 text-right">Valuation (₹)</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${rows.length === 0 ? `
                  <tr><td colspan="8" class="p-12 text-center text-slate-400">No matching materials found.</td></tr>
                ` : rows.map(r => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4">
                      <div class="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewMaterial360('${r.id}')">${r.materialName}</div>
                      <div class="text-[11px] text-slate-500 font-mono mt-0.5">Code: ${r.id} | Brand: <span class="font-semibold text-slate-700">${r.brand || '-'}</span></div>
                    </td>
                    <td class="p-4 font-semibold text-slate-700">${r.categoryName}</td>
                    <td class="p-4 text-right font-mono font-semibold text-sm ${r.liveStock === 0 ? 'text-red-700' : 'text-slate-900'}">
                      ${r.liveStock} <span class="text-slate-500 font-normal text-xs">${r.unit}</span>
                    </td>
                    <td class="p-4 text-right font-mono text-slate-600">
                      ${r.bufferThreshold} ${r.unit}
                    </td>
                    <td class="p-4 min-w-[130px]">
                      <div class="flex items-center gap-2">
                        <div class="w-full stock-progress-track">
                          <div class="stock-progress-fill ${r.progressColor}" style="width: ${r.pct}%"></div>
                        </div>
                        <span class="font-mono text-[10px] text-slate-500 shrink-0 font-bold">${r.pct}%</span>
                      </div>
                    </td>
                    <td class="p-4">${r.statusBadge}</td>
                    <td class="p-4 text-right font-mono font-bold text-emerald-800 text-xs">
                      ₹${Number(r.valuation || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td class="p-4 text-right space-x-1">
                      <button onclick="CMS_MASTERS.viewMaterial360('${r.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Inspect 360° Specs">
                        <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                      </button>
                      <button onclick="CMS_PO.openPOModal()" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Reorder PO">
                        <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onStockReportSearch(val) {
    this.stockReportSearch = val;
    this.refreshStockReport();
  },

  onStockReportCategoryFilter(val) {
    this.stockReportCategoryFilter = val;
    this.refreshStockReport();
  },

  refreshStockReport() {
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderStockReport();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  // ==========================================
  // 2. STOCK LEDGER / TRANSACTION AUDIT TRAIL
  // ==========================================
  renderStockLedger() {
    const store = window.CMS_STORE.data;

    const trail = [];

    // Receipts
    (store.receipts || []).forEach(r => {
      if (r.status === 'Approved') {
        trail.push({
          date: r.docDate || r.createdAt,
          type: `Inward (${r.type === 'Challan' ? 'Challan' : 'Invoice'})`,
          refNo: `${r.receiptNo} (${r.docNo})`,
          materialId: r.materialId,
          materialName: r.materialName,
          unit: r.unit,
          qtyIn: r.qty,
          qtyOut: 0,
          party: r.vendorName,
          remarks: r.remarks || 'Stock Inward'
        });
      }
    });

    // Issuances
    (store.issuances || []).forEach(i => {
      trail.push({
        date: (i.issuedAt || '').split('T')[0] || '2026-08-16',
        type: 'Outward Issue',
        refNo: `${i.issueNo} (${i.requestNo})`,
        materialId: i.materialId,
        materialName: i.materialName,
        unit: i.unit,
        qtyIn: 0,
        qtyOut: i.issuedQty,
        party: `${i.issuedTo} [${i.department}]`,
        remarks: i.remarks || 'Store Issue'
      });
    });

    // Returns
    (store.returns || []).forEach(ret => {
      if (ret.status === 'Approved') {
        trail.push({
          date: (ret.approvedAt || ret.createdAt || '').split('T')[0],
          type: 'Return to Store',
          refNo: ret.returnNo,
          materialId: ret.materialId,
          materialName: ret.materialName,
          unit: ret.unit,
          qtyIn: ret.qty,
          qtyOut: 0,
          party: `${ret.returnedBy} [${ret.department}]`,
          remarks: ret.remarks || 'Unused Return'
        });
      }
    });

    // Stock Adjustments
    (store.stockAdjustments || []).forEach(adj => {
      if (adj.status === 'Approved') {
        trail.push({
          date: (adj.approvedAt || adj.createdAt || '').split('T')[0],
          type: `Stock Adj (${adj.type === 'ADD' ? '+' : '-'})`,
          refNo: adj.adjustmentNo,
          materialId: adj.materialId,
          materialName: adj.materialName,
          unit: adj.unit,
          qtyIn: adj.type === 'ADD' ? adj.qty : 0,
          qtyOut: adj.type === 'DEDUCT' ? adj.qty : 0,
          party: adj.reason,
          remarks: adj.remarks
        });
      }
    });

    trail.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="history" class="w-4 h-4"></i>
              </div>
              <span>Stock Movement Ledger (Bin Card Trail)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Complete immutable audit trail of all receipts, issuances, returns, adjustments, and reconciliations.</p>
          </div>
          <button onclick="CMS_REPORTS.exportLedgerCSV()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md text-xs transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Export Ledger CSV</span>
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Date</th>
                  <th class="p-4">Transaction Type</th>
                  <th class="p-4">Voucher / Ref No.</th>
                  <th class="p-4">Material</th>
                  <th class="p-4 text-right">Inward (+)</th>
                  <th class="p-4 text-right">Outward (-)</th>
                  <th class="p-4">Party / Source</th>
                  <th class="p-4">Remarks</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${trail.length === 0 ? `
                  <tr><td colspan="8" class="p-12 text-center text-slate-400">No stock movement recorded yet.</td></tr>
                ` : trail.map(t => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4 text-xs font-mono text-slate-600 whitespace-nowrap">${t.date}</td>
                    <td class="p-4">
                      <span class="inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                        t.qtyIn > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                      }">
                        ${t.type}
                      </span>
                    </td>
                    <td class="p-4 font-mono text-xs font-bold text-slate-900">${t.refNo}</td>
                    <td class="p-4 font-bold text-slate-900">${t.materialName}</td>
                    <td class="p-4 text-right font-mono font-bold text-emerald-700">
                      ${t.qtyIn > 0 ? `+${t.qtyIn} ${t.unit}` : '-'}
                    </td>
                    <td class="p-4 text-right font-mono font-bold text-red-700">
                      ${t.qtyOut > 0 ? `-${t.qtyOut} ${t.unit}` : '-'}
                    </td>
                    <td class="p-4 text-slate-700 font-medium">${t.party}</td>
                    <td class="p-4 text-slate-500 italic max-w-xs truncate" title="${t.remarks}">${t.remarks}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 3. PENDING APPROVALS QUEUE (MAKER-CHECKER HUB)
  // ==========================================
  renderApprovalsAccessDenied() {
    const currentUser = window.CMS_STORE.getCurrentUser();
    return `
      <div class="max-w-xl mx-auto mt-8">
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <i data-lucide="shield-off" class="w-6 h-6"></i>
          </div>
          <h2 class="text-base font-bold text-slate-900">Approvals restricted</h2>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            The Maker-Checker Approval Hub is available only to the Store In-Charge
            (Col. Anita Sharma). You are signed in as <strong>${currentUser.name}</strong>
            (${currentUser.roleTitle}).
          </p>
          <p class="text-[11px] text-slate-500 mt-3">
            Switch to the authorized approver account from the profile menu to review sanctions.
          </p>
          <button onclick="CMS_APP.navigateTo('dashboard')" class="mt-5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition">
            Return to Executive Dashboard
          </button>
        </div>
      </div>
    `;
  },

  renderPendingApprovals() {
    if (!window.CMS_STORE.isApprover()) {
      return this.renderApprovalsAccessDenied();
    }

    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();

    const pending = [];

    (store.vendors || []).filter(v => v.status === 'Pending Approval').forEach(v => {
      pending.push({
        module: 'Vendor',
        id: v.id,
        title: v.name,
        details: `GST: ${v.gstNo || 'Unregistered'} | Expiry: ${v.validTill}`,
        date: v.createdAt,
        onApprove: `CMS_MASTERS.approveVendor('${v.id}')`
      });
    });

    (store.categories || []).filter(c => c.status === 'Pending Approval').forEach(c => {
      pending.push({
        module: 'Consumable Category',
        id: c.id,
        title: c.name,
        details: c.description || 'No description',
        date: c.createdAt,
        onApprove: `CMS_MASTERS.approveCategory('${c.id}')`
      });
    });

    (store.consumables || []).filter(m => m.status === 'Pending Approval').forEach(m => {
      pending.push({
        module: 'Material',
        id: m.id,
        title: m.materialName,
        details: `Brand: ${m.brand} | HSN: ${m.hsnCode} | Rate: ₹${m.vendor1Rate}`,
        date: m.createdAt,
        onApprove: `CMS_MASTERS.approveConsumable('${m.id}')`
      });
    });

    (store.gstSlabs || []).filter(g => g.status === 'Pending Approval').forEach(g => {
      pending.push({
        module: 'GST Slab Master',
        id: g.id,
        title: g.name,
        details: `Tax mode: ${window.CMS_STORE.getTaxMode(g) === 'IGST' ? 'IGST' : 'CGST + SGST'} | ${window.CMS_STORE.getTaxLabel(g)}`,
        date: g.createdAt,
        onApprove: `CMS_MASTERS.approveGst('${g.id}')`
      });
    });

    (store.receipts || []).filter(r => r.status === 'Pending Approval').forEach(r => {
      pending.push({
        module: `Goods Receipt (${r.type})`,
        id: r.id,
        title: `${r.receiptNo} - ${r.materialName}`,
        details: `Vendor: ${r.vendorName} | Qty: ${r.qty} ${r.unit} | Doc: ${r.docNo}`,
        date: r.createdAt,
        onApprove: `CMS_TRANSACTIONS.approveReceipt('${r.id}')`
      });
    });

    (store.returns || []).filter(ret => ret.status === 'Pending Approval').forEach(ret => {
      pending.push({
        module: 'Return to Store',
        id: ret.id,
        title: `${ret.returnNo} - ${ret.materialName}`,
        details: `Returned by: ${ret.returnedBy} (${ret.department}) | Qty: ${ret.qty} ${ret.unit}`,
        date: ret.createdAt,
        onApprove: `CMS_TRANSACTIONS.approveReturn('${ret.id}')`
      });
    });

    (store.stockAdjustments || []).filter(a => a.status === 'Pending Approval').forEach(a => {
      pending.push({
        module: 'Stock Adjustment',
        id: a.id,
        title: `${a.adjustmentNo} - ${a.materialName}`,
        details: `${a.type === 'ADD' ? 'Plus (+)' : 'Minus (-)'} ${a.qty} ${a.unit} | Reason: ${a.reason}`,
        date: a.createdAt,
        onApprove: `CMS_TRANSACTIONS.approveStockAdjustment('${a.id}')`
      });
    });

    (store.purchaseOrders || []).filter(p => p.status === 'Pending Approval').forEach(p => {
      pending.push({
        module: 'Purchase Order',
        id: p.id,
        title: `${p.poNo} - ${p.materialName}`,
        details: `Vendor: ${p.vendorName} | Order Qty: ${p.orderQty} ${p.unit} | Total: ₹${Number(p.totalAmount).toFixed(2)}`,
        date: p.createdAt,
        onApprove: `CMS_PO.approvePO('${p.id}')`
      });
    });

    (store.reconciliations || []).filter(rc => rc.status === 'Pending Approval').forEach(rc => {
      pending.push({
        module: 'Stock Reconciliation',
        id: rc.id,
        title: `${rc.reconciliationNo} (${rc.categoryName})`,
        details: `Audit Date: ${rc.reconciliationDate} | Total items: ${(rc.items || []).length}`,
        date: rc.createdAt,
        onApprove: `CMS_RECONCILIATION.approveReconciliation('${rc.id}')`
      });
    });

    const currentUser = window.CMS_STORE.getCurrentUser();
    const isChecker = currentUser.role === 'Checker';

    return `
      <div class="space-y-4">
        
        <!-- Security & Governance Header -->
        <div class="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
                    <i data-lucide="shield-check" class="w-4 h-4"></i>
                  </div>
                  <span>Maker-Checker Statutory Approval Hub</span>
                </h2>
                <p class="text-xs text-slate-500 mt-0.5">Centralized regulatory queue for master data vetting, stock adjustments (+/-), and inward vouchers.</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs">
                  <div class="w-5 h-5 rounded ${currentUser.avatarBg} text-white font-bold text-[10px] flex items-center justify-center">
                    ${currentUser.avatarText}
                  </div>
                  <div>
                    <span class="font-semibold text-slate-800">${currentUser.name}</span>
                    <span class="text-[10px] text-slate-400 font-mono">(${currentUser.id})</span>
                  </div>
                </div>
                <span class="font-semibold text-xs px-2.5 py-1 rounded border ${isChecker ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-blue-50 text-blue-800 border-blue-200'}">
                  ${currentUser.roleTitle}
                </span>
              </div>
            </div>

            <!-- Security & SoD Info Banner -->
            ${isChecker ? `
              <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 text-xs flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700 shrink-0"></i>
                  <span><strong>Authorized Sanctioning Session:</strong> You are logged in as Store In-Charge. Sanctioned records update live stock balances immediately.</span>
                </div>
                <span class="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 font-semibold">SOD VERIFIED</span>
              </div>
            ` : `
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <i data-lucide="shield-alert" class="w-4 h-4 text-amber-700 shrink-0"></i>
                  <span><strong>Operational Staff View:</strong> Logged in as Store Staff. To prevent self-approval tampering, manager authorization requires Col. Anita Sharma's PIN.</span>
                </div>
                <button onclick="CMS_APP.selectAccount('MGR-8812')" class="px-2.5 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-semibold text-xs rounded transition flex items-center gap-1 shrink-0">
                  <i data-lucide="key" class="w-3 h-3 text-amber-700"></i>
                  <span>Sign In as Approver</span>
                </button>
              </div>
            `}

            ${pending.length === 0 ? `
              <div class="p-16 text-center bg-white border border-slate-200 rounded-md shadow-sm">
                <div class="w-12 h-12 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <i data-lucide="check" class="w-6 h-6"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-900">All Maker-Checker Queues Cleared</h3>
                <p class="text-xs text-slate-500 mt-1">There are zero pending submissions awaiting statutory sanction.</p>
              </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${pending.map(item => `
                  <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm flex flex-col justify-between interactive-card">
                    <div>
                      <div class="flex justify-between items-start mb-2">
                        <span class="text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">${item.module}</span>
                        <span class="badge badge-pending">Pending Approval</span>
                      </div>
                      <h4 class="font-bold text-slate-900 text-sm mt-2">${item.title}</h4>
                      <p class="text-xs text-slate-600 mt-1 font-medium leading-relaxed">${item.details}</p>
                    </div>
                    <div class="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span class="text-slate-400 font-mono text-[11px]">Submitted: ${new Date(item.date || Date.now()).toLocaleDateString('en-IN')}</span>
                      ${isChecker ? `
                        <button onclick="${item.onApprove}" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded shadow-sm transition text-xs flex items-center gap-1.5">
                          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                          <span>Sanction Record</span>
                        </button>
                      ` : `
                        <button onclick="CMS_APP.promptManagerPin(() => { ${item.onApprove} }, 'Sanction ${item.title}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded border border-slate-300 transition text-xs flex items-center gap-1.5">
                          <i data-lucide="lock" class="w-3.5 h-3.5 text-amber-600"></i>
                          <span>Authorize with PIN</span>
                        </button>
                      `}
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
  },

  exportStockCSV() {
    const list = window.CMS_STORE.data.consumables || [];
    let csv = 'Material Code,Material Name,Category,Brand,Unit,HSN,Live Stock,Monthly Buffer,Approved Rate (Rs),Valuation (Rs)\n';
    list.forEach(m => {
      const stock = window.CMS_STORE.getStock(m.id);
      const val = stock * Number(m.vendor1Rate || 0);
      csv += `"${m.id}","${m.materialName}","${m.categoryName}","${m.brand}","${m.unit}","${m.hsnCode}",${stock},${m.avgMonthlyConsumption},${m.vendor1Rate},${val}\n`;
    });
    this.downloadFile(csv, 'Adminutes_Stock_Status_Report.csv', 'text/csv');
  },

  exportLedgerCSV() {
    const store = window.CMS_STORE.data;
    let csv = 'Date,Type,Ref No,Material,Inward Qty,Outward Qty,Party,Remarks\n';
    (store.receipts || []).forEach(r => {
      if (r.status === 'Approved') {
        csv += `"${r.docDate || r.createdAt}","Receipt","${r.receiptNo}","${r.materialName}",${r.qty},0,"${r.vendorName}","${r.remarks}"\n`;
      }
    });
    (store.issuances || []).forEach(i => {
      csv += `"${i.issuedAt}","Issue","${i.issueNo}","${i.materialName}",0,${i.issuedQty},"${i.issuedTo}","${i.remarks}"\n`;
    });
    this.downloadFile(csv, 'Adminutes_Stock_Ledger.csv', 'text/csv');
  },

  downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ==========================================
  // 4. CONSUMER INVENTORY (HIGH TURNOVER CONSUMABLES)
  // ==========================================
  renderConsumerInventory() {
    const store = window.CMS_STORE.data;
    const categories = store.categories || [];
    let list = (store.consumables || []).filter(m => (m.inventoryType || 'Consumer') === 'Consumer');

    if (this.consumerSearchQuery) {
      const q = this.consumerSearchQuery.toLowerCase();
      list = list.filter(m =>
        (m.materialName || '').toLowerCase().includes(q) ||
        (m.brand || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q) ||
        (m.quotationNo || '').toLowerCase().includes(q)
      );
    }

    if (this.consumerCategoryFilter) {
      list = list.filter(m => m.categoryId === this.consumerCategoryFilter);
    }

    let totalValuation = 0;
    let lowBufferCount = 0;
    let warrantedCount = 0;
    let pmActiveCount = 0;

    list.forEach(m => {
      const liveStock = window.CMS_STORE.getStock(m.id);
      const rate = Number(m.quotationRate || m.vendor1Rate || 0);
      totalValuation += liveStock * rate;
      if (liveStock < (m.avgMonthlyConsumption || 0) * 0.5) lowBufferCount++;
      if (m.hasWarranty) warrantedCount++;
      if (m.hasPm) pmActiveCount++;
    });

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i data-lucide="package" class="w-4 h-4"></i>
              </div>
              <span>Consumer Materials Ledger</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">High-turnover consumable supplies, monthly safety buffer gauges, vendor quotations, warranty terms, and active PM care.</p>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <button onclick="CMS_REPORTS.exportStockCSV()" class="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md border border-slate-300 transition text-xs">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Export CSV</span>
            </button>
            <button onclick="CMS_MASTERS.openConsumableModal()" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow transition text-xs">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>+ Add Consumer Item</span>
            </button>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-emerald">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Consumer Items</span>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${list.length}</div>
            <div class="text-xs text-slate-500 mt-0.5">Active SKU lines</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-blue">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Stock Valuation</span>
            <div class="text-2xl font-bold font-mono text-blue-700 mt-1">₹${totalValuation.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div class="text-xs text-slate-500 mt-0.5">At approved quotation rates</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-amber">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600">Buffer Warnings</span>
            <div class="text-2xl font-bold font-mono text-amber-700 mt-1">${lowBufferCount}</div>
            <div class="text-xs text-amber-600 font-medium mt-0.5">Below 50% monthly target</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-purple">
            <span class="text-xs font-bold uppercase tracking-wider text-purple-600">Warranty & PM Items</span>
            <div class="text-2xl font-bold font-mono text-purple-700 mt-1">${warrantedCount} <span class="text-xs text-slate-500 font-normal">/ ${pmActiveCount} PM</span></div>
            <div class="text-xs text-purple-600 font-medium mt-0.5">Appliances & water systems</div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" value="${this.consumerSearchQuery}" oninput="CMS_REPORTS.onConsumerSearch(this.value)" placeholder="Search consumer supplies, brand, quote..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
            </div>
            <select onchange="CMS_REPORTS.onConsumerCategoryFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Categories (${categories.length}) --</option>
              ${categories.map(c => `<option value="${c.id}" ${this.consumerCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> items
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Material Details</th>
                  <th class="p-4">Category & Unit</th>
                  <th class="p-4">Vendor Quotation & MRP</th>
                  <th class="p-4">Live Stock vs Buffer</th>
                  <th class="p-4 text-right">Total Valuation</th>
                  <th class="p-4">Warranty & PM</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr><td colspan="7" class="p-12 text-center text-slate-400 font-medium">No consumer supplies found matching criteria.</td></tr>
                ` : list.map(m => {
                  const stock = window.CMS_STORE.getStock(m.id);
                  const rate = Number(m.quotationRate || m.vendor1Rate || 0);
                  const val = stock * rate;
                  const buffer = Number(m.avgMonthlyConsumption || 0);
                  const pct = Math.min(100, Math.round((stock / (buffer || 1)) * 100));
                  const isLow = stock < buffer * 0.5;

                  return `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="p-4">
                        <div class="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewMaterial360('${m.id}')">${m.materialName}</div>
                        <div class="text-[11px] text-slate-500 font-mono mt-0.5">Code: ${m.id} | Brand: <strong>${m.brand || '-'}</strong></div>
                      </td>
                      <td class="p-4">
                        <span class="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded">${m.categoryName}</span>
                        <div class="text-slate-500 mt-1 font-mono">Unit: <strong class="text-slate-800">${m.unit}</strong></div>
                      </td>
                      <td class="p-4">
                        <div class="text-slate-900">Quote: <span class="font-mono font-bold text-blue-700">₹${rate.toFixed(2)}</span></div>
                        <div class="text-[10px] text-slate-500 font-mono">Ref: ${m.quotationNo || 'Direct'}</div>
                        <div class="text-[11px] text-slate-700 font-semibold mt-0.5">MRP: <span class="font-mono">₹${Number(m.mrpBooked || 0).toFixed(2)}</span></div>
                      </td>
                      <td class="p-4 w-48">
                        <div class="flex justify-between items-center mb-1">
                          <span class="font-mono font-bold ${isLow ? 'text-amber-600' : 'text-emerald-700'}">${stock} / ${buffer} ${m.unit}</span>
                          <span class="text-[10px] text-slate-500 font-mono font-semibold">${pct}%</span>
                        </div>
                        <div class="w-full stock-progress-track">
                          <div class="stock-progress-fill ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${pct}%"></div>
                        </div>
                      </td>
                      <td class="p-4 text-right font-mono font-bold text-slate-900 text-xs">
                        ₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td class="p-4">
                        <div class="space-y-1">
                          ${m.hasWarranty ? `
                            <span class="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-semibold" title="Valid till: ${m.warrantyValidTill || 'N/A'}">
                               ${m.warrantyPeriod || '1 Year'}
                            </span>
                          ` : '<span class="text-[10px] text-slate-400">No warranty</span>'}
                          <br />
                          ${m.hasPm ? `
                            <span class="inline-flex items-center gap-1 text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-semibold" title="Technician: ${m.repairmanName || 'Assigned'}">
                               ${m.pmFrequency} PM
                            </span>
                          ` : '<span class="text-[10px] text-slate-400">No PM</span>'}
                        </div>
                      </td>
                      <td class="p-4 text-right space-x-1">
                        <button onclick="CMS_MASTERS.viewMaterial360('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Inspect 360°">
                          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                        </button>
                        ${m.hasPm ? `
                          <button onclick="CMS_REPORTS.openLogPmModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition" title="Log PM Service">
                            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                          </button>
                        ` : ''}
                        <button onclick="CMS_MASTERS.openConsumableModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Edit in Master">
                          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onConsumerSearch(val) {
    this.consumerSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderConsumerInventory();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  onConsumerCategoryFilter(val) {
    this.consumerCategoryFilter = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderConsumerInventory();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  // ==========================================
  // 5. FIXED INVENTORY (CAPITAL ASSETS & PREVENTIVE MAINTENANCE)
  // ==========================================
  renderFixedInventory() {
    const store = window.CMS_STORE.data;
    const categories = store.categories || [];
    let list = (store.consumables || []).filter(m => m.inventoryType === 'Fixed');

    if (this.fixedSearchQuery) {
      const q = this.fixedSearchQuery.toLowerCase();
      list = list.filter(m =>
        (m.materialName || '').toLowerCase().includes(q) ||
        (m.brand || '').toLowerCase().includes(q) ||
        (m.assetTag || '').toLowerCase().includes(q) ||
        (m.serialNo || '').toLowerCase().includes(q) ||
        (m.custodianDept || '').toLowerCase().includes(q) ||
        (m.repairmanName || '').toLowerCase().includes(q)
      );
    }

    if (this.fixedCategoryFilter) {
      list = list.filter(m => m.categoryId === this.fixedCategoryFilter);
    }

    let totalAssetValue = 0;
    let warrantedAssets = 0;
    let pmDueCount = 0;

    const now = Date.now();
    const thirtyDaysFromNow = now + 30 * 86400000;

    list.forEach(m => {
      const stock = window.CMS_STORE.getStock(m.id) || 1;
      const val = (m.mrpBooked || m.quotationRate || m.vendor1Rate || 0) * stock;
      totalAssetValue += val;
      if (m.hasWarranty) warrantedAssets++;
      if (m.hasPm && m.nextPmDate) {
        const dueTime = new Date(m.nextPmDate).getTime();
        if (dueTime <= thirtyDaysFromNow) pmDueCount++;
      }
    });

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <i data-lucide="cpu" class="w-4 h-4"></i>
              </div>
              <span>Fixed Assets & Care (PM)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Capital equipment registry with asset tags, serial numbers, warranty validity tracking, and designated technician PM schedules.</p>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <button onclick="CMS_MASTERS.openConsumableModal()" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow transition text-xs">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>+ Register Capital Asset</span>
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-purple">
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Fixed Assets Registered</span>
            <div class="text-2xl font-bold font-mono text-slate-900 mt-1">${list.length}</div>
            <div class="text-xs text-slate-500 mt-0.5">IT, HVAC, Heavy Equipment</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-blue">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Total Booked Asset Value</span>
            <div class="text-2xl font-bold font-mono text-blue-700 mt-1">₹${totalAssetValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div class="text-xs text-slate-500 mt-0.5">Capital gross booked cost</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-emerald">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Assets Under Warranty</span>
            <div class="text-2xl font-bold font-mono text-emerald-700 mt-1">${warrantedAssets} / ${list.length}</div>
            <div class="text-xs text-emerald-600 font-medium mt-0.5">With active OEM coverage</div>
          </div>
          <div class="p-5 bg-white border border-slate-200 rounded-md shadow-sm card-accent-amber">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600">PM Service Due</span>
            <div class="text-2xl font-bold font-mono text-amber-700 mt-1">${pmDueCount}</div>
            <div class="text-xs text-amber-600 font-medium mt-0.5">Action required within 30 days</div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" value="${this.fixedSearchQuery}" oninput="CMS_REPORTS.onFixedSearch(this.value)" placeholder="Search tag, serial #, equipment, tech..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none" />
            </div>
            <select onchange="CMS_REPORTS.onFixedCategoryFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Asset Categories --</option>
              ${categories.map(c => `<option value="${c.id}" ${this.fixedCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> equipment assets
          </div>
        </div>

        <!-- Asset Grid / Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${list.length === 0 ? `
            <div class="col-span-2 p-12 text-center bg-white border border-slate-200 rounded-md text-slate-400 font-medium">
              <i data-lucide="cpu" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
              <div>No fixed capital assets found matching your criteria.</div>
            </div>
          ` : list.map(m => {
            const stock = window.CMS_STORE.getStock(m.id) || 1;
            const isDueSoon = m.nextPmDate && new Date(m.nextPmDate).getTime() <= thirtyDaysFromNow;
            const isOverdue = m.nextPmDate && new Date(m.nextPmDate).getTime() < now;

            return `
              <div class="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover-lift">
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-bold text-[11px] rounded">
                          Tag: ${m.assetTag || 'TAG-PENDING'}
                        </span>
                        <span class="text-[10px] text-slate-500 font-mono">S/N: ${m.serialNo || '-'}</span>
                      </div>
                      <h3 class="text-sm font-bold text-slate-900 mt-1.5 hover:text-indigo-600 cursor-pointer" onclick="CMS_MASTERS.viewMaterial360('${m.id}')">
                        ${m.materialName}
                      </h3>
                      <p class="text-xs text-slate-500 font-medium mt-0.5">Brand: <strong class="text-slate-800">${m.brand || '-'}</strong> | Custodian: <strong class="text-slate-700">${m.custodianDept || 'General'}</strong></p>
                    </div>
                    <div class="text-right">
                      <div class="font-mono font-bold text-sm text-slate-900">₹${Number(m.mrpBooked || m.quotationRate || 0).toLocaleString('en-IN')}</div>
                      <span class="badge ${m.status === 'Approved' ? 'badge-approved' : 'badge-pending'} mt-1">${m.status}</span>
                    </div>
                  </div>

                  <!-- Two-column Specs: Warranty & PM -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                    <!-- Warranty Box -->
                    <div class="p-3 rounded bg-blue-50/50 border border-blue-200 space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-blue-900 text-[11px] flex items-center gap-1">
                          <i data-lucide="shield" class="w-3 h-3 text-blue-600"></i> Warranty
                        </span>
                        <span class="font-bold text-[10px] ${m.hasWarranty ? 'text-blue-800' : 'text-slate-400'}">
                          ${m.hasWarranty ? 'Active' : 'None'}
                        </span>
                      </div>
                      ${m.hasWarranty ? `
                        <div class="text-[11px] text-slate-700"><strong>Period:</strong> ${m.warrantyPeriod || '1 Year'}</div>
                        <div class="text-[11px] text-blue-900 font-mono"><strong>Valid:</strong> ${m.warrantyValidTill || 'N/A'}</div>
                        <div class="text-[10px] text-slate-500 truncate">Partner: ${m.warrantyVendor || 'OEM'}</div>
                      ` : `
                        <div class="text-[11px] text-slate-400 italic">No warranty policy</div>
                      `}
                    </div>

                    <!-- Preventive Maintenance (PM) Box -->
                    <div class="p-3 rounded bg-purple-50/50 border border-purple-200 space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-purple-900 text-[11px] flex items-center gap-1">
                          <i data-lucide="wrench" class="w-3 h-3 text-purple-600"></i> PM Schedule
                        </span>
                        <span class="font-bold text-[10px] text-purple-800">${m.pmFrequency || 'Routine'}</span>
                      </div>
                      ${m.hasPm ? `
                        <div class="text-[11px] text-slate-700"><strong>Tech:</strong> ${m.repairmanName || 'Assigned'}</div>
                        <div class="text-[11px] font-mono ${isOverdue ? 'text-red-700 font-bold' : isDueSoon ? 'text-amber-700 font-bold' : 'text-purple-900'}">
                          <strong>Next Due:</strong> ${m.nextPmDate || 'Upcoming'} ${isOverdue ? 'OVERDUE' : isDueSoon ? 'DUE SOON' : ''}
                        </div>
                        <div class="text-[10px] text-slate-500 font-mono">Tel: ${m.repairmanContact || '-'}</div>
                      ` : `
                        <div class="text-[11px] text-slate-400 italic">PM not scheduled</div>
                      `}
                    </div>
                  </div>
                </div>

                <!-- Card Actions -->
                <div class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span class="text-slate-400 font-mono text-[11px]">Quote: ${m.quotationNo || 'Direct'}</span>
                  <div class="flex items-center gap-1.5">
                    <button onclick="CMS_MASTERS.viewMaterial360('${m.id}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded transition inline-flex items-center gap-1">
                      <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                      <span>Inspect</span>
                    </button>
                    ${m.hasPm ? `
                      <button onclick="CMS_REPORTS.openLogPmModal('${m.id}')" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-sm transition inline-flex items-center gap-1">
                        <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                        <span>Log PM</span>
                      </button>
                    ` : ''}
                    ${(m.pmHistory && m.pmHistory.length > 0) ? `
                      <button onclick="CMS_PRINT.printPmCertificate({ materialId: '${m.id}', ...(m.pmHistory[0] || {}) })" class="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold rounded transition inline-flex items-center gap-1" title="Print Latest PM Certificate">
                        <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                        <span>Cert</span>
                      </button>
                    ` : ''}
                    <button onclick="CMS_MASTERS.openConsumableModal('${m.id}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded transition">
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  onFixedSearch(val) {
    this.fixedSearchQuery = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderFixedInventory();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  onFixedCategoryFilter(val) {
    this.fixedCategoryFilter = val;
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderFixedInventory();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openLogPmModal(materialId) {
    const store = window.CMS_STORE.data;
    const m = store.consumables.find(i => i.id === materialId);
    if (!m) return;

    const today = new Date().toISOString().split('T')[0];
    const defaultNextDate = this.calculateNextPmDate(today, m.pmFrequency || 'Quarterly');

    const content = `
      <form id="pm-service-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_REPORTS.savePmService('${m.id}');">
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-md text-purple-900 space-y-1">
          <div class="font-bold text-sm">Preventive Maintenance (PM) Log for:</div>
          <div class="text-xs font-semibold text-purple-950">${m.materialName}</div>
          <div class="text-[11px] font-mono text-purple-800">Tag: ${m.assetTag || 'N/A'} | S/N: ${m.serialNo || 'N/A'} | Frequency: ${m.pmFrequency || 'Quarterly'}</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Service Completion Date *</label>
            <input type="date" id="pm-date" required value="${today}" onchange="CMS_REPORTS.onPmServiceDateChange('${m.pmFrequency}')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-md font-mono" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Job Card / Service Slip No. *</label>
            <input type="text" id="pm-jobcard" required value="JC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}" class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Technician / Repairman *</label>
            <input type="text" id="pm-tech" required value="${m.repairmanName || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. Sanjay Rawat" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Technician Phone</label>
            <input type="text" id="pm-contact" value="${m.repairmanContact || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-md" placeholder="+91 98..." />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Service Agency</label>
            <input type="text" id="pm-agency" value="${m.repairmanAgency || m.pmVendor || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="e.g. Kent Commercial Care" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Maintenance Cost (₹)</label>
            <input type="number" step="0.01" id="pm-cost" value="0.00" class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Next Scheduled PM Date (Auto-Calculated) *</label>
            <input type="date" id="pm-next-date" required value="${defaultNextDate}" class="w-full font-mono px-3.5 py-2.5 border border-slate-300 rounded-md font-bold text-purple-900 bg-purple-50/50" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Work Done / Parts Replaced / Calibration Remarks *</label>
          <textarea id="pm-notes" required rows="3" class="w-full px-3.5 py-2 border border-slate-300 rounded-md" placeholder="e.g. Filters sanitized and membrane replaced. Chemical purity test passed. Certified operational."></textarea>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow transition flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            <span>Log Service & Advance Schedule</span>
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('Log Preventive Maintenance (PM) Service', content, 'max-w-2xl');
  },

  onPmServiceDateChange(frequency) {
    const dEl = document.getElementById('pm-date');
    const nEl = document.getElementById('pm-next-date');
    if (dEl && nEl && dEl.value) {
      nEl.value = this.calculateNextPmDate(dEl.value, frequency);
    }
  },

  calculateNextPmDate(dateStr, frequency) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const freq = (frequency || 'Quarterly').toLowerCase();
    if (freq.includes('month') && !freq.includes('bi')) d.setDate(d.getDate() + 30);
    else if (freq.includes('bi-month') || freq.includes('bimonth')) d.setDate(d.getDate() + 60);
    else if (freq.includes('quarter')) d.setDate(d.getDate() + 90);
    else if (freq.includes('half')) d.setDate(d.getDate() + 180);
    else if (freq.includes('annu') || freq.includes('year')) d.setDate(d.getDate() + 365);
    else d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  },

  savePmService(materialId) {
    const serviceDate = document.getElementById('pm-date').value;
    const jobCard = document.getElementById('pm-jobcard').value.trim();
    const technician = document.getElementById('pm-tech').value.trim();
    const contact = document.getElementById('pm-contact').value.trim();
    const agency = document.getElementById('pm-agency').value.trim();
    const cost = parseFloat(document.getElementById('pm-cost').value) || 0;
    const nextDate = document.getElementById('pm-next-date').value;
    const notes = document.getElementById('pm-notes').value.trim();

    if (!serviceDate || !jobCard || !technician) {
      alert('Please fill mandatory service details.');
      return;
    }

    const record = {
      serviceDate,
      jobCardNo: jobCard,
      technician,
      contact,
      agency,
      cost,
      nextScheduledDate: nextDate,
      notes,
      loggedAt: new Date().toISOString()
    };

    window.CMS_STORE.logPmService(materialId, record);
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`PM Service logged! Next service scheduled for ${nextDate}.`, 'success');
    window.CMS_APP.refreshView();

    setTimeout(() => {
      if (confirm(`PM Service logged successfully! Would you like to print the official PM Certificate & Job Card?`)) {
        const mat = window.CMS_STORE.data.consumables.find(m => m.id === materialId);
        window.CMS_PRINT.printPmCertificate({ ...record, material: mat });
      }
    }, 250);
  }
};
