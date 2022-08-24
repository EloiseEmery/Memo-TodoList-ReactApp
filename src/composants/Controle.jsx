import './Controle.scss';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';

export default function Controle({supprimerTaches, taches, gererActionControle}) {

	const nbTachesRestantes = calculerTachesRestantes(taches);

	return (
		<footer className="Controle">
			<ToggleButtonGroup className='buttonGroup'>
				<ToggleButton className="ToggleButton Mui-selected" value="toutes" aria-label="left aligned" onClick={e => gererActionControle(e.target.value)} >
					Toutes
				</ToggleButton>
				<ToggleButton  className="ToggleButton" value="true" aria-label="centered" onClick={e => gererActionControle(e.target.value)}>
					Complétées
				</ToggleButton>
				<ToggleButton  className="ToggleButton" value="false" aria-label="right aligned" onClick={e => gererActionControle(e.target.value)}>
					Actives
				</ToggleButton>
			</ToggleButtonGroup>
			<span className='compte'>{ nbTachesRestantes == 1 ? nbTachesRestantes + " " + 'tâche restante' : nbTachesRestantes == 0 ? 'Aucune tâche restante' : nbTachesRestantes + " " + 'tâches restantes' }</span>
			<DeleteSweepTwoToneIcon className='delete' onClick={e => supprimerTaches()}/>
		</footer>
	);
}

/**
 * Calculer le nombre de tâches restantes
 * @param {object} taches 
 * @returns {number} tachesRestantes
 */
function calculerTachesRestantes(taches) {
	let tachesRestantes = 0;
	for (let i = 0; i < taches.length; i++) {
		if(taches[i].etat === false) {
			tachesRestantes++;
		}
	}
	return tachesRestantes;
}