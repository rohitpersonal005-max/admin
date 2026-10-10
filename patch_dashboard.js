const fs = require('fs');
let code = fs.readFileSync('js/dashboard.js', 'utf8');

const expiryLogic = `
      // Upcoming Expiries & Limits
      const todayDate = new Date().toISOString().split('T')[0];
      const todayTime = new Date(todayDate).getTime();
      let expiringItems = [];

      (store.vendors || []).forEach(v => {
         if (v.status === 'Approved' && v.approvedForLimitedPeriod && v.approvalAlertDate && v.approvalAlertDate <= todayDate && v.approvalValidTill) {
             const expTime = new Date(v.approvalValidTill).getTime();
             const diff = Math.ceil((expTime - todayTime) / (1000 * 60 * 60 * 24));
             expiringItems.push({ type: 'vendors', entity: v.name, context: 'Limited Period Approval', diff, exp: v.approvalValidTill });
         }
         if (v.status === 'Approved' && v.certificates) {
             v.certificates.forEach(c => {
                 if (c.alertDate && c.alertDate <= todayDate && c.validTill) {
                     const expTime = new Date(c.validTill).getTime();
                     const diff = Math.ceil((expTime - todayTime) / (1000 * 60 * 60 * 24));
                     expiringItems.push({ type: 'vendors', entity: v.name, context: 'Certificate (' + (c.regulator || 'Unknown') + ')', diff, exp: c.validTill });
                 }
             });
         }
         if (v.status === 'Approved' && v.quotedItems) {
             v.quotedItems.forEach(q => {
                 if (q.alertDate && q.alertDate <= todayDate && q.validTill) {
                     const expTime = new Date(q.validTill).getTime();
                     const diff = Math.ceil((expTime - todayTime) / (1000 * 60 * 60 * 24));
                     expiringItems.push({ type: 'vendors', entity: v.name, context: 'Quotation (' + (q.quotationNo || 'Direct') + ')', diff, exp: q.validTill });
                 }
             });
         }
      });

      if (expiringItems.length > 0) {
          expiringItems.sort((a,b) => a.diff - b.diff);
          const topExp = expiringItems[0];
          alerts.push({
            id: 'expiry-alert-' + expiringItems.length + '-' + topExp.diff,
            type: topExp.type,
            tone: topExp.diff < 0 ? 'red' : 'amber',
            icon: 'clock',
            label: topExp.diff < 0 ? 'EXPIRED DOCUMENTATION' : 'UPCOMING EXPIRY',
            title: expiringItems.length + ' document(s) breached alert thresholds.',
            details: 'Emails dispatched! Timer: ' + topExp.entity + '\\'s ' + topExp.context + (topExp.diff < 0 ? ' expired ' + Math.abs(topExp.diff) + ' days ago' : ' expires in ' + topExp.diff + ' days') + ' (' + topExp.exp + ').',
            actionLabel: 'Review Limits'
          });
      }
      return alerts;
    },`;

code = code.replace(/return alerts;\s*\},\s*renderPriorityPanel\(\)/g, expiryLogic + '\n\n  renderPriorityPanel()');

fs.writeFileSync('js/dashboard.js', code);
console.log('Added alert logic to dashboard.');
