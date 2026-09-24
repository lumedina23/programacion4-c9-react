import { Badge, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { iniciales } from '../utils/formato.js'

// Bloque 4 - Perfil del usuario logueado
// Migrado desde: perfil.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.

const USUARIO_EJEMPLO = {
  nombre: 'Nombre del usuario',
  email: 'usuario@email.com',
  rol: 'Usuario',
}

// Sombra "dura" desplazada: un fondo de color asoma abajo y a la derecha del contenido
function ConSombra({ color = 'warning', redondeo = 'rounded-3', children }) {
  return (
    <div className={`bg-${color} ${redondeo} pe-1 pb-1`}>
      {children}
    </div>
  )
}

function Perfil({ usuario = USUARIO_EJEMPLO }) {
  const datos = [
    { etiqueta: 'Nombre', valor: usuario.nombre, icono: 'bi-person' },
    { etiqueta: 'Email', valor: usuario.email, icono: 'bi-envelope' },
    { etiqueta: 'Rol', valor: usuario.rol, icono: 'bi-person-badge' },
  ]

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm={10} md={7} lg={5}>
          <ConSombra redondeo="rounded-4">
            <section className="bg-primary-subtle border border-2 border-primary rounded-4 text-center px-4 py-4">
              <div className="d-inline-block bg-primary text-white fw-bold fs-4 rounded-circle border border-2 border-white p-3 lh-1 shadow-sm">
                {iniciales(usuario.nombre)}
              </div>

              <h1 className="h4 fw-bolder text-primary-emphasis mt-3 mb-1">Mi perfil</h1>
              <p className="fw-semibold mb-2">Información de tu cuenta.</p>
              <Badge bg="warning" text="dark" pill className="border border-primary mb-3">
                {usuario.rol}
              </Badge>

              {datos.map((dato) => (
                <Form.Group key={dato.etiqueta} controlId={`perfil-${dato.etiqueta}`} className="text-start mb-3">
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

              <div className="mt-4">
                <ConSombra color="primary">
                  <Button variant="warning" className="w-100 fw-bolder border border-2 border-primary rounded-3 py-2">
                    <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
                  </Button>
                </ConSombra>
              </div>
            </section>
          </ConSombra>
        </Col>
      </Row>
    </Container>
  )
}

export default Perfil
