const firebase = require('firebase/compat/app');
require('firebase/compat/database');
const firebaseConfig = {
  databaseURL: 'https://adminutes-erp-default-rtdb.firebaseio.com'
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
db.ref('test_connection').set({ timestamp: Date.now() })
  .then(() => {
    console.log('Successfully wrote to DB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to write to DB:', err);
    process.exit(1);
  });
