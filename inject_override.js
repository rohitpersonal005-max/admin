const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const overrideCss = `
  <style id="design-override">
    /* Global Editorial/Structural Overrides */
    body, main, #view-container, #main-content { 
      background: #ffffff !important; 
      color: #09090b !important; 
      font-family: 'Inter', sans-serif !important;
    }
    
    h1, h2, h3, h4, h5, .font-serif, [class*="text-2xl"], [class*="text-3xl"] { 
      font-family: 'Newsreader', serif !important; 
      letter-spacing: -0.02em !important; 
      color: #09090b !important;
    }
    
    .font-mono { 
      font-family: 'JetBrains Mono', monospace !important; 
      font-size: 0.9em !important;
    }

    /* Destroy "AI/SaaS" generic soft aesthetics */
    * { 
      border-radius: 0px !important; 
      box-shadow: none !important; 
    }

    /* Flatten and structure containers */
    [class*="bg-gradient-to-r"], [class*="from-blue-"], [class*="to-indigo-"] {
      background: transparent !important;
      border: 1px solid #e4e4e7 !important;
      padding: 1.5rem !important;
    }
    
    /* Convert generic colored backgrounds to stark white or zinc */
    [class*="bg-blue-50"], [class*="bg-indigo-50"], [class*="bg-slate-50"], [class*="bg-emerald-50"], [class*="bg-rose-50"] {
      background: #fafafa !important;
      border: 1px solid #e4e4e7 !important;
    }

    /* Typography hierarchy overrides */
    [class*="text-xs uppercase"], [class*="tracking-wider"] {
      font-family: 'Inter', sans-serif !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      color: #71717a !important;
    }

    /* Buttons: Monochromatic and Sharp */
    button[class*="bg-blue-600"], button[class*="bg-indigo-600"], button[class*="bg-emerald-600"], button[class*="bg-slate-900"], button[class*="bg-zinc-900"] {
      background-color: #09090b !important;
      color: #ffffff !important;
      font-weight: 500 !important;
      font-family: 'Inter', sans-serif !important;
      border: 1px solid #09090b !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      font-size: 11px !important;
    }
    
    button[class*="bg-white"]:not([id*="sidebar"]) {
      background-color: #ffffff !important;
      color: #09090b !important;
      border: 1px solid #d4d4d8 !important;
    }

    /* Inputs: Crisp and structural */
    input, select, textarea {
      background: #fafafa !important;
      border: 1px solid #d4d4d8 !important;
      font-family: 'Inter', sans-serif !important;
      color: #09090b !important;
    }
    input:focus, select:focus, textarea:focus {
      background: #ffffff !important;
      border-color: #09090b !important;
      outline: none !important;
      box-shadow: inset 0 0 0 1px #09090b !important;
    }
    
    /* Remove generic colored text */
    .text-blue-600, .text-indigo-600, .text-blue-700, .text-indigo-700 {
      color: #09090b !important;
    }
    
    /* Layout styling for sidebar and header */
    #sidebar {
      background: #fafafa !important;
      border-right: 1px solid #e4e4e7 !important;
    }
    #sidebar button {
      color: #52525b !important;
      padding-left: 1rem !important;
    }
    #sidebar button:hover {
      background: #f4f4f5 !important;
      color: #09090b !important;
      border-left: 2px solid #09090b !important;
    }
    
    /* Modal Overrides */
    #modal-card, #stacked-modal-card {
      border: 2px solid #09090b !important;
    }
  </style>
`;
if (html.includes('<style id="design-override">')) {
  html = html.replace(/<style id="design-override">[\s\S]*?<\/style>/, overrideCss);
} else {
  html = html.replace('</head>', overrideCss + '\n</head>');
}

html = html.replace(/\?v=[0-9_]+/g, '?v=' + Date.now());

fs.writeFileSync('index.html', html);
