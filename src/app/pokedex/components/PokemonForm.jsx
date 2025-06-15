import { useEffect } from 'react';
import axios from 'axios';
import { defaultTypeEs } from '../../../lib/utils';
import './PokemonForm.css';

function PokemonForm({ value, onSearch, type, onType, stock, onFiltered }) {
	useEffect(() => {
		if (!type || type === 'placeholder') {
			onFiltered([]);
			return;
		}

		axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(({ data }) => {
			const results = data.pokemon.map((p) => p.pokemon.name);
			onFiltered(stock.filter((p) => results.includes(p.name)));
		});
	}, [type, stock]);

	return (
		<div className="form">
			<div className="form_container">
				<input
					type="text"
					placeholder="Buscar..."
					className="form_input"
					value={value}
					onChange={(e) => onSearch(e.target.value)}
				/>

				<select
					className="form_select"
					value={type || 'placeholder'}
					onChange={(e) =>
						onType(e.target.value === 'placeholder' ? '' : e.target.value)
					}
				>
					<option value="placeholder" disabled hidden>
						Seleccionar
					</option>
					<option value="">Todos</option>
					{Object.keys(defaultTypeEs).map((typeKey) => (
						<option key={typeKey} value={typeKey}>
							{defaultTypeEs[typeKey]}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default PokemonForm;
