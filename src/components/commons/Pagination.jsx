import './Pagination.css';

function Pagination({ page, totalPages, prev, next }) {
	return (
		<div className="pagination">
			<div className="pagination_container">
				<p className="pagination_info">
					{page} de {totalPages}
				</p>
				<div className="pagination_btns">
					<button
						className="pagination_btn"
						onClick={prev}
						disabled={page == 1}
					>
						Anterior
					</button>
					<button
						className="pagination_btn"
						onClick={next}
						disabled={page == totalPages}
					>
						Siguiente
					</button>
				</div>
			</div>
		</div>
	);
}

export default Pagination;
