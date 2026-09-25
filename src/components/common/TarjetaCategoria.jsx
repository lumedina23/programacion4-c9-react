import { Card } from 'react-bootstrap'

function TarjetaCategoria({ nombre, icono, color, relleno = false, activa = false, alSeleccionar }) {
  const seleccionable = Boolean(alSeleccionar)
  const borde = activa ? `border border-2 border-${color}` : 'border-0'
  const circulo = relleno ? `bg-${color} text-white` : `bg-${color}-subtle text-${color}-emphasis`

  return (
    <Card
      as={seleccionable ? 'button' : 'div'}
      type={seleccionable ? 'button' : undefined}
      onClick={alSeleccionar}
      aria-pressed={seleccionable ? activa : undefined}
      className={`h-100 w-100 text-center shadow-sm rounded-4 ${borde}`}
    >
      <Card.Body className="d-flex flex-column align-items-center gap-2 py-3 px-2">
        <div className={`${circulo} rounded-circle p-2 lh-1`}>
          <i className={`bi ${icono} fs-5`}></i>
        </div>
        <Card.Text className="fw-semibold small mb-0">{nombre}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaCategoria
