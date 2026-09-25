import { useState } from 'react'

// Idea tomada de Uiverse (tarjeta tipo notificación): barra vertical a la izquierda,
// título y texto que se corren un poco al pasar el mouse. Sin CSS propio.
function TarjetaAviso({ titulo, texto }) {
  const [activa, setActiva] = useState(false)

  return (
    <div
      className={`d-flex bg-primary bg-opacity-75 text-white rounded-4 border border-white border-opacity-25 py-3 pe-4 ${
        activa ? 'ps-4 shadow-lg' : 'ps-3 shadow-sm'
      }`}
      onMouseEnter={() => setActiva(true)}
      onMouseLeave={() => setActiva(false)}
    >
      <div className="bg-white bg-opacity-75 rounded-pill ps-1"></div>
      <div className="ms-3">
        <h2 className="h4 fw-semibold mb-1">{titulo}</h2>
        <p className="mb-0 opacity-75">{texto}</p>
      </div>
    </div>
  )
}

export default TarjetaAviso
