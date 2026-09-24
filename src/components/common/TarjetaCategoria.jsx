import { Card } from 'react-bootstrap'

function TarjetaCategoria({ nombre, icono }) {
  return (
    <Card className="h-100 text-center border-0 shadow-sm">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-2">
        <i className={`bi ${icono} fs-1 text-primary`}></i>
        <Card.Text className="fw-semibold small mb-0">{nombre}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaCategoria
