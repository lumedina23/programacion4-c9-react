# OfiGO

Plataforma para encontrar profesionales de oficios en Tucumán: plomeros, electricistas, pintores, cerrajeros y más.
Los clientes buscan, comparan y piden el servicio; los profesionales reciben y gestionan sus pedidos.

🔗 **Deploy:** [programacion4-c9-react.vercel.app](https://programacion4-c9-react.vercel.app)

---

## 👥 Integrantes

* Medina, Lourdes Natalí
* Cura, Rocío Julieta
* Galván, Rocío Julieta
* Sánchez Cano, Sebastián

**Programación IV · Comisión 9**

---

## 📌 Descripción

Este repositorio corresponde a la migración del proyecto desarrollado en el TP1 (HTML, CSS y JavaScript) a **React + Vite**.

La interfaz se reorganizó en **componentes reutilizables** que se comunican mediante **props**, y los estilos se resolvieron con **React Bootstrap** y **Bootstrap Icons**, sin archivos CSS propios.

---

## 🛠️ Tecnologías utilizadas

* **React** – Para construir la interfaz con componentes.
* **Vite** – Para crear el proyecto y levantar el servidor de desarrollo.
* **React Bootstrap** – Componentes de Bootstrap listos para usar en React (`Navbar`, `Card`, `Form`, `Offcanvas`, etc.).
* **Bootstrap Icons** – Íconos del proyecto.
* **localStorage** – Para guardar la sesión y los pedidos, igual que en el TP1.
* **Vercel** – Para el deploy.

---

## 🧩 Componentes y props

Cada parte que se repite se separó en un componente que recibe los datos por **props**. Algunos ejemplos:

| Componente | Props | Dónde se usa |
|---|---|---|
| `TarjetaProfesional` | `profesional` | Inicio, Menú |
| `TarjetaCategoria` | `nombre`, `icono`, `color` | Inicio, Menú |
| `Buscador` | `placeholder`, `alBuscar` | Inicio, Menú |
| `TituloSeccion` | `titulo`, `subtitulo`, `textoEnlace` | Todas las secciones |
| `PanelTrabajador` | `nombre`, `calificacion`, `pedidosPendientes` | Menú (vista del trabajador) |
| `Encabezado` | `rol`, `enPortada`, `alEntrarComoCliente`, `alCerrarSesion` | Todas las páginas |

Ejemplo:

```jsx
{DESTACADOS.map((profesional) => (
  <TarjetaProfesional key={profesional.id} profesional={profesional} />
))}
```

---

## 🔎 SEO

Aplicamos conceptos básicos de **SEO** para que los buscadores entiendan de qué trata el sitio y cómo está organizado.

### Qué aplicamos

* **Atributo `lang="es"`** en `index.html`: indica que el contenido está en español.
* **Etiqueta `<title>`**: "OfiGO — Bienvenido", el título que se ve en la pestaña y en los resultados de búsqueda.
* **Meta description**: una descripción breve del sitio para los buscadores.

  ```html
  <meta name="description" content="OfiGO: encontrá profesionales de oficios cerca tuyo en Tucumán o recibí pedidos de clientes." />
  ```

* **Meta viewport**: para que la página se adapte a celulares, algo que los buscadores tienen en cuenta.
* **Etiquetas semánticas**: `<nav>` (lo genera el `Navbar` de React Bootstrap), `<main>`, `<section>` y `<footer>`, para organizar el contenido.
* **Jerarquía de títulos**: un solo `<h1>` por página y `<h2>`/`<h3>` para las secciones, en orden.
* **Textos descriptivos**: títulos y textos relacionados con oficios, profesionales y Tucumán, que son las palabras que un usuario buscaría.
* **Accesibilidad**: `aria-label` en el buscador y en los botones que solo tienen ícono, y `aria-hidden` en el fondo decorativo para que los lectores de pantalla lo ignoren.
* **Favicon**: el logo de OfiGO en la pestaña del navegador.

### Limitaciones y mejoras pendientes

* Al ser una aplicación de React (SPA), el contenido se genera con JavaScript y todas las páginas comparten el mismo `<title>` y la misma descripción. Cuando se agregue la navegación con rutas, se puede cambiar el título según la página (React 19 permite escribir `<title>` dentro de un componente).
* Agregar etiquetas **Open Graph** (`og:title`, `og:description`, `og:image`) para que el link se vea con imagen y descripción al compartirlo por WhatsApp o redes.
* Completar el texto alternativo (`alt`) del logo, que hoy está vacío.


