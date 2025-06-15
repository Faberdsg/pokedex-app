import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import './Details.css';
import { defaultTypeEs } from '../../lib/utils';

function Details() {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.then(async ({ data }) => {
				console.log(
					data.types.map((t) => defaultTypeEs[t.type.name || t.type.name]),
				);

				const height = data.height / 10;
				const weight = data.weight / 10;

				const ps = data.stats[0].base_stat;
				const attack = data.stats[1].base_stat;
				const defense = data.stats[2].base_stat;
				const specialAttack = data.stats[3].base_stat;
				const specialDefense = data.stats[4].base_stat;
				const speed = data.stats[5].base_stat;

				const moves = await Promise.all(
					data.moves.map(async (m) => {
						const { data } = await axios.get(m.move.url);
						return data.names.find((n) => n.language.name == 'es')?.name;
					}),
				);

				setPokemon({
					...data,
					height,
					weight,
					stats: {
						ps,
						attack,
						defense,
						specialAttack,
						specialDefense,
						speed,
					},
					moves,
				});
			});
	}, [name]);

	if (!pokemon) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="details">
			<div className="details_container">
				<div className="details_header">
					<Link to="/pokedex" className="details_back">
						Volver
					</Link>
					<h2 className="details_name">{pokemon.name}</h2>
					<p className="details_id">{`Nº ${pokemon.id
						.toString()
						.padStart(3, '0')}`}</p>
				</div>

				<div className="details_content">
					<div className="details_image">
						<img
							src={pokemon.sprites.other.dream_world.front_default}
							alt={pokemon.name}
						/>
					</div>

					<h3>Estadísticas</h3>
					<ul className="details_stats">
						<li>
							<span className="icon">❤️</span> PS: {pokemon.stats.ps}
						</li>
						<li>
							<span className="icon">🗡️</span> Ataque: {pokemon.stats.attack}
						</li>
						<li>
							<span className="icon">🛡️</span> Defensa: {pokemon.stats.defense}
						</li>
						<li>
							<span className="icon">✨</span> Ataque Especial:{' '}
							{pokemon.stats.specialAttack}
						</li>
						<li>
							<span className="icon">🔰</span> Defensa Especial:{' '}
							{pokemon.stats.specialDefense}
						</li>
						<li>
							<span className="icon">💨</span> Velocidad: {pokemon.stats.speed}
						</li>
					</ul>

					<h3>Altura</h3>
					<p>{pokemon.height} m</p>

					<h3>Peso</h3>
					<p>{pokemon.weight} kg</p>

					<h3>Tipo</h3>
					<p className="details_types">
						{pokemon.types.map((t) => {
							const tipoEs = defaultTypeEs[t.type.name];
							return (
								<span
									key={t.type.name}
									className={`item_type type--${tipoEs.toLowerCase()}`}
								>
									{tipoEs}
								</span>
							);
						})}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Details;
