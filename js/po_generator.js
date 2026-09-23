/**
 * Consumable Management System - Purchase Order Generation Module (Page 12)
 * Features period-based replenishment (15 days, 1 month, 3 months),
 * consumption & buffer analysis against current stock and approved vendor rate
 * with effective dates, and professional PO voucher printing.
 */

window.CMS_PO = {
  renderPOs() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.purchaseOrders || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
               Purchase Order Generation
            </h2>
            <p class="text-sm text-slate-500">Auto-calculate purchase replenishment quotas for 15 days, 1 month, or 3 months based on monthly consumption, buffer, and current stock.</p>
          </div>
          <button onclick="CMS_PO.openPOModal()" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition text-sm">
             Generate New PO
          </button>
        </div>

        <div class="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th class="p-4">PO Number & Date</th>
                  <th class="p-4">Vendor</th>
                  <th class="p-4">Material & Category</th>
                  <th class="p-4 text-center">Period</th>
                  <th class="p-4 text-right">Order Qty</th>
                  <th class="p-4 text-right">Total Amount (₹)</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr><td colspan="8" class="p-8 text-center text-slate-400">No purchase orders generated yet.</td></tr>
                ` : list.map(po => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-4 font-mono text-xs">
                      <div class="font-bold text-blue-900">${po.poNo}</div>
                      <div class="text-slate-500">${new Date(po.createdAt || Date.now()).toLocaleDateString('en-IN')}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-medium text-slate-900">${po.vendorName}</div>
                      <div class="text-[11px] text-slate-500">Eff: <span class="font-semibold text-blue-700">${po.rateEffectiveFrom || 'Current'}</span></div>
                    </td>
                    <td class="p-4">
                      <div class="font-semibold text-slate-900">${po.materialName}</div>
                      <div class="text-xs text-slate-500">Brand: ${po.brand || '-'} | <span class="text-slate-600 font-medium">${po.categoryName}</span></div>
                    </td>
                    <td class="p-4 text-center">
                      <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                        ${po.period}
                      </span>
                    </td>
                    <td class="p-4 text-right font-mono font-bold text-slate-900">
                      ${po.orderQty} <span class="text-xs text-slate-500 font-normal">${po.unit}</span>
                    </td>
                    <td class="p-4 text-right font-mono font-bold text-slate-900 text-sm">
                      ₹${Number(po.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td class="p-4">
                      <span class="badge ${po.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">
                        ${po.status}
                      </span>
                    </td>
                    <td class="p-4 text-right space-x-1">
                      <button onclick="CMS_PRINT.printPurchaseOrder(${JSON.stringify(po).replace(/"/g, '&quot;')})" class="px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition" title="Print Purchase Order">
                        Print PO
                      </button>
                      ${po.status === 'Pending Approval' && role === 'Checker' ? `
                        <button onclick="CMS_PO.approvePO('${po.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded transition">
                          Approve
                        </button>
                      ` : ''}
                      <button onclick="CMS_PO.deletePO('${po.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded transition">
                        Delete
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

  openPOModal() {
    const store = window.CMS_STORE.data;
    const categories = store.categories || [];

    const content = `
      <form id="po-form" class="space-y-4 text-sm" onsubmit="event.preventDefault(); CMS_PO.executeGeneratePO();">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Select Consumable Category *</label>
            <select id="po-cat" required onchange="CMS_PO.onCategoryChange()" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">-- Choose Category --</option>
              ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Select Material *</label>
            <select id="po-mat" required onchange="CMS_PO.onMaterialChange()" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">-- Select Category First --</option>
            </select>
          </div>
        </div>

        <!-- Material Consumption & Stock Analysis Panel -->
        <div id="po-analysis-panel" class="hidden p-4 bg-blue-50/70 border border-blue-200 rounded-md space-y-3">
          <div class="grid grid-cols-3 gap-3 text-xs">
            <div>
              <span class="text-blue-800 block">Monthly Consumption (with Buffer):</span>
              <strong id="po-disp-monthly" class="text-slate-900 font-mono text-sm">0</strong>
            </div>
            <div>
              <span class="text-blue-800 block">Live Stock Available:</span>
              <strong id="po-disp-stock" class="text-emerald-700 font-mono text-sm">0</strong>
            </div>
            <div>
              <span class="text-blue-800 block">HSN & Applicable GST:</span>
              <strong id="po-disp-gst" class="text-slate-900 font-mono">GST 18%</strong>
            </div>
          </div>
        </div>

        <!-- Replenishment Period Selection -->
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
          <label class="block font-semibold text-slate-800">Select Order to be Generated for Period *</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label class="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
              <input type="radio" name="po-period" value="15 days" onchange="CMS_PO.calculateSuggestedQty()" class="text-blue-600 focus:ring-blue-500" />
              <span class="font-semibold text-xs">⏱️ 15 Days</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
              <input type="radio" name="po-period" value="1 month" onchange="CMS_PO.calculateSuggestedQty()" checked class="text-blue-600 focus:ring-blue-500" />
              <span class="font-semibold text-xs">1 Month</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
              <input type="radio" name="po-period" value="3 months" onchange="CMS_PO.calculateSuggestedQty()" class="text-blue-600 focus:ring-blue-500" />
              <span class="font-semibold text-xs">3 Months</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
              <input type="radio" name="po-period" value="Custom" onchange="CMS_PO.calculateSuggestedQty()" class="text-blue-600 focus:ring-blue-500" />
              <span class="font-semibold text-xs">Custom Qty</span>
            </label>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Calculated Suggested Quantity</label>
              <input type="text" id="po-sugg-qty" readonly class="w-full font-mono font-bold px-3 py-2 bg-slate-200 border border-slate-300 rounded-lg text-slate-800" />
              <p class="text-[11px] text-slate-500 mt-0.5">Formula: (Period Quota) - Current Stock</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Final Order Quantity to Procure *</label>
              <input type="number" step="0.01" id="po-order-qty" required oninput="CMS_PO.recalcPOTotals()" class="w-full font-mono font-bold text-base px-3 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- Approved Vendor Rate Selection -->
        <div class="p-4 bg-amber-50/50 border border-amber-200 rounded-md space-y-3">
          <h4 class="font-bold text-amber-950 text-xs uppercase tracking-wider">
            Approved Vendor Rate & Effective Date *
          </h4>
          <div id="po-vendors-container" class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 border rounded-lg bg-white text-slate-400 italic">Select a material above to compare approved vendor rates.</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Delivery Due Date *</label>
            <input type="date" id="po-del-date" required value="${new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]}" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Payment & Commercial Terms</label>
            <input type="text" id="po-terms" value="30 Days Net from date of certified receipt" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Purchase Order Remarks</label>
          <input type="text" id="po-remarks" class="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="Consignment delivery instructions or packing specifications" />
        </div>

        <!-- Cost & Tax Summary Box -->
        <div class="p-3 bg-slate-900 text-white rounded-md flex justify-between items-center text-xs">
          <div>
            <span>Unit Rate: <strong id="po-disp-rate" class="font-mono">₹0.00</strong></span> | 
            <span>Tax Amount: <strong id="po-disp-tax" class="font-mono">₹0.00</strong></span>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-300">Estimated PO Value:</span>
            <div id="po-disp-total" class="text-lg font-bold font-mono text-emerald-400">₹0.00</div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition">Cancel</button>
          <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition">
            Generate & Submit PO
          </button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal('Generate Purchase Order (Replenishment)', content, 'max-w-3xl');
  },

  onCategoryChange() {
    const catId = document.getElementById('po-cat').value;
    const matSelect = document.getElementById('po-mat');
    if (!matSelect) return;

    const store = window.CMS_STORE.data;
    const items = (store.consumables || []).filter(m => !catId || m.categoryId === catId);

    matSelect.innerHTML = '<option value="">-- Choose Material --</option>' +
      items.map(m => `<option value="${m.id}">${m.materialName} (${m.brand || 'Standard'})</option>`).join('');

    document.getElementById('po-analysis-panel').classList.add('hidden');
    document.getElementById('po-vendors-container').innerHTML = '<div class="p-3 border rounded-lg bg-white text-slate-400 italic">Select a material above.</div>';
  },

  onMaterialChange() {
    const matId = document.getElementById('po-mat').value;
    const store = window.CMS_STORE.data;
    const m = store.consumables.find(i => i.id === matId);
    const panel = document.getElementById('po-analysis-panel');
    const vContainer = document.getElementById('po-vendors-container');
    if (!m || !panel || !vContainer) return;

    const liveStock = window.CMS_STORE.getStock(m.id);
    const totalGst = window.CMS_STORE.getTaxDetails(m).total;

    panel.classList.remove('hidden');
    document.getElementById('po-disp-monthly').innerText = `${m.avgMonthlyConsumption || 0} ${m.unit}`;
    document.getElementById('po-disp-stock').innerText = `${liveStock} ${m.unit}`;
    document.getElementById('po-disp-gst').innerText = `HSN: ${m.hsnCode || '-'} | ${window.CMS_STORE.getTaxLabel(m)}`;

    // Render the single approved vendor option.
    vContainer.innerHTML = `
      <label class="flex flex-col p-3 border-2 border-blue-300 bg-blue-50/50 rounded-md cursor-pointer hover:border-blue-600 transition">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <input type="radio" name="po-vendor-sel" value="V1" checked onchange="CMS_PO.onVendorSelectionChange()" class="text-blue-600 focus:ring-blue-500" />
            <span class="font-bold text-blue-950">Vendor 1 (L1): ${m.vendor1Name || 'Primary Supplier'}</span>
          </div>
          <span class="font-mono font-bold text-emerald-800 text-sm">₹${Number(m.vendor1Rate || 0).toFixed(2)}</span>
        </div>
        <div class="mt-2 text-[11px] text-slate-600 flex justify-between">
          <span>Rate Effective From: <strong class="text-blue-700">${m.vendor1RateEffectiveFrom || 'Current'}</strong></span>
          <span class="text-emerald-700 font-bold">Approved</span>
        </div>
      </label>

    `;

    this.calculateSuggestedQty();
  },

  calculateSuggestedQty() {
    const matId = document.getElementById('po-mat')?.value;
    const store = window.CMS_STORE.data;
    const m = store.consumables.find(i => i.id === matId);
    if (!m) return;

    const periodRadio = document.querySelector('input[name="po-period"]:checked');
    const period = periodRadio ? periodRadio.value : '1 month';

    const monthly = Number(m.avgMonthlyConsumption || 0);
    const liveStock = window.CMS_STORE.getStock(m.id);

    let quota = monthly;
    if (period === '15 days') quota = Math.round(monthly * 0.5);
    else if (period === '1 month') quota = monthly;
    else if (period === '3 months') quota = Math.round(monthly * 3);

    // Suggested replenishment = quota - current stock (at least minimum safety buffer)
    const suggested = Math.max(0, quota - liveStock);

    const suggEl = document.getElementById('po-sugg-qty');
    const orderInput = document.getElementById('po-order-qty');
    if (suggEl) suggEl.value = `${suggested} ${m.unit} (Quota: ${quota} - Stock: ${liveStock})`;
    if (orderInput && period !== 'Custom') {
      orderInput.value = suggested > 0 ? suggested : quota;
    }

    this.recalcPOTotals();
  },

  onVendorSelectionChange() {
    this.recalcPOTotals();
  },

  getSelectedVendorInfo() {
    const matId = document.getElementById('po-mat')?.value;
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);
    if (!m) return null;

    return {
      vendorId: m.vendor1Id,
      vendorName: m.vendor1Name,
      rate: Number(m.vendor1Rate || 0),
      rateEffectiveFrom: m.vendor1RateEffectiveFrom
    };
  },

  recalcPOTotals() {
    const vInfo = this.getSelectedVendorInfo();
    const orderQty = parseFloat(document.getElementById('po-order-qty')?.value) || 0;
    const matId = document.getElementById('po-mat')?.value;
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);

    const rate = vInfo ? vInfo.rate : 0;
    const totalGst = m ? window.CMS_STORE.getTaxDetails(m).total : 18;

    const subtotal = orderQty * rate;
    const taxAmount = (subtotal * totalGst) / 100;
    const grandTotal = subtotal + taxAmount;

    const dispRate = document.getElementById('po-disp-rate');
    const dispTax = document.getElementById('po-disp-tax');
    const dispTotal = document.getElementById('po-disp-total');

    if (dispRate) dispRate.innerText = `₹${rate.toFixed(2)}`;
    if (dispTax) dispTax.innerText = `₹${taxAmount.toFixed(2)} (${totalGst}%)`;
    if (dispTotal) dispTotal.innerText = `₹${grandTotal.toFixed(2)}`;
  },

  executeGeneratePO() {
    const store = window.CMS_STORE;
    const catId = document.getElementById('po-cat').value;
    const category = store.data.categories.find(c => c.id === catId);
    const matId = document.getElementById('po-mat').value;
    const mat = store.data.consumables.find(m => m.id === matId);
    const periodRadio = document.querySelector('input[name="po-period"]:checked');
    const period = periodRadio ? periodRadio.value : '1 month';
    const orderQty = parseFloat(document.getElementById('po-order-qty').value) || 0;
    const deliveryDate = document.getElementById('po-del-date').value;
    const terms = document.getElementById('po-terms').value.trim();
    const remarks = document.getElementById('po-remarks').value.trim();

    const vInfo = this.getSelectedVendorInfo();

    if (!matId || orderQty <= 0 || !vInfo || !vInfo.vendorName) {
      alert('Please fill all mandatory fields and ensure a vendor is selected.');
      return;
    }

    const currentStock = store.getStock(matId);
    const totalGst = window.CMS_STORE.getTaxDetails(mat).total;
    const subtotal = orderQty * vInfo.rate;
    const taxAmount = (subtotal * totalGst) / 100;
    const totalAmount = subtotal + taxAmount;

    const poNo = `PO/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(store.data.purchaseOrders.length + 1).padStart(3, '0')}`;
    const newPO = {
      id: 'PO-' + String(store.data.purchaseOrders.length + 1).padStart(3, '0'),
      poNo,
      categoryId: catId,
      categoryName: category ? category.name : 'General',
      materialId: mat.id,
      materialName: mat.materialName,
      brand: mat.brand,
      unit: mat.unit,
      period,
      monthlyConsumptionWithBuffer: mat.avgMonthlyConsumption,
      currentStock,
      calculatedSuggestedQty: orderQty,
      orderQty,
      vendorId: vInfo.vendorId || 'VEN-001',
      vendorName: vInfo.vendorName,
      rate: vInfo.rate,
      rateEffectiveFrom: vInfo.rateEffectiveFrom || '',
      gstPercent: totalGst,
      gstLabel: window.CMS_STORE.getTaxLabel(mat),
      subtotal,
      taxAmount,
      totalAmount,
      deliveryDate,
      terms,
      remarks,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    };

    store.data.purchaseOrders.push(newPO);
    store.save();

    window.CMS_APP.closeModal();
    window.CMS_APP.toast(`Purchase Order ${poNo} generated and submitted for approval!`, 'success');
    window.CMS_APP.refreshView();

    setTimeout(() => {
      if (confirm(`PO ${poNo} generated! Would you like to view the printable Purchase Order voucher now?`)) {
        window.CMS_PRINT.printPurchaseOrder(newPO);
      }
    }, 250);
  },

  approvePO(poId) {
    const store = window.CMS_STORE;
    const p = store.data.purchaseOrders.find(i => i.id === poId);
    if (!p) return;
    const check = store.canApprove(p);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    p.status = 'Approved';
    p.approvedAt = new Date().toISOString();
    p.approvedBy = currentUser.id;
    p.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Purchase Order ${p.poNo} sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deletePO(poId) {
    if (confirm('Delete this purchase order?')) {
      const store = window.CMS_STORE;
      store.data.purchaseOrders = store.data.purchaseOrders.filter(p => p.id !== poId);
      store.save();
      window.CMS_APP.toast('Purchase order deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  }
};
