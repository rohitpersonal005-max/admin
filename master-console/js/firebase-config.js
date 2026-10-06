const firebaseConfig = {
  apiKey: "AIzaSyDf-a9ppIs9uUDUP0Y_K4YSOfA3FTI2B1g",
  authDomain: "adminutes-erp.firebaseapp.com",
  projectId: "adminutes-erp",
  storageBucket: "adminutes-erp.firebasestorage.app",
  messagingSenderId: "9398393204",
  appId: "1:9398393204:web:e62aaf0ca09c5dcc00b421",
  measurementId: "G-PFBLVTG21C",
  // Standard fallback database URL for Firebase Realtime Database
  databaseURL: "https://adminutes-erp-default-rtdb.firebaseio.com"
};

// Initialize Firebase using the Compat CDN method (Vanilla JS)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.CMS_FIREBASE_DB = firebase.database();
  console.log("🔥 Firebase Realtime Database Initialized with Live Config!");
} else {
  console.warn("⚠️ Firebase CDN failed to load. Running in offline/local mode.");
  window.CMS_FIREBASE_DB = null;
}
