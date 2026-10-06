const firebaseConfig = {
  apiKey: "AIzaSyDf-a9ppIs9uUDUP0Y_K4YSOfA3FTI2B1g",
  authDomain: "adminutes-erp.firebaseapp.com",
  projectId: "adminutes-erp",
  storageBucket: "adminutes-erp.firebasestorage.app",
  messagingSenderId: "9398393204",
  appId: "1:9398393204:web:e62aaf0ca09c5dcc00b421",
  measurementId: "G-PFBLVTG21C",
  databaseURL: "https://adminutes-erp-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.CMS_FIREBASE_DB = firebase.database();
  console.log("Firebase Realtime Database Initialized!");
} else {
  console.warn("Firebase CDN failed to load.");
  window.CMS_FIREBASE_DB = null;
}
