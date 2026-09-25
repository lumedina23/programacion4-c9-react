import { useState } from 'react'
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { PROFESIONALES } from '../data/profesionales.js'
import { iniciales } from '../utils/formato.js'
import { guardarPedido } from '../utils/sesion.js'

// Bloque 3 - Formulario para pedir un servicio
// Migrado desde: crearpedido.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.

const MAX_DESCRIPCION = 200

const PEDIDO_VACIO = { direccion: '', fechaSolicitada: '', descripcion: '' }

function validar(pedido) {
  const errores = {}

  if (!pedido.direccion.trim()) {
    errores.direccion = 'Ingresá la dirección donde se hará el trabajo.'
  }

  if (!pedido.fechaSolicitada) {
    errores.fechaSolicitada = 'Elegí una fecha y hora.'
  } else if (new Date(pedido.fechaSolicitada) <= new Date()) {
    errores.fechaSolicitada = 'La fecha tiene que ser posterior a este momento.'
  }

  if (!pedido.descripcion.trim()) {
    errores.descripcion = 'Contale al profesional qué necesitás.'
  }

  return errores
}

// Se muestra en lugar del formulario cuando el pedido ya se guardó
function PedidoEnviado({ profesional, alHacerOtro }) {
  return (
    <Card className="border-0 shadow-sm rounded-4 text-center">
      <Card.Body className="p-4 p-md-5">
        <div className="bg-success-subtle text-success-emphasis rounded-circle d-inline-block p-3 lh-1 mb-3">
          <i className="bi bi-check-lg fs-2"></i>
        </div>
        <h2 className="h4 fw-bold">¡Pedido enviado!</h2>
        <p className="text-secondary">
          {profesional.nombre} va a recibir tu pedido. Podés seguir su estado desde Mis pedidos.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4">
          <Button as={Link} to="/historial" variant="primary" className="rounded-pill px-4">
            Ver mis pedidos
          </Button>
          <Button variant="outline-primary" className="rounded-pill px-4" onClick={alHacerOtro}>
            Hacer otro pedido
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

function CrearPedido({ usuario }) {
  // Se llega desde el perfil del profesional: /crear-pedido?profesional=3
  const [parametros] = useSearchParams()
  const profesional = PROFESIONALES.find((p) => String(p.id) === parametros.get('profesional'))

  const [pedido, setPedido] = useState(PEDIDO_VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setPedido({ ...pedido, [name]: value })
    setErrores({ ...errores, [name]: undefined })
  }

  function enviar(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(pedido)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    // Mismos datos que usa el panel del trabajador para contar los pendientes
    guardarPedido({
      profesionalId: profesional.id,
      profesionalNombre: profesional.nombre,
      oficio: profesional.oficio,
      cliente: usuario ? usuario.nombre : 'Invitado',
      direccion: pedido.direccion.trim(),
      fechaSolicitada: pedido.fechaSolicitada,
      descripcion: pedido.descripcion.trim(),
      estado: 'Pendiente',
    })
    setPedido(PEDIDO_VACIO)
    setEnviado(true)
  }

  // Sin profesional no se puede armar el pedido: se manda a elegir uno
  if (!profesional) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col sm={11} md={8} lg={6}>
            <Alert variant="warning" className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
              <i className="bi bi-person-exclamation fs-3"></i>
              <div className="flex-grow-1">
                <Alert.Heading as="h1" className="h6 fw-bold">Primero elegí un profesional</Alert.Heading>
                <p className="mb-0">Para pedir un servicio, entrá al perfil de un profesional y tocá Contratar.</p>
              </div>
              <Button as={Link} to="/oficios" variant="dark" className="rounded-pill px-4">
                Buscar
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm={11} md={8} lg={6}>
          <Link
            to={`/profesional/${profesional.id}`}
            className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold mb-3"
          >
            <i className="bi bi-arrow-left"></i>Volver al perfil
          </Link>

          <section className="mb-4">
            <Badge bg="warning" text="dark" pill className="mb-2 px-3 py-2">Nueva solicitud</Badge>
            <h1 className="h3 fw-bold">Pedir servicio</h1>
            <p className="text-secondary mb-0">Completá los datos para enviar tu pedido al profesional.</p>
          </section>

          {/* A quién se le pide el servicio */}
          <Card className="border-0 shadow-sm rounded-4 mb-3">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-primary text-white fw-bold rounded-circle p-3 lh-1">
                {iniciales(profesional.nombre)}
              </div>
              <div>
                <p className="fw-bold mb-0">{profesional.nombre}</p>
                <p className="text-secondary small mb-0">
                  {profesional.oficio} · <i className="bi bi-geo-alt"></i> {profesional.zona}
                </p>
              </div>
            </Card.Body>
          </Card>

          {enviado ? (
            <PedidoEnviado profesional={profesional} alHacerOtro={() => setEnviado(false)} />
          ) : (
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <Form noValidate onSubmit={enviar}>
                  <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label className="small fw-bold">Dirección donde se realizará el trabajo</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      placeholder="Ej: Av. Siempre Viva 742, San Miguel de Tucumán"
                      value={pedido.direccion}
                      onChange={cambiarCampo}
                      isInvalid={!!errores.direccion}
                    />
                    <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="fechaSolicitada">
                    <Form.Label className="small fw-bold">Fecha y hora deseada</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="fechaSolicitada"
                      value={pedido.fechaSolicitada}
                      onChange={cambiarCampo}
                      isInvalid={!!errores.fechaSolicitada}
                    />
                    <Form.Control.Feedback type="invalid">{errores.fechaSolicitada}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="descripcion">
                    <Form.Label className="small fw-bold">Describí el problema o trabajo a realizar</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="descripcion"
                      maxLength={MAX_DESCRIPCION}
                      placeholder="Ej: Se rompió una canilla en la cocina y pierde agua constantemente."
                      value={pedido.descripcion}
                      onChange={cambiarCampo}
                      isInvalid={!!errores.descripcion}
                    />
                    <div className="d-flex justify-content-between mt-1">
                      <Form.Control.Feedback type="invalid" className="d-block">{errores.descripcion}</Form.Control.Feedback>
                      <Form.Text className="ms-auto text-nowrap">
                        {pedido.descripcion.length} / {MAX_DESCRIPCION}
                      </Form.Text>
                    </div>
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold rounded-pill">
                    <i className="bi bi-send me-2"></i>Enviar pedido
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default CrearPedido
