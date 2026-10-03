const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startHeader = '<header class="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 \nno-print">';
const endHeader = '</header>';

// Standardize the search since line endings might differ
const startIdx = html.indexOf('<header class="bg-white border-b border-slate-200');
const endIdx = html.indexOf('</header>', startIdx) + '</header>'.length;

const newHeader = `
        <!-- Top Header -->
        <header class="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 no-print">
          <div class="flex items-center gap-4">
            <button onclick="CMS_APP.toggleMobileSidebar()" class="md:hidden p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100">
              <i data-lucide="menu" class="w-5 h-5"></i>
            </button>
            <div class="hidden sm:flex items-center gap-2 text-xs">
              <span id="header-breadcrumb" class="text-slate-500 flex items-center gap-1.5">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] uppercase">Dashboard</span>
                <span class="font-semibold text-slate-800">Executive Cockpit</span>
              </span>
            </div>
            <!-- Sleek Search Bar -->
            <div class="hidden md:flex relative ml-4">
              <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"></i>
              <input type="text" placeholder="Search orders, clients, POs..." class="w-72 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-sm pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition" />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <span class="text-[9px] font-mono font-bold bg-white border border-slate-200 text-slate-400 px-1 rounded shadow-sm">Ctrl</span>
                <span class="text-[9px] font-mono font-bold bg-white border border-slate-200 text-slate-400 px-1 rounded shadow-sm">K</span>
              </div>
            </div>
          </div>
  
          <div class="flex items-center gap-3.5">
            <!-- Professional Icons -->
            <button class="text-slate-400 hover:text-slate-700 transition relative">
              <i data-lucide="help-circle" class="w-4 h-4"></i>
            </button>
            <button class="text-slate-400 hover:text-slate-700 transition relative">
              <i data-lucide="bell" class="w-4 h-4"></i>
              <span class="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <button class="text-slate-400 hover:text-slate-700 transition relative mr-2">
              <i data-lucide="settings" class="w-4 h-4"></i>
            </button>

            <!-- Pending Approvals Quick Pill -->
            <a href="#pending-approvals" id="header-pending-badge" class="hidden px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 font-semibold text-[11px] rounded-sm hover:bg-amber-100 transition flex items-center gap-1.5">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-700"></i>
              <span id="header-pending-badge-text">0 Pending</span>
            </a>
  
            <!-- User Profile Avatar & Dropdown -->
            <div class="relative flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-4" onclick="CMS_APP.toggleUserDropdown()" id="user-profile-trigger">
              <div id="header-avatar" class="w-7 h-7 rounded-sm bg-slate-800 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                RK
              </div>
              <div class="hidden sm:block pr-1">
                <div class="text-xs font-bold text-slate-800 leading-tight">Admin User</div>
                <div class="text-[9px] text-slate-500 font-medium">Chief Operations</div>
              </div>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>

              <!-- User Profile Dropdown -->
              <div id="user-dropdown-menu" class="hidden absolute right-0 top-full mt-3 w-72 bg-white rounded-md border border-slate-200 shadow-xl z-50 p-3 text-xs divide-y divide-slate-100">
                <div class="p-3 bg-slate-50 rounded-sm mb-2 border border-slate-100">
                  <div class="flex items-center gap-2.5 mb-2">
                    <div id="dropdown-user-avatar" class="w-9 h-9 rounded-sm bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      RK
                    </div>
                    <div class="min-w-0">
                      <div class="font-bold text-slate-900 text-sm truncate" id="dropdown-user-name">Rajesh Kumar</div>
                      <div class="text-[10px] text-slate-400 font-mono" id="dropdown-user-id">EMP-2041</div>
                    </div>
                  </div>
                  <div class="text-[11px] text-slate-500 mb-2" id="dropdown-user-dept">Central Warehouse & Logistics</div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider bg-slate-200 text-slate-800 border border-slate-300" id="dropdown-user-role-badge">Store Staff (User)</span>
                  </div>
                  <button type="button" onclick="CMS_APP.viewMyProfile()" class="mt-2.5 w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition text-[11px]">
                    <i data-lucide="user" class="w-3 h-3 text-slate-500"></i>
                    <span>View My Profile</span>
                  </button>
                </div>
                <button type="button" onclick="CMS_APP.viewCompanyProfile()" class="w-full flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition font-medium mt-1">
                  <i data-lucide="building-2" class="w-4 h-4 text-slate-500"></i>
                  Company Profile & Docs
                </button>
                <button type="button" onclick="CMS_AUTH.logout()" class="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-sm bg-slate-900 text-white hover:bg-slate-700 transition font-semibold">
                  <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>`;

if(startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newHeader + html.substring(endIdx);
}

// Global UI sharp edges: replace 'rounded-md' with 'rounded-sm', 'rounded-xl' with 'rounded-md'
html = html.replace(/rounded-md/g, 'rounded-sm');
html = html.replace(/rounded-xl/g, 'rounded-md');

html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());
fs.writeFileSync('index.html', html);
