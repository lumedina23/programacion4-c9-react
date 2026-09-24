import { Badge, Button, Card, Stack } from 'react-bootstrap'
import { formatearPrecio, iniciales } from '../../utils/formato.js'

function TarjetaProfesional({ profesional }) {
  const { nombre, oficio, rating, resenas, distancia, precio, disponible, tags } = profesional

  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="align-items-start">
          <div className="bg-primary text-white fw-bold rounded-circle p-3 lh-1">
            {iniciales(nombre)}
          </div>

          <div className="flex-grow-1">
            <Stack direction="horizontal" gap={2} className="flex-wrap">
              <Card.Title as="h3" className="h6 fw-bold mb-0">{nombre}</Card.Title>
              <Badge bg={disponible ? 'success' : 'secondary'}>
                {disponible ? 'Disponible' : 'Ocupado'}
              </Badge>
            </Stack>
            <Card.Subtitle className="text-secondary small mt-1">{oficio}</Card.Subtitle>

            <Stack direction="horizontal" gap={3} className="small mt-2">
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-star-fill text-warning"></i> {rating} ({resenas})
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-geo-alt text-secondary"></i> {distancia}
              </span>
            </Stack>

            <Stack direction="horizontal" gap={1} className="flex-wrap mt-2">
              {tags.map((tag) => (
                <Badge key={tag} bg="light" text="dark" className="border fw-normal">
                  {tag}
                </Badge>
              ))}
            </Stack>
          </div>
        </Stack>
      </Card.Body>

      <Card.Footer className="bg-transparent d-flex justify-content-between align-items-center">
        <span className="fw-bold">
          {formatearPrecio(precio)} <span className="text-secondary fw-normal small">/ hora</span>
        </span>
        <Button variant="primary" size="sm" disabled={!disponible}>
          Contratar
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default TarjetaProfesional
