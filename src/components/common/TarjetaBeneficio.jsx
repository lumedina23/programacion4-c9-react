import { useState } from 'react'

// Idea tomada de Uiverse: tarjeta azul con dos capas más claras que asoman detrás.
// Sin CSS propio: las capas son divs más angostos y la tarjeta "sube" al pasar el mouse
// cambiando el espacio de arriba (pt-3) por espacio abajo (pb-3).
function TarjetaBeneficio({ icono, titulo, texto }) {
  const [activa, setActiva] = useState(false)

  return (
    <div
      className={`d-flex flex-column h-100 ${activa ? 'pb-3' : 'pt-3'}`}
      onMouseEnter={() => setActiva(true)}
      onMouseLeave={() => setActiva(false)}
    >
      <div className="mx-5 pt-2 bg-primary bg-opacity-10 rounded-top-4"></div>
      <div className="mx-3 pt-2 bg-primary-subtle rounded-top-4"></div>

      <div
        className={`flex-grow-1 bg-primary text-white rounded-4 p-4 d-flex flex-column align-items-start gap-3 ${
          activa ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <i className={`bi ${icono} fs-1 lh-1`}></i>
        <div>
          <h3 className="h5 fw-bold">{titulo}</h3>
          <p className="mb-0 opacity-75">{texto}</p>
        </div>
      </div>
    </div>
  )
}

export default TarjetaBeneficio
