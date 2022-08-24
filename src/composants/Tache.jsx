import './Tache.scss';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

export default function Tache({id, texte, etat, dateAjout, modifierEtat, supprimerTache}) {
	let tabMois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"),
	dateTache = new Date(dateAjout.seconds*1000)

	return (
		<div className={etat ? 'Tache complete' : 'Tache'}>
			<div className='container'>
				<CheckBoxTwoToneIcon className='checkIcone' onClick={ e => modifierEtat(etat, id, e.target.parentNode.parentNode.parentNode)}/>
				<span>{texte}</span>
			</div>
			<div className='container'>
				<small>Ajouté le {dateTache.getDate() + " " + tabMois[dateTache.getMonth()] + " " + dateTache.getFullYear() + " à " + dateTache.getHours() + ":" + dateTache.getMinutes() + ":" + dateTache.getSeconds()}</small>
				<DeleteTwoToneIcon className='deleteTache' onClick={ e => supprimerTache(id)}/>
			</div>
		</div>
	);
}