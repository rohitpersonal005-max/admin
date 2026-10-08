const fs = require('fs');
let code = fs.readFileSync('js/dashboard.js', 'utf8');

const targetRender = `  render() {
    return \`
      <div class="dashboard-shell space-y-5 max-w-7xl mx-auto pb-12">`;

const replaceRender = `  render() {
    try {
      return \`
        <div class="dashboard-shell space-y-5 max-w-7xl mx-auto pb-12">`;

const targetRenderEnd = `        </div>
      </div>
    \`;
  },`;

const replaceRenderEnd = `        </div>
      </div>
    \`;
    } catch (err) {
      return \`<div class="p-8 m-8 bg-red-100 text-red-900 border border-red-400 rounded-lg font-mono whitespace-pre-wrap"><h1>Dashboard Render Crash</h1>\${err.stack}</div>\`;
    }
  },`;

code = code.replace(targetRender, replaceRender);
code = code.replace(targetRenderEnd, replaceRenderEnd);

// Also wrap the individual render functions just in case they are called elsewhere
const targetPills = `  renderPills() {`;
const replacePills = `  renderPills() { try {`;
const targetPillsEnd = `    \`;
  },

  renderPins() {`;
const replacePillsEnd = `    \`; } catch(err) { return \`<div class="text-red-600">Pills Crash: \${err.message}</div>\`; }
  },

  renderPins() {`;

code = code.replace(targetPills, replacePills);
code = code.replace(targetPillsEnd, replacePillsEnd);

const targetPins = `  renderPins() {
    const store = window.CMS_STORE.data;`;
const replacePins = `  renderPins() {
    try {
    const store = window.CMS_STORE.data;`;
const targetPinsEnd = `    return pins.join('');
  }
};`;
const replacePinsEnd = `    return pins.join('');
    } catch(err) { return \`<div class="text-red-600">Pins Crash: \${err.message}<br/>\${err.stack}</div>\`; }
  }
};`;

code = code.replace(targetPins, replacePins);
code = code.replace(targetPinsEnd, replacePinsEnd);

fs.writeFileSync('js/dashboard.js', code);
console.log('Injected dashboard crash catchers');
