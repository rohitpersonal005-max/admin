/**
 * Consumable Management System - Lightweight HTTP Server
 * Uses native Node.js http module (no npm dependencies required).
 * Run with: agy-node.cmd server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;
const SESSION_COOKIE = 'cms_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const USERS_FILE = path.join(ROOT, 'users.json');
const sessions = new Map();

const DEFAULT_USERS = [
  { id: 'EMP-2041', username: 'rajesh', password: 'adminutes123', name: 'Rajesh Kumar', role: 'User', department: 'Central Warehouse & Logistics', email: 'rajesh.kumar@adminutes.corp' },
  { id: 'MGR-8812', username: 'anita', password: 'checker4321', name: 'Col. Anita Sharma', role: 'Admin', department: 'Materials & Directorate of Supplies', email: 'anita.sharma@adminutes.corp' },
  { id: 'EMP-3099', username: 'rohit', password: 'rohit123', name: 'Rohit Sharma', role: 'User', department: 'Administration & Operations', email: 'rohit.sharma@adminutes.corp' }
];

function loadUsers() {
  let users = DEFAULT_USERS;
  try {
    const storedUsers = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    if (Array.isArray(storedUsers) && storedUsers.length) users = storedUsers;
  } catch (error) {
    console.warn('Unable to load users.json; using default users.');
  }

  const maker = users.find(user => user.role === 'User');
  const checker = users.find(user => user.role === 'Admin');
  if (maker) {
    maker.username = process.env.CMS_MAKER_USERNAME || maker.username;
    maker.password = process.env.CMS_MAKER_PASSWORD || maker.password;
  }
  if (checker) {
    checker.username = process.env.CMS_CHECKER_USERNAME || checker.username;
    checker.password = process.env.CMS_CHECKER_PASSWORD || checker.password;
  }
  return users;
}

let AUTH_USERS = loadUsers();

function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(AUTH_USERS, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseCookies(req) {
  return (req.headers.cookie || '').split(';').reduce((cookies, part) => {
    const separator = part.indexOf('=');
    if (separator > -1) {
      cookies[part.slice(0, separator).trim()] = decodeURIComponent(part.slice(separator + 1).trim());
    }
    return cookies;
  }, {});
}

function getSession(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  const session = token && sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return session;
}

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024) req.destroy();
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    department: user.department || 'Central Warehouse & Logistics',
    email: user.email || '', modules: user.modules || ['Inventory', 'Transactions', 'Reports']
  };
}

function getSessionUser(req) {
  const session = getSession(req);
  return session ? AUTH_USERS.find(user => user.id === session.user.id) : null;
}

function publicUsersFor(user) {
  if (!user) return [];
  // Admin can view other roles, users, AND their plain-text passwords
  if (user.role === 'Admin') {
    return AUTH_USERS.map(u => ({ ...publicUser(u), password: u.password }));
  }
  // Operation person (User) cannot see profiles of other roles or users
  return [publicUser(user)];
}

async function handleApi(req, res) {
  const requestPath = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname;
  const apiPath = requestPath.replace(/^\/api(?=\/|$)/, '') || '/';

  if (apiPath === '/session' && req.method === 'GET') {
    const session = getSession(req);
    sendJson(res, 200, { authenticated: Boolean(session), user: session ? session.user : null });
    return true;
  }

  if (apiPath === '/users' && req.method === 'GET') {
    const user = getSessionUser(req);
    if (!user) {
      sendJson(res, 401, { error: 'Authentication required.' });
      return true;
    }
    sendJson(res, 200, { users: publicUsersFor(user) });
    return true;
  }

  if (apiPath === '/users' && req.method === 'POST') {
    const checker = getSessionUser(req);
    if (!checker || checker.role !== 'Admin') {
      sendJson(res, 403, { error: 'Only the Store Admin can add makers.' });
      return true;
    }

    try {
      const input = await readJson(req);
      const username = String(input.username || '').trim().toLowerCase();
      const password = String(input.password || '');
      const name = String(input.name || '').trim();
      const department = String(input.department || 'Central Warehouse & Logistics').trim();
      const email = String(input.email || '').trim();

      if (!/^[a-z0-9._-]{3,40}$/.test(username) || password.length < 8 || name.length < 2) {
        sendJson(res, 400, { error: 'Enter a valid name, username, and password of at least 8 characters.' });
        return true;
      }
      if (AUTH_USERS.some(user => user.username === username)) {
        sendJson(res, 409, { error: 'That username is already in use.' });
        return true;
      }

      const makerNumber = AUTH_USERS.filter(user => user.role === 'User').length + 1;
      const newUser = {
        id: `EMP-${String(2041 + makerNumber).padStart(4, '0')}`,
        username,
        password,
        name,
        role: 'User',
        department: department || 'Central Warehouse & Logistics',
        email
      };
      AUTH_USERS.push(newUser);
      saveUsers();
      sendJson(res, 201, { user: publicUser(newUser) });
    } catch (error) {
      sendJson(res, 400, { error: 'Invalid request body.' });
    }
    return true;
  }

  if (apiPath.startsWith('/users/') && req.method === 'PUT') {
    const sessionUser = getSessionUser(req);
    if (!sessionUser || sessionUser.role !== 'Admin') {
      sendJson(res, 403, { error: 'Only Admin can update users.' });
      return true;
    }
    
    const userId = apiPath.split('/')[2];
    const targetUser = AUTH_USERS.find(u => u.id === userId);
    if (!targetUser) {
      sendJson(res, 404, { error: 'User not found.' });
      return true;
    }

    try {
      const input = await readJson(req);
      if (input.name) targetUser.name = String(input.name).trim();
      if (input.username) targetUser.username = String(input.username).trim().toLowerCase();
      if (input.password) targetUser.password = String(input.password);
      if (input.email !== undefined) targetUser.email = String(input.email).trim();
      if (input.modules) targetUser.modules = input.modules;
      if (input.role) targetUser.role = input.role;

      saveUsers();
      sendJson(res, 200, { user: publicUser(targetUser) });
    } catch (e) {
      sendJson(res, 400, { error: 'Invalid request body.' });
    }
    return true;
  }

  if (apiPath.startsWith('/users/') && req.method === 'DELETE') {
    const sessionUser = getSessionUser(req);
    if (!sessionUser || sessionUser.role !== 'Admin') {
      sendJson(res, 403, { error: 'Only Admin can delete users.' });
      return true;
    }
    const userId = apiPath.split('/')[2];
    AUTH_USERS = AUTH_USERS.filter(u => u.id !== userId);
    saveUsers();
    sendJson(res, 200, { success: true });
    return true;
  }

  if (apiPath === '/login' && req.method === 'POST') {
    try {
      const { username, password } = await readJson(req);
      const user = AUTH_USERS.find(candidate => candidate.username === String(username || '').trim().toLowerCase());
      const suppliedPassword = Buffer.from(String(password || ''));
      const expectedPassword = user && Buffer.from(user.password);
      const validPassword = Boolean(user && suppliedPassword.length === expectedPassword.length && crypto.timingSafeEqual(suppliedPassword, expectedPassword));
      if (!user || !validPassword) {
        sendJson(res, 401, { error: 'Invalid username or password.' });
        return true;
      }

      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, { user: publicUser(user), expiresAt: Date.now() + SESSION_TTL_MS });
      sendJson(res, 200, { authenticated: true, user: publicUser(user) }, {
        'Set-Cookie': `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`
      });
    } catch (error) {
      sendJson(res, 400, { error: 'Invalid request body.' });
    }
    return true;
  }

  if (apiPath === '/logout' && req.method === 'POST') {
    const token = parseCookies(req)[SESSION_COOKIE];
    if (token) sessions.delete(token);
    sendJson(res, 200, { authenticated: false }, {
      'Set-Cookie': `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
    });
    return true;
  }

  if (requestPath.startsWith('/api/')) {
    sendJson(res, 404, { error: 'API endpoint not found.' });
    return true;
  }

  return false;
}

function serveStatic(req, res) {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function requestHandler(req, res) {
  handleApi(req, res).then(handled => {
    if (!handled) serveStatic(req, res);
  }).catch(() => sendJson(res, 500, { error: 'Internal server error.' }));
}

if (require.main === module) {
  const server = http.createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Adminutes - Consumable ERP System server is running!`);
    console.log(`Primary URL: http://localhost:${PORT}`);
    console.log(`Alternative: http://localhost:3000`);
    console.log(`Press Ctrl+C to terminate.`);
    console.log(`=======================================================`);
  });
  if (PORT !== 3000) {
    const server3000 = http.createServer(requestHandler);
    server3000.on('error', () => {});
    server3000.listen(3000, () => {
      console.log(`Secondary listener active on http://localhost:3000`);
    });
  }
}

module.exports = requestHandler;
