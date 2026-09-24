import { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { CATEGORIAS } from '../../data/categorias.js'
import { formatearPrecio, iniciales } from '../../utils/formato.js'

function TarjetaProfesional({ profesional }) {
  const { nombre, oficio, categoria, rating, resenas, distancia, precio, disponible } = profesional
  const [guardado, setGuardado] = useState(false)

  const datosCategoria = CATEGORIAS.find((cat) => cat.nombre === categoria)
  const color = datosCategoria ? datosCategoria.color : 'primary'
  // Sobre amarillo y celeste se lee mejor el texto oscuro
  const colorTexto = color === 'warning' || color === 'info' ? 'text-dark' : 'text-white'

  return (
    <Card className="h-100 border-0 shadow rounded-5 overflow-hidden">
      <div className={`bg-${color} bg-gradient p-3 d-flex justify-content-between align-items-center`}>
        <div className="d-flex align-items-center gap-2">
          <div className="bg-white text-dark fw-bold rounded-circle p-3 lh-1 shadow-sm">
            {iniciales(nombre)}
          </div>
          <Card.Title as="h3" className={`h6 fw-bold mb-0 ${colorTexto}`}>{nombre}</Card.Title>
        </div>
        <Button
          variant="light"
          size="sm"
          className="rounded-3"
          aria-label={guardado ? 'Quitar de guardados' : 'Guardar profesional'}
          onClick={() => setGuardado(!guardado)}
        >
          <i className={`bi ${guardado ? 'bi-bookmark-fill text-primary' : 'bi-bookmark'}`}></i>
        </Button>
      </div>

      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <Card.Text className="text-secondary small mb-0">{oficio}</Card.Text>
          <Badge bg={disponible ? 'success' : 'secondary'} pill>
            {disponible ? 'Disponible' : 'Ocupado'}
          </Badge>
        </div>

        <div className="bg-success-subtle text-success-emphasis rounded-3 p-2 d-inline-flex gap-3 small">
          <span>
            <i className="bi bi-star-fill me-1"></i>{rating} ({resenas})
          </span>
          <span>
            <i className="bi bi-geo-alt me-1"></i>{distancia}
          </span>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 px-4 pb-4 d-flex justify-content-between align-items-center">
        <span className="fw-bold">
          {formatearPrecio(precio)} <span className="text-secondary fw-normal small">/ hora</span>
        </span>
        <Button variant="primary" size="sm" className="rounded-pill px-3" disabled={!disponible}>
          Contratar
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default TarjetaProfesional
