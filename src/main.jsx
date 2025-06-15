import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './routes/App.jsx';
import NameProvider from './providers/NameProvider.jsx';

createRoot(document.getElementById('root')).render(
	<NameProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</NameProvider>,
);
