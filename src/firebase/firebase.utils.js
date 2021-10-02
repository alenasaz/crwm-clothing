import firebase from 'firebase/compat/app';
import   'firebase/compat/firestore';
import 'firebase/compat/auth';

const config ={
        apiKey: "AIzaSyBKN-Re7ugvuGWWSOzQXwsAh2oH6iK0Bb8",
        authDomain: "crwn-db-891d0.firebaseapp.com",
        projectId: "crwn-db-891d0",
        storageBucket: "crwn-db-891d0.appspot.com",
        messagingSenderId: "213926448309",
        appId: "1:213926448309:web:db64f5d45efcdb1abe42fc",
        measurementId: "G-WQDEB3QQDR"
      
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
        if(!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = userRef.get();

        if(!snapShot.exists) {
                const {displayName, email } = userAuth;
                const createdAt = new Date();
        

        try {
                await userRef.set({
                        displayName,
                        email, 
                        createdAt,
                        ...additionalData
                })
        } catch(error) {
                console.log('error creating user', error.message);

        }
}
return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

