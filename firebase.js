import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDdMi-1Ku0WazcXsUUFDzIwt5dPfbJxFoc",
    authDomain: "whatsapp-clone-eb827.firebaseapp.com",
    projectId: "whatsapp-clone-eb827",
    storageBucket: "whatsapp-clone-eb827.appspot.com",
    messagingSenderId: "186497849953",
    appId: "1:186497849953:web:997cdd4bad5f90a82f2820"
  };

  const app=!firebase.apps.length? firebase.initializeApp(firebaseConfig):firebase.app();
  const db=app.firestore();
  const auth=app.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider};