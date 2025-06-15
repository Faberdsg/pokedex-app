import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import PokemonForm from './PokemonForm';
import './Pokedex.css';
import { useName } from '../../../hooks/useName';
import { useNavigate } from 'react-router';

function Pokedex() {
	const [pokemons, setPokemons] = useState(null);
	const [search, setSearch] = useState('');
	const [type, setType] = useState('');
	const [typeFiltered, setTypeFiltered] = useState([]);
	const [state] = useName();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('https://pokeapi.co/api/v2/pokemon?limit=649')
			.then(({ data }) => setPokemons(data.results));
	}, []);

	if (!pokemons) {
		return (
			<div>
				<p>Cargando...</p>
			</div>
		);
	}

	const filteredPokemons = (type ? typeFiltered : pokemons).filter((pokemon) =>
		pokemon.name.toLowerCase().includes(search.toLowerCase()),
	);

	const handleExit = () => {
		// Solo navega al menú con "Hola de nuevo", sin borrar el nombre ni reproducir sonido
		navigate('/');
	};

	return (
		<div className="pokedex pokedex-enter">
			{/* Botón de salir arriba a la izquierda */}
			<button className="pokedex_exit-button" onClick={handleExit}>
				Salir
			</button>

			{/* Formulario de búsqueda */}
			<PokemonForm
				stock={pokemons}
				value={search}
				type={type}
				onSearch={setSearch}
				onType={setType}
				onFiltered={setTypeFiltered}
			/>

			{/* Saludo con el nombre del usuario */}
			<p className="pokedex_greeting">
				Hola {state.name}, ¿qué Pokémon deseas ver hoy?
			</p>

			{/* Lista de Pokémon filtrada */}
			<PokemonList pokemons={filteredPokemons} />
		</div>
	);
}

export default Pokedex;
