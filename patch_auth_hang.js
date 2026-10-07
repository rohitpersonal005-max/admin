const fs = require('fs');
let code = fs.readFileSync('js/auth.js', 'utf8');

const targetLogin = `  async handleUserLogin(user) {
    console.log("Logged in as:", user.email);
    this.db = firebase.database();`;

const replaceLogin = `  async handleUserLogin(user) {
    console.log("Logged in as:", user.email);
    
    // CRITICAL FIREBASE FIX: When Firebase Auth logs in, it aggressively resets the Realtime Database websocket connection to re-authenticate it.
    // If we fire database queries immediately, they will hang infinitely in a pending state! 
    // We must wait 2 seconds for the websocket to reconnect before querying.
    console.log("Waiting for Firebase websocket to stabilize...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.db = firebase.database();`;

code = code.replace(targetLogin, replaceLogin);
fs.writeFileSync('js/auth.js', code);
console.log('Successfully patched auth.js to prevent websocket hang');
