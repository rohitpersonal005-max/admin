const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. In addCertificateRow: add docTitle extraction
const certDataVarSearch = `const fileName = certData && typeof certData === 'object' ? (certData.fileName || '') : '';`;
const certDataVarReplace = `const fileName = certData && typeof certData === 'object' ? (certData.fileName || '') : '';
    const docTitle = certData && typeof certData === 'object' ? (certData.documentName || certData.docTitle || '') : '';`;

if (code.includes(certDataVarSearch) && !code.includes('const docTitle = certData')) {
  code = code.replace(certDataVarSearch, certDataVarReplace);
  console.log('1. Added docTitle var');
}

// 2. In addCertificateRow: add Document Name input in Upload Certificate Copy box
const oldUploadBox = `        <!-- 5. Upload File Copy -->
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-1">
            5. Upload Certificate Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="file" accept=".pdf,image/*" class="cert-file-input text-[11px]" data-current="\${fileName}" />
            \${fileName ? \`<span class="text-[10px] text-emerald-700 font-mono truncate max-w-[120px]" title="\${fileName}">\${fileName}</span>\` : ''}
          </div>
        </div>`;

const newUploadBox = `        <!-- 5. Upload File Copy & Document Name -->
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              5. Upload Certificate Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="file" accept=".pdf,image/*" class="cert-file-input text-[11px]" data-current="\${fileName}" />
              \${fileName ? \`<span class="text-[10px] text-emerald-700 font-mono truncate max-w-[120px]" title="\${fileName}">\${fileName}</span>\` : ''}
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              Document Name
            </label>
            <input type="text" class="cert-title-input w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs outline-none focus:border-blue-500" placeholder="e.g. ISO 9001:2015 Quality Certificate" value="\${docTitle}" />
          </div>
        </div>`;

// Replace normalizing newlines
const norm = s => s.replace(/\r\n/g, '\n');
if (norm(code).includes(norm(oldUploadBox))) {
  // Use regex to replace regardless of CRLF/LF
  const uploadRegex = /<!-- 5\. Upload File Copy -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;/m;
  const newUploadReplacement = `<!-- 5. Upload File Copy & Document Name -->
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              5. Upload Certificate Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="file" accept=".pdf,image/*" class="cert-file-input text-[11px]" data-current="\${fileName}" />
              \${fileName ? \`<span class="text-[10px] text-emerald-700 font-mono truncate max-w-[120px]" title="\${fileName}">\${fileName}</span>\` : ''}
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              Document Name
            </label>
            <input type="text" class="cert-title-input w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs outline-none focus:border-blue-500" placeholder="e.g. ISO 9001:2015 Quality Certificate" value="\${docTitle}" />
          </div>
        </div>
      </div>
    \`;`;
  code = code.replace(uploadRegex, newUploadReplacement);
  console.log('2. Replaced upload box with Document Name input');
}

// 3. In saveVendor: parse cert-title-input and save documentName
const certSaveTarget = `      const fileInput = row.querySelector('.cert-file-input');
      let fileName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : (fileInput?.dataset.current || '');`;

const certSaveReplace = `      const docName = row.querySelector('.cert-title-input')?.value.trim() || '';
      const alertDate = row.querySelector('.cert-alert-input')?.value || '';
      const fileInput = row.querySelector('.cert-file-input');
      let fileName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : (fileInput?.dataset.current || '');`;

const certPushTarget = `      certificates.push({
        regulator: reg,
        name: reg,
        formNo,
        certificateNo: certNo,
        hasValidity: hasVal,
        validTill: expiry,
        fileName
      });`;

const certPushReplace = `      certificates.push({
        regulator: reg,
        name: reg,
        formNo,
        certificateNo: certNo,
        hasValidity: hasVal,
        validTill: expiry,
        alertDate,
        documentName: docName,
        docTitle: docName,
        fileName
      });`;

const certSaveRegex = /const fileInput = row\.querySelector\('\.cert-file-input'\);[\s\S]*?let fileName = \(fileInput && fileInput\.files\[0\]\) \? fileInput\.files\[0\]\.name : \(fileInput\?\.dataset\.current \|\| ''\);/m;
const certPushRegex = /certificates\.push\(\{\s*regulator:\s*reg,\s*name:\s*reg,\s*formNo,\s*certificateNo:\s*certNo,\s*hasValidity:\s*hasVal,\s*validTill:\s*expiry,\s*fileName\s*\}\);/m;

if (certSaveRegex.test(code)) {
  code = code.replace(certSaveRegex, certSaveReplace);
  console.log('3. Added docName and alertDate extraction in saveVendor');
}

if (certPushRegex.test(code)) {
  code = code.replace(certPushRegex, certPushReplace);
  console.log('4. Updated certificates.push to include documentName, docTitle and alertDate');
}

// 5. In viewVendorProfile: show documentName if available
const viewCertRegex = /<div><span class="text-slate-500 block text-\[10px\] uppercase">Certificate<\/span> <strong>\$\{c\.regulator \|\| c\.name \|\| 'Certificate'\} \(\$\{c\.formNo \|\| ''\}\)<\/strong><\/div>\s*\$\{renderDocPreview\(c\.fileName, c\.docTitle \|\| 'Certificate Document'\)\}/;
if (viewCertRegex.test(code)) {
  code = code.replace(viewCertRegex, `<div><span class="text-slate-500 block text-[10px] uppercase">Certificate</span> <strong>\${c.documentName || c.docTitle || (c.regulator || c.name || 'Certificate') + (c.formNo ? ' (' + c.formNo + ')' : '')}</strong></div>
                \${renderDocPreview(c.fileName, c.documentName || c.docTitle || 'Certificate Document')}`);
  console.log('5. Updated viewVendorProfile certificate preview label');
}

fs.writeFileSync('js/masters.js', code, 'utf8');
console.log('Finished patching js/masters.js');
