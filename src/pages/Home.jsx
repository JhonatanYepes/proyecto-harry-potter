import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: '1' }}>
      <h1 style={{ fontSize: '2.8rem', color: '#f39c12', marginBottom: '20px' }}>
        Explorador del Mundo Mágico de Harry Potter
      </h1>
      
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ddd', marginBottom: '30px' }}>
        Bienvenido a esta aplicación web interactiva. Aquí podrás explorar la información completa de tus personajes favoritos de Hogwarts (casas, varitas, patronus y más), gestionar tus favoritos y registrar usuarios de forma local. Este proyecto ha sido desarrollado utilizando React y consume datos en tiempo real de la <strong>HP-API (Harry Potter API)</strong>.
      </p>

      <Link to="/lista">
        <button style={{ padding: '12px 25px', fontSize: '1.1rem', backgroundColor: '#f39c12', color: '#1a1a1a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ver Listado de Personajes
        </button>
      </Link>
    </div>
  );
}