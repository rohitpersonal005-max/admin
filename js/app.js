/**
 * Adminutes - Main Application Orchestrator
 * Handles view routing, Executive Dashboard, modal dialogues,
 * Lucide icon hydration, toast notifications, Maker-Checker role switching,
 * and database backups.
 */

window.CMS_APP = {
  currentView: 'dashboard',

  init() {
    this.bindEvents();
    this.updateUserProfile();
    this.updatePendingBadge();
    const route = this.getHashRoute() || 'dashboard';
    this.navigateTo(route);
  },

  bindEvents() {
    window.addEventListener('hashchange', () => {
      this.navigateTo(this.getHashRoute() || 'dashboard');
    });

    window.addEventListener('cms-store-updated', () => {
      this.updateUserProfile();
      this.updatePendingBadge();
      this.refreshView();
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('user-dropdown-menu');
      const trigger = document.getElementById('user-profile-trigger');
      if (dropdown && trigger && !dropdown.contains(e.target) && !trigger.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // Close modals on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closePinModal();
      }
    });
  },

  getHashRoute() {
    return window.location.hash.replace(/^#\/?/, '') || '';
  },

  navigateTo(route) {
    if (route === 'vendors' && this.currentView !== 'vendors' && window.CMS_MASTERS) {
      window.CMS_MASTERS.vendorSearchQuery = '';
    }
    this.currentView = route;
    window.location.hash = '#' + route;

    if (route !== 'dashboard' && window.CMS_DASHBOARD) {
      window.CMS_DASHBOARD.lastEmergencySignature = '';
    }

    // Update active nav styling
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-route');
      if (target === route) {
        link.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        link.classList.remove('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
      } else {
        link.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        link.classList.add('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
      }
    });

    const main = document.getElementById('view-container');
    if (!main) return;

    // Render corresponding view
    switch (route) {
      case 'dashboard':
        main.innerHTML = window.CMS_DASHBOARD.render();
        window.setTimeout(() => window.CMS_DASHBOARD.showEmergencyAlerts(), 0);
        break;
      case 'draft-workspace':
        main.innerHTML = window.CMS_DRAFTS.render();
        break;

      // Masters
      case 'vendors':
        main.innerHTML = window.CMS_MASTERS.renderVendors();
        break;
      case 'categories':
        main.innerHTML = window.CMS_MASTERS.renderCategories();
        break;
      case 'consumables':
        main.innerHTML = window.CMS_MASTERS.renderConsumables();
        break;
      case 'gst-slabs':
        main.innerHTML = window.CMS_MASTERS.renderGstSlabs();
        break;

      // Consumable Operations
      case 'receipts':
        main.innerHTML = window.CMS_TRANSACTIONS.renderReceipts();
        break;
      case 'requests':
        main.innerHTML = window.CMS_TRANSACTIONS.renderRequests();
        break;
      case 'issuances':
        main.innerHTML = window.CMS_TRANSACTIONS.renderIssuances();
        break;
      case 'returns':
        main.innerHTML = window.CMS_TRANSACTIONS.renderReturns();
        break;
      case 'stock-adjustments':
        main.innerHTML = window.CMS_TRANSACTIONS.renderStockAdjustments();
        break;
      case 'challan-conversion':
        main.innerHTML = window.CMS_TRANSACTIONS.renderChallanConversion();
        break;
      case 'po-generation':
        main.innerHTML = window.CMS_PO.renderPOs();
        break;
      case 'reconciliation':
        main.innerHTML = window.CMS_RECONCILIATION.renderReconciliation();
        break;

      // Dual Inventory & Governance
      case 'consumer-inventory':
        main.innerHTML = window.CMS_REPORTS.renderConsumerInventory();
        break;
      case 'fixed-inventory':
        main.innerHTML = window.CMS_REPORTS.renderFixedInventory();
        break;

      // Reports & Approvals
      case 'stock-status':
        main.innerHTML = window.CMS_REPORTS.renderStockReport();
        break;
      case 'stock-ledger':
        main.innerHTML = window.CMS_REPORTS.renderStockLedger();
        break;
      case 'pending-approvals':
        if (!window.CMS_STORE.isApprover()) {
          main.innerHTML = window.CMS_REPORTS.renderApprovalsAccessDenied();
        } else {
          main.innerHTML = window.CMS_REPORTS.renderPendingApprovals();
        }
        break;

      default:
        main.innerHTML = window.CMS_DASHBOARD.render();
        break;
    }

    // Update breadcrumb and module indicator pill
    const breadcrumb = document.getElementById('header-breadcrumb');
    if (breadcrumb) {
      let modBadge = '';
      if (['consumer-inventory', 'fixed-inventory', 'stock-status', 'stock-ledger'].includes(route)) {
        modBadge = '<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Stock & Care</span>';
      } else if (['receipts', 'requests', 'issuances', 'returns', 'stock-adjustments', 'challan-conversion', 'po-generation', 'reconciliation'].includes(route)) {
        modBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Store Operations</span>';
      } else if (['vendors', 'categories', 'consumables', 'gst-slabs'].includes(route)) {
        modBadge = '<span class="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Setup</span>';
      } else if (route === 'draft-workspace') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Workspaces</span>';
      } else if (route === 'pending-approvals') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Governance Hub</span>';
      } else if (route === 'dashboard') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Dashboard</span>';
      } else {
        modBadge = '<span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Operations Cockpit</span>';
      }

      const titles = {
        'dashboard': 'Executive Cockpit',
        'draft-workspace': 'Draft Workspace',
        'consumer-inventory': 'Consumer Materials Ledger (Supplies & Buffers)',
        'fixed-inventory': 'Fixed Assets & Care (Warranty & PM)',
        'stock-status': 'Live Stock Status & Buffers',
        'stock-ledger': 'Stock Ledger Movement Trail',
        'vendors': 'Vendor Catalog',
        'categories': 'Consumable Category',
        'consumables': 'Material Catalog',
        'gst-slabs': 'GST / IGST Slabs',
        'receipts': 'Goods Inward (Auto Material Filing)',
        'requests': 'Department Push / Pull Requests',
        'issuances': 'Store Issuance Slips',
        'returns': 'Return to Store (Condition Graded)',
        'stock-adjustments': 'Stock Adjustments (+/-)',
        'challan-conversion': 'Challan to Invoice Conversion',
        'po-generation': 'Purchase Order (PO) Replenishment',
        'reconciliation': 'Physical Stock Reconciliation Audit',
        'pending-approvals': 'Maker-Checker Approval Hub'
      };

      breadcrumb.innerHTML = `${modBadge} <span class="font-semibold text-slate-800">${titles[route] || route}</span>`;
    }

    this.updatePendingBadge();
    window.scrollTo(0, 0);

    // Re-hydrate Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  refreshView() {
    this.navigateTo(this.currentView);
  },

  openModuleGuideModal() {
    const content = `
      <div class="space-y-5 text-xs text-slate-700">
        <!-- Summary Banner -->
        <div class="p-4 bg-slate-900 text-white rounded-md shadow-sm border border-slate-800">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase font-mono tracking-wider">ERP Architecture</span>
              <h3 class="text-sm font-bold text-white">How Adminutes Modules Differ & Connect</h3>
            </div>
            <span class="text-slate-400 text-[11px]">4 Functional Tiers</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Adminutes separates your store into 4 distinct functional tiers. Use this guide to easily distinguish where to find live stock, where to record daily movements, and where to maintain base contract rates.
          </p>
        </div>

        <!-- Visual Workflow Pipeline Diagram -->
        <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-md">
          <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <i data-lucide="git-merge" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>End-to-End Material Flow: Setup -> Movement -> Balances -> Audit</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 bg-white border border-blue-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-blue-50 text-blue-800 font-bold rounded text-[10px] uppercase font-mono">1. Setup</span>
              <div class="font-bold text-slate-900 text-xs mt-1">Contracts & Rates</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Vendor quotes, booked MRP, UoM & categories</p>
            </div>
            <div class="p-2.5 bg-white border border-amber-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-800 font-bold rounded text-[10px] uppercase font-mono">2. Store Operations</span>
              <div class="font-bold text-slate-900 text-xs mt-1">Daily In/Out Flow</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Receipts, Push/Pull indents, issues & returns</p>
            </div>
            <div class="p-2.5 bg-white border border-emerald-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded text-[10px] uppercase font-mono">3. Stock & Care</span>
              <div class="font-bold text-slate-900 text-xs mt-1">Live Stock & Assets</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Consumer buffers, fixed asset tags & PM cycles</p>
            </div>
            <div class="p-2.5 bg-white border border-purple-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-purple-50 text-purple-800 font-bold rounded text-[10px] uppercase font-mono">4. Governance</span>
              <div class="font-bold text-slate-900 text-xs mt-1">Statutory Sanctions</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Checker PIN 4321 & anti-self-approval</p>
            </div>
          </div>
        </div>

        <!-- Distinct guidance only; Inventory and Setup are already visible in the sidebar. -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <!-- Card 1: Store Operations & Movement -->
          <div class="p-3.5 border-2 border-amber-400 bg-amber-50/40 rounded-md space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold text-amber-950 text-xs uppercase tracking-wide">
                <i data-lucide="sliders" class="w-4 h-4 text-amber-600"></i>
                <span>2. Store Operations Module</span>
              </div>
              <span class="px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold uppercase font-mono">MOVEMENT</span>
            </div>
            <p class="text-xs text-slate-700"><strong>Role in ERP:</strong> Handles physical transactions — items coming in from vendors, and moving out to departments.</p>
            <div class="bg-white p-2.5 rounded border border-amber-200 space-y-1 text-slate-600 text-[11px]">
              <div><strong>Key Question Answered:</strong> <em>"Who brought material in, who requisitioned stock, and who returned damaged items?"</em></div>
              <div class="pt-1 border-t border-slate-100">
                <strong>Key Transaction Types:</strong>
                <ul class="list-disc list-inside mt-0.5 text-slate-700 space-y-0.5">
                  <li><strong>Goods Inward (Auto Material):</strong> Record delivery challans and auto-catalog new items.</li>
                  <li><strong>Dept Push vs Pull:</strong> Pull (dept requests items) vs Push (stores allocates assets).</li>
                  <li><strong>Issuances & Returns:</strong> Official printable vouchers & condition-graded returns.</li>
                </ul>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-1">Views: #receipts, #requests, #issuances, #returns, #stock-adjustments, #po-generation</div>
            </div>
          </div>

          <!-- Card 2: Governance & Approval Hub -->
          <div class="p-3.5 border-2 border-purple-400 bg-purple-50/40 rounded-md space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold text-purple-950 text-xs uppercase tracking-wide">
                <i data-lucide="shield" class="w-4 h-4 text-purple-600"></i>
                <span>4. Governance & Approval Hub</span>
              </div>
              <span class="px-2 py-0.5 bg-purple-600 text-white rounded text-[10px] font-bold uppercase font-mono">FOUR-EYES SoD</span>
            </div>
            <p class="text-xs text-slate-700"><strong>Role in ERP:</strong> Enforces Segregation of Duties (SoD) to prevent tampering and self-approval.</p>
            <div class="bg-white p-2.5 rounded border border-purple-200 space-y-1 text-slate-600 text-[11px]">
              <div><strong>Key Question Answered:</strong> <em>"Has this draft transaction been independently sanctioned by a certified officer?"</em></div>
              <div class="pt-1 border-t border-slate-100">
                <strong>Key Safeguards:</strong>
                <ul class="list-disc list-inside mt-0.5 text-slate-700 space-y-0.5">
                  <li><strong>Maker-Checker Split:</strong> Staff (Rajesh Kumar) drafts, In-Charge approves.</li>
                  <li><strong>Manager PIN (4321):</strong> Blocks unauthorized sign-offs.</li>
                  <li><strong>Anti-Self-Approval:</strong> Blocks sanctioning one's own drafts.</li>
                </ul>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-1">Views: #pending-approvals, Maker-Checker Verification</div>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 flex justify-end">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md transition text-xs shadow-sm">
            Got It, Close Guide
          </button>
        </div>
      </div>
    `;

    this.openModal('Adminutes ERP — Module Differences & Architecture Guide', content, 'max-w-4xl');
  },

  // User Session & Security Management
  updateUserProfile() {
    const user = window.CMS_STORE.getCurrentUser();
    const users = window.CMS_STORE.getUsers();

    // Header updates
    const avatar = document.getElementById('header-avatar');
    const userName = document.getElementById('header-user-name');
    const rolePill = document.getElementById('header-role-pill');
    const empId = document.getElementById('header-emp-id');

    if (avatar) {
      avatar.innerText = user.avatarText;
      avatar.className = `w-8 h-8 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`;
    }
    if (userName) userName.innerText = user.name;
    if (empId) empId.innerText = user.id;
    if (rolePill) {
      rolePill.innerText = user.role;
      if (user.role === 'Checker') {
        rolePill.className = 'text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300';
      } else {
        rolePill.className = 'text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300';
      }
    }

    // Dropdown active card updates
    const dAvatar = document.getElementById('dropdown-user-avatar');
    const dName = document.getElementById('dropdown-user-name');
    const dDept = document.getElementById('dropdown-user-dept');
    const dBadge = document.getElementById('dropdown-user-role-badge');
    const dId = document.getElementById('dropdown-user-id');

    if (dAvatar) {
      dAvatar.innerText = user.avatarText;
      dAvatar.className = `w-9 h-9 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`;
    }
    if (dName) dName.innerText = user.name;
    if (dDept) dDept.innerText = user.department;
    if (dId) dId.innerText = user.id;
    if (dBadge) {
      dBadge.innerText = user.roleTitle;
      dBadge.className = user.role === 'Checker'
        ? 'text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200'
        : 'text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200';
    }

    // Populate switch list
    const listEl = document.getElementById('user-accounts-list');
    const addMakerButton = document.getElementById('add-maker-button');
    if (addMakerButton) addMakerButton.classList.toggle('hidden', user.role !== 'Checker');
    if (listEl) {
      listEl.innerHTML = users.map(u => {
        const isCurrent = u.id === user.id;
        return `
          <div onclick="CMS_APP.selectAccount('${u.id}')" class="flex items-center justify-between p-2 rounded hover:bg-slate-100 cursor-pointer transition ${isCurrent ? 'bg-blue-50/70 border border-blue-200' : ''}">
            <div class="flex items-center gap-2.5">
              <div class="w-6 h-6 rounded ${u.avatarBg} text-white font-bold text-[10px] flex items-center justify-center">
                ${u.avatarText}
              </div>
              <div>
                <div class="font-medium text-slate-800 text-xs flex items-center gap-1">
                  <span>${u.name}</span>
                  ${u.role === 'Checker' ? '<i data-lucide="lock" class="w-3 h-3 text-amber-600 inline"></i>' : ''}
                </div>
                <div class="text-[10px] text-slate-400 font-mono">${u.id} • ${u.role}</div>
              </div>
            </div>
            ${isCurrent ? '<span class="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">ACTIVE</span>' : '<span class="text-[10px] text-slate-500 hover:text-blue-600 font-medium">Switch</span>'}
          </div>
        `;
      }).join('');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) dropdown.classList.toggle('hidden');
  },

  openAddMakerModal() {
    if (!window.CMS_STORE.isApprover()) return;
    this.toggleUserDropdown();
    const content = `
      <form class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_APP.createMaker();">
        <div class="p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-cyan-950 flex items-start gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-cyan-700 shrink-0"></i>
          <span>Only the Store Checker can create Maker accounts. Makers can access shared approved data but cannot approve records or view other Maker profiles.</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="sm:col-span-2">
            <label class="block font-bold text-slate-700 mb-1">Full Name *</label>
            <input id="new-maker-name" required class="w-full" placeholder="e.g. Priya Nair" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Username *</label>
            <input id="new-maker-username" required pattern="[A-Za-z0-9._-]{3,40}" class="w-full" placeholder="e.g. priya" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Temporary Password *</label>
            <input id="new-maker-password" required minlength="8" type="password" class="w-full" placeholder="Minimum 8 characters" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Department</label>
            <input id="new-maker-department" class="w-full" value="Central Warehouse & Logistics" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Email</label>
            <input id="new-maker-email" type="email" class="w-full" placeholder="Optional" />
          </div>
        </div>
        <div id="new-maker-error" class="hidden p-2.5 bg-red-50 border border-red-200 text-red-800 rounded-lg font-medium"></div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-3.5 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-lg">Create Maker</button>
        </div>
      </form>
    `;
    this.openModal('Add Maker Account', content, 'max-w-xl');
  },

  async createMaker() {
    const errorEl = document.getElementById('new-maker-error');
    const payload = {
      name: document.getElementById('new-maker-name')?.value,
      username: document.getElementById('new-maker-username')?.value,
      password: document.getElementById('new-maker-password')?.value,
      department: document.getElementById('new-maker-department')?.value,
      email: document.getElementById('new-maker-email')?.value
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to create Maker.');
      await window.CMS_AUTH.loadUsers();
      this.closeModal();
      this.updateUserProfile();
      this.toast(`Maker account created for ${result.user.name}.`, 'success');
    } catch (error) {
      if (errorEl) {
        errorEl.innerText = error.message;
        errorEl.classList.remove('hidden');
      }
    }
  },

  selectAccount(userId) {
    const current = window.CMS_STORE.getCurrentUser();
    if (current.id === userId) {
      this.toggleUserDropdown();
      return;
    }

    const target = window.CMS_STORE.getUsers().find(u => u.id === userId);
    if (!target) return;

    this.toggleUserDropdown();

    if (target.role === 'Checker') {
      this.promptManagerPin(() => {
        window.CMS_STORE.setCurrentUser(target.id);
        this.updateUserProfile();
        this.toast(`Authenticated as Store In-Charge (${target.name})`, 'success');
        this.refreshView();
      }, `Authenticate as Store In-Charge (${target.name})`);
    } else {
      window.CMS_STORE.setCurrentUser(target.id);
      this.updateUserProfile();
      this.toast(`Switched account to ${target.name} (${target.roleTitle})`, 'info');
      this.refreshView();
    }
  },

  promptManagerPin(onSuccess, actionDesc = 'Manager Authorization') {
    this.pendingPinCallback = onSuccess;
    const modal = document.getElementById('pin-modal-container');
    const descEl = document.getElementById('pin-modal-desc');
    const input = document.getElementById('manager-pin-input');
    const err = document.getElementById('pin-error-msg');

    if (!modal) return;
    if (descEl) descEl.innerText = actionDesc;
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
    if (err) {
      err.innerText = '';
      err.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  },

  submitManagerPin() {
    const input = document.getElementById('manager-pin-input');
    const err = document.getElementById('pin-error-msg');
    const pin = input ? input.value : '';

    if (!window.CMS_STORE.verifyManagerPin(pin)) {
      if (err) {
        err.innerText = 'Invalid Manager Security PIN. (Default PIN: 4321)';
        err.classList.remove('hidden');
      }
      if (input) {
        input.select();
      }
      return;
    }

    this.closePinModal();
    if (typeof this.pendingPinCallback === 'function') {
      const cb = this.pendingPinCallback;
      this.pendingPinCallback = null;
      cb();
    }
  },

  closePinModal() {
    const modal = document.getElementById('pin-modal-container');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    this.pendingPinCallback = null;
  },

  updatePendingBadge() {
    const count = window.CMS_STORE.getPendingApprovalsCount();
    const isApprover = window.CMS_STORE.isApprover();
    const badge = document.getElementById('pending-approvals-counter');
    const headerBadge = document.getElementById('header-pending-badge');
    const headerText = document.getElementById('header-pending-badge-text');
    const govNav = document.getElementById('nav-governance-section');

    if (govNav) {
      govNav.classList.toggle('hidden', !isApprover);
    }

    if (badge) {
      if (isApprover && count > 0) {
        badge.innerText = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    if (headerBadge) {
      if (isApprover && count > 0) {
        if (headerText) headerText.innerText = `${count} Pending`;
        headerBadge.classList.remove('hidden');
      } else {
        headerBadge.classList.add('hidden');
      }
    }
  },

  // Modal Dialogues
  openModal(title, contentHtml, maxWidthClass = 'max-w-2xl') {
    const container = document.getElementById('modal-container');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const cardEl = document.getElementById('modal-card');

    if (!container || !titleEl || !bodyEl || !cardEl) return;

    titleEl.innerText = title;
    bodyEl.innerHTML = contentHtml;

    cardEl.className = `relative w-full ${maxWidthClass} bg-white rounded-md border border-slate-300 shadow-xl overflow-hidden transform transition-all my-8`;

    container.classList.remove('hidden');
    container.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Hydrate icons in modal
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  closeModal() {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.classList.add('hidden');
    container.classList.remove('flex');
    document.body.style.overflow = 'auto';
  },

  // Toast Notifications
  toast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toastEl = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-slate-900 border border-emerald-500/40 text-emerald-400' : type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-200';

    toastEl.className = `${bgColor} px-4 py-3 rounded-md shadow-sm text-xs font-bold flex items-center gap-2.5 transform transition-all duration-300 opacity-0 translate-y-2 pointer-events-auto backdrop-blur-md`;
    toastEl.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'}"></span>
      <span>${message}</span>
    `;

    container.appendChild(toastEl);

    requestAnimationFrame(() => {
      toastEl.classList.remove('opacity-0', 'translate-y-2');
      toastEl.classList.add('opacity-100', 'translate-y-0');
    });

    setTimeout(() => {
      toastEl.classList.remove('opacity-100', 'translate-y-0');
      toastEl.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toastEl.remove(), 300);
    }, 3500);
  },

  resetData() {
    if (confirm('Are you sure you want to delete all records and clear the database? Any unsaved edits will be lost.')) {
      window.CMS_STORE.resetToDefault();
      this.toast('All records and trail data were deleted.', 'info');
      this.refreshView();
    }
  },

  backupData() {
    const json = window.CMS_STORE.exportJSON();
    const dateStr = new Date().toISOString().split('T')[0];
    window.CMS_REPORTS.downloadFile(json, `Adminutes_Backup_${dateStr}.json`, 'application/json');
    this.toast('Backup JSON downloaded successfully!');
  },

  restoreDataPrompt() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = window.CMS_STORE.importJSON(event.target.result);
        if (result.success) {
          this.toast('Database restored successfully!', 'success');
          this.refreshView();
        } else {
          alert('Failed to restore database: ' + result.error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }
};

// Authentication bootstrap starts the application after the server confirms a session.
if (!window.CMS_AUTH) {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => window.CMS_APP.init());
  } else {
    window.CMS_APP.init();
  }
}
