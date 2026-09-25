import { useState } from 'react'
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { PROFESIONALES } from '../data/profesionales.js'


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

function CrearPedido() {
  const [parametros] = useSearchParams()
  const profesional = PROFESIONALES.find((p) => String(p.id) === parametros.get('profesional'))

  const [pedido, setPedido] = useState(PEDIDO_VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setPedido({ ...pedido, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setEnviado(false)
  }

  function enviar(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(pedido)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true)
      setPedido(PEDIDO_VACIO)
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={9} lg={7} xl={6}>
          <Link
            to={profesional ? `/profesional/${profesional.id}` : '/oficios'}
            className="d-inline-flex align-items-center gap-1 text-decoration-none text-secondary small fw-bold"
          >
            <i className="bi bi-arrow-left"></i>
            {profesional ? 'Volver al perfil' : 'Volver a la búsqueda'}
          </Link>

          <section className="mt-3 mb-4">
            <Badge bg="warning" text="dark" pill className="mb-2">Nueva solicitud</Badge>
            <h1 className="h3 fw-bold">Pedir servicio</h1>
            <p className="text-secondary mb-0">
              Completá los datos para enviar tu pedido
              {profesional ? <> a <strong className="text-body">{profesional.nombre}</strong> ({profesional.oficio}).</> : ' al profesional.'}
            </p>
          </section>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {enviado && (
                <Alert variant="success" className="d-flex align-items-center gap-2" onClose={() => setEnviado(false)} dismissible>
                  <i className="bi bi-check-circle-fill"></i>
                  ¡Pedido enviado! Podés seguir su estado desde <Alert.Link as={Link} to="/historial">Mis pedidos</Alert.Link>.
                </Alert>
              )}

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

                <Button type="submit" variant="primary" className="w-100 py-2">
                  <i className="bi bi-send me-2"></i>Enviar pedido
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CrearPedido
