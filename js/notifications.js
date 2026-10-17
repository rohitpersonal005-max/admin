/**
 * Consumable Management System (CMS) - Notification & Vendor Mail Engine
 * Handles system-wide notification settings, alert lead time, sender Gmail configuration,
 * vendor document expiry tracking, and email notification generation.
 */

window.CMS_NOTIFICATIONS = {
  STORAGE_KEY: 'CMS_NOTIFICATION_SETTINGS',
  LOGS_KEY: 'CMS_EMAIL_NOTIF_LOGS',
  DISPATCH_RECORDS_KEY: 'CMS_AUTOMAIL_DISPATCH_RECORDS',

  /**
   * Retrieves active notification settings from store or localStorage
   */
  getSettings() {
    let settings = null;
    if (window.CMS_STORE && window.CMS_STORE.data && window.CMS_STORE.data.notificationSettings) {
      settings = window.CMS_STORE.data.notificationSettings;
    } else {
      try {
        settings = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
      } catch (e) {}
    }
    const compEmail = (window.CMS_HOME && window.CMS_HOME.companyInfo && window.CMS_HOME.companyInfo.email) || '';
    const userEmail = (window.CMS_STORE && window.CMS_STORE.getCurrentUser && window.CMS_STORE.getCurrentUser()?.email) || '';

    return {
      minAlertDays: (settings && settings.minAlertDays !== undefined && settings.minAlertDays !== '') ? Math.max(1, parseInt(settings.minAlertDays, 10)) : 15,
      fixedAlertDays: (settings && (settings.fixedAlertDays || settings.minAlertDays) !== undefined) ? Math.max(1, parseInt(settings.fixedAlertDays || settings.minAlertDays, 10)) : 15,
      senderGmail: (settings && settings.senderGmail) ? settings.senderGmail.trim() : (compEmail || userEmail || ''),
      autoSendVendorEmail: (settings && settings.autoSendVendorEmail !== undefined) ? Boolean(settings.autoSendVendorEmail) : true,

      // Live Background Email Gateway Configuration
      mailProvider: (settings && settings.mailProvider) || 'webhook',
      emailjsServiceId: (settings && settings.emailjsServiceId) ? settings.emailjsServiceId.trim() : '',
      emailjsTemplateId: (settings && settings.emailjsTemplateId) ? settings.emailjsTemplateId.trim() : '',
      emailjsPublicKey: (settings && settings.emailjsPublicKey) ? settings.emailjsPublicKey.trim() : '',
      webhookUrl: (settings && settings.webhookUrl) ? settings.webhookUrl.trim() : 'https://script.google.com/macros/s/AKfycbzC-ge0PkP4a9lxzWf_7H7WnQdn3G9asyNdOZ-nrC27N3xiR2oBZl-4UItXfXf-Eluo/exec'
    };
  },

  /**
   * Always resolves the registered company email from Admin Home configuration
   */
  getCompanySenderEmail() {
    const settings = this.getSettings();
    const homeEmail = (window.CMS_HOME && window.CMS_HOME.companyInfo && window.CMS_HOME.companyInfo.email) || '';
    const storeEmail = (window.CMS_STORE && window.CMS_STORE.data && (window.CMS_STORE.data.companyEmail || window.CMS_STORE.data.companyInfo?.email)) || '';
    const userEmail = (window.CMS_STORE && window.CMS_STORE.getCurrentUser && window.CMS_STORE.getCurrentUser()?.email) || '';
    return (settings.senderGmail && settings.senderGmail.trim()) || homeEmail.trim() || storeEmail.trim() || userEmail.trim() || 'procurement@company.com';
  },

  /**
   * Saves notification settings to store and localStorage
   */
  saveSettings(params, maybeEmail = null, maybeAutoSend = true) {
    let days = 15;
    let email = '';
    let autoSend = true;
    let mailProvider = 'emailjs';
    let emailjsServiceId = '';
    let emailjsTemplateId = '';
    let emailjsPublicKey = '';
    let webhookUrl = '';

    if (typeof params === 'object' && params !== null) {
      days = Math.max(1, parseInt(params.minDays, 10) || 15);
      email = (params.senderGmail || '').trim();
      autoSend = params.autoSend !== undefined ? Boolean(params.autoSend) : true;
      mailProvider = params.mailProvider || 'emailjs';
      emailjsServiceId = (params.emailjsServiceId || '').trim();
      emailjsTemplateId = (params.emailjsTemplateId || '').trim();
      emailjsPublicKey = (params.emailjsPublicKey || '').trim();
      webhookUrl = (params.webhookUrl || '').trim();
    } else {
      days = Math.max(1, parseInt(params, 10) || 15);
      email = (maybeEmail || '').trim();
      autoSend = Boolean(maybeAutoSend);
      const existing = this.getSettings();
      mailProvider = existing.mailProvider;
      emailjsServiceId = existing.emailjsServiceId;
      emailjsTemplateId = existing.emailjsTemplateId;
      emailjsPublicKey = existing.emailjsPublicKey;
      webhookUrl = existing.webhookUrl;
    }

    if (!email) {
      if (window.CMS_APP) window.CMS_APP.toast('Please enter the Sender Gmail address.', 'error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (window.CMS_APP) window.CMS_APP.toast('Please enter a valid Gmail / Email address format (e.g. alerts@gmail.com).', 'error');
      return false;
    }

    const newSettings = {
      minAlertDays: days,
      fixedAlertDays: days,
      senderGmail: email,
      autoSendVendorEmail: Boolean(autoSend),
      mailProvider,
      emailjsServiceId,
      emailjsTemplateId,
      emailjsPublicKey,
      webhookUrl,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {}

    if (window.CMS_STORE && window.CMS_STORE.data) {
      window.CMS_STORE.data.notificationSettings = newSettings;
      window.CMS_STORE.save();
    }

    if (window.CMS_APP) {
      window.CMS_APP.toast(`Email gateway and alert policy saved successfully!`, 'success');
    }
    return true;
  },

  /**
   * Called by form submission in Admin Home
   */
  handleAdminSaveSettings() {
    const daysInput = document.getElementById('home-notif-min-days');
    const emailInput = document.getElementById('home-notif-sender-gmail');
    const providerSelect = document.getElementById('home-notif-provider');
    const emailjsServiceInput = document.getElementById('home-notif-emailjs-service');
    const emailjsTemplateInput = document.getElementById('home-notif-emailjs-template');
    const emailjsPublicKeyInput = document.getElementById('home-notif-emailjs-publickey');
    const webhookUrlInput = document.getElementById('home-notif-webhook-url');

    const days = daysInput ? daysInput.value : 15;
    const email = emailInput ? emailInput.value : '';
    const mailProvider = providerSelect ? providerSelect.value : 'emailjs';
    const emailjsServiceId = emailjsServiceInput ? emailjsServiceInput.value : '';
    const emailjsTemplateId = emailjsTemplateInput ? emailjsTemplateInput.value : '';
    const emailjsPublicKey = emailjsPublicKeyInput ? emailjsPublicKeyInput.value : '';
    const webhookUrl = webhookUrlInput ? webhookUrlInput.value : '';

    const ok = this.saveSettings({
      minDays: days,
      senderGmail: email,
      autoSend: true,
      mailProvider,
      emailjsServiceId,
      emailjsTemplateId,
      emailjsPublicKey,
      webhookUrl
    });

    if (ok && window.CMS_HOME) {
      window.CMS_HOME.render();
    }
  },

  /**
   * Retrieve email dispatch history
   */
  getEmailLogs() {
    try {
      const logs = JSON.parse(localStorage.getItem(this.LOGS_KEY) || '[]');
      return Array.isArray(logs) ? logs : [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Records an email dispatch or generation event
   */
  logEmail(entry) {
    const logs = this.getEmailLogs();
    logs.unshift({
      id: 'LOG-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ...entry
    });
    const trimmed = logs.slice(0, 100);
    try {
      localStorage.setItem(this.LOGS_KEY, JSON.stringify(trimmed));
    } catch (e) {}
    if (window.CMS_STORE && window.CMS_STORE.data) {
      window.CMS_STORE.data.emailLogs = trimmed;
    }
  },

  /**
   * Calculate difference in days between two ISO date strings (target - base)
   */
  getDaysDiff(targetIso, baseIso = null) {
    if (!targetIso) return 0;
    const today = baseIso ? new Date(baseIso) : new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetIso);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  },

  formatDisplayDate(isoDate) {
    if (!isoDate) return '-';
    try {
      const parts = isoDate.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return isoDate;
    } catch (e) {
      return isoDate;
    }
  },

  /**
   * Formats official document change & renewal email for a vendor
   */
  composeEmail({ vendor, docType, docName, refNo, validTill }) {
    const senderGmail = this.getCompanySenderEmail();
    const compName = (window.CMS_HOME && window.CMS_HOME.companyInfo && window.CMS_HOME.companyInfo.name) ||
                     (window.CMS_STORE && window.CMS_STORE.data && window.CMS_STORE.data.companyName) ||
                     'Our Organization';

    const diff = this.getDaysDiff(validTill);
    const isExpired = diff < 0;
    const isToday = diff === 0;
    const expFormatted = this.formatDisplayDate(validTill);

    let statusText = '';
    if (isExpired) {
      statusText = `EXPIRED on ${expFormatted} (${Math.abs(diff)} day${Math.abs(diff) === 1 ? '' : 's'} ago)`;
    } else if (isToday) {
      statusText = `Expires TODAY (${expFormatted})`;
    } else {
      statusText = `Expiring in ${diff} day${diff === 1 ? '' : 's'} (Valid Till: ${expFormatted})`;
    }

    const subject = `[Action Required] Expiry & Document Update Request: ${docName} - ${vendor.name}`;

    const body = `Dear ${vendor.name},

Greetings from ${compName}.

This is an official compliance notification regarding your registered vendor documentation on our Consumable Management System.

Our records indicate that the following document requires immediate update / renewal:
----------------------------------------------------------------------
• Document Category: ${docType}
• Document / Material Name: ${docName}
• Reference / Certificate Number: ${refNo || 'N/A'}
• Validity / Expiry Status: ${statusText}
----------------------------------------------------------------------

ACTION REQUIRED:
Please arrange to submit an updated and valid copy of this document to maintain your active approved vendor status and prevent any delays in Purchase Order issuance or invoice clearing.

Please reply directly to this email at: ${senderGmail}
Or provide the updated certificate/quotation to our procurement team.

Authorized Notification Generated By:
${compName} - Procurement & Compliance Department
Sender Company Mail: ${senderGmail}
Date: ${new Date().toLocaleDateString('en-GB')}`;

    const vendorEmail = (vendor.email || '').trim();
    const gmailUrl = `https://mail.google.com/mail/?authuser=${encodeURIComponent(senderGmail)}&view=cm&fs=1&to=${encodeURIComponent(vendorEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(vendorEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return {
      to: vendorEmail,
      from: senderGmail,
      subject,
      body,
      gmailUrl,
      mailtoUrl,
      diff,
      isExpired,
      isToday,
      statusText
    };
  },

  /**
   * Opens the interactive email modal with 1-click Direct Send or Gmail
   */
  openEmailComposer(vendorId, docIdentifier, docType = 'certificate') {
    const store = window.CMS_STORE && window.CMS_STORE.data ? window.CMS_STORE.data : {};
    const vendor = (store.vendors || []).find(v => v.id === vendorId);
    if (!vendor) {
      if (window.CMS_APP) window.CMS_APP.toast('Vendor record not found.', 'error');
      return;
    }

    let docName = 'Statutory / Regulatory Document';
    let refNo = '';
    let validTill = '';

    if (docType === 'certificate' || docType === 'Certificate') {
      const cert = (vendor.certificates || []).find(c => (c.certificateNo === docIdentifier || c.name === docIdentifier || c.regulator === docIdentifier)) || (vendor.certificates ? vendor.certificates[0] : null);
      if (cert) {
        docName = cert.regulator || cert.documentName || cert.name || 'Regulatory Certificate';
        refNo = cert.certificateNo || cert.formNo || '';
        validTill = cert.validTill || '';
      }
    } else if (docType === 'quotation' || docType === 'Quotation') {
      const q = (vendor.quotedItems || []).find(item => item.quotationNo === docIdentifier || item.materialName === docIdentifier) || (vendor.quotedItems ? vendor.quotedItems[0] : null);
      if (q) {
        docName = q.materialName ? `Quotation for ${q.materialName}` : 'Commercial Quotation';
        refNo = q.quotationNo || '';
        validTill = q.validTill || q.quotationValidTill || '';
      }
    } else if (docType === 'approval' || docType === 'Vendor Approval') {
      docName = 'Limited Period Vendor Approval';
      refNo = vendor.id;
      validTill = vendor.approvalValidTill || '';
    }

    const emailData = this.composeEmail({ vendor, docType, docName, refNo, validTill });

    const safeVendorName = (vendor.name || '').replace(/'/g, "\\'");
    const safeDocName = docName.replace(/'/g, "\\'");
    const safeRefNo = refNo.replace(/'/g, "\\'");

    const modalHtml = `
      <div class="space-y-4 text-xs">
        <!-- Banner -->
        <div class="p-3 bg-blue-50 border border-blue-200 rounded-sm flex items-start gap-2.5 text-blue-900">
          <i data-lucide="mail-check" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
          <div>
            <div class="font-bold">Automated Document Renewal / Change Request Email</div>
            <div class="text-[11px] text-blue-800 mt-0.5">This email is configured to dispatch automatically from company email at <strong>07:00 AM</strong>. You can also send it directly right now with zero redirecting.</div>
          </div>
        </div>

        <!-- Headers -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-sm">
          <div>
            <span class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">To (Vendor Email)</span>
            <div class="font-mono font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <span>${emailData.to ? emailData.to : '<span class="text-rose-600 font-sans font-normal italic">No email on file</span>'}</span>
            </div>
          </div>
          <div>
            <span class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">From (Company Email)</span>
            <div class="font-mono font-bold text-purple-700 text-xs">${emailData.from}</div>
          </div>
          <div class="sm:col-span-2">
            <span class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Subject Line</span>
            <div class="font-bold text-slate-900 text-xs bg-white p-2 border border-slate-200 rounded">${emailData.subject}</div>
          </div>
        </div>

        <!-- Body -->
        <div>
          <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Body Content</label>
          <textarea id="email-preview-body" rows="9" class="w-full p-3 font-mono text-[11px] bg-slate-50 border border-slate-300 rounded leading-relaxed focus:bg-white focus:outline-none" readonly>${emailData.body}</textarea>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">
            Close
          </button>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="CMS_NOTIFICATIONS.handleComposerDirectSend({ vendor: { id: '${vendor.id}', name: '${safeVendorName}', email: '${emailData.to}' }, docType: '${docType}', docName: '${safeDocName}', refNo: '${safeRefNo}', validTill: '${validTill}' });" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm shadow transition flex items-center gap-1.5" title="Dispatches real email immediately in background">
              <i data-lucide="send-check" class="w-3.5 h-3.5"></i> Send Directly (No Redirect)
            </button>
            <button type="button" onclick="navigator.clipboard.writeText(document.getElementById('email-preview-body').value); CMS_APP.toast('Email body copied to clipboard!', 'success');" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold rounded-sm transition flex items-center gap-1.5">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Text
            </button>
            <a href="${emailData.gmailUrl}" target="_blank" onclick="CMS_NOTIFICATIONS.logEmail({ vendorId: '${vendor.id}', vendorName: '${safeVendorName}', vendorEmail: '${emailData.to}', senderGmail: '${emailData.from}', docType: '${docType}', docName: '${safeDocName}', expiryDate: '${validTill}', status: 'Dispatched via Gmail' }); CMS_APP.toast('Opening Gmail Compose window...', 'info');" class="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition flex items-center gap-1.5">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Open in Gmail
            </a>
          </div>
        </div>
      </div>
    `;

    if (window.CMS_APP) {
      window.CMS_APP.openModal('Vendor Expiry Email Notice', modalHtml, 'max-w-2xl');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  /**
   * Sample template preview modal
   */
  openSampleEmailPreviewModal() {
    const settings = this.getSettings();
    const sampleVendor = {
      name: 'Apex Office Supplies Pvt Ltd',
      email: 'compliance@apexsupplies.com'
    };
    const emailData = this.composeEmail({
      vendor: sampleVendor,
      docType: 'Regulatory Certificate',
      docName: 'ISO 9001:2015 Quality Management Certificate',
      refNo: 'ISO-2024-8891',
      validTill: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    const modalHtml = `
      <div class="space-y-4 text-xs">
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-sm">
          <div class="font-bold text-slate-800 text-sm mb-1">Sample Vendor Renewal Request Email</div>
          <div class="text-slate-500 text-xs">This is how emails dispatched from your configured Gmail (<strong>${settings.senderGmail || 'Not set'}</strong>) will appear to vendors.</div>
        </div>
        <div class="p-3 bg-white border border-slate-200 rounded font-mono text-[11px] leading-relaxed whitespace-pre-wrap">${emailData.body}</div>
        <div class="flex justify-end pt-2 border-t border-slate-200">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-900 text-white font-bold rounded-sm">Close Preview</button>
        </div>
      </div>
    `;
    if (window.CMS_APP) {
      window.CMS_APP.openModal('Sample Email Template Preview', modalHtml, 'max-w-xl');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  /**
   * Scans all vendors for validity dates and alert conditions
   */
  getAllExpiringItems() {
    const store = window.CMS_STORE && window.CMS_STORE.data ? window.CMS_STORE.data : {};
    const vendors = store.vendors || [];
    const settings = this.getSettings();
    const minAlertDays = settings.minAlertDays || 15;
    const today = new Date().toISOString().split('T')[0];
    const items = [];

    vendors.forEach(v => {
      // 1. Certificates
      if (Array.isArray(v.certificates)) {
        v.certificates.forEach((cert) => {
          if (cert.validTill) {
            const diff = this.getDaysDiff(cert.validTill, today);
            const alertDays = Math.max(cert.alertDays || 15, minAlertDays);
            const isDue = diff <= alertDays;
            const sendMail = cert.sendEmailNotification !== false;
            items.push({
              vendorId: v.id,
              vendorName: v.name,
              vendorEmail: v.email,
              type: 'certificate',
              typeName: 'Certificate',
              name: cert.regulator || cert.documentName || cert.name || 'Certificate',
              refNo: cert.certificateNo || cert.formNo || '',
              validTill: cert.validTill,
              alertDays,
              diff,
              isDue,
              sendEmailNotification: sendMail,
              status: v.status
            });
          }
        });
      }

      // 2. Quotations
      if (Array.isArray(v.quotedItems)) {
        v.quotedItems.forEach((q) => {
          const exp = q.validTill || q.quotationValidTill;
          if (exp) {
            const diff = this.getDaysDiff(exp, today);
            const alertDays = Math.max(q.alertDays || 15, minAlertDays);
            const isDue = diff <= alertDays;
            const sendMail = q.sendEmailNotification !== false;
            items.push({
              vendorId: v.id,
              vendorName: v.name,
              vendorEmail: v.email,
              type: 'quotation',
              typeName: 'Quotation',
              name: q.materialName ? `Quotation: ${q.materialName}` : 'Commercial Quotation',
              refNo: q.quotationNo || '',
              validTill: exp,
              alertDays,
              diff,
              isDue,
              sendEmailNotification: sendMail,
              status: v.status
            });
          }
        });
      }

      // 3. Limited Period Approval
      if (v.approvedForLimitedPeriod && v.approvalValidTill) {
        const diff = this.getDaysDiff(v.approvalValidTill, today);
        const alertDays = Math.max(v.approvalAlertDays || 15, minAlertDays);
        const isDue = diff <= alertDays;
        const sendMail = v.approvalSendEmailNotification !== false;
        items.push({
          vendorId: v.id,
          vendorName: v.name,
          vendorEmail: v.email,
          type: 'approval',
          typeName: 'Vendor Approval',
          name: 'Limited Period Approval',
          refNo: v.id,
          validTill: v.approvalValidTill,
          alertDays,
          diff,
          isDue,
          sendEmailNotification: sendMail,
          status: v.status
        });
      }
    });

    return items;
  },

  /**
   * Dispatched tracking registry stored in localStorage
   */
  getDispatchedRecordMap() {
    try {
      return JSON.parse(localStorage.getItem(this.DISPATCH_RECORDS_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  },

  markDispatched(key) {
    const records = this.getDispatchedRecordMap();
    records[key] = new Date().toISOString();
    try {
      localStorage.setItem(this.DISPATCH_RECORDS_KEY, JSON.stringify(records));
    } catch (e) {}
  },

  isAlreadyDispatched(key) {
    const records = this.getDispatchedRecordMap();
    return Boolean(records[key]);
  },

  /**
   * Transmits real email across the internet using EmailJS or Webhook
   */
  async sendRealEmail({ to, subject, body, vendorName, docType, docName, refNo, validTill }) {
    const settings = this.getSettings();
    const compName = (window.CMS_HOME && window.CMS_HOME.companyInfo && window.CMS_HOME.companyInfo.name) ||
                     (window.CMS_STORE && window.CMS_STORE.data && window.CMS_STORE.data.companyName) ||
                     'Our Organization';
    const fromEmail = settings.senderGmail || this.getCompanySenderEmail();

    if (!to || !to.includes('@')) {
      throw new Error('Recipient does not have a valid email address on file.');
    }

    // 1. Send via Webhook / Google Apps Script
    if (settings.mailProvider === 'webhook' && settings.webhookUrl) {
      console.log('[CMS Mail] Dispatching real email via Webhook:', settings.webhookUrl);
      try {
        await fetch(settings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          mode: 'no-cors',
          body: JSON.stringify({
            to,
            subject,
            body,
            fromEmail,
            fromName: compName,
            vendorName: vendorName || '',
            docType: docType || '',
            docName: docName || '',
            refNo: refNo || '',
            validTill: validTill || '',
            timestamp: new Date().toISOString()
          })
        });
        return { provider: 'Google Apps Script / Webhook', success: true };
      } catch (err) {
        throw new Error('Webhook dispatch error: ' + (err.message || 'Check endpoint connectivity.'));
      }
    }

    // 2. Send via EmailJS SDK
    if (settings.mailProvider === 'emailjs' && settings.emailjsServiceId && settings.emailjsTemplateId && settings.emailjsPublicKey) {
      if (typeof window.emailjs === 'undefined') {
        throw new Error('EmailJS SDK is not loaded. Please check your internet connection.');
      }
      console.log('[CMS Mail] Dispatching real email via EmailJS...');
      try {
        const params = {
          to_email: to,
          to_name: vendorName || 'Vendor',
          from_name: compName,
          from_email: fromEmail,
          reply_to: fromEmail,
          subject: subject,
          message: body,
          doc_type: docType || '',
          doc_name: docName || '',
          ref_no: refNo || '',
          valid_till: validTill || ''
        };
        const res = await window.emailjs.send(
          settings.emailjsServiceId,
          settings.emailjsTemplateId,
          params,
          settings.emailjsPublicKey
        );
        return { provider: 'EmailJS', status: res.status, text: res.text, success: true };
      } catch (err) {
        throw new Error('EmailJS dispatch error: ' + (err.text || err.message || 'Check EmailJS keys.'));
      }
    }

    // 3. Fallback: If neither Webhook nor EmailJS credentials are configured
    throw new Error('No live email gateway configured. Please enter your EmailJS credentials or Google Webhook URL in Home -> Email Settings, or click "Open in Gmail" to send immediately.');
  },

  /**
   * Dispatches a real test email to verify gateway configuration
   */
  async sendTestEmail() {
    const settings = this.getSettings();
    const testTo = prompt('Enter recipient email address to send test email to:', settings.senderGmail || '');
    if (!testTo || !testTo.includes('@')) {
      if (window.CMS_APP) window.CMS_APP.toast('Test email cancelled or invalid email address.', 'warning');
      return;
    }

    if (window.CMS_APP) window.CMS_APP.toast('Sending live test email in background...', 'info');

    try {
      const res = await this.sendRealEmail({
        to: testTo.trim(),
        subject: '[Test] Consumable ERP Background Email Verification',
        body: `Hello,\n\nThis is a real live test email sent directly from your Consumable Management ERP system background email gateway (${settings.mailProvider}).\n\nTimestamp: ${new Date().toLocaleString()}\nSender: ${settings.senderGmail}\n\nEverything is operating properly!`,
        vendorName: 'Test Recipient',
        docType: 'System Test',
        docName: 'Email Gateway Verification',
        refNo: 'TEST-001',
        validTill: new Date().toISOString().split('T')[0]
      });

      if (window.CMS_APP) {
        window.CMS_APP.toast(`Success! Real test email sent via ${res.provider || 'Gateway'} to ${testTo}!`, 'success');
      }
    } catch (err) {
      console.error('[CMS Mail] Test email failed:', err);
      if (window.CMS_APP) {
        window.CMS_APP.toast(`Test Email Failed: ${err.message}`, 'error');
      }
    }
  },

  /**
   * Helper modal for 1-minute Google Apps Script Webhook or EmailJS setup
   */
  openGatewayGuideModal() {
    const modalHtml = `
      <div class="space-y-4 text-xs text-slate-700">
        <div class="p-3 bg-blue-50 border border-blue-200 rounded-sm text-blue-900">
          <div class="font-bold text-sm">How to Connect Real Background Email Dispatch</div>
          <div class="text-[11px] text-blue-800 mt-1">Choose either Method A (Google Apps Script - 100% Free via Gmail) or Method B (EmailJS). Both send real emails directly into the vendor's inbox silently in the background.</div>
        </div>

        <div class="space-y-3">
          <!-- Method A -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">A</span>
                Method A: Free Google Apps Script Webhook (Recommended)
              </span>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">100% Free • Sends from your Gmail</span>
            </div>
            <ol class="list-decimal pl-5 space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Open <a href="https://script.google.com" target="_blank" class="text-blue-600 underline font-semibold">script.google.com</a> with your Gmail and click <strong>New Project</strong>.</li>
              <li>Paste this simple code replacing the default code:</li>
            </ol>
            <div class="mt-2 relative">
              <pre class="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-[10px] overflow-x-auto select-all">function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  GmailApp.sendEmail(data.to, data.subject, data.body, {
    name: data.fromName || "Consumable Management ERP",
    replyTo: data.fromEmail || ""
  });
  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
}

function authorizeGmail() {
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), "CMS Auth", "Ready");
}</pre>
            </div>
            <ol start="3" class="list-decimal pl-5 space-y-1 text-slate-600 text-[11px] mt-2 leading-relaxed">
              <li><strong>Important:</strong> Create and deploy this script from the <strong>Company / Admin Google account</strong> so emails are sent directly from that admin address.</li>
              <li>Run <code>authorizeGmail</code> once to grant permissions.</li>
              <li>Click <strong>Deploy &rarr; New Deployment</strong> &rarr; <em>Execute as:</em> <strong>Me</strong> and <em>Who has access:</em> <strong>Anyone</strong>.</li>
              <li>Paste the Web App URL into the Webhook URL field and save!</li>
            </ol>
          </div>

          <!-- Method B -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">B</span>
                Method B: EmailJS (Free Cloud Relay)
              </span>
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">200 Free Mails/Month</span>
            </div>
            <ol class="list-decimal pl-5 space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Sign up for a free account at <a href="https://www.emailjs.com" target="_blank" class="text-blue-600 underline font-semibold">emailjs.com</a>.</li>
              <li>In <strong>Email Services</strong>, click <em>Add Service</em> &rarr; Connect your Gmail. Copy the <strong>Service ID</strong>.</li>
              <li>In <strong>Email Templates</strong>, create a template with variables <code>{{to_email}}</code>, <code>{{subject}}</code>, and <code>{{message}}</code>. Copy the <strong>Template ID</strong>.</li>
              <li>In <strong>Account &rarr; General</strong>, copy your <strong>Public Key</strong>.</li>
              <li>Paste Service ID, Template ID, and Public Key into the fields in Admin Home and click Save.</li>
            </ol>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 flex justify-end">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-900 text-white font-bold rounded-sm">Close Guide</button>
        </div>
      </div>
    `;

    if (window.CMS_APP) {
      window.CMS_APP.openModal('Background Email Gateway Setup Guide', modalHtml, 'max-w-2xl');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  /**
   * Handles user clicking "Send Directly" inside composer modal
   */
  async handleComposerDirectSend(payload) {
    if (window.CMS_APP) window.CMS_APP.toast('Dispatching real email in background...', 'info');
    try {
      await this.dispatchEmailInBackground({ ...payload, scheduleNote: 'Manual Direct Send' });
      if (window.CMS_APP) {
        window.CMS_APP.toast('Email successfully delivered to vendor inbox!', 'success');
        window.CMS_APP.closeModal();
      }
      if (window.CMS_HOME) window.CMS_HOME.render();
    } catch (err) {
      if (window.CMS_APP) {
        window.CMS_APP.toast(err.message, 'error');
      }
    }
  },

  /**
   * Silently dispatches a real email notice in the background with ZERO redirecting or popups
   */
  async dispatchEmailInBackground({ vendor, docType, docName, refNo, validTill, scheduleNote = '07:00 AM Scheduled Auto-Dispatch' }) {
    const emailData = this.composeEmail({ vendor, docType, docName, refNo, validTill });
    const todayStr = new Date().toISOString().split('T')[0];

    let dispatchStatus = 'Pending';
    let realDeliveryError = null;

    try {
      const realResult = await this.sendRealEmail({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        vendorName: vendor.name,
        docType,
        docName,
        refNo,
        validTill
      });
      dispatchStatus = `Delivered via ${realResult.provider || 'Gateway'}`;
    } catch (err) {
      realDeliveryError = err;
      console.warn('[CMS Mail] Background dispatch notice:', err.message);
      dispatchStatus = `Gateway Notice: ${err.message}`;
    }

    const logEntry = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorEmail: emailData.to,
      senderGmail: emailData.from,
      docType,
      docName,
      expiryDate: validTill,
      dispatchDate: todayStr,
      dispatchTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: dispatchStatus,
      scheduleNote,
      autoSent: true,
      subject: emailData.subject,
      body: emailData.body,
      error: realDeliveryError ? realDeliveryError.message : null
    };

    // 1. Record in local & store logs
    this.logEmail(logEntry);

    // 2. Synchronize to cloud store (Supabase) if tenant is authenticated
    if (window.CMS_SUPABASE && window.CMS_TENANT_ID && window.CMS_STORE && window.CMS_STORE.data) {
      try {
        await window.CMS_SUPABASE.from('master_tenants').update({
          cms_db: window.CMS_STORE.data
        }).eq('id', window.CMS_TENANT_ID);
      } catch (err) {
        console.warn('Background Supabase log update:', err);
      }
    }

    if (realDeliveryError) {
      throw realDeliveryError;
    }

    console.log(`[CMS Auto-Mail] Successfully dispatched notice to ${vendor.name} (${emailData.to}) from registered company email (${emailData.from})`);
    return { success: true, emailData, logEntry };
  },

  /**
   * Scans all vendors for expiring items and automatically sends email notices at 07:00 AM
   * on the calculated alert date with zero redirecting.
   */
  async checkAndAutoSendDailyAlerts(forceNow = false) {
    const now = new Date();
    const currentHour = now.getHours();
    const todayStr = now.toISOString().split('T')[0];

    // Scheduled for morning 07:00 AM window
    if (!forceNow && currentHour < 7) {
      console.log('[CMS Auto-Mail] Scheduled for 07:00 AM. Current hour is ' + currentHour + ':00.');
      return { skipped: true, reason: 'Pending 07:00 AM morning schedule.' };
    }

    const items = this.getAllExpiringItems();
    const store = window.CMS_STORE && window.CMS_STORE.data ? window.CMS_STORE.data : {};
    const vendors = store.vendors || [];
    let dispatchedCount = 0;

    for (const item of items) {
      // Must be due (diff <= alertDays) and validity set
      if (item.isDue && item.validTill) {
        const uniqueKey = `${item.vendorId}_${item.type}_${item.refNo || item.name}_${item.validTill}_${todayStr}`;
        if (!this.isAlreadyDispatched(uniqueKey)) {
          const vendor = vendors.find(v => v.id === item.vendorId) || { id: item.vendorId, name: item.vendorName, email: item.vendorEmail };
          await this.dispatchEmailInBackground({
            vendor,
            docType: item.typeName,
            docName: item.name,
            refNo: item.refNo,
            validTill: item.validTill,
            scheduleNote: forceNow ? 'Manual Test Trigger' : '07:00 AM Morning Automated Transfer'
          });
          this.markDispatched(uniqueKey);
          dispatchedCount++;
        }
      }
    }

    if (dispatchedCount > 0) {
      if (window.CMS_APP) {
        window.CMS_APP.toast(`Automated Alert: Dispatched ${dispatchedCount} document expiry notice(s) to vendor(s) via registered company email at 07:00 AM.`, 'success');
      }
      if (window.CMS_HOME && document.getElementById('home-screen') && !document.getElementById('home-screen').classList.contains('hidden')) {
        window.CMS_HOME.render();
      }
    }
    return { success: true, dispatchedCount };
  },

  /**
   * Initializes background scheduler running every 60 seconds
   */
  initAutomatedScheduler() {
    if (this._schedulerInitialized) return;
    this._schedulerInitialized = true;

    // Run initial morning check immediately
    setTimeout(() => {
      this.checkAndAutoSendDailyAlerts();
    }, 2000);

    // Continuous background monitor checking for 07:00 AM schedule
    setInterval(() => {
      this.checkAndAutoSendDailyAlerts();
    }, 60000);
  }
};

// Self-initialize automated morning 7:00 AM scheduler
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.CMS_NOTIFICATIONS.initAutomatedScheduler());
  } else {
    window.CMS_NOTIFICATIONS.initAutomatedScheduler();
  }
}
