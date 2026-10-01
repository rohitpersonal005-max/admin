const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const sIdx = code.indexOf("const quotationNo = document.getElementById('v-quote-no')");
const eIdx = code.indexOf("const approvedForLimitedPeriod = document.getElementById('v-limited')");

if (sIdx > -1 && eIdx > -1) {
  let extractScript = \
      const quoteRows = document.querySelectorAll('#v-quotations-container .quote-row');
      const quotedItems = [];
      for (const row of quoteRows) {
        const qno = row.querySelector('.q-no')?.value.trim() || '';
        const matName = row.querySelector('.q-mat-name')?.value.trim() || '';
        if (!qno && !matName) continue;
        
        const fileInput = row.querySelector('.q-file');
        let docName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : '';
        if (!docName) {
            const span = row.querySelector('span.text-emerald-700');
            if (span && span.innerText.includes('Attached on record: ')) {
                docName = span.innerText.split('Attached on record: ')[1].trim();
            }
        }
        
        quotedItems.push({
          quotationNo: qno,
          quotationDate: row.querySelector('.q-date')?.value || '',
          effectiveFrom: row.querySelector('.q-eff')?.value || '',
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

      \;
  code = code.substring(0, sIdx) + extractScript + code.substring(eIdx);
}

fs.writeFileSync('js/masters.js', code);
