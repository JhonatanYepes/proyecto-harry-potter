import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const manejarResize = () => {
      setEsMovil(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuAbierto(false);
      }
    };

    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#f39c12' : 'white',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: esMovil ? '8px 0' : '0 10px',
    fontSize: '1.1rem',
  });

  return (
    <nav style={{ 
      position: 'fixed',    /* Hace que el Navbar se quede fijo al hacer scroll */
      top: 0,               /* Lo pega a la parte superior */
      left: 0,              /* Lo extiende al borde izquierdo */
      right: 0,             /* Lo extiende al borde derecho */
      zIndex: 1000,         /* Asegura que siempre quede por encima de las imágenes y tarjetas */
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: '#1a1a1a', 
      color: 'white',
      flexWrap: 'wrap'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>⚡ HarryPotter App</h2>

      {esMovil && (
        <button 
          onClick={() => setMenuAbierto(!menuAbierto)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.8rem',
            cursor: 'pointer',
          }}
          aria-label="Abrir menú"
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      )}

      <div style={{ 
        display: esMovil ? (menuAbierto ? 'flex' : 'none') : 'flex', 
        flexDirection: esMovil ? 'column' : 'row', 
        width: esMovil ? '100%' : 'auto', 
        textAlign: 'center',
        marginTop: esMovil ? '15px' : '0',
        gap: esMovil ? '10px' : '20px',
        background: esMovil ? '#222' : 'transparent',
        padding: esMovil ? '15px' : '0',
        borderRadius: '8px',
        alignItems: 'center'
      }}>
        <NavLink to="/" style={linkStyle} onClick={() => setMenuAbierto(false)}>Inicio</NavLink>
        <NavLink to="/lista" style={linkStyle} onClick={() => setMenuAbierto(false)}>Lista</NavLink>
        <NavLink to="/favoritos" style={linkStyle} onClick={() => setMenuAbierto(false)}>Favoritos</NavLink>
        <NavLink to="/registro" style={linkStyle} onClick={() => setMenuAbierto(false)}>Registro</NavLink>
      </div>
    </nav>
  );
}
<br />