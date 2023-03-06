// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAWXsNIEbJM3njxhbB5HxkRyK32LWqvTZc",
    authDomain: "dropboxclone-70cdc.firebaseapp.com",
    projectId: "dropboxclone-70cdc",
    storageBucket: "dropboxclone-70cdc.appspot.com",
    messagingSenderId: "125471025667",
    appId: "1:125471025667:web:9a3486a35b0ccc6694fc36"
};

// Initialize Firebase
const mybase = initializeApp(firebaseConfig, 'myapp');
window.db = mybase;

