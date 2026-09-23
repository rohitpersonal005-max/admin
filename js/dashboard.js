/**
 * Adminutes - Pinterest Style Store Operations Dashboard
 * Features:
 * - Masonry Pin Grid (columns-1 to columns-4 responsive layout)
 * - Pinterest Rounded-Full Search & Topic Filter Pills Bar
 * - Interactive Idea Pins for Reorder Alerts, Fixed Assets Care, Inward Receipts & Requisitions
 * - Red Pinterest Action Buttons & Tactile Card Hover Transitions
 */

window.CMS_DASHBOARD = {
  activeFilter: 'all', // 'all' | 'reorder' | 'fixed' | 'indents' | 'inward' | 'boards'
  searchQuery: '',
  lastEmergencySignature: '',

  getEmergencyAlerts() {
    const store = window.CMS_STORE.data;
    const alerts = [];
    const pendingApprovals = window.CMS_STORE.getPendingApprovalsCount();
    const urgentRequests = (store.requests || []).filter(request =>
      request.priority === 'Urgent' && ['Pending', 'Approved for Issue'].includes(request.status)
    );
    const outOfStock = (store.consumables || []).filter(item => window.CMS_STORE.getStock(item.id) === 0);

    if (window.CMS_STORE.isApprover() && pendingApprovals > 0) {
      alerts.push({
        id: `approvals-${pendingApprovals}`,
        type: 'approvals',
        tone: 'red',
        icon: 'shield-alert',
        label: 'Action required',
        title: `${pendingApprovals} approval${pendingApprovals === 1 ? '' : 's'} waiting`,
        details: 'Maker-Checker submissions are blocked until you review and sanction them.',
        actionLabel: 'Review approvals'
      });
    }

    if (urgentRequests.length > 0) {
      alerts.push({
        id: `urgent-requests-${urgentRequests.map(request => request.id).join('-')}`,
        type: 'urgent-requests',
        tone: 'orange',
        icon: 'siren',
        label: 'Emergency request',
        title: `${urgentRequests.length} urgent requisition${urgentRequests.length === 1 ? '' : 's'} open`,
        details: `${urgentRequests[0].materialName}${urgentRequests.length > 1 ? ` and ${urgentRequests.length - 1} more` : ''} require immediate store action.`,
        actionLabel: 'Open requisitions'
      });
    }

    if (outOfStock.length > 0) {
      alerts.push({
        id: `out-of-stock-${outOfStock.map(item => item.id).join('-')}`,
        type: 'out-of-stock',
        tone: 'rose',
        icon: 'package-x',
        label: 'Emergency stock alert',
        title: `${outOfStock.length} item${outOfStock.length === 1 ? '' : 's'} out of stock`,
        details: `${outOfStock[0].materialName}${outOfStock.length > 1 ? ` and ${outOfStock.length - 1} more` : ''} need replenishment.`,
        actionLabel: 'View stock alerts'
      });
    }

    return alerts;
  },

  handleEmergencyAction(type) {
    CMS_APP.closeModal();
    if (type === 'approvals') CMS_APP.navigateTo('pending-approvals');
    if (type === 'urgent-requests') CMS_APP.navigateTo('requests');
    if (type === 'out-of-stock') {
      this.activeFilter = 'reorder';
      CMS_APP.navigateTo('dashboard');
    }
  },

  renderPriorityPanel() {
    const alerts = this.getEmergencyAlerts();
    if (alerts.length === 0) return '';

    return `
      <section class="dashboard-priority mb-5 border-2 border-red-200 bg-red-50/80 rounded-xl p-4 shadow-sm" aria-live="assertive">
        <div class="flex items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2 text-red-900">
            <i data-lucide="siren" class="w-5 h-5 text-red-600"></i>
            <h2 class="text-sm font-bold uppercase tracking-wide">Priority action center</h2>
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-red-700">${alerts.length} open alert${alerts.length === 1 ? '' : 's'}</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
          ${alerts.map(alert => `
            <div class="dashboard-alert-card bg-white border border-red-100 rounded-lg p-3 flex items-start gap-3">
              <i data-lucide="${alert.icon}" class="w-4 h-4 text-${alert.tone}-600 shrink-0 mt-0.5"></i>
              <div class="min-w-0 flex-1">
                <div class="text-[10px] font-bold uppercase tracking-wider text-${alert.tone}-700">${alert.label}</div>
                <div class="text-xs font-bold text-slate-900 mt-0.5">${alert.title}</div>
                <div class="text-[11px] text-slate-600 mt-1 leading-relaxed">${alert.details}</div>
                <button onclick="CMS_DASHBOARD.handleEmergencyAction('${alert.type}')" class="mt-2 text-[11px] font-bold text-${alert.tone}-700 hover:text-${alert.tone}-900 inline-flex items-center gap-1">
                  ${alert.actionLabel} <span aria-hidden="true">-&gt;</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  showEmergencyAlerts() {
    if (CMS_APP.currentView !== 'dashboard') return;
    const alerts = this.getEmergencyAlerts();
    if (alerts.length === 0) {
      this.lastEmergencySignature = '';
      return;
    }

    const signature = alerts.map(alert => alert.id).join('|');
    if (signature === this.lastEmergencySignature) return;
    this.lastEmergencySignature = signature;

    const content = `
      <div class="space-y-3 text-xs">
        <div class="p-3 bg-red-50 border border-red-200 rounded-md text-red-950 flex items-start gap-2">
          <i data-lucide="siren" class="w-5 h-5 text-red-600 shrink-0"></i>
          <div><strong>Immediate attention required.</strong><br />These alerts remain on the dashboard until the underlying action is completed.</div>
        </div>
        ${alerts.map(alert => `
          <div class="p-3 bg-white border border-slate-200 rounded-md flex items-start gap-3">
            <i data-lucide="${alert.icon}" class="w-4 h-4 text-${alert.tone}-600 shrink-0 mt-0.5"></i>
            <div class="flex-1">
              <div class="font-bold text-slate-900">${alert.title}</div>
              <div class="text-slate-600 mt-1">${alert.details}</div>
              <button onclick="CMS_DASHBOARD.handleEmergencyAction('${alert.type}')" class="mt-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded font-bold text-[11px]">${alert.actionLabel}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    CMS_APP.openModal('Emergency Alerts', content, 'max-w-xl');
  },

  setFilter(filter) {
    this.activeFilter = filter;
    const container = document.getElementById('pinterest-pins-container');
    const pills = document.getElementById('pinterest-pills-bar');
    if (container) {
      container.innerHTML = this.renderPins();
      if (pills) pills.innerHTML = this.renderPills();
      if (window.lucide) window.lucide.createIcons();
    } else {
      window.CMS_APP.refreshView();
    }
  },

  onSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    const container = document.getElementById('pinterest-pins-container');
    if (container) {
      container.innerHTML = this.renderPins();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  render() {
    return `
      <div class="dashboard-shell space-y-5 max-w-7xl mx-auto pb-12">

        <div class="dashboard-heading flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-cyan-700">Operations Overview</p>
            <h1 class="text-2xl font-bold text-slate-900 mt-1">Executive Dashboard</h1>
            <p class="text-sm text-slate-500 mt-1">Monitor alerts, approvals and priority store actions.</p>
          </div>
        </div>

        ${this.renderPriorityPanel()}

        <div id="pinterest-pins-container">
          ${this.renderPins()}
        </div>

      </div>
    `;
  },

  renderPills() {
    const store = window.CMS_STORE.data;
    const consumables = store.consumables || [];
    const lowStockCount = consumables.filter(m => {
      const stock = window.CMS_STORE.getStock(m.id);
      const buffer = Number(m.avgMonthlyConsumption || 0);
      return stock === 0 || stock < buffer * 0.5;
    }).length;

    const fixedCount = consumables.filter(m => m.inventoryType === 'Fixed').length;
    const indentsCount = (store.requests || []).length;
    const receiptsCount = (store.receipts || []).length;

    const pendingCount = window.CMS_STORE.getPendingApprovalsCount();
    const isApprover = window.CMS_STORE.isApprover();

    const filters = [
      { id: 'all', label: 'All Categories' },
      { id: 'overview', label: 'Store Overview' },
      ...(isApprover ? [{ id: 'approvals', label: `Pending Approvals (${pendingCount})` }] : []),
      { id: 'reorder', label: `Urgent Reorders (${lowStockCount})` },
      { id: 'fixed', label: `Fixed Assets & PM (${fixedCount})` },
      { id: 'indents', label: `Department Indents (${indentsCount})` },
      { id: 'inward', label: `Inward Batches (${receiptsCount})` },
      { id: 'boards', label: 'Consumable Categories' }
    ];

    return `
      <div class="flex items-center gap-2">
        ${filters.map(f => `
          <button 
            onclick="CMS_DASHBOARD.setFilter('${f.id}')" 
            class="pinterest-pill ${this.activeFilter === f.id ? 'pinterest-pill-active' : 'pinterest-pill-inactive'}">
            ${f.label}
          </button>
        `).join('')}
      </div>
    `;
  },

  renderPins() {
    const store = window.CMS_STORE.data;
    const consumables = store.consumables || [];
    const categories = store.categories || [];
    const receipts = store.receipts || [];
    const issuances = store.issuances || [];
    const requests = store.requests || [];
    const pendingCount = window.CMS_STORE.getPendingApprovalsCount();
    const today = new Date().toISOString().split('T')[0];

    // Compute metrics
    let totalValuation = 0;
    let totalUnits = 0;
    let lowCount = 0;
    let outCount = 0;

    consumables.forEach(m => {
      const stock = window.CMS_STORE.getStock(m.id);
      const rate = Number(m.vendor1Rate || m.quotationRate || 0);
      const buffer = Number(m.avgMonthlyConsumption || 0);
      totalUnits += stock;
      totalValuation += stock * rate;
      if (stock === 0) outCount++;
      else if (stock < buffer * 0.5) lowCount++;
    });

    const q = this.searchQuery;
    const isApprover = window.CMS_STORE.isApprover();

    if (this.activeFilter === 'approvals' && !isApprover) {
      this.activeFilter = 'all';
    }

    const overviewPins = [];
    const approvalPins = [];
    const reorderPins = [];
    const fixedPins = [];
    const indentPins = [];
    const inwardPins = [];
    const boardPins = [];
    const pins = [];

    // Helper to test search
    const matchesSearch = (...fields) => {
      if (!q) return true;
      return fields.some(f => (f || '').toString().toLowerCase().includes(q));
    };

    // ==========================================
    // PIN 2: Four-Eyes Governance Pin
    // ==========================================
    if (matchesSearch('approval', 'governance', 'checker', 'sod')) {
      pins.push(`
        <div class="dashboard-approval-card pinterest-pin p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div class="flex items-center justify-between mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase font-mono">
              Four-Eyes SoD
            </span>
            <span class="text-[11px] font-mono text-amber-800 font-bold">PIN 4321</span>
          </div>

          <h3 class="text-sm font-bold text-slate-900 mt-2">Maker-Checker Sanctions</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">
            Statutory store approvals awaiting Store In-Charge (Col. Anita Sharma) verification.
          </p>

          <div class="my-3 p-3 bg-white/80 rounded-xl border border-amber-200/80 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-700">Waiting Sanction:</span>
            <span class="text-lg font-bold font-mono text-amber-900">${pendingCount} Entries</span>
          </div>

          <button onclick="CMS_APP.navigateTo('pending-approvals')" class="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-full transition shadow-xs">
            Review Approval Queue →
          </button>
        </div>
      `);
    }

    // The dashboard is intentionally limited to unresolved alerts and approvals.
    return pins.length > 0 ? pins.join('') : `
      <div class="p-8 text-center bg-white rounded-xl border border-slate-200">
        <i data-lucide="check-circle-2" class="w-8 h-8 mx-auto text-emerald-500 mb-2"></i>
        <div class="text-sm font-bold text-slate-700">No pending approvals</div>
        <p class="text-xs text-slate-500 mt-1">The dashboard will show new action items here.</p>
      </div>
    `;

    // ==========================================
    // PINS 3: Reorder & Low Stock Pins
    // ==========================================
    if (this.activeFilter === 'all' || this.activeFilter === 'reorder') {
      consumables.forEach(item => {
        const stock = window.CMS_STORE.getStock(item.id);
        const buffer = Number(item.avgMonthlyConsumption || 0);
        const isDepleted = stock === 0;
        const isLow = stock > 0 && stock < buffer * 0.5;

        if ((isDepleted || isLow) && matchesSearch(item.materialName, item.brand, item.categoryName, item.id)) {
          const pct = Math.min(100, Math.round((stock / (buffer || 1)) * 100));
          const deficit = Math.max(0, buffer - stock);

          pins.push(`
            <div class="pinterest-pin ${isDepleted ? 'bg-red-50/40 border-red-200' : 'bg-amber-50/40 border-amber-200'} p-4">
              
              <!-- Pin Card Header -->
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${isDepleted ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
                  ${isDepleted ? 'Out of Stock' : 'Low Buffer'}
                </span>
                <span class="text-[10px] font-mono text-slate-500 font-semibold">${item.inventoryType || 'Consumer'}</span>
              </div>

              <!-- Title & Brand -->
              <h4 class="font-bold text-slate-900 text-sm leading-snug">${item.materialName}</h4>
              <div class="text-[11px] text-slate-500 mt-0.5">Brand: ${item.brand || 'Standard'} • Cat: ${item.categoryName || 'Supplies'}</div>

              <!-- Stock Visual Meter -->
              <div class="my-3 p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-500">Stock Balance:</span>
                  <span class="font-bold font-mono ${isDepleted ? 'text-red-700' : 'text-amber-700'}">${stock} ${item.unit}</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-500">Monthly Buffer:</span>
                  <span class="font-mono text-slate-700">${buffer} ${item.unit}</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="${isDepleted ? 'bg-red-500' : 'bg-amber-500'} h-full rounded-full" style="width: ${pct}%"></div>
                </div>
                <div class="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Shortfall: -${deficit} ${item.unit}</span>
                  <span>${pct}% Covered</span>
                </div>
              </div>

              <!-- Rate & Quick Action Button -->
              <div class="flex items-center justify-between pt-1">
                <div>
                  <div class="text-[10px] text-slate-400 uppercase font-semibold">Approved Quote</div>
                  <div class="text-sm font-bold font-mono text-slate-900">₹${Number(item.vendor1Rate || 0).toFixed(2)}</div>
                </div>
                <button onclick="CMS_PO.openPOModal('${item.id}')" class="pinterest-btn px-4 py-1.5 text-xs shadow-sm">
                  Procure PO
                </button>
              </div>

            </div>
          `);
        }
      });
    }

    // ==========================================
    // PINS 4: Fixed Asset & PM Care Pins
    // ==========================================
    if (this.activeFilter === 'all' || this.activeFilter === 'fixed') {
      const fixedAssets = consumables.filter(m => m.inventoryType === 'Fixed' || m.hasPm || m.preventiveMaintenance === 'Yes');
      
      fixedAssets.forEach(item => {
        if (matchesSearch(item.materialName, item.assetTag, item.serialNo, item.custodianDept, item.repairmanName)) {
          const isOverdue = item.nextPmDate && item.nextPmDate < today;

          pins.push(`
            <div class="pinterest-pin p-4 bg-white border-slate-200">
              
              <!-- Tag & Category Badge -->
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-[10px] font-bold font-mono">
                  Fixed Asset
                </span>
                <span class="text-[10px] font-mono text-slate-400">${item.assetTag || 'TAG-PENDING'}</span>
              </div>

              <h4 class="font-bold text-slate-900 text-sm leading-snug">${item.materialName}</h4>
              <div class="text-[11px] text-slate-500 mt-0.5">S/N: ${item.serialNo || 'N/A'} • Dept: ${item.custodianDept || 'Central Pool'}</div>

              <!-- Asset Care Detail Box -->
              <div class="my-3 p-3 bg-purple-50/40 rounded-xl border border-purple-100 space-y-2 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500">Warranty Validity:</span>
                  <span class="font-mono font-bold text-purple-950 text-[11px]">${item.warrantyValidTill || 'Active'}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500">PM Cycle:</span>
                  <span class="font-medium text-slate-700">${item.pmFrequency || 'Quarterly'}</span>
                </div>
                <div class="flex justify-between items-center pt-1 border-t border-purple-100">
                  <span class="text-slate-500">Next Service:</span>
                  <span class="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono ${isOverdue ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}">
                    ${item.nextPmDate || 'Scheduled'} ${isOverdue ? '(OVERDUE)' : ''}
                  </span>
                </div>
              </div>

              <!-- Repairman info & Action -->
              <div class="flex items-center justify-between pt-1">
                <div>
                  <div class="text-[10px] text-slate-400 uppercase font-semibold">Repairman</div>
                  <div class="text-xs font-semibold text-slate-800 truncate max-w-[130px]">${item.repairmanName || 'Sanjay Verma'}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${item.repairmanContact || '+91 98110 44219'}</div>
                </div>
                <button onclick="CMS_REPORTS.openLogPmModal('${item.id}')" class="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-full transition shadow-xs">
                  Log PM
                </button>
              </div>

            </div>
          `);
        }
      });
    }

    // ==========================================
    // PINS 5: Department Requisition (PULL/PUSH) Pins
    // ==========================================
    if (this.activeFilter === 'all' || this.activeFilter === 'indents') {
      requests.forEach(req => {
        if (matchesSearch(req.requestNo, req.materialName, req.sourceDept, req.destDept, req.requestedBy)) {
          const isPush = req.transferMode === 'PUSH';

          pins.push(`
            <div class="pinterest-pin p-4 bg-white border-slate-200">
              
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${isPush ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-blue-100 text-blue-900 border border-blue-200'}">
                  ${isPush ? 'PUSH Transfer' : 'PULL Demand'}
                </span>
                <span class="text-[10px] font-mono text-slate-400">${req.requestNo}</span>
              </div>

              <h4 class="font-bold text-slate-900 text-sm leading-snug">${req.materialName}</h4>
              <div class="text-[11px] text-slate-500 mt-0.5">Quantity: <strong class="font-mono text-slate-900">${req.qty} ${req.unit}</strong></div>

              <div class="my-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div class="text-slate-500 text-[10px] uppercase font-semibold">Routing:</div>
                <div class="font-semibold text-slate-800 text-[11px]">${req.sourceDept} -> ${req.destDept}</div>
                <div class="text-[10px] text-slate-400 pt-1">Raised by: ${req.requestedBy || 'Dept Staff'}</div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                  ${req.status}
                </span>
                <button onclick="CMS_TRANSACTIONS.openIssuanceModal('${req.materialId || ''}')" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full transition shadow-xs">
                  Issue Slip
                </button>
              </div>

            </div>
          `);
        }
      });
    }

    // ==========================================
    // PINS 6: Recent Inward Delivery Pins
    // ==========================================
    if (this.activeFilter === 'all' || this.activeFilter === 'inward') {
      receipts.slice(-4).forEach(rec => {
        if (matchesSearch(rec.receiptNo, rec.materialName, rec.vendorName, rec.docNo)) {
          pins.push(`
            <div class="pinterest-pin p-4 bg-white border-slate-200">
              
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-[10px] font-bold font-mono">
                  Goods Inward (${rec.type})
                </span>
                <span class="text-[10px] font-mono text-slate-400">${rec.receiptNo}</span>
              </div>

              <h4 class="font-bold text-slate-900 text-sm leading-snug">${rec.materialName}</h4>
              <div class="text-[11px] text-slate-500 mt-0.5">Supplier: ${rec.vendorName}</div>

              <div class="my-3 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500">Quantity Received:</span>
                  <span class="font-bold font-mono text-emerald-800">+${rec.qty} ${rec.unit}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-500">Challan / Invoice:</span>
                  <span class="font-mono text-slate-700">${rec.docNo}</span>
                </div>
                <div class="flex justify-between items-center pt-1 border-t border-emerald-100">
                  <span class="text-slate-500">Batch Value:</span>
                  <span class="font-bold font-mono text-slate-900">₹${Number(rec.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Date: ${rec.docDate || 'Recent'}</span>
                <span class="text-emerald-700 font-bold uppercase text-[10px]">Restocked</span>
              </div>

            </div>
          `);
        }
      });
    }

    // ==========================================
    // PINS 7: Category Inspiration Boards
    // ==========================================
    if (this.activeFilter === 'all' || this.activeFilter === 'boards') {
      categories.forEach(cat => {
        if (matchesSearch(cat.name, cat.description)) {
          const catItems = consumables.filter(m => m.categoryId === cat.id || m.categoryName === cat.name);
          let catVal = 0;
          catItems.forEach(i => {
            catVal += window.CMS_STORE.getStock(i.id) * Number(i.vendor1Rate || 0);
          });

          pins.push(`
            <div class="pinterest-pin p-4 bg-slate-50 border-slate-200">
              
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 text-[10px] font-bold font-mono">
                  Category Board
                </span>
                <span class="text-[10px] font-mono text-slate-400">${catItems.length} SKUs</span>
              </div>

              <h4 class="font-bold text-slate-900 text-sm leading-snug">${cat.name}</h4>
              <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${cat.description || 'Standard consumable supply category.'}</p>

              <div class="my-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Board Valuation</div>
                <div class="text-lg font-bold font-mono text-slate-900 mt-0.5">₹${catVal.toLocaleString('en-IN')}</div>
              </div>

              <button onclick="CMS_APP.navigateTo('consumables')" class="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-full transition">
                Open Board →
              </button>

            </div>
          `);
        }
      });
    }

    if (pins.length === 0) {
      return `
        <div class="col-span-full p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
          <i data-lucide="search-x" class="w-8 h-8 mx-auto text-slate-300 mb-2"></i>
          <div class="text-sm font-semibold text-slate-600">No pins matched your search query.</div>
          <p class="text-xs text-slate-400 mt-1">Try clearing the search bar or choosing another category pill.</p>
        </div>
      `;
    }

    return pins.join('');
  }
};
