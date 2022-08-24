import './ListeTaches.scss';
import Tache from './Tache';
import * as tachesModele from "../code/tache";
import { useEffect } from 'react';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

export default function ListeTaches({idUtilisateur, taches, setTaches}) {
	
	// Afficher toutes les tâches
	useEffect(
		() => {
			tachesModele.lireTout(idUtilisateur).then(
				tachesFS => {
					setTaches(tachesFS);
				}
		  	)
		}
	  , [idUtilisateur, setTaches]); 

	/**
	 * Supprimer une tâche
	 * @param {string} idTache 
	 */
	function supprimerTache(idTache) {
		tachesModele.supprimer(idUtilisateur, idTache).then(
			() => setTaches(taches.filter(
			  tache => tache.id !== idTache
			))
		);
	}

	/**
	 * Modifier l'état d'une tâche
	 * @param {boolean} etatActuel 
	 * @param {string} idTache 
	 * @param {object} tache 
	 */
	function modifierEtat(etatActuel, idTache, tache) {
		// Modifier la classe selon l'état
		let nvEtat = null;
		if(etatActuel == false) {
			nvEtat = true;
			tache.classList.add('complete');
		} else {
			nvEtat = false;
			tache.classList.remove('complete');
		}

		// Récupérer les nouvelles données de la tâche
		const objetNouvellesValeursEtatTache = {
			etat: nvEtat
		}
		
		// Modifier la tâche dans Firestore
		tachesModele.modifierEtat(idUtilisateur, idTache, objetNouvellesValeursEtatTache).then(
			() => setTaches(taches.map(
				tache => {
					if(tache.id === idTache) {
						tache.etat = nvEtat;
					}
					return tache;
				}
			))
		);
	}

	return (
		taches.length != 0 ? 
		<div className='ListeTaches'>
			{
				taches.map(
					tache => <div key={tache.id}>
							<Tache 
								{...tache}
								supprimerTache={supprimerTache}
								modifierEtat={modifierEtat}
							/>	
							</div>
				)
			}
		</div>
		: <div className='emptyList'><TaskOutlinedIcon className='iconeTask' /></div>
	);
}