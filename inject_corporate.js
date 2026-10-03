const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip old enterprise override if it exists
html = html.replace(/<style id="enterprise-form-override">[\s\S]*?<\/style>/, '');
html = html.replace(/<style id="corporate-professional-override">[\s\S]*?<\/style>/, '');

const corporateCss = `
  <style id="corporate-professional-override">
    /* =========================================================
       CORPORATE & PROFESSIONAL ERP OVERRIDE 
       ========================================================= */
       
    /* 1. TYPOGRAPHY: Strict, clean sans-serif only. No editorial serifs. */
    body, main, #view-container, #main-content { 
      background: #f3f4f6 !important; /* Corporate light grey background */
      color: #1f2937 !important; 
      font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
      font-size: 13px !important; /* Standard dense enterprise base size */
    }
    
    h1, h2, h3, h4, h5, .font-serif, [class*="text-2xl"], [class*="text-3xl"] { 
      font-family: 'Inter', 'Segoe UI', Roboto, sans-serif !important; 
      letter-spacing: -0.01em !important; 
      color: #111827 !important;
      font-weight: 600 !important;
    }
    
    .font-mono { 
      font-family: 'IBM Plex Mono', 'Consolas', monospace !important; 
      font-size: 12px !important;
    }

    /* 2. GEOMETRY: Strict 2px radius (Windows/Desktop software feel) */
    * { 
      border-radius: 2px !important; 
      box-shadow: none !important; 
    }
    .rounded-full, [type="radio"], [class*="rounded-full"] * {
      border-radius: 9999px !important;
    }

    /* 3. SHADOWS & DEPTH: Extremely flat, subtle native shadows for modals only */
    .shadow-xl, .shadow-lg, .shadow-2xl, .shadow-md, .shadow-sm {
      box-shadow: none !important;
    }

    /* 4. MODALS: Classic Dialog boxes */
    #modal-card, #stacked-modal-card {
      border: 1px solid #9ca3af !important;
      border-radius: 4px !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
      background: #ffffff !important;
    }
    #modal-card > div:first-child, #stacked-modal-card > div:first-child {
      border-bottom: 1px solid #e5e7eb !important;
      padding: 10px 16px !important;
      background: #f8fafc !important; /* Slight grey header for structural distinction */
    }
    #modal-card .border-t.border-slate-200, #stacked-modal-card .border-t.border-slate-200 {
      border-top: 1px solid #e5e7eb !important;
      padding: 10px 16px !important;
      background: #f8fafc !important;
    }

    /* 5. FORM LAYOUTS: Professional groupings */
    form > div[class*="border"], 
    .border-slate-200[class*="p-"],
    .border-blue-200[class*="p-"],
    [class*="bg-blue-50/50"],
    [class*="bg-indigo-50/50"] {
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      border-bottom: 1px solid #d1d5db !important; /* Neutral corporate border */
      background: transparent !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-bottom: 20px !important;
    }
    
    /* 6. INPUTS: Sharp, functional */
    input:not([type="checkbox"]):not([type="radio"]), select, textarea {
      border-radius: 2px !important;
      border: 1px solid #9ca3af !important;
      padding: 6px 10px !important;
      font-size: 13px !important;
      background-color: #ffffff !important;
      color: #111827 !important;
      min-height: 32px !important;
    }
    input:focus:not([type="checkbox"]):not([type="radio"]), select:focus, textarea:focus {
      border-color: #1e40af !important; /* Corporate Blue Focus */
      box-shadow: 0 0 0 1px #1e40af !important;
      outline: none !important;
    }
    
    /* 7. LABELS */
    label, .font-semibold {
      font-weight: 600 !important;
      color: #374151 !important;
      font-size: 12px !important;
      margin-bottom: 4px !important;
    }

    /* 8. BUTTONS: Corporate Navy & Stark Grey */
    button {
      border-radius: 2px !important;
      font-weight: 500 !important;
      padding: 5px 14px !important;
      font-size: 13px !important;
      transition: all 0.1s ease !important;
      min-height: 32px !important;
    }
    /* Primary Action */
    button[class*="bg-blue-"], button[class*="bg-emerald-"], button[class*="bg-rose-"], button[class*="bg-indigo-"] {
      background-color: #1e40af !important; /* Corporate Navy */
      border: 1px solid #1e3a8a !important;
      color: #ffffff !important;
    }
    button[class*="bg-blue-"]:hover, button[class*="bg-emerald-"]:hover, button[class*="bg-rose-"]:hover {
      background-color: #1e3a8a !important;
      border-color: #172554 !important;
    }
    
    /* Secondary Action */
    button[class*="bg-slate-100"], button[class*="bg-zinc-100"], button[class*="bg-white"] {
      background-color: #f3f4f6 !important;
      border: 1px solid #d1d5db !important;
      color: #374151 !important;
    }
    button[class*="bg-slate-100"]:hover, button[class*="bg-zinc-100"]:hover, button[class*="bg-white"]:hover {
      background-color: #e5e7eb !important;
      border-color: #9ca3af !important;
      color: #111827 !important;
    }

    /* 9. SIDEBAR & HEADER: Institutional Trust Colors */
    #sidebar {
      background: #111827 !important; /* Deep Dark Corporate Blue/Grey */
      border-right: 1px solid #1f2937 !important;
    }
    #sidebar .text-slate-300 {
      color: #9ca3af !important;
    }
    #sidebar button:hover {
      background: #1f2937 !important;
      color: #ffffff !important;
      border-left: 3px solid #3b82f6 !important; /* Sharp blue accent */
    }
    
    /* App Header */
    .h-16.bg-white.border-b.border-slate-200 {
      background: #ffffff !important;
      border-bottom: 1px solid #d1d5db !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
    }

    /* 10. REMOVE GRADIENTS AND SASSY COLORS */
    .bg-gradient-to-r, [class*="bg-slate-50"] {
      background: transparent !important;
    }
    
    /* Title sizing */
    .text-xl, .text-2xl, .text-3xl {
      font-size: 18px !important; 
      font-weight: 600 !important;
    }
    
    /* Table headers */
    th {
      background-color: #f3f4f6 !important;
      border-bottom: 2px solid #d1d5db !important;
      border-top: 1px solid #e5e7eb !important;
      color: #374151 !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      font-size: 11px !important;
      letter-spacing: 0.05em !important;
    }
    td {
      border-bottom: 1px solid #e5e7eb !important;
    }
  </style>
`;

html = html.replace('</head>', corporateCss + '\n</head>');
html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());

fs.writeFileSync('index.html', html);
