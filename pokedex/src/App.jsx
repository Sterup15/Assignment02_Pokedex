import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import About from './pages/About';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Pokedex</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
