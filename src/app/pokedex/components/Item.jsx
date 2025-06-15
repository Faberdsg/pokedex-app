import { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultTypeEs } from '../../../lib/utils';
import './Item.css';

function Item({ url }) {
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		axios.get(url).then(({ data }) => {
			const types = data.types.map((t) => defaultTypeEs[t.type.name]);
			const id = `Nº ${data.id.toString().padStart(3, '0')}`;
			setPokemon({
				id,
				name: data.name,
				image: data.sprites.other.dream_world.front_default,
				types,
			});
		});
	}, []);

	if (!pokemon) {
		return (
			<div>
				<p>Cargando...</p>
			</div>
		);
	}
	return (
		<div className="item">
			<img className="item_img" src={pokemon.image} alt={pokemon.name} />
			<span className="item_id">{pokemon.id}</span>
			<h2 className="item_name">{pokemon.name}</h2>
			<p className="item_types">
				{pokemon.types.map((t) => (
					<span key={t} className={`item_type type--${t.toLowerCase()}`}>
						{t}
					</span>
				))}
			</p>
		</div>
	);
}

export default Item;
