import { useState } from 'react'
import { Button } from 'react-bootstrap'

// Botón amarillo con borde azul y sombra dura, como "Contratar" en el perfil del trabajador.
// Al pasar el mouse se "hunde": la sombra desaparece y el botón baja hacia donde estaba la sombra.
function BotonOfiGO({ children, onClick, className = '', ...resto }) {
  const [apretado, setApretado] = useState(false)

  return (
    <div className={`d-inline-block ${className}`}>
      <div className={`rounded-3 ${apretado ? 'ps-1 pt-1' : 'bg-primary pe-1 pb-1'}`}>
        <Button
          variant="warning"
          className="w-100 fw-bolder border border-2 border-primary rounded-3 px-4 py-2"
          onMouseEnter={() => setApretado(true)}
          onMouseLeave={() => setApretado(false)}
          onClick={onClick}
          {...resto}
        >
          {children}
        </Button>
      </div>
    </div>
  )
}

export default BotonOfiGO
