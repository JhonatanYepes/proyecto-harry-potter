export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', background: '#1a1a1a', color: '#aaa', marginTop: '40px' }}>
      <p>Desarrollado para la materia de Tecnologías Web[cite: 4]</p>
      <p>API utilizada: <strong>HP-API (Harry Potter)</strong>[cite: 7] | 
        <a href="https://hp-api.onrender.com/api" target="_blank" rel="noreferrer" style={{ color: '#f39c12', marginLeft: '8px' }}>
          Documentación de la API[cite: 6]
        </a>
      </p>
    </footer>
  );
}