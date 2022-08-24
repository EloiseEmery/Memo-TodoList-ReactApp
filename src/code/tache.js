import { bdFirestore } from "./init";
import { getDocs, query, collection, orderBy, addDoc, getDoc, Timestamp, doc, deleteDoc, updateDoc, store } from "firebase/firestore";

/**
 * Lire toutes les taches d'un utilisateur
 * @param {string} idUtilisateur 
 * @returns {object} Promise
 */
export async function lireTout(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches')
		, orderBy('etat', 'asc'))
    )
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}


/**
 * Créer une nouvelle tache pour un utilisateur
 * @param {string} idUtilisateur 
 * @param {object} infoTache 
 * @returns {object} Promise
 */
export async function creer(idUtilisateur, infoTache) {
    infoTache.dateAjout = Timestamp.now();
    let refDoc = await addDoc(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), infoTache);
    return await getDoc(refDoc);
}


/**
 * Supprimer une tache pour un utilisateur
 * @param {string} idUtilisateur 
 * @param {string} idTache 
 * @returns {object} Promise
 */
export async function supprimer(idUtilisateur, idTache) {
	let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await deleteDoc(refDoc);
}


/**
 * Supprimer toutes les taches complétées de l'utilisateur
 * @param {string} idUtilisateur 
 * @param {object} tachesComplete
 * @returns {object} Promise
 */
export async function supprimerTachesComplete(idUtilisateur, tachesComplete) {
	const promises = tachesComplete.map((tachesComplete) => deleteDoc(doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', tachesComplete['id'])))
	return await Promise.all(promises)
}


/**
 * Modifier l'état d'une tache pour un utilisateur
 * @param {string} idUtilisateur 
 * @param {string} idTache 
 * @param {object} objModif 
 * @returns {object} Promise
 */
export async function modifierEtat(idUtilisateur, idTache, objModif) {
	let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await updateDoc(refDoc, objModif);
}