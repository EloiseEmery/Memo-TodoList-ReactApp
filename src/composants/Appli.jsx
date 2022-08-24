import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import Taches from './Taches';
import Controle from './Controle';
import { useEffect, useState } from 'react';
import { observerEtatConnexion } from "../code/utilisateur";
import { creer } from "../code/tache";
import * as tachesModele from "../code/tache";

export default function Appli() {

	// Etat de la connexion de l'utilisateur
	const [utilisateur, setUtilisateur] = useState(null);

	// État des taches de l'utilisateur
	const [taches, setTaches] = useState([]);

	// Gestion la connexion de l'utilisateur
	useEffect(
		()  => observerEtatConnexion(setUtilisateur)
	, []); 

	/**
	 * Ajouter une tâche
	 * @param {string} texte  
	 * @param {boolean} etat 
	 */
	function ajouterTache(texte, etat) {
		creer(utilisateur.uid, {
			texte: texte,
			etat: etat
		  }).then(
			doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
		)
	}

	/**
	 * Supprimer toutes les tâches complétées
	 */
	function supprimerTaches() {
		let tachesComplete = taches.filter(tache => tache.etat === true)
		tachesModele.supprimerTachesComplete(utilisateur.uid, tachesComplete)
	}	

	/**
	 * Afficher les tâches selon les filtres (leur état) 
	 * @param {string} targ 
	 */
	function afficherTaches(targ) {
		let buttons = document.getElementsByClassName('ToggleButton');
	
		// Gestion de l'affichage du bouton selectionné
		for (let i = 0; i < buttons.length; i++) {
			if(buttons[i].classList.contains('Mui-selected')) {
				buttons[i].classList.remove('Mui-selected');
			}
			else if(buttons[i].value === targ) {
				buttons[i].classList.add('Mui-selected');
			}
		}

		// Récupérer les tâches selon la valeur du bouton sélectionné
		tachesModele.lireTout(utilisateur.uid).then(
			taches => {
				setTaches(taches);

				if(targ == 'false') {
					// Afficher les taches actives
					setTaches(taches.filter(tache => tache.etat === false));
				} 
				else if(targ == 'true') {
					// Afficher les taches complétées
					setTaches(taches.filter(tache => tache.etat === true));
				} 
				else {
					// Afficher toutes les taches
					setTaches(taches);
				}
			}
		)
	}

	return (
		utilisateur ?
		<div className="Appli">
			<Entete utilisateur={utilisateur}/>
			<Taches gererActionTache={ajouterTache} utilisateur={utilisateur} taches={taches} setTaches={setTaches} />
			<Controle gererActionControle={afficherTaches} supprimerTaches={supprimerTaches} taches={taches} setTaches={setTaches} />
		</div>
		:
		<Accueil />
	);
}