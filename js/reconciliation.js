/**
 * Consumable Management System - Stock Verification / Reconciliation Module (Page 13)
 * Generates category-wise physical audit sheets, tracks variance between physical count
 * and system quantity, captures variance explanations, and calibrates stock on approval.
 */

window.CMS_RECONCILIATION = {
  renderReconciliation() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.reconciliations || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
               Stock Verification & Reconciliation
            </h2>
            <p class="text-sm text-slate-500">Perform periodic physical stock counts, calculate variance against system balances, and calibrate inventory upon approval.</p>
          </div>
          <button onclick="CMS_RECONCILIATION.openNewReconModal()" class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition text-sm">
             Start New Physical Audit
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-sm">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th class="p-4">Reconciliation No.</th>
                <th class="p-4">Audit Date</th>
                <th class="p-4">Category Audited</th>
                <th class="p-4 text-center">Items Audited</th>
                <th class="p-4">Discrepancy Summary</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-8 text-center text-slate-400">No stock reconciliation audits conducted yet.</td></tr>
              ` : list.map(rec => {
                const totalItems = (rec.items || []).length;
                const discItems = (rec.items || []).filter(i => i.variance !== 0).length;
                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4 font-mono font-bold text-purple-900 text-xs">${rec.reconciliationNo}</td>
                    <td class="p-4 text-slate-700 text-xs">${rec.reconciliationDate}</td>
                    <td class="p-4 font-semibold text-slate-900">${rec.categoryName}</td>
                    <td class="p-4 text-center font-mono font-bold text-slate-800">${totalItems} Items</td>
                    <td class="p-4">
                      ${discItems > 0 ? `
                        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                           ${discItems} Variance Found
                        </span>
                      ` : `
                        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          100% Match
                        </span>
                      `}
                    </td>
                    <td class="p-4">
                      <span class="badge ${rec.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${rec.status}</span>
                    </td>
                    <td class="p-4 text-right space-x-1">
                      <button onclick="CMS_PRINT.printReconciliationSheet(${JSON.stringify(rec).replace(/"/g, '&quot;')})" class="px-2.5 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition" title="Print Audit Sheet">
                        Print Audit Sheet
                      </button>
                      ${rec.status === 'Pending Approval' && role === 'Checker' ? `
                        <button onclick="CMS_RECONCILIATION.approveReconciliation('${rec.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded transition">
                          Approve
                        </button>
                      ` : ''}
                      <button onclick="CMS_RECONCILIATION.deleteReconciliation('${rec.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openNewReconModal() {
    const store = window.CMS_STORE.data;
    const categories = store.categories || [];

    const content = `
      <div class="space-y-4 text-sm">
        <div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900 font-medium">
          <strong>Step 1:</strong> Select the audit date and consumable category, then click <strong>"Generate Reconciliation Form"</strong> to pull live system stock balances.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Select Reconciliation Date *</label>
            <input type="date" id="rec-date" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Select Material Category *</label>
            <select id="rec-cat" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="">-- Choose Category to Audit --</option>
              <option value="ALL">-- Audit All Categories --</option>
              ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="flex justify-center py-2">
          <button type="button" onclick="CMS_RECONCILIATION.generateForm()" class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow transition flex items-center gap-2">
             Generate Reconciliation Form
          </button>
        </div>

        <!-- Dynamic Generated Audit Table Area -->
        <div id="rec-generated-area" class="hidden space-y-4 pt-4 border-t border-slate-200">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-slate-900 uppercase text-xs tracking-wider">
              Step 2: Enter Physical Available Qty Against System Qty
            </h4>
            <span class="text-xs text-slate-500">Variance = Physical - System</span>
          </div>

          <div class="border border-slate-200 rounded-lg overflow-x-auto max-h-80 overflow-y-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 sticky top-0">
                <tr>
                  <th class="p-3">Material Name & Brand</th>
                  <th class="p-3 text-center">Unit</th>
                  <th class="p-3 text-right">System Qty</th>
                  <th class="p-3 text-right w-32">Physical Qty *</th>
                  <th class="p-3 text-right">Variance</th>
                  <th class="p-3">Remarks for Variance *</th>
                </tr>
              </thead>
              <tbody id="rec-items-tbody" class="divide-y divide-slate-200">
                <!-- Injected via JS -->
              </tbody>
            </table>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Overall Audit Statement / Findings</label>
            <input type="text" id="rec-overall-remarks" class="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g. Physical inventory check conducted by store audit team" />
          </div>

          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition">Cancel</button>
            <button type="button" onclick="CMS_RECONCILIATION.saveReconciliation()" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition">
              Submit Audit for Approval
            </button>
          </div>
        </div>
      </div>
    `;

    window.CMS_APP.openModal('Stock Verification & Reconciliation', content, 'max-w-5xl');
  },

  generateForm() {
    const catId = document.getElementById('rec-cat').value;
    if (!catId) {
      alert('Please select a category first.');
      return;
    }

    const store = window.CMS_STORE.data;
    const items = (store.consumables || []).filter(m => catId === 'ALL' || m.categoryId === catId);

    if (items.length === 0) {
      alert('No materials registered under the selected category.');
      return;
    }

    const tbody = document.getElementById('rec-items-tbody');
    const area = document.getElementById('rec-generated-area');

    tbody.innerHTML = items.map((m, idx) => {
      const systemQty = window.CMS_STORE.getStock(m.id);
      return `
        <tr data-mat-id="${m.id}" data-system-qty="${systemQty}" class="hover:bg-slate-50">
          <td class="p-3">
            <div class="font-bold text-slate-900">${m.materialName}</div>
            <div class="text-[11px] text-slate-500 font-mono">Code: ${m.id} | Brand: ${m.brand || '-'}</div>
          </td>
          <td class="p-3 text-center font-medium">${m.unit}</td>
          <td class="p-3 text-right font-mono font-bold text-slate-700 text-sm">${systemQty}</td>
          <td class="p-3 text-right">
            <input type="number" step="0.01" value="${systemQty}" oninput="CMS_RECONCILIATION.calcRowVariance(${idx})" class="rec-phys-input w-28 px-2 py-1 border border-purple-300 rounded font-mono font-bold text-right focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </td>
          <td class="p-3 text-right font-mono font-bold text-sm rec-var-disp text-slate-600">
            0
          </td>
          <td class="p-3">
            <input type="text" placeholder="Explain discrepancy if any" class="rec-remarks-input w-full px-2 py-1 border border-slate-300 rounded text-xs" />
          </td>
        </tr>
      `;
    }).join('');

    area.classList.remove('hidden');
  },

  calcRowVariance(rowIndex) {
    const rows = document.querySelectorAll('#rec-items-tbody tr');
    const row = rows[rowIndex];
    if (!row) return;

    const systemQty = parseFloat(row.getAttribute('data-system-qty')) || 0;
    const physInput = row.querySelector('.rec-phys-input');
    const varDisp = row.querySelector('.rec-var-disp');
    const physicalQty = parseFloat(physInput.value) || 0;

    const variance = physicalQty - systemQty;
    varDisp.innerText = (variance > 0 ? '+' : '') + variance;

    if (variance < 0) {
      varDisp.className = 'p-3 text-right font-mono font-bold text-sm rec-var-disp text-red-600';
    } else if (variance > 0) {
      varDisp.className = 'p-3 text-right font-mono font-bold text-sm rec-var-disp text-emerald-600';
    } else {
      varDisp.className = 'p-3 text-right font-mono font-bold text-sm rec-var-disp text-slate-600';
    }
  },

  saveReconciliation() {
    const store = window.CMS_STORE;
    const date = document.getElementById('rec-date').value;
    const catId = document.getElementById('rec-cat').value;
    const category = store.data.categories.find(c => c.id === catId);
    const overallRemarks = document.getElementById('rec-overall-remarks').value.trim();

    const rows = document.querySelectorAll('#rec-items-tbody tr');
    if (rows.length === 0) {
      alert('Reconciliation form is empty.');
      return;
    }

    const items = [];
    let hasVarianceWithoutRemark = false;

    rows.forEach(row => {
      const matId = row.getAttribute('data-mat-id');
      const mat = store.data.consumables.find(m => m.id === matId);
      const systemQty = parseFloat(row.getAttribute('data-system-qty')) || 0;
      const physicalQty = parseFloat(row.querySelector('.rec-phys-input').value) || 0;
      const variance = physicalQty - systemQty;
      const remarks = row.querySelector('.rec-remarks-input').value.trim();

      if (variance !== 0 && !remarks) {
        hasVarianceWithoutRemark = true;
      }

      items.push({
        materialId: matId,
        materialName: mat ? mat.materialName : '',
        brand: mat ? mat.brand : '',
        unit: mat ? mat.unit : 'Nos',
        systemQty,
        physicalQty,
        variance,
        varianceValue: 0,
        remarks: remarks || (variance === 0 ? 'Physical count verified matching' : 'Discrepancy noted')
      });
    });

    if (hasVarianceWithoutRemark) {
      if (!confirm('Some materials have variances with no explanatory remarks. Submit anyway?')) {
        return;
      }
    }

    const recNo = `REC-AUD-${new Date().getFullYear()}-${String(store.data.reconciliations.length + 1).padStart(3, '0')}`;
    const newRecon = {
      id: 'RECON-' + String(store.data.reconciliations.length + 1).padStart(3, '0'),
      reconciliationNo: recNo,
      reconciliationDate: date,
      categoryId: catId,
      categoryName: category ? category.name : 'All Categories',
      items,
      remarks: overallRemarks || 'Physical audit completed',
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    };

    store.data.reconciliations.push(newRecon);
    store.save();

    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Reconciliation ${recNo} submitted for approval!`, 'success');
    window.CMS_APP.refreshView();

    setTimeout(() => {
      if (confirm(`Audit sheet ${recNo} generated! View and print audit sheet?`)) {
        window.CMS_PRINT.printReconciliationSheet(newRecon);
      }
    }, 250);
  },

  approveReconciliation(recId) {
    const store = window.CMS_STORE;
    const r = store.data.reconciliations.find(i => i.id === recId);
    if (r) {
      r.status = 'Approved';
      r.approvedAt = new Date().toISOString();
      r.approvedBy = 'Admin (Checker)';
      store.save();
      window.CMS_APP.toast(`Reconciliation ${r.reconciliationNo} approved and live warehouse stock calibrated!`, 'success');
      window.CMS_APP.refreshView();
    }
  },

  deleteReconciliation(recId) {
    if (confirm('Delete this reconciliation audit?')) {
      const store = window.CMS_STORE;
      store.data.reconciliations = store.data.reconciliations.filter(r => r.id !== recId);
      store.save();
      window.CMS_APP.toast('Reconciliation deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  }
};
