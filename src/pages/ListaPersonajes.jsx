import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListaPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los dos buscadores
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroActor, setFiltroActor] = useState('');

  // Estado para controlar cuántos personajes se muestran (empezamos con 12)
  const [elementosVisibles, setElementosVisibles] = useState(12);

  const [favoritosIds, setFavoritosIds] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
    setFavoritosIds(guardados.map((f) => f.id));

    fetch('https://hp-api.onrender.com/api/characters')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo conectar con el servidor de la API');
        return res.json();
      })
      .then((data) => {
        setPersonajes(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  const toggleFavoritoCard = (personaje) => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
    const existe = favoritosGuardados.some((fav) => fav.id === personaje.id);

    let nuevosFavoritos;
    if (existe) {
      nuevosFavoritos = favoritosGuardados.filter((fav) => fav.id !== personaje.id);
    } else {
      nuevosFavoritos = [...favoritosGuardados, personaje];
    }

    localStorage.setItem('favoritosHP', JSON.stringify(nuevosFavoritos));
    setFavoritosIds(nuevosFavoritos.map((f) => f.id));
  };

  // Filtrar personajes según los dos buscadores (por nombre de personaje y por nombre de actor)
  const personajesFiltrados = personajes.filter((personaje) => {
    const coincideNombre = personaje.name.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideActor = personaje.actor ? personaje.actor.toLowerCase().includes(filtroActor.toLowerCase()) : false;
    return coincideNombre && coincideActor;
  });

  // Función para el botón "Cargar más"
  const cargarMas = () => {
    setElementosVisibles((prev) => prev + 12); // Suma 12 elementos más cada vez que se presiona
  };

  if (cargando) return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando magos y brujas de Hogwarts...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Catálogo de Personajes de Harry Potter</h1>
      
      {/* Sección de los 2 Buscadores */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '25px 0', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="🔍 Buscar por personaje..."
          value={filtroNombre}
          onChange={(e) => { setFiltroNombre(e.target.value); setElementosVisibles(12); }}
          style={{ padding: '10px', width: '280px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
        <input 
          type="text"
          placeholder="🎭 Buscar por actor..."
          value={filtroActor}
          onChange={(e) => { setFiltroActor(e.target.value); setElementosVisibles(12); }}
          style={{ padding: '10px', width: '280px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Mostrando {Math.min(elementosVisibles, personajesFiltrados.length)} de {personajesFiltrados.length} personajes encontrados
      </p>

      {/* Cuadrícula de personajes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {personajesFiltrados.slice(0, elementosVisibles).map((personaje) => {
          const esFav = favoritosIds.includes(personaje.id);
          return (
            <div key={personaje.id} style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1a1a1a', color: '#fff' }}>
              <img 
                src={personaje.image || 'https://via.placeholder.com/150'} 
                alt={personaje.name} 
                style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '4px' }} 
              />
              <h3>{personaje.name}</h3>
              <p>Casa: {personaje.house || 'Desconocida'}</p>
              <p style={{ fontSize: '0.85rem', color: '#aaa' }}>Actor: {personaje.actor || 'N/A'}</p>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
                <Link to={`/detalle/${personaje.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '9px 6px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Ver Detalle
                  </button>
                </Link>

                <button 
                  onClick={() => toggleFavoritoCard(personaje)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: esFav ? '#ff4d4d' : '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                  title={esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {esFav ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón "Cargar más" */}
      {elementosVisibles < personajesFiltrados.length && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={cargarMas}
            style={{ padding: '12px 30px', fontSize: '1rem', backgroundColor: '#f39c12', color: '#1a1a1a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cargar más personajes...
          </button>
        </div>
      )}
    </div>
  );
}