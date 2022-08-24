import { authFirebase, authGoogle, bdFirestore } from "./init";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/**
 * Authentifier l'utilisateur avec Google
 */
export function connexion() {
    signInWithPopup(authFirebase, authGoogle);
}


/**
 * Gérer la connexion de l'utilisateur
 * @param {function} mutateurEtatUtilisateur 
 */
export function observerEtatConnexion(mutateurEtatUtilisateur) {
    onAuthStateChanged(authFirebase, 
        util => {
            if(util) {
                sauvegarderProfil(util);
            }
            mutateurEtatUtilisateur(util);
        }
    )
}


/**
 * Déconnexion de l'utilisateur
 */
export function deconnexion() {
    authFirebase.signOut();
}


/**
 * Sauvegarder le profil de l'utilisateur dans la base de données
 * @param {object} util 
 */
function sauvegarderProfil(util) {
    setDoc(
        doc(bdFirestore, 'utilisateurs', util.uid),
        {
            nom: util.displayName,
            courriel: util.email,
            avatar: util.photoURL
        }, 
        {merge: true}
    );
}