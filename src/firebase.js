// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5LgVm0I_X9MDWYwAT4yn_rkdZi3v5Ja4",
  authDomain: "netflix-clone-9e54c.firebaseapp.com",
  projectId: "netflix-clone-9e54c",
  storageBucket: "netflix-clone-9e54c.firebasestorage.app",
  messagingSenderId: "467149311772",
  appId: "1:467149311772:web:6f570b33b7ea49741074d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }
    catch (error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
    }
    catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));        
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };