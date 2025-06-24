
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "firebase/auth";
import { getFirestore , collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCyofe3QjWi35deY0ihY5BG_Uwc9cr-yqA",
  authDomain: "netflix-clone-de18d.firebaseapp.com",
  projectId: "netflix-clone-de18d",
  storageBucket: "netflix-clone-de18d.firebasestorage.app",
  messagingSenderId: "600435124959",
  appId: "1:600435124959:web:dbe470abe22a0d6cff976a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password) => {
    console.log('credentials',name,email,password)
    try {
        const res = await createUserWithEmailAndPassword(auth , email , password)
        const user = res.user
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            toast.error('This email is already registered. Please log in instead.');
        } else {
            console.error(error);
            toast.error(error.code.split('/')[1].split('-').join(' '))
        }   
    }   
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth , email , password)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth)
}

export {
    auth,
    db,
    signup,
    login,
    logout
}