import { Badge, Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PROFESIONALES } from '../data/profesionales.js'
import { formatearPrecio, iniciales } from '../utils/formato.js'

// Bloque 3 - Perfil público de un profesional
// Migrado desde: perfiltrabajador.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.
// Mismo estilo que Mi perfil (Perfil.jsx): cada dato va como un campo con etiqueta y sombra amarilla.

// Sombra "dura" desplazada, igual que en Perfil: un fondo de color asoma abajo y a la derecha
function ConSombra({ color = 'warning', redondeo = 'rounded-3', children }) {
  return (
    <div className={`bg-${color} ${redondeo} pe-1 pb-1`}>
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

// Etiqueta + recuadro blanco con sombra, como los campos de Mi perfil
function Campo({ etiqueta, icono, children }) {
  return (
    <div className="text-start mb-3">
      <p className="fw-bold text-primary-emphasis small mb-1">
        <i className={`bi ${icono} me-1`}></i>{etiqueta}
      </p>
      <ConSombra>
        <div className="border border-2 border-primary rounded-3 bg-white px-3 py-2">{children}</div>
      </ConSombra>
    </div>
  )
}

function PerfilTrabajador({ profesional = PROFESIONALES[0], alVolver }) {
  const { id, nombre, oficio, rating, resenas, distancia, llegada, precio, disponible, tags, zona, descripcion } = profesional

  const datos = [
    { etiqueta: 'Precio por hora', valor: formatearPrecio(precio), icono: 'bi-cash-coin' },
    { etiqueta: 'Distancia', valor: distancia, icono: 'bi-geo-alt' },
    { etiqueta: 'Llegada estimada', valor: llegada, icono: 'bi-clock' },
    { etiqueta: 'Zona de trabajo', valor: zona, icono: 'bi-geo-alt-fill' },
  ]

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm={10} md={7} lg={5}>
          <Button variant="link" className="fw-semibold text-decoration-none px-0 mb-3" onClick={alVolver}>
            <i className="bi bi-arrow-left me-1"></i>Volver a la búsqueda
          </Button>

          <ConSombra redondeo="rounded-4">
            <article className="bg-primary-subtle border border-2 border-primary rounded-4 text-center px-4 py-4">
              <div className="position-relative d-inline-block">
                <div className="bg-primary text-white fw-bold fs-4 rounded-circle border border-2 border-white p-3 lh-1 shadow-sm">
                  {iniciales(nombre)}
                </div>
                <span
                  className={`position-absolute bottom-0 end-0 rounded-circle border border-2 border-white p-2 bg-${disponible ? 'success' : 'secondary'}`}
                  title={disponible ? 'Disponible' : 'Ocupado'}
                ></span>
              </div>

              <h1 className="h4 fw-bolder text-primary-emphasis mt-3 mb-1">{nombre}</h1>
              <p className="fw-semibold mb-2">
                <Estrellas rating={rating} />
                <span className="d-block small">{rating} de 5 · {resenas} reseñas</span>
              </p>
              <Badge bg="warning" text="dark" pill className="border border-primary mb-3">
                {oficio}
              </Badge>

              {datos.map((dato) => (
                <Form.Group key={dato.etiqueta} controlId={`trabajador-${dato.etiqueta}`} className="text-start mb-3">
                  <Form.Label className="fw-bold text-primary-emphasis small mb-1">
                    <i className={`bi ${dato.icono} me-1`}></i>{dato.etiqueta}
                  </Form.Label>
                  <ConSombra>
                    <Form.Control
                      readOnly
                      value={dato.valor}
                      className="border-2 border-primary rounded-3 bg-white py-2"
                    />
                  </ConSombra>
                </Form.Group>
              ))}

              <Campo etiqueta="Especialidades" icono="bi-tools">
                <Stack direction="horizontal" gap={2} className="flex-wrap">
                  {tags.map((tag) => (
                    <Badge key={tag} bg="white" text="primary" pill className="border border-primary fw-semibold">
                      {tag}
                    </Badge>
                  ))}
                </Stack>
              </Campo>

              <Campo etiqueta="Sobre el profesional" icono="bi-chat-left-text">
                <p className="mb-0">{descripcion}</p>
              </Campo>

              <p className={`fw-semibold small text-${disponible ? 'success' : 'secondary'} mb-0`}>
                <i className="bi bi-circle-fill small me-1"></i>
                {disponible ? 'Disponible ahora' : 'No disponible por el momento'}
              </p>

              <div className="mt-4">
                <ConSombra color="primary">
                  <Button
                    variant="warning"
                    className="w-100 fw-bolder border border-2 border-primary rounded-3 py-2"
                    {...(disponible ? { as: Link, to: `/crear-pedido?profesional=${id}` } : { disabled: true })}
                  >
                    <i className="bi bi-person-check me-1"></i>Contratar
                  </Button>
                </ConSombra>
              </div>
            </article>
          </ConSombra>
        </Col>
      </Row>
    </Container>
  )
}

export default PerfilTrabajador
