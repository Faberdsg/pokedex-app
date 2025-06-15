import { useRef, useState } from 'react';
import { useName } from '../../../hooks/useName';
import { SETNAME } from '../../../providers/NameProvider';
import { useNavigate } from 'react-router';

function Form() {
	const inputRef = useRef(null);
	const [error, setError] = useState(false);
	const [, dispatch] = useName();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);

		const value = inputRef.current.value.trim();

		if (value === '') {
			setError('¡Escribe un nombre!');
			return;
		}

		// Verificamos el historial de nombres
		let historial = JSON.parse(
			localStorage.getItem('historialNombres') || '[]',
		);
		const nombreExistente = historial.includes(value);

		// Guardar nombre actual en el contexto
		dispatch({ type: SETNAME, payload: value });

		// Guardar en historial si es nuevo
		if (!nombreExistente) {
			historial.push(value);
			localStorage.setItem('historialNombres', JSON.stringify(historial));
		}

		// Reproducir intro solo si es nuevo
		if (!nombreExistente) {
			const audio = new Audio('/sounds/pokemon-intro.mp3');
			audio.volume = 0.5;
			audio.play().catch(() => {});
		}

		// Limpiar input
		inputRef.current.value = '';

		// Navegar solo si es nuevo
		if (!nombreExistente) {
			navigate('/pokedex');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Tu nombre..." ref={inputRef} />
			<button type="submit">Comenzar</button>
			{error && <p className="error">{error}</p>}
		</form>
	);
}

export default Form;
