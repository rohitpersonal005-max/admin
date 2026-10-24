window.CMS_DASHBOARD = {
  activeFilter: 'all',

  init() {
    this.renderToDOM();
  },

  showEmergencyAlerts(showModal = false) {
    const html = this.getAlertsHtml();
    if (showModal) {
      window.CMS_APP.openModal('Notifications & Emergency Alerts', html || '<div class="p-8 text-center text-slate-500">No active alerts or critical notifications at this time.</div>', 'max-w-3xl');
    }
  },

  getEmergencyAlerts() {
    this.showEmergencyAlerts(false);
  },

  renderToDOM() {
    const root = document.getElementById('view-container') || document.getElementById('app-content');
    if (root) {
      root.innerHTML = this.render();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  openTaskModal(preselectedVendorId = null) {
    const store = window.CMS_STORE;
    const users = (store.data.users || []).filter(u => u.role !== 'Admin');
    const userOptions = users.map(u => `<option value="${u.username || u.name}">${u.name || u.username} (${u.role})</option>`).join('');

    const vendors = store.data.vendors || [];
    const vendorOptions = vendors.map(v => {
      const isSelected = preselectedVendorId && v.id === preselectedVendorId;
      const statusBadge = v.status ? ` • ${v.status}` : '';
      const blockBadge = v.isBlocked ? ' • BLOCKED' : '';
      return `<option value="${v.id}" ${isSelected ? 'selected' : ''}>${v.name} (${v.id}${statusBadge}${blockBadge})</option>`;
    }).join('');

    const content = `
      <form class="space-y-4 text-sm" onsubmit="event.preventDefault(); CMS_DASHBOARD.saveTask();">
        <!-- 1. Task Title (Dropdown with predefined tasks) -->
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Task Title <span class="text-rose-600">*</span></label>
          <select id="task-title-select" required onchange="CMS_DASHBOARD.onTaskTitleChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-xs font-semibold text-slate-800">
            <option value="">-- Select Task Title / Action --</option>
            <option value="Modify Approved Vendor" ${preselectedVendorId ? 'selected' : ''}>Modify Approved Vendor</option>
            <option value="Update Statutory & Regulatory Certificates">Update Statutory & Regulatory Certificates</option>
            <option value="Update Commercial Quotations & Approved Materials">Update Commercial Quotations & Approved Materials</option>
            <option value="Update Banking Details & Financial Coordinates">Update Banking Details & Financial Coordinates</option>
            <option value="Update Organization & Business Address">Update Organization & Business Address</option>
            <option value="Review Vendor Quotation / Document">Review Vendor Quotation / Document</option>
            <option value="Physical Stock Verification">Physical Stock Verification</option>
            <option value="General Operational Task">General Operational Task</option>
            <option value="__custom__">Other / Custom Title...</option>
          </select>
          <div id="task-custom-title-container" class="hidden mt-2">
            <input type="text" id="task-custom-title" class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-xs" placeholder="Enter custom task title..." />
          </div>
        </div>

        <!-- Authorized Phase Selection for Vendor Modification -->
        <div id="task-phase-container" class="${preselectedVendorId ? '' : 'hidden'} p-3.5 bg-blue-50/70 border border-blue-200 rounded text-xs space-y-2.5">
          <div class="flex items-center gap-1.5 font-bold text-blue-900">
            <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
            <span>Select Form Phase(s) to Authorize for Modification <span class="text-rose-600">*</span></span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <label class="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded cursor-pointer hover:bg-slate-50 text-xs">
              <input type="checkbox" id="task-phase-1" class="rounded text-blue-600 cursor-pointer" />
              <span><strong>Phase 1:</strong> Organization & Address</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded cursor-pointer hover:bg-slate-50 text-xs">
              <input type="checkbox" id="task-phase-2" checked class="rounded text-blue-600 cursor-pointer" />
              <span><strong>Phase 2:</strong> Statutory & Certificates</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded cursor-pointer hover:bg-slate-50 text-xs">
              <input type="checkbox" id="task-phase-3" class="rounded text-blue-600 cursor-pointer" />
              <span><strong>Phase 3:</strong> Quotation & Materials</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded cursor-pointer hover:bg-slate-50 text-xs">
              <input type="checkbox" id="task-phase-4" class="rounded text-blue-600 cursor-pointer" />
              <span><strong>Phase 4:</strong> Bank Details</span>
            </label>
          </div>
        </div>

        <!-- 2. Notes / Initial Message (then ask notes) -->
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Notes / Initial Message <span class="text-rose-600">*</span></label>
          <textarea id="task-message" required rows="3" class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-xs" placeholder="Describe what needs to be done / notes for user..."></textarea>
        </div>

        <!-- 3. Select Vendor (then select vendor) -->
        <div id="task-vendor-container">
          <label class="block font-bold text-slate-700 mb-1 text-xs">Select Vendor <span id="task-vendor-star" class="text-rose-600">*</span></label>
          <select id="task-vendor-select" onchange="CMS_DASHBOARD.onTaskVendorSelect(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-xs font-semibold text-slate-800">
            <option value="">-- Select Vendor --</option>
            ${vendorOptions}
          </select>
          <div id="task-vendor-info" class="text-[11px] text-slate-600 mt-1 hidden"></div>
        </div>

        <!-- 4. Assign User (then assign user for which will modify the vendor) -->
        <div>
          <label class="block font-bold text-slate-700 mb-1 text-xs">Assign User to Modify / Execute <span class="text-rose-600">*</span></label>
          <select id="task-assign" required class="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-xs font-semibold text-slate-800">
            <option value="">-- Select User --</option>
            ${userOptions}
          </select>
        </div>

        <!-- 5. Submit Button -->
        <div class="flex justify-end pt-4 border-t border-slate-200">
          <button type="submit" class="px-6 py-2.5 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow transition cursor-pointer flex items-center gap-1.5">
            <span>Add task</span>
          </button>
        </div>
      </form>
    `;
    window.CMS_APP.openModal('Add New Task', content, 'max-w-lg');
    if (preselectedVendorId) {
      setTimeout(() => {
        CMS_DASHBOARD.onTaskTitleChange('Modify Approved Vendor');
        CMS_DASHBOARD.onTaskVendorSelect(preselectedVendorId);
      }, 50);
    }
  },

  onTaskTitleChange(title) {
    const customContainer = document.getElementById('task-custom-title-container');
    if (customContainer) {
      customContainer.classList.toggle('hidden', title !== '__custom__');
      const customInput = document.getElementById('task-custom-title');
      if (customInput) customInput.required = (title === '__custom__');
    }

    const phaseContainer = document.getElementById('task-phase-container');
    const vendorStar = document.getElementById('task-vendor-star');
    const p1 = document.getElementById('task-phase-1');
    const p2 = document.getElementById('task-phase-2');
    const p3 = document.getElementById('task-phase-3');
    const p4 = document.getElementById('task-phase-4');

    const vendorTasks = [
      'Modify Approved Vendor',
      'Update Statutory & Regulatory Certificates',
      'Update Commercial Quotations & Approved Materials',
      'Update Banking Details & Financial Coordinates',
      'Update Organization & Business Address'
    ];

    const isVendorTask = vendorTasks.includes(title);

    if (phaseContainer) {
      phaseContainer.classList.toggle('hidden', !isVendorTask);
    }
    if (vendorStar) {
      vendorStar.classList.toggle('hidden', !isVendorTask);
    }

    if (isVendorTask && p1 && p2 && p3 && p4) {
      if (title === 'Update Statutory & Regulatory Certificates') {
        p1.checked = false; p2.checked = true; p3.checked = false; p4.checked = false;
      } else if (title === 'Update Commercial Quotations & Approved Materials') {
        p1.checked = false; p2.checked = false; p3.checked = true; p4.checked = false;
      } else if (title === 'Update Banking Details & Financial Coordinates') {
        p1.checked = false; p2.checked = false; p3.checked = false; p4.checked = true;
      } else if (title === 'Update Organization & Business Address') {
        p1.checked = true; p2.checked = false; p3.checked = false; p4.checked = false;
      } else if (title === 'Modify Approved Vendor') {
        if (!p1.checked && !p2.checked && !p3.checked && !p4.checked) {
          p2.checked = true;
        }
      }
    }
    if (window.lucide) window.lucide.createIcons();
  },

  onTaskVendorSelect(vendorId) {
    const infoEl = document.getElementById('task-vendor-info');
    if (!infoEl) return;
    if (!vendorId) {
      infoEl.innerHTML = '';
      infoEl.classList.add('hidden');
      return;
    }
    const store = window.CMS_STORE;
    const vendor = (store.data.vendors || []).find(v => v.id === vendorId);
    if (!vendor) return;

    let html = `<div class="p-2 bg-slate-100 rounded border border-slate-200">`;
    html += `<div><strong>Vendor:</strong> ${vendor.name} (${vendor.id})</div>`;
    html += `<div class="text-[10px] text-slate-500 font-mono">GST: ${vendor.gstNo || 'Exempt'} | State: ${vendor.addressState || '-'} | Status: <strong>${vendor.status}</strong></div>`;
    if (vendor.isBlocked) {
      html += `<div class="text-rose-600 font-bold mt-1 flex items-center gap-1"><i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Vendor on Compliance Hold (Blocked). Assigning user will unlock authorized phase to upload renewals.</div>`;
    }
    if (vendor.pendingModificationTaskId) {
      html += `<div class="text-blue-700 font-bold mt-0.5">Note: This vendor already has an active modification task (${vendor.pendingModificationTaskId}).</div>`;
    }
    html += `</div>`;
    infoEl.innerHTML = html;
    infoEl.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  saveTask() {
    const titleSelect = document.getElementById('task-title-select')?.value || '';
    let title = titleSelect;
    if (titleSelect === '__custom__') {
      title = document.getElementById('task-custom-title')?.value.trim() || '';
      if (!title) {
        window.CMS_APP.toast('Please enter a custom task title.', 'error');
        return;
      }
    } else if (!title) {
      window.CMS_APP.toast('Please select a task title.', 'error');
      return;
    }

    const message = document.getElementById('task-message')?.value.trim() || '';
    if (!message) {
      window.CMS_APP.toast('Please enter notes or instructions in the initial message.', 'error');
      return;
    }

    const vendorId = document.getElementById('task-vendor-select')?.value || '';
    const assignedTo = document.getElementById('task-assign')?.value || '';
    if (!assignedTo) {
      window.CMS_APP.toast('Please select a user to assign this task.', 'error');
      return;
    }

    const vendorTasks = [
      'Modify Approved Vendor',
      'Update Statutory & Regulatory Certificates',
      'Update Commercial Quotations & Approved Materials',
      'Update Banking Details & Financial Coordinates',
      'Update Organization & Business Address'
    ];
    const isVendorTask = vendorTasks.includes(titleSelect) || Boolean(vendorId);

    const phases = [];
    if (isVendorTask) {
      if (!vendorId) {
        window.CMS_APP.toast('Please select a vendor for this modification task.', 'error');
        return;
      }
      if (document.getElementById('task-phase-1')?.checked) phases.push(1);
      if (document.getElementById('task-phase-2')?.checked) phases.push(2);
      if (document.getElementById('task-phase-3')?.checked) phases.push(3);
      if (document.getElementById('task-phase-4')?.checked) phases.push(4);
      if (phases.length === 0) {
        window.CMS_APP.toast('Please select at least one phase to authorize for user modification.', 'error');
        return;
      }
    }

    const store = window.CMS_STORE;
    const vendor = (store.data.vendors || []).find(v => v.id === vendorId);
    const currentUser = store.getCurrentUser() || {};
    const creatorName = currentUser.name || currentUser.username || 'Admin';

    const taskId = 'task_' + Date.now();
    const task = {
      id: taskId,
      title: title,
      taskType: isVendorTask ? 'modify_vendor' : 'general',
      targetVendorId: vendorId || null,
      vendorId: vendorId || null,
      targetVendorName: vendor ? vendor.name : '',
      authorizedPhases: phases,
      allowedPhases: phases,
      assignedTo: assignedTo,
      assignedBy: creatorName,
      createdAt: new Date().toISOString(),
      status: 'Open',
      notes: message,
      chat: [
        {
          sender: creatorName,
          text: message + (isVendorTask && phases.length ? `\n\n[Authorized Phase(s): ${phases.map(p => 'Phase ' + p).join(', ')}]` : ''),
          timestamp: new Date().toISOString()
        }
      ]
    };

    if (vendor && isVendorTask) {
      vendor.pendingModificationTaskId = taskId;
      vendor.authorizedPhases = phases;
      vendor.assignedTaskUser = assignedTo;
    }

    if (!store.data.adminTasks) store.data.adminTasks = [];
    store.data.adminTasks.unshift(task);
    store.save();

    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Task created and assigned to ${assignedTo}.`, 'success');
    this.renderToDOM();
  },

  deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      const task = (window.CMS_STORE.data.adminTasks || []).find(t => t.id === taskId);
      if (task && (task.targetVendorId || task.vendorId)) {
        const vId = task.targetVendorId || task.vendorId;
        const v = (window.CMS_STORE.data.vendors || []).find(item => item.id === vId);
        if (v && v.pendingModificationTaskId === taskId) {
          v.pendingModificationTaskId = null;
        }
      }
      window.CMS_STORE.data.adminTasks = (window.CMS_STORE.data.adminTasks || []).filter(t => t.id !== taskId);
      window.CMS_STORE.save();
      window.CMS_APP.toast('Task deleted.', 'info');
      this.renderToDOM();
    }
  },

  addChatMessage(taskId) {
    const input = document.getElementById('chat-input-' + taskId);
    if (!input || !input.value.trim()) return;

    const task = (window.CMS_STORE.data.adminTasks || []).find(t => t.id === taskId);
    if (!task) return;

    if (!task.chat) task.chat = [];
    
    // Convert old "message" to chat history if migrating old tasks
    if (task.message && task.chat.length === 0) {
       task.chat.push({ sender: 'Admin', text: task.message, timestamp: task.createdAt });
    }

    task.chat.push({
      sender: window.CMS_STORE.getCurrentUser().username,
      text: input.value.trim(),
      timestamp: new Date().toISOString()
    });

    // Automatically reopen task if an admin messages a resolved task, or if user messages it.
    if (task.status === 'Resolved') task.status = 'Open';

    window.CMS_STORE.save();
    this.renderToDOM();
  },

  resolveTask(taskId) {
    const task = (window.CMS_STORE.data.adminTasks || []).find(t => t.id === taskId);
    if (task) {
      task.status = 'Resolved';
      if (task.targetVendorId || task.vendorId) {
        const vId = task.targetVendorId || task.vendorId;
        const v = (window.CMS_STORE.data.vendors || []).find(item => item.id === vId);
        if (v && v.pendingModificationTaskId === taskId) {
          v.pendingModificationTaskId = null;
        }
      }
      window.CMS_STORE.save();
      window.CMS_APP.toast('Task marked as resolved.', 'success');
      this.renderToDOM();
    }
  },

  handleChatEnter(e, taskId) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.addChatMessage(taskId);
    }
  },

  
  formatDateStr(isoDate) {
    if (!isoDate) return 'N/A';
    try {
      const parts = isoDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    } catch(e) {}
    return isoDate;
  },

  getDaysDiff(targetIsoDate, todayIso) {
    if (!targetIsoDate) return 0;
    try {
      const d1 = new Date(targetIsoDate + 'T00:00:00');
      const d2 = new Date(todayIso + 'T00:00:00');
      const diffTime = d1.getTime() - d2.getTime();
      return Math.round(diffTime / (1000 * 60 * 60 * 24));
    } catch(e) {
      return 0;
    }
  },

  getAlertsHtml() {
    const store = window.CMS_STORE.data;
    const today = new Date().toISOString().split('T')[0];
    const alerts = [];

    // 1. Low Stock Alerts
    (store.consumables || []).forEach(item => {
      const stock = window.CMS_STORE.getStock(item.id);
      const buffer = Number(item.bufferStock || 0);
      if (stock <= buffer) {
        alerts.push({
          type: stock === 0 ? 'critical' : 'warning',
          title: 'Stock Alert: ' + item.materialName,
          message: stock === 0 ? 'Item is out of stock!' : `Low stock (${stock} ${item.unit}). Buffer is ${buffer}.`,
          icon: 'package-minus'
        });
      }
    });

    // 2. Vendor Pending Approvals
    (store.vendors || []).forEach(v => {
      if (v.status === 'Pending') {
        alerts.push({
          type: 'info',
          title: 'Pending Vendor Approval',
          message: `Vendor '${v.name}' is waiting for approval.`,
          icon: 'clock'
        });
      }

      const notifSettings = window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings() : { minAlertDays: 15, gmailConnected: false, emailSystemConnected: false };
      const isEmailSystemConnected = Boolean(notifSettings.emailSystemConnected ?? notifSettings.gmailConnected);

      // Check Expiries (Certificates)
      if (v.status === 'Approved' && Array.isArray(v.certificates)) {
        v.certificates.forEach(cert => {
          const expIso = cert.validTill || '';
          const diffDays = expIso ? this.getDaysDiff(expIso, today) : 0;
          const effectiveAlertDays = Math.max(cert.alertDays || 15, notifSettings.minAlertDays || 15);
          const isAlertDue = (cert.alertDate && cert.alertDate <= today) || (expIso && diffDays <= effectiveAlertDays);

          if (isAlertDue) {
            const isExpired = diffDays < 0;
            const isToday = diffDays === 0;
            const expFormatted = this.formatDateStr(expIso);
            const certName = cert.regulator || cert.documentName || cert.name || 'Statutory/Regulatory Certificate';
            const alertDaysNote = cert.alertDays ? ` (${cert.alertDays}d fixed alert lead time)` : '';
            const sendMailEnabled = cert.sendEmailNotification !== false;

            let timeText = '';
            if (isExpired) {
              timeText = `Expired on ${expFormatted} (${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago)`;
            } else if (isToday) {
              timeText = `Expires TODAY (${expFormatted})`;
            } else {
              timeText = `Expires in ${diffDays} day${diffDays === 1 ? '' : 's'} on ${expFormatted}`;
            }

            const actionHtml = sendMailEnabled ? (isEmailSystemConnected ? `
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded">
                  <i data-lucide="mail-check" class="w-3 h-3 text-emerald-700"></i> Vendor Email: Enabled
                </span>
                <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${cert.certificateNo || cert.name}', 'certificate');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition shadow-xs cursor-pointer">
                  <i data-lucide="send" class="w-3 h-3"></i> Send Reminder mail to Vendor
                </button>
                ${role === 'Admin' ? `
                  <button type="button" onclick="CMS_APP.closeModal(); CMS_MASTERS.openRaiseTaskModal('${v.id}');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition shadow-2xs cursor-pointer">
                    <i data-lucide="clipboard-check" class="w-3 h-3 text-blue-600"></i> Raise Task to User
                  </button>
                ` : ''}
                ${role === 'Admin' && (v.isBlocked || v.status === 'Blocked') ? `
                  <button type="button" onclick="CMS_MASTERS.adminUnblockVendor('${v.id}');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded transition shadow-2xs cursor-pointer">
                    <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i> Change Status to Unblock
                  </button>
                ` : ''}
              </div>
            ` : `
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  <i data-lucide="shield-alert" class="w-3 h-3 text-slate-500"></i> Email Sending System Disconnected
                </span>
                <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${cert.certificateNo || cert.name}', 'certificate');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition shadow-2xs cursor-pointer">
                  <i data-lucide="eye" class="w-3 h-3"></i> View Draft
                </button>
              </div>
            `) : `
              <div class="mt-1.5">
                <span class="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Vendor Email Notice: Disabled in Setup
                </span>
              </div>
            `;

            alerts.push({
              type: isExpired || isToday ? 'critical' : 'warning',
              title: `Certificate ${isExpired ? 'Expired' : 'Expiring Soon'}: ${certName}`,
              message: `Vendor: <strong>${v.name}</strong> • ${timeText}${alertDaysNote}.`,
              icon: isExpired ? 'file-x' : 'file-warning',
              actionHtml
            });
          }
        });
      }
      
      // Check Expiries (Quotations)
      if (v.status === 'Approved' && Array.isArray(v.quotedItems)) {
        v.quotedItems.forEach(q => {
          const expIso = q.validTill || q.quotationValidTill || '';
          const diffDays = expIso ? this.getDaysDiff(expIso, today) : 0;
          const effectiveAlertDays = Math.max(q.alertDays || 15, notifSettings.minAlertDays || 15);
          const isAlertDue = (q.alertDate && q.alertDate <= today) || (expIso && diffDays <= effectiveAlertDays);

          if (isAlertDue) {
            const isExpired = diffDays < 0;
            const isToday = diffDays === 0;
            const expFormatted = this.formatDateStr(expIso);
            const qRef = q.quotationNo ? `Ref ${q.quotationNo}` : (q.materialName ? `for ${q.materialName}` : 'Quotation');
            const alertDaysNote = q.alertDays ? ` (${q.alertDays}d fixed alert lead time)` : '';
            const sendMailEnabled = q.sendEmailNotification !== false;

            let timeText = '';
            if (isExpired) {
              timeText = `Expired on ${expFormatted} (${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago)`;
            } else if (isToday) {
              timeText = `Expires TODAY (${expFormatted})`;
            } else {
              timeText = `Expires in ${diffDays} day${diffDays === 1 ? '' : 's'} on ${expFormatted}`;
            }

            const actionHtml = sendMailEnabled ? (isEmailSystemConnected ? `
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded">
                  <i data-lucide="mail-check" class="w-3 h-3 text-emerald-700"></i> Vendor Email: Enabled
                </span>
                <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${q.quotationNo || q.materialName}', 'quotation');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition shadow-xs cursor-pointer">
                  <i data-lucide="send" class="w-3 h-3"></i> Send Reminder mail to Vendor
                </button>
                ${role === 'Admin' ? `
                  <button type="button" onclick="CMS_APP.closeModal(); CMS_MASTERS.openRaiseTaskModal('${v.id}');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition shadow-2xs cursor-pointer">
                    <i data-lucide="clipboard-check" class="w-3 h-3 text-blue-600"></i> Raise Task to User
                  </button>
                ` : ''}
              </div>
            ` : `
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  <i data-lucide="shield-alert" class="w-3 h-3 text-slate-500"></i> Email Sending System Disconnected
                </span>
                <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${q.quotationNo || q.materialName}', 'quotation');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition shadow-2xs cursor-pointer">
                  <i data-lucide="eye" class="w-3 h-3"></i> View Draft
                </button>
              </div>
            `) : `
              <div class="mt-1.5">
                <span class="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Vendor Email Notice: Disabled in Setup
                </span>
              </div>
            `;

            alerts.push({
              type: isExpired || isToday ? 'critical' : 'warning',
              title: `Commercial Quotation ${isExpired ? 'Expired' : 'Expiring Soon'}: ${qRef}`,
              message: `Vendor: <strong>${v.name}</strong> • ${timeText}${alertDaysNote}.`,
              icon: isExpired ? 'alert-octagon' : 'file-warning',
              actionHtml
            });
          }
        });
      }
      
      // Limited Period Approval
      if (v.status === 'Approved' && v.approvedForLimitedPeriod) {
        const expIso = v.approvalValidTill || '';
        const diffDays = expIso ? this.getDaysDiff(expIso, today) : 0;
        const effectiveAlertDays = Math.max(v.approvalAlertDays || 15, notifSettings.minAlertDays || 15);
        const isAlertDue = (v.approvalAlertDate && v.approvalAlertDate <= today) || (expIso && diffDays <= effectiveAlertDays);

        if (isAlertDue) {
          const isExpired = diffDays < 0;
          const isToday = diffDays === 0;
          const expFormatted = this.formatDateStr(expIso);
          const alertDaysNote = v.approvalAlertDays ? ` (${v.approvalAlertDays}d fixed alert lead time)` : '';
          const sendMailEnabled = v.approvalSendEmailNotification !== false;

          let timeText = '';
          if (isExpired) {
            timeText = `Expired on ${expFormatted} (${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago)`;
          } else if (isToday) {
            timeText = `Expires TODAY (${expFormatted})`;
          } else {
            timeText = `Expires in ${diffDays} day${diffDays === 1 ? '' : 's'} on ${expFormatted}`;
          }

          const actionHtml = sendMailEnabled ? (isEmailSystemConnected ? `
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded">
                <i data-lucide="mail-check" class="w-3 h-3 text-emerald-700"></i> Vendor Email: Enabled
              </span>
              <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${v.id}', 'approval');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition shadow-xs cursor-pointer">
                <i data-lucide="send" class="w-3 h-3"></i> Send Reminder mail to Vendor
              </button>
              ${role === 'Admin' ? `
                <button type="button" onclick="CMS_APP.closeModal(); CMS_MASTERS.openRaiseTaskModal('${v.id}');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition shadow-2xs cursor-pointer">
                  <i data-lucide="clipboard-check" class="w-3 h-3 text-blue-600"></i> Raise Task to User
                </button>
              ` : ''}
            </div>
          ` : `
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                <i data-lucide="shield-alert" class="w-3 h-3 text-slate-500"></i> Email Sending System Disconnected
              </span>
              <button type="button" onclick="CMS_APP.closeModal(); CMS_NOTIFICATIONS.openEmailComposer('${v.id}', '${v.id}', 'approval');" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition shadow-2xs cursor-pointer">
                <i data-lucide="eye" class="w-3 h-3"></i> View Draft
              </button>
            </div>
          `) : `
            <div class="mt-1.5">
              <span class="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Vendor Email Notice: Disabled in Setup
              </span>
            </div>
          `;

          alerts.push({
            type: isExpired || isToday ? 'critical' : 'warning',
            title: `Vendor Approval ${isExpired ? 'Expired' : 'Expiring Soon'}`,
            message: `Vendor: <strong>${v.name}</strong> • Limited period approval ${timeText}${alertDaysNote}.`,
            icon: 'shield-alert',
            actionHtml
          });
        }
      }
    });

    const bellInd = document.getElementById('bell-indicator');
    if (bellInd) {
      bellInd.style.display = alerts.length > 0 ? 'block' : 'none';
    }

    if (alerts.length === 0) return '';

    const alertHtml = alerts.map(a => {
      let colors = 'bg-blue-50 border-blue-200 text-blue-800';
      let iconColor = 'text-blue-500';
      if (a.type === 'critical') {
        colors = 'bg-rose-50 border-rose-200 text-rose-800';
        iconColor = 'text-rose-500';
      } else if (a.type === 'warning') {
        colors = 'bg-amber-50 border-amber-200 text-amber-800';
        iconColor = 'text-amber-500';
      }
      return `
        <div class="flex items-start gap-3 p-3 ${colors} border rounded-md shadow-sm">
          <i data-lucide="${a.icon}" class="w-5 h-5 shrink-0 ${iconColor} mt-0.5"></i>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold">${a.title}</h4>
            <p class="text-xs mt-0.5 opacity-90">${a.message}</p>
            ${a.actionHtml || ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="mt-12 mb-8">
        <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <i data-lucide="bell-ring" class="w-5 h-5 text-amber-500"></i>
          Notifications & Alerts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${alertHtml}
        </div>
      </div>
    `;
  },

  render() {
    const store = window.CMS_STORE;
    const currentUser = store.getCurrentUser();
    const role = currentUser ? currentUser.role : '';
    const username = currentUser ? (currentUser.username || currentUser.name || '') : '';

    const allTasks = store.data.adminTasks || [];
    
    // Filter tasks based on role. Admins see all tasks. Users see tasks assigned to them.
    const myTasks = role === 'Admin' ? allTasks : allTasks.filter(t => t.assignedTo === username);

    const taskCards = myTasks.map(task => {
      // Migrate old tasks on the fly for rendering
      let chatHistory = task.chat || [];
      if (chatHistory.length === 0 && task.message) {
         chatHistory = [{ sender: 'Admin', text: task.message, timestamp: task.createdAt }];
      }

      const chatHtml = chatHistory.map(msg => {
        const isMe = msg.sender === username;
        return `
          <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-3">
            <div class="px-3 py-2 rounded-lg text-sm max-w-[85%] ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}">
              <div class="whitespace-pre-wrap">${msg.text}</div>
            </div>
            <div class="text-[10px] text-slate-400 mt-1 px-1">
              ${msg.sender} • ${window.CMS_STORE.formatDate(msg.timestamp)}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="bg-slate-50 border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col mb-4">
          <!-- Header -->
          <div class="px-4 py-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="px-2 py-0.5 rounded ${task.status === 'Resolved' || task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : task.status === 'Submitted for Approval' ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-amber-100 text-amber-900 border-amber-300'} border text-[10px] font-bold font-mono uppercase tracking-wide">
                  ${task.status}
                </span>
                <span class="text-[11px] text-slate-500 font-mono">Assigned to: <strong class="text-slate-800">${task.assignedTo}</strong></span>
                ${task.targetVendorId || task.vendorId ? `
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
                    <i data-lucide="building-2" class="w-3 h-3 text-blue-600"></i>
                    Vendor: ${task.targetVendorName || task.targetVendorId || task.vendorId}
                  </span>
                  ${task.authorizedPhases && task.authorizedPhases.length ? `
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                      <i data-lucide="lock" class="w-2.5 h-2.5 text-amber-600"></i>
                      Authorized: ${task.authorizedPhases.map(p => 'Phase ' + p).join(', ')}
                    </span>
                  ` : ''}
                ` : ''}
              </div>
              <h3 class="font-bold text-slate-900 text-base">${task.title}</h3>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              ${(task.targetVendorId || task.vendorId) && (task.status === 'Open' || task.status === 'In Progress' || task.status === 'Pending') ? (role !== 'Admin' ? `
                <button onclick="CMS_MASTERS.openVendorModal('${task.targetVendorId || task.vendorId}', '${task.id}')" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow transition flex items-center gap-1.5 cursor-pointer" title="Open vendor form with authorized phase editable">
                  <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                  <span>Modify Vendor Form</span>
                </button>
              ` : `
                <button onclick="CMS_MASTERS.viewVendorProfile('${task.targetVendorId || task.vendorId}')" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition flex items-center gap-1.5 cursor-pointer" title="Inspect vendor profile">
                  <i data-lucide="eye" class="w-3.5 h-3.5 text-slate-600"></i>
                  <span>Inspect Vendor</span>
                </button>
              `) : ''}
              ${(task.targetVendorId || task.vendorId) && task.status === 'Submitted for Approval' && role === 'Admin' ? `
                <button onclick="CMS_MASTERS.viewVendorProfile('${task.targetVendorId || task.vendorId}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition flex items-center gap-1.5 cursor-pointer" title="Review submitted changes and sanction vendor">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                  <span>Review & Sanction</span>
                </button>
              ` : (task.targetVendorId || task.vendorId) && task.status === 'Submitted for Approval' ? `
                <span class="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded flex items-center gap-1">
                  <i data-lucide="clock" class="w-3 h-3 text-amber-600"></i>
                  Awaiting Admin Approval
                </span>
              ` : ''}
              ${task.status !== 'Resolved' && task.status !== 'Completed' ? `<button onclick="CMS_DASHBOARD.resolveTask('${task.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition">Mark Resolved</button>` : ''}
              ${role === 'Admin' ? `<button onclick="CMS_DASHBOARD.deleteTask('${task.id}')" class="px-2 py-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition border border-transparent hover:border-rose-200" title="Delete Task"><i data-lucide="trash-2" class="w-4 h-4"></i></button>` : ''}
            </div>
          </div>

          <!-- Chat History -->
          <div class="p-4 overflow-y-auto max-h-96 flex-1 flex flex-col-reverse">
            <div class="flex flex-col justify-end">
              ${chatHtml}
            </div>
          </div>

          <!-- Chat Input Bar -->
          <div class="px-4 py-3 bg-white border-t border-slate-200 flex items-end gap-2">
            <textarea id="chat-input-${task.id}" onkeydown="CMS_DASHBOARD.handleChatEnter(event, '${task.id}')" rows="1" class="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-sm resize-none" placeholder="Type your message... (Press Enter to send)"></textarea>
            <button onclick="CMS_DASHBOARD.addChatMessage('${task.id}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow transition shrink-0 flex items-center gap-1.5">
              <span>Send</span>
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="max-w-4xl mx-auto py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Task Manager</h1>
            <p class="text-sm text-slate-500 mt-1">Communicate and manage tasks.</p>
          </div>
          ${role === 'Admin' ? `<button onclick="CMS_DASHBOARD.openTaskModal()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-md transition flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> Add task</button>` : ''}
        </div>

        <div class="space-y-6">
          ${taskCards.length > 0 ? taskCards : `
            <div class="p-12 text-center text-slate-400 bg-white border border-dashed border-slate-300 rounded-lg">
              <i data-lucide="inbox" class="w-8 h-8 mx-auto text-slate-300 mb-3"></i>
              <div class="text-base font-semibold text-slate-600">No active tasks</div>
              <p class="text-sm text-slate-400 mt-1">You're all caught up.</p>
            </div>
          `}
        
        </div>
        ${this.getAlertsHtml()}
      </div>
    `;
  }
};
