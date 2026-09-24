import { Badge, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'

function PanelTrabajador({ nombre, calificacion, pedidosPendientes }) {
  return (
    <Container className="py-5">
      <Badge bg="warning" text="dark" pill className="mb-3 px-4 py-2 fs-6 fw-semibold bg-gradient shadow">
        <i className="bi bi-briefcase me-1"></i>Panel de trabajador
      </Badge>
      <h1 className="display-6 fw-bold">
        Hola, <span className="text-primary">{nombre}</span>
      </h1>
      <p className="lead text-secondary mb-4">
        Así está la actividad de tus servicios en la plataforma hoy.
      </p>

      <Row xs={1} sm={2} className="g-3 mb-4">
        <Col>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-star-fill text-warning fs-2"></i>
              <p className="fs-3 fw-bold mb-0">{calificacion}</p>
              <p className="text-secondary small mb-0">Calificación promedio</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-inbox text-primary fs-2"></i>
              <p className="fs-3 fw-bold mb-0">{pedidosPendientes}</p>
              <p className="text-secondary small mb-0">Pedidos pendientes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ListGroup className="shadow-sm">
        <ListGroup.Item action href="#" className="d-flex align-items-center gap-3 py-3">
          <i className="bi bi-clipboard-check text-primary fs-3"></i>
          <div className="flex-grow-1">
            <h2 className="h6 fw-bold mb-1">Pedidos recibidos</h2>
            <p className="text-secondary small mb-0">
              Mirá las solicitudes de nuevos clientes y actualizá el estado de los trabajos.
            </p>
          </div>
          <i className="bi bi-chevron-right text-secondary"></i>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default PanelTrabajador
