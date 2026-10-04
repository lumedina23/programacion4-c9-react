# OfiGO

Plataforma para encontrar profesionales de oficios en Tucumán: plomeros, electricistas, pintores, cerrajeros y más.
Los clientes buscan, comparan y piden el servicio; los profesionales reciben y gestionan sus pedidos.

## 👥 Integrantes

* Medina, Lourdes Natalí
* Cura, Rocío Julieta
* Galván, Rocío Julieta
* Sánchez Cano, Sebastián

**Programación IV · Comisión 9**


## 📌 Descripción

Este repositorio corresponde a la migración del proyecto desarrollado en el TP1 (HTML, CSS y JavaScript) a **React + Vite**, y a su evolución en los trabajos prácticos siguientes.

La interfaz se reorganizó en **páginas** y **componentes reutilizables** que se comunican mediante **props**. Las listas se generan con la función **`map()`** a partir de los datos, y los estilos se resolvieron con **React Bootstrap** y **Bootstrap Icons**, sin archivos CSS propios.

---

## ✨ Funcionalidades

* **Portada:** presentación de OfiGO, buscador, oficios populares, cómo funciona, oficios, profesionales destacados y acceso como cliente o como profesional.
* **Menú del cliente:** saludo, buscador, categorías y profesionales cercanos.
* **Panel del trabajador:** calificación, cantidad de pedidos pendientes y acceso a los pedidos recibidos.
* **Explorar profesionales:** filtro por oficio y búsqueda por texto (nombre, oficio o especialidad).
* **Perfil del profesional:** calificación con estrellas, precio por hora, distancia, zona, especialidades y botón para contratar.
* **Pedir un servicio:** formulario con dirección, fecha y descripción del problema, con validación de los campos. El pedido se guarda en el navegador.
* **Mis pedidos:** el cliente ve sus pedidos con su estado y califica con estrellas y un comentario los trabajos finalizados.
* **Pedidos recibidos:** lista de los pedidos del profesional con su estado.
* **Mi perfil:** datos de la cuenta y cierre de sesión.
* **Centro de ayuda:** preguntas frecuentes con buscador y datos de contacto.

## 🛠️ Tecnologías utilizadas

* **React** – Para construir la interfaz con componentes.
* **Vite** – Para crear el proyecto y levantar el servidor de desarrollo.
* **React Bootstrap** – Componentes de Bootstrap listos para usar en React (`Navbar`, `Card`, `Form`, `Offcanvas`, `Accordion`, etc.).
* **Bootstrap Icons** – Íconos del proyecto.
* **React Router** – Para la navegación entre las páginas.
* **localStorage** – Para guardar la sesión y los pedidos, igual que en el TP1.
* **Vercel** – Para el deploy.

## 🔎 SEO

Aplicamos buenas prácticas de **SEO** para que los buscadores entiendan de qué trata el sitio y cómo está organizado.

### Qué aplicamos

* **Atributo `lang="es"`** en `index.html`: indica que el contenido está en español.
* **Un `<title>` y una meta description por página**: cada página usa el componente `TituloPagina`, que recibe el título y la descripción por props. Así la pestaña del navegador y los resultados de búsqueda muestran algo distinto en cada página (por ejemplo "Explorar profesionales · OfiGO" o "Mis pedidos · OfiGO"). En Oficios y en el perfil del profesional el título cambia según el oficio o el profesional elegido.

  ```jsx
  <TituloPagina
    titulo="Mis pedidos · OfiGO"
    descripcion="Seguí el estado de los pedidos que les hiciste a los profesionales y calificá los trabajos terminados."
  />
  ```

  React 19 lleva solo estas etiquetas al `<head>` del documento.

* **Meta viewport**: para que la página se adapte a celulares, algo que los buscadores tienen en cuenta.
* **Etiquetas semánticas**: `<nav>` (lo genera el `Navbar` de React Bootstrap), `<main>`, `<section>`, `<article>` y `<footer>`, para organizar el contenido.
* **Jerarquía de títulos**: un solo `<h1>` por página y `<h2>`/`<h3>` para las secciones, en orden.
* **Textos descriptivos**: títulos y textos relacionados con oficios, profesionales y Tucumán, que son las palabras que un usuario buscaría.
* **Accesibilidad**: `aria-label` en el buscador y en los botones que solo tienen ícono, y `aria-hidden` en el fondo decorativo para que los lectores de pantalla lo ignoren.
* **Favicon**: el logo de OfiGO en la pestaña del navegador.

## ▶️ Instalación y ejecución

**Requisitos:** tener instalado [Node.js](https://nodejs.org) (incluye npm) y Git.

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/lumedina23/programacion4-c9-react.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd programacion4-c9-react
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección que muestra la terminal (normalmente [http://localhost:5173](http://localhost:5173)).

**Otros comandos:**

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Genera la versión final del sitio en la carpeta `dist` |
| `npm run preview` | Muestra la versión generada con `build` |
| `npm run lint` | Revisa el código en busca de errores |

---

## 📁 Estructura de carpetas

```
src/
├── pages/              → Páginas completas (una por cada HTML del TP1)
├── components/
│   ├── layout/         → Partes fijas: Encabezado, PiePagina, PanelAyuda
│   └── common/         → Componentes reutilizables: tarjetas, buscador, títulos, botones
├── data/               → Datos de prueba (profesionales y categorías)
├── utils/              → Funciones auxiliares (formato de precios, sesión)
└── assets/img/         → Logo e imágenes
```

## 📄 Páginas

| Página | Archivo | Ruta | Migrada desde |
|---|---|---|---|
| Portada | `Inicio.jsx` | `/` | `index.html` |
| Menú | `Menu.jsx` | `/menu` | `menu.html` |
| Explorar profesionales | `Oficios.jsx` | `/oficios` | `oficios.html` |
| Perfil del profesional | `PerfilTrabajador.jsx` | `/profesional/:id` | `perfiltrabajador.html` |
| Pedir servicio | `CrearPedido.jsx` | `/crear-pedido` | `crearpedido.html` |
| Pedidos recibidos | `HistorialTrabajador.jsx` | `/historial-trabajador` | `historialtrabajador.html` |
| Mi perfil | `Perfil.jsx` | `/perfil` | `perfil.html` |
| Ingresar | `Login.jsx` | `/login` | `login.html` (en proceso) |
| Mis pedidos | `Historial.jsx` | `/historial` | `historial.html` |

---

## 🧩 Componentes y props

Cada parte que se repite se separó en un componente que recibe los datos por **props**:

| Componente | Props | Dónde se usa |
|---|---|---|
| `TarjetaProfesional` | `profesional` | Portada, Menú, Oficios |
| `TarjetaCategoria` | `nombre`, `icono`, `color`, `activa`, `alSeleccionar` | Portada, Menú, Oficios |
| `Buscador` | `placeholder`, `alBuscar`, `valorInicial` | Portada, Menú, Oficios |
| `TituloSeccion` | `titulo`, `subtitulo`, `textoEnlace`, `destino` | Todas las secciones |
| `TarjetaAviso` | `titulo`, `texto` | Portada, Menú |
| `PanelTrabajador` | `nombre`, `calificacion`, `pedidosPendientes` | Menú (vista del trabajador) |
| `TarjetaPedido` | `pedido`, `titulo` y lo que va abajo como `children` | Mis pedidos |
| `TituloPagina` | `titulo`, `descripcion` | Todas las páginas (SEO) |
| `ConSombra` | `color`, `redondeo`, `grosor` | Portada, Mis pedidos |
| `BotonOfiGO` | `onClick` y el texto del botón | Portada, Mis pedidos |
| `Encabezado` | `rol`, `enPortada`, `alEntrarComoCliente`, `alCerrarSesion` | Todas las páginas |
| `PanelAyuda` | `mostrar`, `alCerrar` | Todas las páginas |

Ejemplo de uso de props:

```jsx
<TarjetaCategoria nombre="Plomería" icono="bi-droplet" color="info" />
```

## 🔁 Uso de la función `map()`

Las listas no se escriben a mano: se generan con `map()` a partir de los datos de `src/data/`. Así, agregar un profesional o una categoría es sumar un objeto al array, sin tocar el diseño.

```jsx
{PROFESIONALES.map((profesional) => (
  <TarjetaProfesional key={profesional.id} profesional={profesional} />
))}
```

Se usa, entre otros lugares, para las categorías, los profesionales, los pasos de "Cómo funciona", los pedidos, las estrellas de la calificación, las preguntas del centro de ayuda y las especialidades de cada profesional.

## 🧭 Navegación con React Router

La navegación entre páginas se hace con **React Router**, sin recargar la página:

* `BrowserRouter` (en `main.jsx`) envuelve toda la aplicación.
* `Routes` y `Route` (en `App.jsx`) definen qué página se muestra en cada dirección (ver la tabla de Páginas).
* `Link` y `NavLink` reemplazan a los `<a href>` del TP1. `NavLink` marca en el menú la página en la que está el usuario.
* `useNavigate` lleva a otra página desde el código, por ejemplo al entrar como cliente o al buscar.
* `useParams` lee el id del profesional en `/profesional/:id`.
* `useSearchParams` lee y guarda en la dirección el oficio elegido y lo buscado (`/oficios?categoria=Plomería`), igual que el TP1 con `oficios.html?categoria=...`.
* Una ruta comodín (`*`) devuelve a la portada si la dirección no existe.

## 🚧 Mejoras pendientes

* Agregar etiquetas **Open Graph** (`og:title`, `og:description`, `og:image`) para que el link se vea con imagen y descripción al compartirlo por WhatsApp o redes.
* Completar el texto alternativo (`alt`) del logo.

## 🌿 Forma de trabajo

Cada integrante trabaja en su rama y sube los cambios mediante **Pull Request** hacia `dev`. Cuando `dev` está estable, se pasa a `main`.
