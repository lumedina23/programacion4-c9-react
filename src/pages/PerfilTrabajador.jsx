import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { PROFESIONALES } from '../data/profesionales.js'
import { formatearPrecio, iniciales } from '../utils/formato.js'

// Bloque 3 - Perfil público de un profesional
// Migrado desde: perfiltrabajador.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.

// Sombra "dura" desplazada, igual que en Perfil: un fondo de color asoma abajo y a la derecha
function ConSombra({ color = 'warning', redondeo = 'rounded-3', children }) {
  return (
    <div className={`bg-${color} ${redondeo} pe-1 pb-1 h-100`}>
      {children}
    </div>
  )
}

// 5 estrellas: llenas, media y vacías según la calificación
function Estrellas({ rating }) {
  return (
    <span className="text-warning fs-5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((numero) => {
        let icono = 'bi-star'
        if (rating >= numero) icono = 'bi-star-fill'
        else if (rating >= numero - 0.5) icono = 'bi-star-half'
        return <i key={numero} className={`bi ${icono} mx-1`}></i>
      })}
    </span>
  )
}

function PerfilTrabajador({ profesional = PROFESIONALES[0], alVolver }) {
  const { nombre, oficio, rating, resenas, distancia, llegada, precio, disponible, tags, zona, descripcion } = profesional

  const resumen = [
    { valor: formatearPrecio(precio), texto: 'por hora', icono: 'bi-cash-coin' },
    { valor: distancia, texto: 'distancia', icono: 'bi-geo-alt' },
    { valor: llegada, texto: 'llegada estimada', icono: 'bi-clock' },
  ]

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm={11} md={8} lg={6}>
          <Button variant="link" className="fw-semibold text-decoration-none px-0 mb-3" onClick={alVolver}>
            <i className="bi bi-arrow-left me-1"></i>Volver a la búsqueda
          </Button>

          <ConSombra redondeo="rounded-4">
            <article className="bg-primary-subtle border border-2 border-primary rounded-4 text-center px-4 py-4">
              <div className="position-relative d-inline-block">
                <div className="bg-primary text-white fw-bold fs-3 rounded-circle border border-2 border-white p-4 lh-1 shadow-sm">
                  {iniciales(nombre)}
                </div>
                <span
                  className={`position-absolute bottom-0 end-0 rounded-circle border border-2 border-white p-2 bg-${disponible ? 'success' : 'secondary'}`}
                  title={disponible ? 'Disponible' : 'Ocupado'}
                ></span>
              </div>

              <h1 className="h4 fw-bolder text-primary-emphasis mt-3 mb-2">{nombre}</h1>
              <Badge bg="warning" text="dark" pill className="border border-primary px-3 py-2">
                {oficio}
              </Badge>

              <div className="mt-3">
                <Estrellas rating={rating} />
                <p className="small fw-semibold mb-0">{rating} de 5 · {resenas} reseñas</p>
              </div>

              <Row xs={3} className="g-2 my-3">
                {resumen.map((dato) => (
                  <Col key={dato.texto}>
                    <ConSombra>
                      <div className="bg-white border border-2 border-primary rounded-3 h-100 py-2 px-1">
                        <i className={`bi ${dato.icono} text-primary`}></i>
                        <div className="fw-bolder">{dato.valor}</div>
                        <div className="small text-secondary lh-sm">{dato.texto}</div>
                      </div>
                    </ConSombra>
                  </Col>
                ))}
              </Row>

              <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center mb-3">
                {tags.map((tag) => (
                  <Badge key={tag} bg="white" text="primary" pill className="border border-primary fw-semibold">
                    {tag}
                  </Badge>
                ))}
              </Stack>

              <p className="mb-3">{descripcion}</p>

              <Stack gap={1} className="small mb-4">
                <span>
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                  Zona de trabajo: <strong>{zona}</strong>
                </span>
                <span className={`fw-semibold text-${disponible ? 'success' : 'secondary'}`}>
                  <i className="bi bi-circle-fill small me-1"></i>
                  {disponible ? 'Disponible ahora' : 'No disponible por el momento'}
                </span>
              </Stack>

              <ConSombra color="primary">
                <Button
                  variant="warning"
                  className="w-100 fw-bolder border border-2 border-primary rounded-3 py-2"
                  disabled={!disponible}
                >
                  <i className="bi bi-person-check me-1"></i>Contratar
                </Button>
              </ConSombra>
            </article>
          </ConSombra>
        </Col>
      </Row>
    </Container>
  )
}

export default PerfilTrabajador
