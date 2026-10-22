import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListaPersonajes from './pages/ListaPersonajes';
import DetallePersonaje from './pages/DetallePersonaje';
import Favoritos from './pages/Favoritos';
import RegistroUsuarios from './pages/RegistroUsuarios';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<ListaPersonajes />} />
          <Route path="/detalle/:id" element={<DetallePersonaje />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/registro" element={<RegistroUsuarios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;