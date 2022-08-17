import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc, 
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIDTFwmVe1jYWl6bPHpvo3n46Y6bHl4m8",
    authDomain: "crown-clothing-db-6a9d0.firebaseapp.com",
    projectId: "crown-clothing-db-6a9d0",
    storageBucket: "crown-clothing-db-6a9d0.appspot.com",
    messagingSenderId: "585195765718",
    appId: "1:585195765718:web:eafc64fa577e3df91a2e77"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();  
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//database
const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    //users: user collection
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    
    //check if user data exist
    if(!userSnapshot.exists()){
        const{displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        } catch(err) {
            console.log('error in creating user', err.message);
        }
    } 
    //return userDocRef if the userSnapshot.exist() is true
    return userDocRef;
}

