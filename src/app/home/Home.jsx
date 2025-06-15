import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Form from './components/Form';
import './Home.css';
import { useName } from '../../hooks/useName';
import { CLEARNAME } from '../../providers/NameProvider';
import { useNavigate } from 'react-router';

function Home() {
	const [state, dispatch] = useName();
	const navigate = useNavigate();
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		const hasPlayedIntro = localStorage.getItem('introPlayed');

		if (!hasPlayedIntro) {
			const audio = new Audio('/sounds/pokemon.intro.mp3');
			audio.volume = 0.5;
			audio
				.play()
				.then(() => {
					localStorage.setItem('introPlayed', 'true');
				})
				.catch((err) => {
					console.warn('Intro bloqueada por navegador:', err);
				});
		}
	}, []);

	useEffect(() => {
		if (isExiting) {
			const timeout = setTimeout(() => {
				const audio = new Audio('/sounds/pc-on.mp3');
				audio.volume = 0.5;
				audio.play().catch(() => {});

				localStorage.removeItem('introPlayed');
				dispatch({ type: CLEARNAME });
				setIsExiting(false);
			}, 800);

			return () => clearTimeout(timeout);
		}
	}, [isExiting, dispatch]);

	const handleLogout = () => {
		setIsExiting(true);
	};

	return (
		<div className="home">
			<div className={`home_container ${isExiting ? 'fade-out' : ''}`}>
				<img
					src="/images/pokeballicon.png"
					alt="Pokedex Logo"
					className="home_logo"
				/>
				<h1>POKÉDEX</h1>

				{state.name ? (
					<>
						<h2>¡Hola de nuevo, {state.name}!</h2>
						<button
							className="home_link"
							onClick={() => {
								const audio = new Audio('/sounds/pokemon.intro.mp3');
								audio.volume = 0.5;
								audio.play().catch(() => {});

								setTimeout(() => {
									navigate('/pokedex');
								}, 600);
							}}
						>
							Ir a la Pokédex
						</button>
						<span>o</span>
						<button className="home_button" onClick={handleLogout}>
							Salir
						</button>
					</>
				) : (
					<>
						<h2>¡Hola entrenador@!</h2>
						<p>Para poder comenzar, dame tu nombre :)</p>
						<Form />
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
