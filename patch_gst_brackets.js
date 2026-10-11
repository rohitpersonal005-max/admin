const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

// 1. Add assembleGst, onPanInput, onGstPanSegmentInput, onGstSuffixInput and update onStateChange
const onStateChangeTarget = `  onStateChange(stateName) {
      this.validateGstStateCode();
    },`;

const newGstMethods = `  assembleGst() {
    const sBox = document.getElementById('v-gst-state');
    const pBox = document.getElementById('v-gst-pan');
    const sufBox = document.getElementById('v-gst-suffix');
    const fullInput = document.getElementById('v-gst');
    const fullDisplay = document.getElementById('v-gst-full-display');
    const stateNameEl = document.getElementById('v-gst-state-name');

    const stateCode = (sBox?.value || '').trim().toUpperCase();
    const pan = (pBox?.value || '').trim().toUpperCase();
    const suffix = (sufBox?.value || '').trim().toUpperCase();

    const fullGst = stateCode + pan + suffix;
    if (fullInput) {
      fullInput.value = fullGst;
    }
    if (fullDisplay) {
      fullDisplay.innerText = fullGst.length > 0 ? fullGst : '-';
    }

    const stateSelect = document.getElementById('v-state');
    const stName = stateSelect?.value || '';
    if (stateNameEl && stName) {
      stateNameEl.innerText = '(' + stName + ')';
    }

    const gstNaCheckbox = document.getElementById('v-gst-na');
    if (gstNaCheckbox && fullGst.length > 2 && gstNaCheckbox.checked) {
      gstNaCheckbox.checked = false;
      this.toggleGstApplicable(false);
    }

    return fullGst;
  },

  onPanInput(val) {
    const cleanPan = (val || '').trim().toUpperCase();
    const gstPan = document.getElementById('v-gst-pan');
    if (gstPan && gstPan.value !== cleanPan) {
      gstPan.value = cleanPan;
    }
    this.assembleGst();
  },

  onGstPanSegmentInput(val) {
    const cleanPan = (val || '').trim().toUpperCase();
    const panInput = document.getElementById('v-pan');
    if (panInput && !panInput.disabled && panInput.value !== cleanPan) {
      panInput.value = cleanPan;
    }
    this.assembleGst();
  },

  onGstSuffixInput(val) {
    this.assembleGst();
  },

  onStateChange(stateName) {
    if (stateName) {
      const s = this.indianStates.find(item => item.name.toLowerCase() === String(stateName || '').toLowerCase());
      const stateBox = document.getElementById('v-gst-state');
      const stateNameEl = document.getElementById('v-gst-state-name');
      if (stateBox && s) {
        stateBox.value = s.code;
      }
      if (stateNameEl && s) {
        stateNameEl.innerText = '(' + s.name + ')';
      }
      this.assembleGst();
    }
    this.validateGstStateCode();
  },`;

if (code.includes(onStateChangeTarget)) {
  code = code.replace(onStateChangeTarget, newGstMethods);
  console.log('1. Replaced onStateChange and added assembleGst methods');
} else {
  // Regex fallback
  code = code.replace(/onStateChange\(stateName\)\s*\{\s*this\.validateGstStateCode\(\);\s*\},/, newGstMethods);
  console.log('1. Replaced onStateChange via regex');
}

// 2. In openVendorModal: setup initial variables for segmented GST
const initialPanTarget = `const initialPan = vendor.panNo || (vendor.gstNo && vendor.gstNo.length >= 12 ? vendor.gstNo.substring(2, 12).toUpperCase() : '');
    const today = new Date().toISOString().split('T')[0];
    const initialInfo = this.getStateInfo(vendor.addressState || 'Delhi');`;

const initialPanReplace = `const initialPan = vendor.panNo || (vendor.gstNo && vendor.gstNo.length >= 12 ? vendor.gstNo.substring(2, 12).toUpperCase() : '');
    const today = new Date().toISOString().split('T')[0];
    const initialInfo = this.getStateInfo(vendor.addressState || 'Delhi');
    const initialGst = (vendor.gstNo || '').trim().toUpperCase();
    const initialGstState = initialGst.length >= 2 ? initialGst.substring(0, 2) : (initialInfo.code || '07');
    const initialGstPan = initialGst.length >= 12 ? initialGst.substring(2, 12) : (initialPan || '');
    const initialGstSuffix = initialGst.length >= 15 ? initialGst.substring(12, 15) : (initialGst.length > 12 ? initialGst.substring(12) : '');`;

if (code.includes(initialPanTarget)) {
  code = code.replace(initialPanTarget, initialPanReplace);
  console.log('2. Added initialGst segmented variables in openVendorModal');
}

// 3. In openVendorModal: replace the GST input markup with the 3 brackets
const oldGstInputRegex = /<label class="block font-bold text-slate-700 mb-1">\s*GSTIN Number \(15 Characters\) <span class="text-rose-600 font-bold">\*<\/span>\s*<\/label>\s*<input type="text" id="v-gst"[\s\S]*?placeholder="15-digit GSTIN[^"]*"\s*\/>/;

const newGstBracketMarkup = `<label class="block font-bold text-slate-700 mb-1">
                  GSTIN Number (15 Characters) <span class="text-rose-600 font-bold">*</span>
                </label>
                
                <div class="flex items-center gap-1.5">
                  <!-- Bracket 1: State Code (2 digits) - Locked to State -->
                  <div class="w-16">
                    <span class="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 text-center">State</span>
                    <input type="text" id="v-gst-state" readonly tabindex="-1" maxlength="2" value="\${initialGstState}"
                      class="w-full text-center font-mono font-bold text-xs px-1.5 py-2 bg-slate-100 border border-slate-300 rounded text-blue-700 cursor-not-allowed select-none focus:outline-none"
                      title="State code is auto-locked to the selected State" />
                  </div>

                  <span class="text-slate-400 font-bold mt-3.5">-</span>

                  <!-- Bracket 2: PAN (10 chars) - Auto-synced with PAN Card -->
                  <div class="flex-1">
                    <span class="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 text-center">PAN (10 Chars)</span>
                    <input type="text" id="v-gst-pan" maxlength="10" value="\${initialGstPan}" placeholder="ABCDE1234F"
                      oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstPanSegmentInput(this.value);"
                      class="w-full text-center font-mono font-bold uppercase text-xs px-2 py-2 border border-slate-300 rounded text-slate-800 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      title="Auto-synced with PAN Card" />
                  </div>

                  <span class="text-slate-400 font-bold mt-3.5">-</span>

                  <!-- Bracket 3: Entity / Suffix (3 chars) - Editable for ahead numbers -->
                  <div class="w-20">
                    <span class="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 text-center">Suffix</span>
                    <input type="text" id="v-gst-suffix" maxlength="3" value="\${initialGstSuffix}" placeholder="1Z5"
                      oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstSuffixInput(this.value);"
                      class="w-full text-center font-mono font-bold uppercase text-xs px-1.5 py-2 border border-blue-400 bg-white rounded text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                      title="Type ahead numbers manually (e.g. 1Z5)" />
                  </div>
                </div>

                <!-- Hidden full input to preserve full compatibility with database & validation -->
                <input type="hidden" id="v-gst" value="\${vendor.gstNo || ''}" />
                <div class="text-[11px] font-mono text-slate-600 mt-1 flex items-center justify-between">
                  <span>Full GSTIN: <strong id="v-gst-full-display" class="text-blue-700 font-bold font-mono">\${vendor.gstNo || (initialGstState + initialGstPan + initialGstSuffix) || '-'}</strong></span>
                  <span id="v-gst-state-name" class="text-[10px] text-slate-500 italic font-sans">\${initialInfo.name ? '(' + initialInfo.name + ')' : ''}</span>
                </div>`;

if (oldGstInputRegex.test(code)) {
  code = code.replace(oldGstInputRegex, newGstBracketMarkup);
  console.log('3. Replaced v-gst input with 3-bracket UI');
}

// 4. Update PAN input in modal to call CMS_MASTERS.onPanInput
const oldPanInputRegex = /<input type="text" id="v-pan" \$\{vendor\.panNotApplicable \? 'disabled' : ''\} maxlength="10" value="\$\{initialPan\}" oninput="this\.value = this\.value\.toUpperCase\(\); this\.dataset\.autoFilled = 'false';"/;
const newPanInput = `<input type="text" id="v-pan" \${vendor.panNotApplicable ? 'disabled' : ''} maxlength="10" value="\${initialPan}" oninput="this.value = this.value.toUpperCase(); this.dataset.autoFilled = 'false'; CMS_MASTERS.onPanInput(this.value);"`;

if (oldPanInputRegex.test(code)) {
  code = code.replace(oldPanInputRegex, newPanInput);
  console.log('4. Hooked onPanInput into #v-pan');
}

// 5. Update toggleGstApplicable to disable/enable segmented inputs
const toggleGstTarget = `    const input = document.getElementById('v-gst');
    const box = document.getElementById('v-gst-file-box');
    if (input) {
      input.disabled = isNotApplicable;
      if (isNotApplicable) {
        input.value = '';
        input.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        input.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    }`;

const toggleGstReplace = `    const input = document.getElementById('v-gst');
    const sInput = document.getElementById('v-gst-state');
    const pInput = document.getElementById('v-gst-pan');
    const sufInput = document.getElementById('v-gst-suffix');
    const box = document.getElementById('v-gst-file-box');
    
    [input, sInput, pInput, sufInput].forEach(el => {
      if (!el) return;
      el.disabled = isNotApplicable;
      if (isNotApplicable) {
        el.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        el.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    });

    if (isNotApplicable) {
      if (input) input.value = '';
      if (pInput) pInput.value = '';
      if (sufInput) sufInput.value = '';
      const displayEl = document.getElementById('v-gst-full-display');
      if (displayEl) displayEl.innerText = 'Exempt (N/A)';
    } else {
      const stateVal = document.getElementById('v-state')?.value;
      if (stateVal) this.onStateChange(stateVal);
      const panVal = document.getElementById('v-pan')?.value;
      if (panVal && pInput) pInput.value = panVal;
      this.assembleGst();
    }`;

if (code.includes(toggleGstTarget)) {
  code = code.replace(toggleGstTarget, toggleGstReplace);
  console.log('5. Updated toggleGstApplicable for segmented inputs');
}

fs.writeFileSync('js/masters.js', code, 'utf8');
console.log('Finished updating masters.js');
