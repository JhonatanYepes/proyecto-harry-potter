import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetallePersonaje() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener la información');
        return res.json();
      })
      .then((data) => {
        const encontrado = data.find((p) => p.id === id);
        if (encontrado) {
          setPersonaje(encontrado);
          
          const favoritosGuardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
          const existe = favoritosGuardados.some((fav) => fav.id === id);
          setEsFavorito(existe);
        } else {
          setError('Personaje no encontrado');
        }
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  const toggleFavorito = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritosHP')) || [];
    
    if (esFavorito) {
      const nuevosFavoritos = favoritosGuardados.filter((fav) => fav.id !== id);
      localStorage.setItem('favoritosHP', JSON.stringify(nuevosFavoritos));
      setEsFavorito(false);
    } else {
      favoritosGuardados.push(personaje);
      localStorage.setItem('favoritosHP', JSON.stringify(favoritosGuardados));
      setEsFavorito(true);
    }
  };

  if (cargando) return <p>Cargando detalles del personaje...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!personaje) return <p>No se encontró el personaje.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      
      {/* Contenedor superior para poner los botones uno al lado del otro */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/lista">
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>← Volver al Listado</button>
        </Link>

        {/* Botón de Favorito al lado del botón de volver */}
        <button 
          onClick={toggleFavorito}
          style={{ 
            padding: '8px 14px', 
            backgroundColor: esFavorito ? '#ff4d4d' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {esFavorito ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        <img 
          src={personaje.image || 'https://via.placeholder.com/150'} 
          alt={personaje.name} 
          style={{ width: '180px', height: '240px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
        />
        <h1>{personaje.name}</h1>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Información detallada:</h3>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Casa:</strong> {personaje.house || 'Desconocida'}</li>
        <li><strong>Actor / Actriz:</strong> {personaje.actor || 'No especificado'}</li>
        <li><strong>Especie:</strong> {personaje.species || 'Desconocida'}</li>
        <li><strong>Patronus:</strong> {personaje.patronus || 'Desconocido'}</li>
        <li><strong>Fecha de nacimiento:</strong> {personaje.dateOfBirth || 'Desconocida'}</li>
        <li><strong>Varita:</strong> {personaje.wand?.wood || 'N/A'} / {personaje.wand?.core || 'N/A'}</li>
      </ul>
    </div>
  );
}