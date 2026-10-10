const fs = require('fs');
let code = fs.readFileSync('js/dashboard.js', 'utf8');

// I will append a getAlertsHtml() method and add it to render()
const renderReplace = `
  getAlertsHtml() {
    const store = window.CMS_STORE.data;
    const today = new Date().toISOString().split('T')[0];
    const alerts = [];

    // 1. Low Stock Alerts
    (store.consumables || []).forEach(item => {
      const stock = window.CMS_STORE.getStock(item.id);
      const buffer = Number(item.bufferStock || 0);
      if (stock <= buffer) {
        alerts.push({
          type: stock === 0 ? 'critical' : 'warning',
          title: 'Stock Alert: ' + item.materialName,
          message: stock === 0 ? 'Item is out of stock!' : \`Low stock (\${stock} \${item.unit}). Buffer is \${buffer}.\`,
          icon: 'package-minus'
        });
      }
    });

    // 2. Vendor Pending Approvals
    (store.vendors || []).forEach(v => {
      if (v.status === 'Pending') {
        alerts.push({
          type: 'info',
          title: 'Pending Vendor Approval',
          message: \`Vendor '\${v.name}' is waiting for approval.\`,
          icon: 'clock'
        });
      }

      // Check Expiries (Certificates)
      if (v.status === 'Approved' && v.certificates) {
        v.certificates.forEach(cert => {
          if (cert.alertDate && cert.alertDate <= today) {
            const isExpired = cert.validTill && cert.validTill < today;
            alerts.push({
              type: isExpired ? 'critical' : 'warning',
              title: 'Certificate ' + (isExpired ? 'Expired' : 'Expiring'),
              message: \`\${v.name}: \${cert.regulator || 'Certificate'} is \${isExpired ? 'expired' : 'expiring soon'}.\`,
              icon: 'file-warning'
            });
          }
        });
      }
      
      // Check Expiries (Quotations)
      if (v.status === 'Approved' && v.quotedItems) {
        v.quotedItems.forEach(q => {
          if (q.alertDate && q.alertDate <= today) {
            const isExpired = q.validTill && q.validTill < today;
            alerts.push({
              type: isExpired ? 'critical' : 'warning',
              title: 'Quotation ' + (isExpired ? 'Expired' : 'Expiring'),
              message: \`\${v.name}: Quotation \${q.quotationNo || ''} is \${isExpired ? 'expired' : 'expiring soon'}.\`,
              icon: 'file-warning'
            });
          }
        });
      }
      
      // Limited Period
      if (v.status === 'Approved' && v.approvedForLimitedPeriod && v.approvalAlertDate && v.approvalAlertDate <= today) {
         const isExpired = v.approvalValidTill && v.approvalValidTill < today;
         alerts.push({
            type: isExpired ? 'critical' : 'warning',
            title: 'Vendor Approval ' + (isExpired ? 'Expired' : 'Expiring'),
            message: \`\${v.name} limited approval is \${isExpired ? 'expired' : 'expiring soon'}.\`,
            icon: 'shield-alert'
         });
      }
    });

    if (alerts.length === 0) return '';

    const alertHtml = alerts.map(a => {
      let colors = 'bg-blue-50 border-blue-200 text-blue-800';
      let iconColor = 'text-blue-500';
      if (a.type === 'critical') {
        colors = 'bg-rose-50 border-rose-200 text-rose-800';
        iconColor = 'text-rose-500';
      } else if (a.type === 'warning') {
        colors = 'bg-amber-50 border-amber-200 text-amber-800';
        iconColor = 'text-amber-500';
      }
      return \`
        <div class="flex items-start gap-3 p-3 \${colors} border rounded-md shadow-sm">
          <i data-lucide="\${a.icon}" class="w-5 h-5 shrink-0 \${iconColor} mt-0.5"></i>
          <div>
            <h4 class="text-sm font-bold">\${a.title}</h4>
            <p class="text-xs mt-0.5 opacity-90">\${a.message}</p>
          </div>
        </div>
      \`;
    }).join('');

    return \`
      <div class="mt-12 mb-8">
        <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <i data-lucide="bell-ring" class="w-5 h-5 text-amber-500"></i>
          Notifications & Alerts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          \${alertHtml}
        </div>
      </div>
    \`;
  },

  render() {`;

code = code.replace(/render\(\) \{/, renderReplace);

const closingRegex = /<\/div>\s*<\/div>\s*`;\s*\}\s*\};\s*$/;
code = code.replace(closingRegex, `
        </div>
        \${this.getAlertsHtml()}
      </div>
    \`;
  }
};
`);

fs.writeFileSync('js/dashboard.js', code);
console.log('Appended notifications');
