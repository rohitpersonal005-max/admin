/**
 * Server-backed authentication bootstrap.
 * The application UI is initialized only after a valid session is confirmed.
 */
window.CMS_AUTH = {
  async getSession() {
    const response = await fetch('/api/session', { credentials: 'same-origin' });
    return response.json();
  },

  async loadUsers() {
    const response = await fetch('/api/users', { credentials: 'same-origin' });
    if (!response.ok) throw new Error('Unable to load users.');
    const result = await response.json();
    if (window.CMS_STORE) window.CMS_STORE.setUsers(result.users);
  },

  async login(username, password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to sign in.');
    return result;
  },

  async logout() {
    await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.reload();
  },

  showLogin(message = '') {
    const gate = document.getElementById('auth-gate');
    const error = document.getElementById('auth-error');
    if (gate) gate.classList.remove('hidden');
    if (error) {
      error.textContent = message;
      error.classList.toggle('hidden', !message);
    }
  },

  async hideLogin(user) {
    const gate = document.getElementById('auth-gate');
    if (gate) gate.classList.add('hidden');
    try {
      await this.loadUsers();
    } catch (error) {
      // Keep the built-in profile fallback if user listing is temporarily unavailable.
    }
    if (window.CMS_STORE && user) window.CMS_STORE.setCurrentUser(user.id);
    if (window.CMS_APP) window.CMS_APP.init();
  },

  async init() {
    const form = document.getElementById('auth-form');
    const submit = document.getElementById('auth-submit');
    const error = document.getElementById('auth-error');
    if (form) {
      form.addEventListener('submit', async event => {
        event.preventDefault();
        error.classList.add('hidden');
        submit.disabled = true;
        submit.textContent = 'Signing in...';
        try {
          const result = await this.login(
            document.getElementById('auth-username').value,
            document.getElementById('auth-password').value
          );
          this.hideLogin(result.user);
        } catch (loginError) {
          this.showLogin(loginError.message);
        } finally {
          submit.disabled = false;
          submit.textContent = 'Sign in';
        }
      });
    }

    try {
      const session = await this.getSession();
      if (session.authenticated) this.hideLogin(session.user);
      else this.showLogin();
    } catch (error) {
      this.showLogin('The authentication service is unavailable. Start the Node server and try again.');
    }
  }
};

window.addEventListener('DOMContentLoaded', () => window.CMS_AUTH.init());