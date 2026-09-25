import { useState } from 'react'

// Tarjeta que se "da vuelta": al pasar el mouse (o tocarla en el celular) muestra la explicación.
// Idea tomada de Uiverse, pero con estado de React en vez de la animación 3D de CSS.
function TarjetaPaso({ numero, titulo, texto }) {
  const [volteada, setVolteada] = useState(false)

  return (
    <div
      className="ratio ratio-16x9"
      role="button"
      tabIndex={0}
      aria-label={`Paso ${numero}: ${titulo}`}
      onMouseEnter={() => setVolteada(true)}
      onMouseLeave={() => setVolteada(false)}
      onClick={() => setVolteada(!volteada)}
    >
      {volteada ? (
        <div className="bg-warning-subtle text-warning-emphasis rounded-3 d-flex align-items-center justify-content-center text-center p-4">
          <p className="mb-0">{texto}</p>
        </div>
      ) : (
        <div className="bg-primary-subtle text-primary-emphasis rounded-3 d-flex flex-column align-items-center justify-content-center text-center p-4">
          <span className="display-5 fw-bold">{numero}</span>
          <h3 className="h5 fw-bold mb-0">{titulo}</h3>
        </div>
      )}
    </div>
  )
}

export default TarjetaPaso
