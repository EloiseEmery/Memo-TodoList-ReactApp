import './Accueil.scss';
import logoGoogle from '../images/google-logo.png';
import { connexion } from "../code/utilisateur";

export default function Accueil() {
	return (
	<div className="Accueil">
		<h3 className="logo">Memo</h3>
		<div className="conteneur-boutons-connexion">
		<span className="btn-google" onClick={connexion}>
			<img className="btn-image" src={logoGoogle} alt="Logo Google"/>
			<span className="btn-texte">S'authentifier avec Google</span>
		</span>
		</div>
	</div>
	);
}