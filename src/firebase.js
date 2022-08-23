import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
        apiKey: "AIzaSyAeQioxA7l84L7W0v4nMYoZCicsqVyT-d0",
        authDomain: "dummy-project-c20d8.firebaseapp.com",
        databaseURL: "https://dummy-project-c20d8-default-rtdb.firebaseio.com",
        projectId: "dummy-project-c20d8",
        storageBucket: "dummy-project-c20d8.appspot.com",
        messagingSenderId: "887819222804",
        appId: "1:887819222804:web:1fb498348581d2e9020c01",
        measurementId: "G-VGLHS594WZ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();

