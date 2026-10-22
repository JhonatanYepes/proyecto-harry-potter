# ⚡ Explorador del Mundo Mágico de Harry Potter

## 📝 Descripción de la aplicación
Esta aplicación web interactiva fue desarrollada con **React** y **Vite** para explorar el catálogo de personajes del universo de Harry Potter[cite: 4, 6]. 

La aplicación permite:
* Navegar por distintas secciones a través de rutas con **React Router**[cite: 4, 5].
* Consultar un catálogo de personajes obtenidos en tiempo real mediante el consumo de una API pública[cite: 4, 5].
* Ver la información detallada de cada mago o bruja (casa, actor, especie, patronus, fecha de nacimiento y varita)[cite: 4].
* Guardar y quitar personajes de la lista de **Favoritos**, manteniendo los datos persistentes mediante `localStorage`[cite: 4, 9].
* Gestionar usuarios mediante un **CRUD completo** (crear, leer, editar y eliminar) en la sección de Registro, incluyendo validaciones estrictas (identificación única y numérica, correo válido y campos obligatorios)[cite: 4, 5, 9].
* Interfaz totalmente responsiva que se adapta tanto a computadores como a dispositivos móviles mediante un menú tipo hamburguesa[cite: 4, 9].

---

## 🌐 API Utilizada
* **Nombre de la API:** HP-API (Harry Potter API)[cite: 7]
* **URL Base:** `https://hp-api.onrender.com/api`[cite: 7]
* **Endpoints utilizados:**
  * **Listado general de personajes:** `/characters`[cite: 7]
  * **Detalle de un personaje por ID:** `/character/{id}`[cite: 7]

---

## 🖼️ Capturas de Pantalla

### 1. Vista de Inicio (Home)
![Vista de Inicio]<img width="1519" height="726" alt="image" src="https://github.com/user-attachments/assets/1f0fc3cb-e37e-41a2-b4b6-5f286070f087" />

### 2. Catálogo de Personajes
![Catálogo de Personajes]<img width="1520" height="726" alt="image" src="https://github.com/user-attachments/assets/24db1123-8542-4737-9a7f-06a6d472df77" />


### 3. Detalle del Personaje
![Detalle de Personaje]<img width="1522" height="727" alt="image" src="https://github.com/user-attachments/assets/d7b91a8b-ad7e-459b-b02f-bd3568e56e29" />


### 4. Registro de Usuarios (CRUD)
![Registro de Usuarios]<img width="1517" height="724" alt="image" src="https://github.com/user-attachments/assets/2a0e2ad9-af48-4a52-b9df-44d10d6de187" />


---

## 🚀 Instrucciones para ejecutar la aplicación localmente

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu equipo.

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone [https://github.com/JhonatanYepes/proyecto-harry-potter](https://github.com/JhonatanYepes/proyecto-harry-potter.git)
   
---
1. Ingresar a la carpeta del proyecto:
   
cd proyecto-harry-potter

2. Instalar las dependencias del proyecto:
   
npm install

3. Iniciar el servidor de desarrollo local:

npm run dev

4. Abre la dirección proporcionada por la consola (generalmente http://localhost:5173/) en tu navegador web.

Nombres de los Integrantes:

Jhonatan David Yepes Luna & Jhon Fredy Peréz Castro

LINK APP: https://proyecto-harry-potter-gray.vercel.app/
