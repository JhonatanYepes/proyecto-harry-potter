import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListaPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [favoritosIds, setFavoritosIds] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
    setFavoritosIds(guardados.map((f) => f.id));

    fetch('https://hp-api.onrender.com/api/characters')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo conectar con el servidor de la API');
        }
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

  if (cargando) return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando magos y brujas de Hogwarts...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', lineHeight: '1.2' }}>Catálogo de Personajes de Harry Potter</h1>
      <p style={{ textAlign: 'center' }}>Total de personajes encontrados: {personajes.length}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {personajes.slice(0, 12).map((personaje) => {
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
    </div>
  );
}