import { useState } from 'react';
import { Link } from 'react-router';
import Item from './Item';
import Pagination from '../../../components/commons/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import './PokemonList.css';

function PokemonList({ pokemons }) {
	const { pageItems, page, totalPages, next, prev, itemsPerPage } =
		usePagination(pokemons, 20);

	return (
		<div className="list">
			<div className="list_container">
				<div className="list_content">
					{pageItems.map((pokemon) => (
						<Link key={pokemon.name} to={`/pokedex/${pokemon.name}`}>
							<Item url={pokemon.url} />
						</Link>
					))}
				</div>

				{pageItems.length == 0 && (
					<p className="list_empty">No hay pokémon que mostrar...</p>
				)}

				{itemsPerPage < pokemons.length && (
					<Pagination
						page={page}
						totalPages={totalPages}
						prev={prev}
						next={next}
					/>
				)}
			</div>
		</div>
	);
}

export default PokemonList;
