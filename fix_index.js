const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Completely strip old google fonts
html = html.replace(/<link rel="preconnect"[^>]+>\n/g, '');
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>\n/g, '');

// Strip old tailwind config script blocks
html = html.replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>/g, '');
html = html.replace(/<!-- Google Fonts[\s\S]*?-->/g, '');

const newHeadContent = `
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Newsreader', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
`;

html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/, newHeadContent);

fs.writeFileSync('index.html', html);
