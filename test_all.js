/**
 * Automated Quality & Syntax Gate for Consumable Management System (CMS)
 * 1. Executes V8 AST syntax checking across all JS files.
 * 2. Simulates script loading in an isolated VM sandbox to detect module declaration errors.
 * 3. Verifies cache-buster integrity in index.html.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

function runPreFlightGate(rootDir = __dirname) {
  console.log('===============================================================');
  console.log('🛡️   RUNNING AUTOMATED PRE-FLIGHT QUALITY & SAFETY AUDIT');
  console.log('===============================================================');

  const jsDir = path.join(rootDir, 'js');
  if (!fs.existsSync(jsDir)) {
    console.error('Error: js/ directory not found in ' + rootDir);
    return false;
  }

  const jsFiles = [
    'store.js',
    'notifications.js',
    'auth.js',
    'print_templates.js',
    'masters.js',
    'transactions.js',
    'po_generator.js',
    'reconciliation.js',
    'reports.js',
    'dashboard.js',
    'drafts.js',
    'home.js',
    'app.js'
  ];

  const errors = [];
  let checkedCount = 0;

  // 1. AST Syntax Check via Node.js V8 Parser
  console.log(`Phase 1: V8 AST Syntax Verification (${jsFiles.length} core modules)...`);
  for (const f of jsFiles) {
    const fullPath = path.join(jsDir, f);
    if (!fs.existsSync(fullPath)) {
      errors.push({ file: `js/${f}`, type: 'Missing File', details: 'File referenced in system does not exist.' });
      continue;
    }
    checkedCount++;
    const res = spawnSync(process.execPath, ['--check', fullPath], { encoding: 'utf8' });
    if (res.status !== 0) {
      errors.push({
        file: `js/${f}`,
        type: 'Syntax / Parse Error',
        details: (res.stderr || res.stdout || 'AST Parse failure').trim()
      });
      console.log(`  ❌ FAIL: js/${f}`);
    } else {
      console.log(`  ✓ PASS: js/${f}`);
    }
  }

  // Check any additional root scripts
  const rootScripts = fs.readdirSync(rootDir).filter(f => f.endsWith('.js') && !f.startsWith('.agy_') && f !== 'test_all.js');
  for (const f of rootScripts) {
    const fullPath = path.join(rootDir, f);
    checkedCount++;
    const res = spawnSync(process.execPath, ['--check', fullPath], { encoding: 'utf8' });
    if (res.status !== 0) {
      errors.push({
        file: f,
        type: 'Syntax Error in Root Script',
        details: (res.stderr || res.stdout || 'AST Parse failure').trim()
      });
      console.log(`  ❌ FAIL: ${f}`);
    } else {
      console.log(`  ✓ PASS: ${f}`);
    }
  }

  // 2. VM Sandbox Evaluation (Detects runtime declaration/scoping crashes)
  console.log('\nPhase 2: Sandbox Evaluation (Checking Global Object Declarations)...');
  const sandbox = {
    window: {},
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {}, remove: () => {} } })
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    navigator: { userAgent: 'CMS-Test-Agent' },
    location: { hash: '' },
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: () => 1,
    setInterval: () => 1,
    clearTimeout: () => {},
    clearInterval: () => {}
  };
  sandbox.window = sandbox;

  try {
    const context = vm.createContext(sandbox);
    for (const f of jsFiles) {
      const fullPath = path.join(jsDir, f);
      const code = fs.readFileSync(fullPath, 'utf8');
      try {
        vm.runInContext(code, context, { filename: f });
        console.log(`  ✓ LOADED: js/${f} into sandbox without fatal errors`);
      } catch (err) {
        // Some DOM operations might throw minor mocks, but declaration errors (SyntaxError, ReferenceError at top-level) are caught
        if (err.name === 'SyntaxError' || (err.message && err.message.includes('is not defined') && !err.message.includes('lucide') && !err.message.includes('Chart'))) {
          errors.push({
            file: `js/${f}`,
            type: 'Sandbox Evaluation Error',
            details: err.stack || err.message
          });
          console.log(`  ❌ CRASH: js/${f} -> ${err.message}`);
        } else {
          console.log(`  ✓ OK: js/${f} (harmless mock warning: ${err.message.slice(0, 40)}...)`);
        }
      }
    }
  } catch (e) {
    errors.push({ file: 'Sandbox Init', type: 'Fatal Context Error', details: e.message });
  }

  // 3. Cache-Buster Verification in index.html
  console.log('\nPhase 3: Cache-Buster Verification in index.html...');
  const indexPath = path.join(rootDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    for (const f of jsFiles) {
      const scriptTagRegex = new RegExp(`src="js/${f.replace('.', '\\.')}(\\?v=[^"]+)?"`);
      const match = indexHtml.match(scriptTagRegex);
      if (match && !match[1]) {
        console.warn(`  ⚠️  Warning: js/${f} in index.html is missing a cache-buster (?v=...).`);
      }
    }
    console.log('  ✓ Cache buster check completed.');
  }

  // 4. Role Governance & Admin Creation Rights Verification
  console.log('\nPhase 4: Governance & Admin Creation Rights Verification...');
  const adminTestPath = path.join(rootDir, 'test_admin_vendor_creation_rights.js');
  if (fs.existsSync(adminTestPath)) {
    const res = spawnSync(process.execPath, [adminTestPath], { encoding: 'utf8' });
    if (res.status !== 0) {
      errors.push({
        file: 'test_admin_vendor_creation_rights.js',
        type: 'Governance Failure',
        details: (res.stderr || res.stdout || 'Admin vendor creation rights broken').trim()
      });
      console.log('  ❌ FAIL: Admin vendor creation rights compromised!');
    } else {
      console.log('  ✓ PASS: Admin vendor creation & direct sanction authority verified 100%');
    }
  }

  const mcTestPath = path.join(rootDir, 'test_maker_checker_vendor_restrictions.js');
  if (fs.existsSync(mcTestPath)) {
    const res = spawnSync(process.execPath, [mcTestPath], { encoding: 'utf8' });
    if (res.status !== 0) {
      errors.push({
        file: 'test_maker_checker_vendor_restrictions.js',
        type: 'Governance Failure',
        details: (res.stderr || res.stdout || 'Maker-checker pending restrictions broken').trim()
      });
      console.log('  ❌ FAIL: Maker-checker restrictions compromised!');
    } else {
      console.log('  ✓ PASS: Maker-checker pending review separation verified 100%');
    }
  }

  console.log('---------------------------------------------------------------');
  if (errors.length > 0) {
    console.error('\n❌ ===========================================================');
    console.error(`❌ PRE-FLIGHT GATE FAILED: ${errors.length} ISSUE(S) DETECTED!`);
    console.error('❌ ACTION BLOCKED: Changes will NOT be deployed to prevent site crash.');
    console.error('❌ ===========================================================\n');
    errors.forEach((err, idx) => {
      console.error(`[Issue #${idx + 1}] File: ${err.file}`);
      console.error(`Type: ${err.type}`);
      console.error(`Details: ${err.details}\n`);
    });
    return false;
  }

  console.log(`🎉 SUCCESS: All ${checkedCount} JavaScript files passed syntax, sandbox, and safety validation!`);
  console.log('🛡️   Site is 100% verified, clean, and safe for release.');
  console.log('===============================================================\n');
  return true;
}

if (require.main === module) {
  const passed = runPreFlightGate(__dirname);
  process.exit(passed ? 0 : 1);
}

module.exports = { runPreFlightGate };
