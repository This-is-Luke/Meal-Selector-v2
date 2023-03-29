const firebaseConfig = {
    apiKey: "AIzaSyA_HKZblEVsab0DSsXC-zBBeG85vkCy0UI",
    authDomain: "mealsorterdb.firebaseapp.com",
    databaseURL:"https://mealsorterdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mealsorterdb",
    storageBucket: "mealsorterdb.appspot.com",
    messagingSenderId: "979856310386",
    appId: "1:979856310386:web:71481e6e912953ce4e02eb",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

