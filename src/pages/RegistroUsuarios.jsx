import { useState } from 'react';

export default function RegistroUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ identificacion: '', nombre: '', correo: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Manejar cambios en el formulario controlado
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar y enviar (Crear o Guardar cambios)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    // 1. Validar campos vacíos
    if (!form.identificacion.trim() || !form.nombre.trim() || !form.correo.trim()) {
      setMensaje({ texto: 'Ningún campo puede estar vacío.', tipo: 'error' });
      return;
    }

    // 2. Validar que la identificación contenga solo números
    if (!/^\d+$/.test(form.identificacion)) {
      setMensaje({ texto: 'La identificación debe contener solo números.', tipo: 'error' });
      return;
    }

    // 3. Validar que el correo incluya '@'
    if (!form.correo.includes('@')) {
      setMensaje({ texto: 'El correo debe incluir el símbolo "@".', tipo: 'error' });
      return;
    }

    if (editandoId !== null) {
      // MODO EDICIÓN
      // Comprobar que la nueva identificación no pertenezca a otro usuario distinto
      const existeOtro = usuarios.some((u) => u.identificacion === form.identificacion && u.identificacion !== editandoId);
      if (existeOtro) {
        setMensaje({ texto: `Ya existe otro usuario con la identificación ${form.identificacion}.`, tipo: 'error' });
        return;
      }

      const actualizados = usuarios.map((u) => (u.identificacion === editandoId ? form : u));
      setUsuarios(actualizados);
      setEditandoId(null);
      setMensaje({ texto: '¡Usuario actualizado con éxito!', tipo: 'exito' });
    } else {
      // MODO CREACIÓN
      // Comprobar que la identificación no exista ya
      const existe = usuarios.some((u) => u.identificacion === form.identificacion);
      if (existe) {
        setMensaje({ texto: `Ya existe un usuario con la identificación ${form.identificacion}.`, tipo: 'error' });
        return;
      }

      setUsuarios([...usuarios, form]);
      setMensaje({ texto: '¡Usuario registrado con éxito!', tipo: 'exito' });
    }

    // Limpiar formulario
    setForm({ identificacion: '', nombre: '', correo: '' });
  };

  // Cargar datos en el formulario para editar
  const handleEditar = (usuario) => {
    setForm(usuario);
    setEditandoId(usuario.identificacion);
    setMensaje({ texto: '', tipo: '' });
  };

  // Cancelar edición
  const handleCancelar = () => {
    setForm({ identificacion: '', nombre: '', correo: '' });
    setEditandoId(null);
    setMensaje({ texto: '', tipo: '' });
  };

  // Eliminar usuario con confirmación
  const handleEliminar = (identificacion) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsuarios(usuarios.filter((u) => u.identificacion !== identificacion));
      if (editandoId === identificacion) {
        handleCancelar();
      }
      setMensaje({ texto: 'Usuario eliminado.', tipo: 'exito' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', lineHeight: '1' }}>
      <h1>Registro de Usuarios</h1>
      <p>Total de usuarios registrados: <strong>{usuarios.length}</strong></p>

      {/* Mensajes en pantalla (éxito o error) */}
      {mensaje.texto && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: mensaje.tipo === 'error' ? '#ffdddd' : '#d4edda', color: mensaje.tipo === 'error' ? '#900' : '#155724', borderRadius: '5px' }}>
          {mensaje.texto}
        </div>
      )}

      {/* Formulario controlado */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>{editandoId !== null ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
        
        <input 
          type="text" 
          name="identificacion" 
          placeholder="Identificación (solo números)" 
          value={form.identificacion} 
          onChange={handleChange} 
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre completo" 
          value={form.nombre} 
          onChange={handleChange} 
          style={{ padding: '8px' }}
        />
        <input 
          type="text" 
          name="correo" 
          placeholder="Correo electrónico (ej: correo@mail.com)" 
          value={form.correo} 
          onChange={handleChange} 
          style={{ padding: '8px' }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1 }}>
            {editandoId !== null ? 'Guardar cambios' : 'Registrar'}
          </button>
          {editandoId !== null && (
            <button type="button" onClick={handleCancelar} style={{ padding: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de usuarios con map */}
      <h3 style={{ marginTop: '30px' }}>Lista de Registrados</h3>
      {usuarios.length === 0 ? (
        <p>Aún no hay usuarios registrados[cite: 5].</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {usuarios.map((u) => (
            <li key={u.identificacion} style={{ border: '1px solid #ddd', padding: '12px', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>ID:</strong> {u.identificacion} | <strong>Nombre:</strong> {u.nombre} | <strong>Correo:</strong> {u.correo}
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => handleEditar(u)} style={{ padding: '5px 10px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => handleEliminar(u.identificacion)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}