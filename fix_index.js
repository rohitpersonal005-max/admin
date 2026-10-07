const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('\`n  <script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-auth-compat.js"></script>', '\\n<script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-auth-compat.js"></script>');
fs.writeFileSync('index.html', html);
console.log('Fixed index.html literal string');
