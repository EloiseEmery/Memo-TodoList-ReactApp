import './Taches.scss';
import ListeTaches from './ListeTaches';
import { useState, useEffect } from 'react';
import * as tachesModele from '../code/tache';

export default function Taches({utilisateur, gererActionTache, taches, setTaches}) {
	const [texte, setTexte] = useState('');

	/**
	 * Gérer l'envoi du formulaire d'ajout de tâche
	 * @param {evt} e 
	 */
	function gererFormAjout(e) {
		e.preventDefault();
		if(texte.trim() !== '') {
			// Ajouter la nouvelle tâche
			gererActionTache(texte, false);
			// Nettoyer le formulaire
			document.getElementById('error').innerText = '';
			document.querySelector('input').value = '';
			// Reinitialiser la valeur du texte
			setTexte(' ');
		} else {
			// Afficher un message d'erreur
			document.getElementById('error').innerText = 'Veuillez entrer un texte.';
		}
	}

	return (
		<section className='Taches'>
			<small id='error'></small>
			<form onSubmit={gererFormAjout}>
				<input type="text" placeholder="Ajouter une tâche" name="texteTache" autoComplete='off' onChange={e => setTexte(e.target.value)}/>
				<button type="submit" hidden>Submit</button>
			</form>
			<ListeTaches idUtilisateur={utilisateur.uid} taches={taches} setTaches={setTaches} />
		</section>
	);
}