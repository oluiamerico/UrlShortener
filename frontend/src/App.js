import UrlForms from './components/UrlForms.js';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="App-header">
        <h1>URL Shortener</h1>
      </header>
      <main>
        <UrlForms/>
      </main>
      <footer>
        <p>&copy; 2023 URL Shortener</p>
      </footer>
    </div>
  );
}

export default App;
