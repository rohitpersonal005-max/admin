const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');

const targetCatchInit = `    } catch(e) {
      console.error("APP INIT ERROR:", e);
      document.body.innerHTML += '<div style="position:fixed;top:0;left:0;z-index:99999;background:red;color:white;padding:20px;font-family:monospace;width:100%;"><h1>APP INIT CRASH</h1><pre>' + e.stack + '</pre></div>';
    }`;
const replaceCatchInit = `    } catch(e) {
      console.error("APP INIT ERROR:", e);
      alert("App Init Crash: " + e.message);
    }`;

const targetCatchNav = `    } catch(e) {
      console.error("NAVIGATE CRASH:", e);
      const main = document.getElementById('view-container');
      if (main) main.innerHTML = '<div style="background:red;color:white;padding:20px;font-family:monospace;"><h2>RENDER CRASH</h2><pre>' + e.stack + '</pre></div>';
    }`;
const replaceCatchNav = `    } catch(e) {
      console.error("NAVIGATE CRASH:", e);
      alert("Render Crash: " + e.message);
    }`;

code = code.replace(targetCatchInit, replaceCatchInit);
code = code.replace(targetCatchNav, replaceCatchNav);

// Also remove the non-existent showEmergencyAlerts
const targetDash = `window.setTimeout(() => window.CMS_DASHBOARD.showEmergencyAlerts(), 0);`;
const replaceDash = `// Removed showEmergencyAlerts`;
code = code.replace(targetDash, replaceDash);

fs.writeFileSync('js/app.js', code);
console.log('Cleaned up app.js crash handlers');
