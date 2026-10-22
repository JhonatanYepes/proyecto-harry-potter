import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#f39c12' : 'white',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#1a1a1a', color: 'white' }}>
      <h2 style={{ margin: 0 }}>⚡ HarryPotter App</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <NavLink to="/" style={linkStyle}>Inicio</NavLink>
        <NavLink to="/lista" style={linkStyle}>Lista</NavLink>
        <NavLink to="/favoritos" style={linkStyle}>Favoritos</NavLink>
        <NavLink to="/registro" style={linkStyle}>Registro</NavLink>
      </div>
    </nav>
  );
}