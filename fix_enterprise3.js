const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchStr = `    /* Modal Header */
    #modal-card > div:first-child, 
    #stacked-modal-card > div:first-child,
    .border-b.border-slate-200 {
      border-bottom: 1px solid #e2e8f0 !important;
      padding: 12px 16px !important;
      background: #ffffff !important;
    }
    
    /* Modal Footer / Form Actions */
    .border-t.border-slate-200 {`;

const replacement = `    /* Modal Header */
    #modal-card > div:first-child, 
    #stacked-modal-card > div:first-child {
      border-bottom: 1px solid #e2e8f0 !important;
      padding: 12px 16px !important;
      background: #ffffff !important;
    }
    
    /* Modal Footer / Form Actions */
    #modal-card .border-t.border-slate-200, 
    #stacked-modal-card .border-t.border-slate-200 {`;

html = html.replace(searchStr, replacement);
fs.writeFileSync('index.html', html);
