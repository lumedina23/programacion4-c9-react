// Patrón decorativo de íconos de oficios para poner de fondo.
// El contenedor tiene que tener "position-relative overflow-hidden" y cada sección encima "position-relative".
const ICONOS = [
  'bi-wrench',
  'bi-hammer',
  'bi-lightning-charge',
  'bi-droplet',
  'bi-brush',
  'bi-key',
  'bi-screwdriver',
  'bi-paint-bucket',
  'bi-rulers',
  'bi-snow',
  'bi-flower1',
  'bi-tools',
]

// Alcanza para cubrir toda la página; lo que sobra queda oculto
const CANTIDAD = 1000

function FondoHerramientas() {
  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-around align-content-start gap-5 p-4 opacity-25 pe-none"
      aria-hidden="true"
    >
      {Array.from({ length: CANTIDAD }, (_, indice) => (
        <i key={indice} className={`bi ${ICONOS[indice % ICONOS.length]} fs-4 text-secondary`}></i>
      ))}
    </div>
  )
}

export default FondoHerramientas
