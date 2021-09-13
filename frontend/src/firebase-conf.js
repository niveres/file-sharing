import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyAdWFKdcz_ubc1eRMql3G73q__ZyM-mRlo",
    authDomain: "file-sharing-webtorrent.firebaseapp.com",
    databaseURL: "https://file-sharing-webtorrent-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "file-sharing-webtorrent",
    storageBucket: "file-sharing-webtorrent.appspot.com",
    messagingSenderId: "61414144998",
    appId: "1:61414144998:web:2a5099d41196b7def67427",
    measurementId: "G-SJPLMFF0RK"
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();