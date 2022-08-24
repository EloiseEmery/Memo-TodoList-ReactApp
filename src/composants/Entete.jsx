import './Entete.scss';
import Avatar from '@mui/material/Avatar';
import avatarImg from '../images/avatar.png';
import memoGoogle from '../images/memo-logo.png';
import { deconnexion } from "../code/utilisateur";

export default function Entete({utilisateur}) {
	return (
	<header className="Entete">
		<div className="logo container">
			<img className="btn-image" src={memoGoogle} alt="Logo Google" width="75" height="80"/>
			<p>Memo</p>
		</div>
		<div className="utilisateur">
			<div className="container">
				<p>{utilisateur.displayName} </p>
				<Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
			</div>
			<button onClick={deconnexion}>&nbsp;Déconnexion</button>
		</div>
	</header>
	);
}