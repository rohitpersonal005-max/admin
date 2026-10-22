/**
 * CMS Checkpoint & Restore Utility
 * Allows taking full snapshots of the project state and instantly restoring if any error occurs.
 * 
 * Usage:
 *   node checkpoint.js create [name]    - Saves a snapshot of current workspace
 *   node checkpoint.js restore [name]   - Restores workspace to a snapshot (or latest if name omitted)
 *   node checkpoint.js list             - Lists all saved checkpoints
 */

const fs = require('fs');
const path = require('path');
const { runPreFlightGate } = require('./test_all.js');

const ROOT_DIR = __dirname;
const CHECKPOINTS_DIR = path.join(ROOT_DIR, '_checkpoints');

const EXCLUDE_DIRS = new Set(['_checkpoints', 'node_modules', '.git']);
const EXCLUDE_FILES = new Set(['.agy_sync.js']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      copyRecursive(srcPath, destPath);
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getCheckpoints() {
  ensureDir(CHECKPOINTS_DIR);
  const items = fs.readdirSync(CHECKPOINTS_DIR, { withFileTypes: true });
  const list = [];
  for (const item of items) {
    if (item.isDirectory()) {
      const manifestPath = path.join(CHECKPOINTS_DIR, item.name, 'manifest.json');
      let manifest = null;
      if (fs.existsSync(manifestPath)) {
        try {
          manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        } catch (_) {}
      }
      list.push({
        id: item.name,
        path: path.join(CHECKPOINTS_DIR, item.name),
        manifest
      });
    }
  }
  return list.sort((a, b) => b.id.localeCompare(a.id));
}

function createCheckpoint(label = 'manual') {
  ensureDir(CHECKPOINTS_DIR);
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const cleanLabel = (label || 'manual').replace(/[^a-zA-Z0-9_-]/g, '_');
  const checkpointId = `${timestamp}_${cleanLabel}`;
  const targetDir = path.join(CHECKPOINTS_DIR, checkpointId);

  console.log(`\n📦 Creating checkpoint: [${checkpointId}]...`);
  copyRecursive(ROOT_DIR, targetDir);

  const manifest = {
    id: checkpointId,
    label: label,
    createdAt: now.toISOString(),
    displayTime: now.toLocaleString()
  };
  fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✅ Checkpoint successfully created: ${checkpointId}`);
  console.log(`   Saved at: ${targetDir}`);
  return checkpointId;
}

function restoreCheckpoint(targetId) {
  const checkpoints = getCheckpoints();
  if (checkpoints.length === 0) {
    console.error('❌ No checkpoints found in _checkpoints directory.');
    process.exit(1);
  }

  let match = null;
  if (!targetId || targetId === 'latest') {
    match = checkpoints[0];
  } else {
    match = checkpoints.find(c => c.id === targetId || c.id.includes(targetId) || (c.manifest && c.manifest.label === targetId));
  }

  if (!match) {
    console.error(`❌ Checkpoint "${targetId}" not found. Run "node checkpoint.js list" to see options.`);
    process.exit(1);
  }

  console.log(`\n🔄 Restoring workspace from checkpoint: [${match.id}]...`);
  const entries = fs.readdirSync(match.path, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'manifest.json') continue;
    const srcPath = path.join(match.path, entry.name);
    const destPath = path.join(ROOT_DIR, entry.name);
    if (entry.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  console.log(`✅ Files restored from [${match.id}].`);
  console.log(`🔍 Running post-restore safety verification...`);
  const passed = runPreFlightGate(ROOT_DIR);
  if (passed) {
    console.log(`🎉 RESTORE COMPLETE: System is 100% verified and operational from checkpoint: [${match.id}]!`);
  } else {
    console.warn(`⚠️ Warning: Post-restore check reported issues. Please check output above.`);
  }
}

function listCheckpoints() {
  const list = getCheckpoints();
  console.log('\n===============================================================');
  console.log('📌 SAVED WORKSPACE CHECKPOINTS');
  console.log('===============================================================');
  if (list.length === 0) {
    console.log('No checkpoints created yet.');
  } else {
    list.forEach((cp, idx) => {
      const time = cp.manifest ? cp.manifest.displayTime : 'Unknown time';
      const label = cp.manifest ? cp.manifest.label : cp.id;
      console.log(`[${idx + 1}] ${cp.id}`);
      console.log(`    Label: "${label}" | Created: ${time}`);
    });
  }
  console.log('===============================================================\n');
}

// CLI execution
const [,, command, ...args] = process.argv;
const cmd = (command || 'list').toLowerCase();

if (cmd === 'create' || cmd === 'save') {
  createCheckpoint(args.join(' ') || 'stable_point');
} else if (cmd === 'restore' || cmd === 'revert') {
  restoreCheckpoint(args[0]);
} else if (cmd === 'list' || cmd === 'ls') {
  listCheckpoints();
} else {
  console.log('Usage:');
  console.log('  node checkpoint.js create [label]   - Create a checkpoint');
  console.log('  node checkpoint.js restore [label]  - Restore from checkpoint (or latest)');
  console.log('  node checkpoint.js list            - List all checkpoints');
}
