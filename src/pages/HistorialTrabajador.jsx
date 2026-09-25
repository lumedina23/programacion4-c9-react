import { Alert, Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { obtenerPedidos } from '../utils/sesion.js'

// Bloque 4 - Pedidos recibidos por el trabajador
// Migrar desde: historialtrabajador.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.
// Por ahora solo lista los pedidos guardados; falta aceptar, rechazar y finalizar.

const COLOR_ESTADO = { Pendiente: 'warning', Aceptado: 'primary', Finalizado: 'success', Rechazado: 'secondary' }

function formatearFecha(fechaIso) {
  return new Date(fechaIso).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })
}

function TarjetaPedido({ pedido }) {
  return (
    <Card className="h-100 border-0 shadow-sm rounded-4">
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between align-items-start mb-2">
          <div>
            <Card.Title as="h2" className="h6 fw-bold mb-0">{pedido.cliente}</Card.Title>
            <Card.Subtitle className="text-secondary small mt-1">
              Pedido el {formatearFecha(pedido.creadoEl)}
            </Card.Subtitle>
          </div>
          <Badge bg={COLOR_ESTADO[pedido.estado] || 'secondary'} text={pedido.estado === 'Pendiente' ? 'dark' : undefined} pill>
            {pedido.estado}
          </Badge>
        </Stack>

        <p className="mb-3">{pedido.descripcion}</p>

        <ul className="list-unstyled small text-secondary mb-0">
          <li className="mb-1"><i className="bi bi-geo-alt me-2"></i>{pedido.direccion}</li>
          <li><i className="bi bi-calendar-event me-2"></i>{formatearFecha(pedido.fechaSolicitada)}</li>
        </ul>
      </Card.Body>
    </Card>
  )
}

function HistorialTrabajador({ usuario }) {
  if (!usuario || usuario.rol !== 'trabajador') {
    return (
      <Container className="py-5">
        <Alert variant="warning">Para ver los pedidos recibidos, entrá como trabajador desde la portada.</Alert>
      </Container>
    )
  }

  // Los más nuevos primero
  const pedidos = obtenerPedidos()
    .filter((pedido) => pedido.profesionalId === usuario.profesionalId)
    .reverse()

  return (
    <Container className="py-5">
      <h1 className="h3 fw-bold">Pedidos recibidos</h1>
      <p className="text-secondary mb-4">Las solicitudes que te hicieron los clientes.</p>

      {pedidos.length === 0 ? (
        <div className="text-center text-secondary py-5">
          <i className="bi bi-inbox fs-1 d-block mb-2"></i>
          <p className="mb-0">Todavía no recibiste pedidos.</p>
        </div>
      ) : (
        <Row xs={1} lg={2} className="g-3">
          {pedidos.map((pedido) => (
            <Col key={pedido.id}>
              <TarjetaPedido pedido={pedido} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HistorialTrabajador
