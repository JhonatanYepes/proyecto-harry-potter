import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Cargamos los favoritos desde el localStorage al abrir la página
    const guardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
    setFavoritos(guardados);
  }, []);

  const eliminarFavorito = (id) => {
    const actualizados = favoritos.filter((fav) => fav.id !== id);
    setFavoritos(actualizados);
    localStorage.setItem('favoritosHP', JSON.stringify(actualizados));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Personajes Favoritos ❤️</h1>
      
      {favoritos.length === 0 ? (
        <p>Aún no tienes personajes guardados en favoritos.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {favoritos.map((personaje) => (
            <div key={personaje.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <img 
                src={personaje.image || 'https://via.placeholder.com/150'} 
                alt={personaje.name} 
                style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '4px' }} 
              />
              <h3>{personaje.name}</h3>
              <p>Casa: {personaje.house || 'Desconocida'}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to={`/detalle/${personaje.id}`}>
                  <button style={{ width: '100%', padding: '6px', cursor: 'pointer' }}>Ver Detalle</button>
                </Link>
                <button 
                  onClick={() => eliminarFavorito(personaje.id)}
                  style={{ width: '100%', padding: '6px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}