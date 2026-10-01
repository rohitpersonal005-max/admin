const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const sIdx = code.indexOf('const quotationNo = document.getElementById(\\\'v-quote-no\\\')');
const eIdx = code.indexOf('const approvedForLimitedPeriod = document.getElementById(\\\'v-limited\\\')');

if (sIdx > -1 && eIdx > -1) {
  let extractScript = `
      const quoteRows = document.querySelectorAll('#v-quotations-container .quote-row');
      const quotedItems = [];
      for (const row of quoteRows) {
        const qno = row.querySelector('.q-no')?.value.trim() || '';
        const matName = row.querySelector('.q-mat-name')?.value.trim() || '';
        if (!qno && !matName) continue;
        
        const fileInput = row.querySelector('.q-file');
        let docName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : '';
        // Try to find attached span if no new file
        if (!docName) {
            const span = row.querySelector('span.text-emerald-700');
            if (span && span.innerText.includes('Attached on record: ')) {
                docName = span.innerText.split('Attached on record: ')[1].trim();
            }
        }
        
        quotedItems.push({
          quotationNo: qno,
          quotationDate: row.querySelector('.q-date')?.value || '',
          quotationValidTill: row.querySelector('.q-exp')?.value || '',
          materialId: row.querySelector('.q-mat-id')?.value || '',
          materialName: matName,
          rate: parseFloat(row.querySelector('.q-rate')?.value) || 0,
          mrp: parseFloat(row.querySelector('.q-mrp')?.value) || 0,
          unit: row.querySelector('.q-unit')?.value.trim() || 'Nos',
          hsn: row.querySelector('.q-hsn')?.value.trim() || '8472',
          doc: docName
        });
      }
      
      const quotationNo = quotedItems.length > 0 ? quotedItems[0].quotationNo : '';
      const quotationDate = quotedItems.length > 0 ? quotedItems[0].quotationDate : '';
      const quotationValidTill = quotedItems.length > 0 ? quotedItems[0].quotationValidTill : '';
      const quotationDoc = quotedItems.length > 0 ? quotedItems[0].doc : '';
      const quotedMaterialId = quotedItems.length > 0 ? quotedItems[0].materialId : '';
      const quotedMaterialName = quotedItems.length > 0 ? quotedItems[0].materialName : '';
      const quotedMaterialRate = quotedItems.length > 0 ? quotedItems[0].rate : 0;
      const quotedMaterialMrp = quotedItems.length > 0 ? quotedItems[0].mrp : 0;
      const quotedMaterialUnit = quotedItems.length > 0 ? quotedItems[0].unit : 'Nos';
      const quotedMaterialHsn = quotedItems.length > 0 ? quotedItems[0].hsn : '8472';

      `;
  code = code.substring(0, sIdx) + extractScript + code.substring(eIdx);
}

// 2. Add quotedItems to object payload (both isEdit and new)
code = code.replace(/isBlocked,\s*blockReason,/g, 'isBlocked, blockReason, quotedItems,');

// 3. Sync logic!
// Find the sync logic and replace it with a loop over quotedItems
const syncStart = code.indexOf('const targetVendorId = isEdit ? vendorId : store.data.vendors[store.data.vendors.length - 1].id;');
const syncEnd = code.indexOf('store.save();');

if (syncStart > -1 && syncEnd > -1) {
  let syncScript = `
      const targetVendorId = isEdit ? vendorId : store.data.vendors[store.data.vendors.length - 1].id;
      
      for (const q of quotedItems) {
        if (!q.quotationNo && !q.materialName) continue;
        
        if (q.materialId) {
          const mat = store.data.consumables.find(m => m.id === q.materialId);
          if (mat) {
            if (q.quotationNo) mat.quotationNo = q.quotationNo;
            if (q.quotationDate) mat.quotationDate = q.quotationDate;
            if (q.rate > 0) {
              mat.quotationRate = q.rate;
              mat.vendor1Rate = q.rate;
            }
            if (q.mrp > 0) mat.mrpBooked = q.mrp;
            mat.vendor1Id = targetVendorId;
            mat.vendor1Name = name;
            if (q.hsn) mat.hsnCode = q.hsn;
            if (q.unit) mat.unit = q.unit;
          }
        } else if (q.materialName && q.rate > 0) {
          const existingMat = store.data.consumables.find(m => m.materialName.toLowerCase() === q.materialName.toLowerCase());
          if (existingMat) {
            if (q.quotationNo) existingMat.quotationNo = q.quotationNo;
            if (q.quotationDate) existingMat.quotationDate = q.quotationDate;
            existingMat.quotationRate = q.rate;
            existingMat.vendor1Id = targetVendorId;
            existingMat.vendor1Name = name;
            existingMat.vendor1Rate = q.rate;
            if (q.hsn) existingMat.hsnCode = q.hsn;
            if (q.unit) existingMat.unit = q.unit;
          } else {
            const newCount = store.data.consumables.length + 1;
            const newMatId = \`MAT-CON-\${String(newCount).padStart(3, '0')}\`;
            store.data.consumables.push({
              id: newMatId,
              inventoryType: 'Consumer',
              categoryId: 'CAT-001',
              categoryName: 'General',
              materialName: q.materialName,
              unit: q.unit || 'Nos',
              brand: name,
              supplierProductCode: \`SKU-\${newMatId}\`,
              hsnCode: q.hsn || '8472',
              sgst: stateInfo.taxMode === 'IGST' ? 0 : 9,
              cgst: stateInfo.taxMode === 'IGST' ? 0 : 9,
              igst: stateInfo.taxMode === 'IGST' ? 18 : 0,
              quotationNo: q.quotationNo,
              quotationDate: q.quotationDate || today,
              quotationRate: q.rate,
              mrpBooked: q.mrp > 0 ? q.mrp : Number((q.rate * 1.25).toFixed(2)),
              hasWarranty: false,
              warrantyPeriod: '',
              warrantyValidTill: '',
              hasPm: false,
              pmFrequency: '',
              vendor1Id: targetVendorId,
              vendor1Name: name,
              vendor1Rate: q.rate,
              vendor1RateEffectiveFrom: q.quotationDate || today,
              consumerConfirmed: true,
              confirmedBy: currentUser.name,
              confirmationDate: today,
              confirmationRemarks: \`Auto-Cataloged via Vendor Quotation [\${q.quotationNo}]\`,
              avgMonthlyConsumption: 10,
              initialStock: 0,
              status: 'Approved',
              createdAt: new Date().toISOString()
            });
          }
        }
      }

      `;
  code = code.substring(0, syncStart) + syncScript + code.substring(syncEnd);
}

fs.writeFileSync('js/masters.js', code);
