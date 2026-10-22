import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '80px', margin: '0 0 10px 0' }}>404</h1>
      <h2 style={{ margin: '0 0 15px 0' }}>Página no encontrada</h2>
      <p style={{ margin: '0 0 25px 0' }}>Lo sentimos, la ruta a la que intentas acceder no existe en este castillo.</p>
      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Volver al Inicio
        </button>
      </Link>
    </div>
  );
}