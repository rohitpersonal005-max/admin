const fs = require('fs');
let code = fs.readFileSync('js/masters.js', 'utf8');

const regex1 = /this\.onStateChange\(matched\.name\);\s*\}\s*\}\s*\}/g;
const replace1 = `this.onStateChange(matched.name);
          }
        }
      }
      this.validateGstStateCode();
    `;

code = code.replace(regex1, replace1);

const regex2 = /onStateChange\(stateName\) \{\s*\/\/ Badges removed by request\. Tax logic is still processed in background\.\s*\}/g;
const replace2 = `onStateChange(stateName) {
      this.validateGstStateCode();
    },

    validateGstStateCode() {
      const gstInput = document.getElementById('v-gst');
      const stateInput = document.getElementById('v-state');
      if (!gstInput || !stateInput || gstInput.disabled) return;

      const gstVal = gstInput.value.trim().toUpperCase();
      const stateVal = stateInput.value;

      gstInput.classList.remove('border-rose-600', 'bg-rose-50', 'text-rose-600');
      gstInput.setCustomValidity('');

      if (gstVal.length >= 2 && stateVal) {
        const prefix = gstVal.substring(0, 2);
        // Special case for Daman & Diu and Dadra & Nagar Haveli which merged (codes 25 and 26)
        // or just check against indianStates array directly.
        const matchedState = this.indianStates.find(s => s.code === prefix);
        
        if (matchedState && matchedState.name !== stateVal) {
          gstInput.classList.add('border-rose-600', 'bg-rose-50', 'text-rose-600');
          gstInput.setCustomValidity('State code ' + prefix + ' (' + matchedState.name + ') does not match selected state ' + stateVal + '.');
        } else if (!matchedState) {
          gstInput.classList.add('border-rose-600', 'bg-rose-50', 'text-rose-600');
          gstInput.setCustomValidity('Invalid GST State Code: ' + prefix);
        }
      }
    }`;

code = code.replace(regex2, replace2);

fs.writeFileSync('js/masters.js', code);
console.log('Patched');
