const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const enterpriseCss = `
  <style id="enterprise-form-override">
    /* GLOBAL RADIUS LIMIT - 4px to 6px maximum */
    * {
      border-radius: 4px !important;
    }
    .rounded-full, [type="radio"], [class*="rounded-full"] * {
      border-radius: 9999px !important;
    }
    
    /* SHADOW REDUCTION - Remove excessive shadows globally */
    .shadow-xl, .shadow-lg, .shadow-2xl, .shadow-md {
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
    }
    .shadow-sm {
      box-shadow: none !important;
    }

    /* FORM SECTIONS - Convert boxed cards into open enterprise sections */
    /* Target divs inside forms or obvious content wrappers that have borders */
    form > div[class*="border"], 
    .border-slate-200[class*="p-"],
    .border-blue-200[class*="p-"],
    [class*="bg-blue-50/50"],
    [class*="bg-indigo-50/50"],
    [class*="bg-slate-50"] {
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      border-bottom: 1px solid #e2e8f0 !important;
      background: transparent !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    
    /* MODALS - Native enterprise dialog look */
    #modal-card, #stacked-modal-card {
      border: 1px solid #cbd5e1 !important;
      border-radius: 6px !important;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
    }
    
    /* Modal Header */
    #modal-card > div:first-child, 
    #stacked-modal-card > div:first-child,
    .border-b.border-slate-200 {
      border-bottom: 1px solid #e2e8f0 !important;
      padding: 12px 16px !important;
      background: #ffffff !important;
    }
    
    /* Modal Footer / Form Actions */
    .border-t.border-slate-200 {
      border-top: 1px solid #e2e8f0 !important;
      padding: 12px 16px !important;
      background: #f8fafc !important;
      margin-left: -20px !important;
      margin-right: -20px !important;
      margin-bottom: -20px !important;
      border-radius: 0 0 6px 6px !important;
    }

    /* INPUTS - Restrained rectangular style */
    input:not([type="checkbox"]):not([type="radio"]), select, textarea {
      border-radius: 4px !important;
      border: 1px solid #cbd5e1 !important;
      box-shadow: none !important;
      padding: 8px 12px !important;
      font-size: 13px !important;
      background-color: #ffffff !important;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
    }
    input:focus:not([type="checkbox"]):not([type="radio"]), select:focus, textarea:focus {
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 1px #3b82f6 !important;
      outline: none !important;
    }

    /* LABELS - Clean typography */
    label, .font-semibold {
      font-weight: 500 !important;
      color: #334155 !important;
    }

    /* BUTTONS - Compact and purposeful */
    button {
      border-radius: 4px !important;
      box-shadow: none !important;
      font-weight: 500 !important;
      padding: 6px 16px !important;
      font-size: 13px !important;
    }
    
    /* Primary buttons (blue, emerald, rose) */
    button[class*="bg-blue-"], button[class*="bg-emerald-"], button[class*="bg-rose-"], button[class*="bg-indigo-"] {
      border: 1px solid transparent !important;
      opacity: 0.95;
    }
    button[class*="bg-blue-"]:hover, button[class*="bg-emerald-"]:hover, button[class*="bg-rose-"]:hover {
      opacity: 1;
    }
    
    /* Secondary buttons (slate-100) */
    button[class*="bg-slate-100"], button[class*="bg-zinc-100"] {
      background-color: #ffffff !important;
      border: 1px solid #cbd5e1 !important;
      color: #334155 !important;
    }
    button[class*="bg-slate-100"]:hover, button[class*="bg-zinc-100"]:hover {
      background-color: #f1f5f9 !important;
      color: #0f172a !important;
    }

    /* Remove decorative background colors on sections */
    .bg-gradient-to-r {
      background: transparent !important;
    }
    
    /* Typography overrides for giant titles */
    .text-xl, .text-2xl, .text-3xl {
      font-size: 1.125rem !important; /* Reduce huge titles */
      font-weight: 600 !important;
      color: #0f172a !important;
    }
  </style>
`;

if (html.includes('<style id="enterprise-form-override">')) {
  html = html.replace(/<style id="enterprise-form-override">[\s\S]*?<\/style>/, enterpriseCss);
} else {
  html = html.replace('</head>', enterpriseCss + '\n</head>');
}

html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());

fs.writeFileSync('index.html', html);
