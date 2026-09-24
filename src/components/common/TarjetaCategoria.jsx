import { Card } from 'react-bootstrap'

function TarjetaCategoria({ nombre, icono, color }) {
  return (
    <Card className="h-100 text-center border-0 shadow-sm rounded-4">
      <Card.Body className="d-flex flex-column align-items-center gap-2 py-3 px-2">
        <div className={`bg-${color}-subtle text-${color}-emphasis rounded-circle p-2 lh-1`}>
          <i className={`bi ${icono} fs-5`}></i>
        </div>
        <Card.Text className="fw-semibold small mb-0">{nombre}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaCategoria
