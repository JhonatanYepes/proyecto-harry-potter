import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 768);

  // Detectar cambios en el tamaño de la pantalla en tiempo real
  useEffect(() => {
    const manejarResize = () => {
      setEsMovil(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuAbierto(false); // Cierra el menú móvil si pasa a PC
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
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: '#1a1a1a', 
      color: 'white',
      position: 'relative',
      flexWrap: 'wrap'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>⚡ HarryPotter App</h2>

      {/* Botón de Hamburguesa: Se muestra ÚNICAMENTE si es dispositivo móvil */}
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

      {/* Contenedor de enlaces: En PC se muestra horizontal (flex), en móvil se oculta o despliega */}
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