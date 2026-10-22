import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#f39c12' : 'white',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '8px 0',
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
      flexWrap: 'wrap',
      position: 'relative'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>⚡ HarryPotter App</h2>

      {/* Botón de Hamburguesa */}
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

      {/* Contenedor de enlaces que se muestra u oculta según el estado */}
      <div style={{ 
        display: menuAbierto ? 'flex' : 'none', 
        flexDirection: 'column', 
        width: '100%', 
        textAlign: 'center',
        marginTop: '15px',
        gap: '10px',
        background: '#222',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <NavLink to="/" style={linkStyle} onClick={() => setMenuAbierto(false)}>Inicio</NavLink>
        <NavLink to="/lista" style={linkStyle} onClick={() => setMenuAbierto(false)}>Lista</NavLink>
        <NavLink to="/favoritos" style={linkStyle} onClick={() => setMenuAbierto(false)}>Favoritos</NavLink>
        <NavLink to="/registro" style={linkStyle} onClick={() => setMenuAbierto(false)}>Registro</NavLink>
      </div>
    </nav>
  );
}