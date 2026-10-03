/**
 * Adminutes - Main Application Orchestrator
 * Handles view routing, Executive Dashboard, modal dialogues,
 * Lucide icon hydration, toast notifications, User-Admin role switching,
 * and database backups.
 */

window.CMS_APP = {
  currentView: 'dashboard',

  init() {
    this.bindEvents();
    this.updateUserProfile();
    this.updatePendingBadge();
    const role = window.CMS_STORE.getRole();
    let route = this.getHashRoute();
    if (!route) {
      route = role === 'Admin' ? 'home' : 'dashboard';
    } else if (route === 'home' && role !== 'Admin') {
      route = 'dashboard';
    }
    this.navigateTo(route);

    // Global interceptor for all file uploads
    document.addEventListener('change', (e) => {
      if (e.target && e.target.type === 'file' && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.size > 5 * 1024 * 1024) return; // Ignore large files
        const reader = new FileReader();
        reader.onload = (ev) => {
          localStorage.setItem('CMS_FILE_' + file.name, ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  },

  bindEvents() {
        // Global realtime validation for important fields
    document.addEventListener('input', (e) => {
      const el = e.target;
      if (el && el.tagName === 'INPUT') {
        const id = (el.id || '').toLowerCase();
        
        const isPin = id.includes('pin') && !id.includes('file');
        const isContact = id.includes('contact') && !id.includes('file');
        const isEmail = el.type === 'email' || id.includes('email');
        const isGst = id.includes('gst') && !id.includes('file');
        const isPan = id.includes('pan') && !id.includes('file');

        if (isPin || isContact || isEmail || isGst || isPan) {
          let isValid = false;
          let val = el.value.trim();
          
          if (isPin) isValid = val.length === 6 && /^\d{6}$/.test(val);
          if (isContact) isValid = val.length === 10 && /^\d{10}$/.test(val);
          if (isEmail) isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          if (isGst) isValid = val.length === 15;
          if (isPan) isValid = val.length === 10;

          if (val.length > 0) {
            if (isValid) {
              el.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-900', 'border-slate-200', 'border-slate-300');
              el.classList.add('border-emerald-500', 'bg-emerald-50/50', 'text-emerald-900', 'ring-1', 'ring-emerald-500');
              el.classList.remove('ring-rose-500');
            } else {
              el.classList.remove('border-emerald-500', 'bg-emerald-50/50', 'text-emerald-900', 'border-slate-200', 'border-slate-300');
              el.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-900', 'ring-1', 'ring-rose-500');
              el.classList.remove('ring-emerald-500');
            }
          } else {
             el.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-900', 'border-emerald-500', 'bg-emerald-50/50', 'text-emerald-900', 'ring-1', 'ring-rose-500', 'ring-emerald-500');
             el.classList.add(id.includes('home') ? 'border-slate-200' : 'border-slate-300');
          }
        }
      }
    });

    window.addEventListener('hashchange', () => {
      const role = window.CMS_STORE.getRole();
      let r = this.getHashRoute();
      if (!r) r = role === 'Admin' ? 'home' : 'dashboard';
      if (r === 'home' && role !== 'Admin') r = 'dashboard';
      this.navigateTo(r);
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
    const user = window.CMS_STORE.getCurrentUser();
    if (user && user.role !== 'Admin') {
      const allowedModules = user.modules || ['Inventory', 'Transactions', 'Reports'];
      let requiredModule = null;
      
      const invRoutes = ['vendors', 'categories', 'consumables', 'gst-slabs', 'consumer-inventory', 'fixed-inventory', 'stock-status', 'stock-ledger'];
      const transRoutes = ['receipts', 'requests', 'issuances', 'draft-workspace'];
      
      if (invRoutes.includes(route)) requiredModule = 'Inventory';
      else if (transRoutes.includes(route)) requiredModule = 'Transactions';
      
      if (requiredModule && !allowedModules.includes(requiredModule)) {
        this.toast('Access Denied: Your role does not have permission for the ' + requiredModule + ' module.', 'error');
        route = 'dashboard';
      }
    }

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
        link.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
        link.classList.remove('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
      } else {
        link.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
        link.classList.add('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
      }
    });

    const main = document.getElementById('view-container');
    if (!main) return;

    // Render corresponding view
    switch (route) {
      case 'home':
        if (window.CMS_HOME) window.CMS_HOME.render();
        break;
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
        modBadge = '<span class="px-2 py-0.5 rounded bg-slate-100 text-blue-600 border border-blue-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Setup</span>';
      } else if (route === 'draft-workspace') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Workspaces</span>';
      } else if (route === 'pending-approvals') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Governance Hub</span>';
      } else if (route === 'dashboard') {
        modBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Dashboard</span>';
      } else {
        modBadge = '<span class="px-2 py-0.5 rounded bg-slate-50 text-blue-600 border border-slate-200 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">Operations Cockpit</span>';
      }

      const titles = {
        'dashboard': 'Executive Cockpit',
        'draft-workspace': 'Draft Workspace',
        'consumer-inventory': 'Consumable Materials Ledger (Supplies & Buffers)',
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
        'pending-approvals': 'User-Admin Approval Hub'
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
              <span class="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold uppercase font-mono tracking-wider">ERP Architecture</span>
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
            <div class="p-2.5 bg-white border border-slate-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-slate-50 text-blue-600 font-bold rounded text-[10px] uppercase font-mono">1. Setup</span>
              <div class="font-bold text-blue-600 text-xs mt-1">Contracts & Rates</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Vendor quotes, booked MRP, UoM & categories</p>
            </div>
            <div class="p-2.5 bg-white border border-amber-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-800 font-bold rounded text-[10px] uppercase font-mono">2. Store Operations</span>
              <div class="font-bold text-blue-600 text-xs mt-1">Daily In/Out Flow</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Receipts, Push/Pull indents, issues & returns</p>
            </div>
            <div class="p-2.5 bg-white border border-emerald-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded text-[10px] uppercase font-mono">3. Stock & Care</span>
              <div class="font-bold text-blue-600 text-xs mt-1">Live Stock & Assets</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Consumable buffers, fixed asset tags & PM cycles</p>
            </div>
            <div class="p-2.5 bg-white border border-purple-200 rounded text-left">
              <span class="inline-block px-1.5 py-0.5 bg-purple-50 text-purple-800 font-bold rounded text-[10px] uppercase font-mono">4. Governance</span>
              <div class="font-bold text-blue-600 text-xs mt-1">Statutory Sanctions</div>
              <p class="text-[10px] text-slate-500 mt-0.5">Admin PIN 4321 & anti-self-approval</p>
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
                  <li><strong>User-Admin Split:</strong> Staff (Rajesh Kumar) drafts, In-Charge approves.</li>
                  <li><strong>Manager PIN (4321):</strong> Blocks unauthorized sign-offs.</li>
                  <li><strong>Anti-Self-Approval:</strong> Blocks sanctioning one's own drafts.</li>
                </ul>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-1">Views: #pending-approvals, User-Admin Verification</div>
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
    const isChecker = user && user.role === 'Admin';
    const navAdminHome = document.getElementById('nav-admin-home');
    if (navAdminHome) navAdminHome.classList.toggle('hidden', !isChecker);
    const users = window.CMS_STORE.getUsers();

    // Header updates
    const avatar = document.getElementById('header-avatar');
    const userName = document.getElementById('header-user-name');
    const rolePill = document.getElementById('header-role-pill');
    const empId = document.getElementById('header-emp-id');

    if (avatar) {
      avatar.innerText = user.avatarText;
      avatar.className = `w-8 h-8 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-sm`;
    }
    if (userName) userName.innerText = user.name;
    if (empId) empId.innerText = user.id;
    if (rolePill) {
      rolePill.innerText = user.role;
      if (user.role === 'Admin') {
        rolePill.className = 'text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300';
      } else {
        rolePill.className = 'text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-blue-600 border border-blue-300';
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
      dAvatar.className = `w-9 h-9 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`;
    }
    if (dName) dName.innerText = user.name;
    if (dDept) dDept.innerText = user.department;
    if (dId) dId.innerText = user.id;
    if (dBadge) {
      dBadge.innerText = user.roleTitle;
      dBadge.className = user.role === 'Admin'
        ? 'text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200'
        : 'text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-slate-100 text-blue-600 border border-slate-200';
    }

    // Checker-only staff directory section: hidden for Operation Person (User)
    const dirSection = document.getElementById('checker-directory-section');
    if (dirSection) {
      dirSection.classList.toggle('hidden', !isChecker);
    }

    const addMakerButton = document.getElementById('add-maker-button');
    if (addMakerButton) addMakerButton.classList.toggle('hidden', !isChecker);

    const listEl = document.getElementById('user-accounts-list');
    if (listEl) {
      if (isChecker) {
        // Only Checker (Col. Anita Sharma) can view other roles and users
        const users = window.CMS_STORE.getUsers();
        const otherStaff = users.filter(u => u.id !== user.id);
        if (otherStaff.length === 0) {
          listEl.innerHTML = '<div class="text-[11px] text-slate-400 italic p-1">No other staff registered</div>';
        } else {
          listEl.innerHTML = otherStaff.map(u => `
            <div onclick="CMS_APP.viewStaffProfile('${u.id}')" class="flex items-center justify-between p-2 rounded hover:bg-slate-100 cursor-pointer transition border border-transparent hover:border-slate-200">
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-6 h-6 rounded ${u.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  ${u.avatarText}
                </div>
                <div class="min-w-0">
                  <div class="font-medium text-slate-800 text-xs truncate flex items-center gap-1">
                    <span>${u.name}</span>
                    <span class="text-[9px] px-1 bg-slate-100 text-slate-700 rounded font-semibold">${u.role}</span>
                  </div>
                  <div class="text-[10px] text-slate-400 font-mono truncate">${u.id} • ${u.department || 'Store'}</div>
                </div>
              </div>
              <button type="button" class="px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition shrink-0" title="View Profile">
                View
              </button>
            </div>
          `).join('');
        }
      } else {
        // Operation person cannot see profiles of other roles or users
        listEl.innerHTML = '';
      }
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
        <div class="p-3 bg-cyan-50 border border-cyan-200 rounded-md text-cyan-950 flex items-start gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-cyan-700 shrink-0"></i>
          <span>Only the Store Admin can create User accounts. Users can access shared approved data but cannot approve records or view other User profiles.</span>
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
        <div id="new-maker-error" class="hidden p-2.5 bg-red-50 border border-red-200 text-red-800 rounded-md font-medium"></div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-3.5 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-md">Create User</button>
        </div>
      </form>
    `;
    this.openModal('Add User Account', content, 'max-w-xl');
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
      if (!response.ok) throw new Error(result.error || 'Unable to create User.');
      await window.CMS_AUTH.loadUsers();
      this.closeModal();
      this.updateUserProfile();
      this.toast(`User account created for ${result.user.name}.`, 'success');
    } catch (error) {
      if (errorEl) {
        errorEl.innerText = error.message;
        errorEl.classList.remove('hidden');
      }
    }
  },

  selectAccount(userId) {
    this.toggleUserDropdown();
    this.toast('Account switching is disabled for security and segregation of duties. Please sign out to log in with another account.', 'warning');
  },

  viewMyProfile() {
    this.toggleUserDropdown();
    const user = window.CMS_STORE.getCurrentUser();
    this.showProfileModal(user, false);
  },

  viewStaffProfile(userId) {
    if (window.CMS_STORE.getRole() !== 'Checker') {
      return this.toast('Operation staff are not authorized to view profiles of other users.', 'error');
    }
    const staff = window.CMS_STORE.getUsers().find(u => u.id === userId);
    if (!staff) return this.toast('Staff profile not found.', 'error');
    this.toggleUserDropdown();
    this.showProfileModal(staff, true);
  },

  showProfileModal(user, isOtherStaff = false) {
    const isChecker = user.role === 'Admin';
    const content = `
      <div class="space-y-4 text-xs">
        <div class="p-4 bg-slate-50 rounded-md border border-slate-200 flex items-center gap-3">
          <div class="w-12 h-12 rounded-full ${user.avatarBg} text-white font-bold text-base flex items-center justify-center shadow-sm shrink-0">
            ${user.avatarText}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-blue-600">${user.name}</h3>
              <span class="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${isChecker ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-slate-100 text-blue-600 border border-slate-200'}">
                ${user.role}
              </span>
            </div>
            <div class="text-slate-500 font-mono text-[11px]">${user.id} • ${user.roleTitle || user.role}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Department</span>
            <div class="font-semibold text-slate-800 mt-0.5">${user.department || 'Central Warehouse & Logistics'}</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md">
            <span class="text-slate-400 font-bold uppercase text-[10px]">Email Address</span>
            <div class="font-mono text-slate-800 mt-0.5">${user.email || 'Not specified'}</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md">
            <span class="text-slate-400 font-bold uppercase text-[10px]">System Designation</span>
            <div class="font-semibold text-slate-800 mt-0.5">${user.roleTitle || user.role}</div>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md">
            <span class="text-slate-400 font-bold uppercase text-[10px]">SoD Authorization Level</span>
            <div class="font-semibold ${isChecker ? 'text-blue-600' : 'text-blue-600'} mt-0.5">
              ${isChecker ? 'Approving Authority (Sanction / Reject / Audit)' : 'User level (Data Entry & Requisitions Only)'}
            </div>
          </div>
        </div>

        <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md space-y-1 text-slate-600">
          <span class="text-slate-700 font-bold uppercase text-[10px]">Role Governance & Scope</span>
          <p class="text-[11px] leading-relaxed">
            ${isChecker
              ? 'Store In-Charge with sole sanctioning and rejection authority. Can inspect all compliance documents and review team member profiles in read-only mode.'
              : 'Operational store maker. Initiates receipts, issues stock, and submits masters for approval. Has access only to self profile; restricted from inspecting other roles or approving records.'}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-200 flex justify-end">
          <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition text-xs">
            Close
          </button>
        </div>
      </div>
    `;

    this.openModal(isOtherStaff ? `Staff Profile: ${user.name}` : 'My User Profile', content, 'max-w-lg');
    if (window.lucide) window.lucide.createIcons();
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
      input.value = '4321';
      setTimeout(() => {
        input.focus();
        input.select();
      }, 100);
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
    if (container && !container.classList.contains('hidden')) {
      let stacked = document.getElementById('stacked-modal-container');
      if (!stacked) {
        stacked = document.createElement('div');
        stacked.id = 'stacked-modal-container';
        stacked.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] hidden items-center justify-center p-4 overflow-y-auto';
        stacked.innerHTML = `
          <div id="stacked-modal-card" class="relative w-full bg-white rounded-md shadow-sm overflow-hidden transform transition-all my-8">
            <div class="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
              <h3 id="stacked-modal-title" class="font-bold text-slate-800 text-sm"></h3>
              <button type="button" onclick="CMS_APP.closeStackedModal()" class="text-slate-400 hover:text-slate-600 transition p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
            <div id="stacked-modal-body" class="p-5 max-h-[80vh] overflow-y-auto bg-slate-50"></div>
          </div>
        `;
        document.body.appendChild(stacked);
      }
      document.getElementById('stacked-modal-title').innerText = title;
      document.getElementById('stacked-modal-body').innerHTML = contentHtml;
      document.getElementById('stacked-modal-card').className = `relative w-full ${maxWidthClass} bg-white rounded-md border border-slate-300 shadow-sm overflow-hidden transform transition-all my-8`;
      stacked.classList.remove('hidden');
      stacked.classList.add('flex');
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const cardEl = document.getElementById('modal-card');

    if (!container || !titleEl || !bodyEl || !cardEl) return;

    titleEl.innerText = title;
    bodyEl.innerHTML = contentHtml;

    cardEl.className = `relative w-full ${maxWidthClass} bg-white rounded-md border border-slate-300 shadow-sm overflow-hidden transform transition-all my-8`;

    container.classList.remove('hidden');
    container.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Hydrate icons in modal
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  closeStackedModal() {
    const stacked = document.getElementById('stacked-modal-container');
    if (stacked) {
      stacked.classList.add('hidden');
      stacked.classList.remove('flex');
    }
  },

  closeModal() {
    const stacked = document.getElementById('stacked-modal-container');
    if (stacked && !stacked.classList.contains('hidden')) {
      this.closeStackedModal();
      return;
    }
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.classList.add('hidden');
    container.classList.remove('flex');
    document.body.style.overflow = 'auto';
  },

  showCompanyProfile() {
    this.toggleUserDropdown();
    const info = JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}');
    const docs = JSON.parse(localStorage.getItem('CMS_COMPANY_DOCS') || '[]');

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[90] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-md shadow-sm w-full max-w-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div class="bg-slate-900 p-5 text-white flex justify-between items-start">
          <div>
            <h2 class="text-xl font-bold flex items-center gap-2">
              <i data-lucide="building-2" class="w-6 h-6"></i>
              ${info.name || 'Company Profile'}
            </h2>
            <p class="text-indigo-100 text-sm mt-1">Official Company Details & Statutory Documents</p>
          </div>
          <button class="text-slate-200 hover:text-white transition" onclick="this.closest('.fixed').remove()">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="p-5 overflow-auto flex-1">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-50 p-3 rounded border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">GSTIN</div>
              <div class="font-mono text-sm font-bold text-slate-800">${info.gstin || '-'}</div>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">PAN</div>
              <div class="font-mono text-sm font-bold text-slate-800">${info.pan || '-'}</div>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">Certificate No</div>
              <div class="font-mono text-sm font-bold text-slate-800">${info.cert || '-'}</div>
            </div>
            <div class="bg-slate-50 p-3 rounded border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">License No</div>
              <div class="font-mono text-sm font-bold text-slate-800">${info.license || '-'}</div>
            </div>
            <div class="col-span-2 bg-slate-50 p-3 rounded border border-slate-100">
              <div class="text-[10px] uppercase font-bold text-slate-400 mb-1">Registered Address</div>
              <div class="text-sm font-medium text-slate-700">${[info.address, info.taluka, info.district, info.state, info.pin].filter(Boolean).join(', ') || '-'}</div>
            </div>
          </div>
          <h3 class="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5"><i data-lucide="files" class="w-4 h-4 text-slate-500"></i> Uploaded Documents</h3>
          <div class="flex flex-col gap-2">
            ${docs.length > 0 ? docs.map((doc, i) => `
              <div class="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-slate-100 text-blue-600 flex items-center justify-center shrink-0">
                    <i data-lucide="${doc.type.includes('pdf') ? 'file-text' : 'image'}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="font-bold text-slate-800 text-sm">${doc.name}</div>
                    <div class="text-[10px] text-slate-400">Uploaded: ${new Date(doc.uploadedAt).toLocaleString()}</div>
                  </div>
                </div>
                <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded flex items-center gap-1 transition" onclick="CMS_APP.previewDocument(${i})">
                  <i data-lucide="eye" class="w-3.5 h-3.5"></i> View Document
                </button>
              </div>
            `).join('') : '<div class="text-sm text-slate-500 italic p-4 text-center border border-dashed border-slate-300 rounded-md">No documents published yet.</div>'}
          </div>
        </div>
        <div class="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button class="bg-slate-800 text-white px-5 py-2 rounded-md font-bold hover:bg-slate-700 transition" onclick="this.closest('.fixed').remove()">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) window.lucide.createIcons();
  },

  previewDocument(index) {
    const docs = JSON.parse(localStorage.getItem('CMS_COMPANY_DOCS') || '[]');
    const doc = docs[index];
    if (!doc) return this.toast('Document not found', 'error');

    let contentHtml = '';
    if (doc.type.includes('pdf')) {
      contentHtml = `<iframe src="${doc.data}" class="w-full h-[60vh] border-0 rounded"></iframe>`;
    } else {
      contentHtml = `<img src="${doc.data}" class="max-w-full max-h-[70vh] object-contain mx-auto rounded shadow-sm" />`;
    }

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-md shadow-sm w-full max-w-4xl flex flex-col max-h-[90vh]">
        <div class="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
            <i data-lucide="file-text" class="w-5 h-5 text-blue-600"></i>
            ${doc.name}
          </h3>
          <button class="text-slate-400 hover:text-slate-600 transition p-1" onclick="this.closest('.fixed').remove()">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 bg-slate-50 flex items-center justify-center">
          ${contentHtml}
        </div>
        <div class="p-4 border-t border-slate-100 flex justify-between items-center text-sm">
          <span class="text-slate-500">Uploaded: ${new Date(doc.uploadedAt).toLocaleString()}</span>
          <div class="flex gap-2">
            <button class="text-blue-600 hover:text-blue-600 bg-slate-50 px-4 py-2 rounded-md font-bold transition flex items-center gap-1.5" onclick="CMS_APP.downloadDocument('${doc.name}', JSON.parse(localStorage.getItem('CMS_COMPANY_DOCS'))[${index}].data)">
              <i data-lucide="download" class="w-4 h-4"></i> Download
            </button>
            <button class="bg-slate-800 text-white px-4 py-2 rounded-md font-bold hover:bg-slate-700 transition" onclick="this.closest('.fixed').remove()">Close Viewer</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) window.lucide.createIcons();
  },

  downloadDocument(fileName, explicitData = null) {
    const data = explicitData || localStorage.getItem('CMS_FILE_' + fileName);
    if (!data) {
      return this.toast('No file data exists to download (this might be a mock document).', 'error');
    }
    const a = document.createElement('a');
    a.href = this.createBlobUrl(data);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 100);
    this.toast('Download started for ' + fileName, 'success');
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

  formatDate(val) {
    return window.CMS_STORE ? window.CMS_STORE.formatDate(val) : String(val || '-');
  },

  viewDocument(fileName, docType = 'Official Document', meta = {}) {
    const cleanFileName = fileName || 'Uploaded_Document.pdf';
    const isPdf = cleanFileName.toLowerCase().endsWith('.pdf');
    const content = `
      <div class="space-y-4 text-xs">
        <div class="p-3.5 bg-slate-900 text-white rounded-md flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded bg-slate-900/30 border border-blue-400/40 text-blue-300 flex items-center justify-center text-sm font-bold">
              <i data-lucide="${isPdf ? 'file-text' : 'image'}" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-xs font-bold">${cleanFileName}</div>
              <div class="text-[10px] text-slate-300 font-mono">${docType} • Verified Repository File</div>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold uppercase tracking-wider">
            Verified Record
          </span>
        </div>

        <div class="border border-slate-200 rounded-md bg-slate-50 flex flex-col items-center justify-center min-h-[400px] max-h-[600px] overflow-auto text-center relative shadow-inner">
          ${(function() {
            const fileData = localStorage.getItem('CMS_FILE_' + cleanFileName);
            if (fileData) {
              if (fileData.startsWith('data:application/pdf') || cleanFileName.toLowerCase().endsWith('.pdf')) {
                return '<iframe src="' + fileData + '" class="w-full h-[550px] border-0"></iframe>';
              } else {
                return '<img src="' + fileData + '" class="max-w-full max-h-[550px] object-contain" />';
              }
            } else {
              // Dummy visual for mock data
              if (isPdf) {
                return '<div class="p-8"><div class="w-24 h-24 mx-auto bg-slate-100 text-blue-600 rounded-md flex items-center justify-center shadow-sm mb-4 border border-slate-200"><i data-lucide="file-check-2" class="w-12 h-12"></i></div><h4 class="font-bold text-slate-800 text-lg mb-1">' + docType + '</h4><p class="text-slate-500 font-mono text-sm">' + cleanFileName + '</p><div class="mt-6 inline-block text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full font-bold shadow-sm">Verified System Generated Document copy</div></div>';
              } else {
                return '<div class="p-8"><div class="w-24 h-24 mx-auto bg-slate-200 text-slate-400 rounded-md flex items-center justify-center shadow-inner mb-4"><i data-lucide="image" class="w-12 h-12"></i></div><p class="text-slate-500 text-sm italic">Image data not found on local disk.</p></div>';
              }
            }
          })()}
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-200">
          <div class="text-[11px] text-slate-500">
            Audit Trail: Viewed by ${window.CMS_STORE.getCurrentUser().name} (${window.CMS_STORE.getCurrentUser().id})
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition text-xs">
              Close Preview
            </button>
            <button type="button" onclick="CMS_APP.downloadDocument('${cleanFileName}')" class="px-4 py-2 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-md shadow transition text-xs flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Download Copy</span>
            </button>
          </div>
        </div>
      </div>
    `;
    this.openModal(`Viewing Document: ${docType}`, content, 'max-w-2xl');
  },

  promptSanctionApproval({ title, id, entityType, summaryHtml, documents = [], onConfirm }) {
    const isChecker = window.CMS_STORE.isApprover();
    if (!isChecker) {
      this.toast('Only Store In-Charge (Col. Anita Sharma) can sanction approvals.', 'error');
      return;
    }

    const docItems = (documents || []).filter(d => Boolean(d && d.fileName));
    const content = `
      <div class="space-y-4 text-xs">
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 flex items-start gap-2.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"></i>
          <div>
            <strong>User-Admin Statutory Audit & Verification</strong>
            <div class="text-[11px] text-emerald-800 mt-0.5">Carefully review all submitted statutory credentials and documents before final sanction.</div>
          </div>
        </div>

        <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-md">
          ${summaryHtml || `<div class="font-bold text-slate-800">${title} (${id})</div>`}
        </div>

        <!-- Document Inspection Section -->
        <div class="p-3.5 bg-white border border-slate-200 rounded-md space-y-2">
          <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i data-lucide="file-check" class="w-3.5 h-3.5 text-blue-600"></i> Submitted Statutory Documents (${docItems.length})</span>
            <span class="text-[10px] text-slate-400 font-normal">Click eye to inspect</span>
          </div>
          ${docItems.length === 0 ? `
            <div class="text-slate-400 italic text-[11px] py-1">No file uploads attached to this submission.</div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${docItems.map(d => `
                <div class="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded text-[11px]">
                  <div class="truncate mr-2">
                    <span class="font-bold text-slate-700 block truncate">${d.label || 'Document'}</span>
                    <span class="text-slate-400 font-mono text-[10px] truncate block">${d.fileName}</span>
                  </div>
                  <button type="button" onclick="CMS_APP.viewDocument('${d.fileName}', '${d.label || 'Document'}', { id: '${id}', partyName: '${(d.partyName || title).replace(/'/g, "\\'")}' })" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-blue-600 font-bold rounded flex items-center gap-1 shrink-0 transition" title="Inspect Document">
                    <i data-lucide="eye" class="w-3 h-3"></i>
                    <span>Inspect</span>
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Mandatory Final Checkbox -->
        <div class="p-3 bg-amber-50/70 border border-amber-300 rounded-md">
          <label class="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" id="sanction-final-checkbox" onchange="document.getElementById('sanction-confirm-btn').disabled = !this.checked; document.getElementById('sanction-confirm-btn').classList.toggle('opacity-50', !this.checked);" class="mt-0.5 text-emerald-600 focus:ring-emerald-500 rounded" />
            <span class="text-slate-800 font-bold leading-relaxed text-[11px]">
              I confirm that I have verified all uploaded statutory documents, certificates, validity dates, bank remittance details, and commercial terms. Approved for official release.
            </span>
          </label>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition text-xs">
            Cancel
          </button>
          <button type="button" id="sanction-confirm-btn" disabled onclick="CMS_APP.closeModal(); (${onConfirm})();" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow transition text-xs opacity-50 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            <span>Confirm Sanction & Approve</span>
          </button>
        </div>
      </div>
    `;
    this.openModal(`Statutory Sanction: ${title}`, content, 'max-w-xl');
  },

  promptRejection({ title, id, entityType, onReject }) {
    const isChecker = window.CMS_STORE.isApprover();
    if (!isChecker) {
      this.toast('Only Store In-Charge (Col. Anita Sharma) can reject and request revisions.', 'error');
      return;
    }

    const content = `
      <form class="space-y-4 text-xs" onsubmit="event.preventDefault(); const r = document.getElementById('rejection-remark-input').value.trim(); if (!r) { CMS_APP.toast('Please provide a specific mistake or revision instruction.', 'error'); return; } CMS_APP.closeModal(); (${onReject})(r);">
        <div class="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-950 flex items-start gap-2.5">
          <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-600 shrink-0 mt-0.5"></i>
          <div>
            <strong>Return Submission to Operation Manager (Rajesh Kumar)</strong>
            <div class="text-[11px] text-rose-800 mt-0.5">Detail the specific mistake or missing document. This mistake will trigger an Emergency Pop-up on the Executive Dashboard for immediate rectification.</div>
          </div>
        </div>

        <div class="p-4 bg-white border border-slate-200 rounded-md rounded-md font-medium text-slate-800">
          Target Record: <span class="font-bold text-blue-600">${title}</span> <span class="text-slate-500 font-mono">(${id})</span>
        </div>

        <div>
          <label class="block font-bold text-slate-800 mb-1.5">
            Identified Mistake / Reason for Revision *
          </label>
          <textarea id="rejection-remark-input" required rows="3" class="w-full px-3 py-2 border border-rose-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none text-xs" placeholder="e.g. GST Certificate is illegible / Expired ISO certificate / Rate mismatch with quotation copy. Please re-upload verified document."></textarea>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <button type="button" onclick="document.getElementById('rejection-remark-input').value = 'GST certificate copy is missing or unreadable. Please upload clear copy.';" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px]">Missing GST Doc</button>
            <button type="button" onclick="document.getElementById('rejection-remark-input').value = 'Compliance certificate has expired. Please provide latest renewed certificate.';" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px]">Expired Certificate</button>
            <button type="button" onclick="document.getElementById('rejection-remark-input').value = 'Bank details / IFSC code does not match authorized letterhead. Please verify.';" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px]">Bank / IFSC Error</button>
            <button type="button" onclick="document.getElementById('rejection-remark-input').value = 'Commercial quotation rate or validity date expired.';" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px]">Quote Expired</button>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition text-xs">
            Cancel
          </button>
          <button type="submit" class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-md shadow transition text-xs flex items-center gap-1.5">
            <i data-lucide="send" class="w-3.5 h-3.5"></i>
            <span>Revert & Report Mistake to Operation</span>
          </button>
        </div>
      </form>
    `;
    this.openModal(`Return for Revision: ${title}`, content, 'max-w-lg');
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






