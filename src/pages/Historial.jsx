import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BotonOfiGO from '../components/common/BotonOfiGO.jsx'
import ConSombra from '../components/common/ConSombra.jsx'
import TarjetaPedido from '../components/common/TarjetaPedido.jsx'
import TituloPagina from '../components/common/TituloPagina.jsx'
import { actualizarPedido, obtenerPedidos } from '../utils/sesion.js'

// Bloque 4 - Pedidos del cliente
// Migrado desde: historial.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.

const PUNTAJES = [1, 2, 3, 4, 5]

function Estrellas({ puntaje }) {
  return PUNTAJES.map((valor) => (
    <i key={valor} className={`bi ${valor <= puntaje ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
  ))
}

// Lo que se ve abajo de cada pedido: el botón para calificar o la calificación ya hecha
function CalificacionPedido({ pedido, alCalificar }) {
  if (pedido.calificacion) {
    return (
      <p className="small fw-semibold mb-0">
        Tu calificación: <Estrellas puntaje={pedido.calificacion.puntaje} />
        {pedido.calificacion.comentario && (
          <span className="text-secondary fw-normal"> · {pedido.calificacion.comentario}</span>
        )}
      </p>
    )
  }

  if (pedido.estado === 'Finalizado') {
    return (
      <BotonOfiGO onClick={alCalificar}>
        <i className="bi bi-star me-1"></i>Calificar este servicio
      </BotonOfiGO>
    )
  }

  return null
}

// Ventana para elegir de 1 a 5 estrellas y dejar un comentario (el modal del TP1)
function ModalCalificar({ pedido, alCerrar, alEnviar }) {
  const [puntaje, setPuntaje] = useState(0)
  const [comentario, setComentario] = useState('')
  const [error, setError] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    if (puntaje === 0) {
      setError('Elegí una cantidad de estrellas.')
      return
    }
    alEnviar({ puntaje, comentario: comentario.trim() })
  }

  return (
    <Modal show onHide={alCerrar} centered>
      <Form onSubmit={enviar} className="border border-3 border-primary rounded-3">
        <Modal.Header closeButton className="bg-primary-subtle border-bottom border-2 border-primary">
          <Modal.Title as="h2" className="h5 fw-bolder text-primary-emphasis">
            Calificar a {pedido.profesionalNombre}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="fw-semibold mb-2">¿Cómo fue el trabajo?</p>
          <div className="d-flex gap-1 mb-3" role="group" aria-label="Puntaje">
            {PUNTAJES.map((valor) => (
              <Button
                key={valor}
                variant="link"
                className="p-0 fs-2 text-warning"
                aria-label={`${valor} estrellas`}
                onClick={() => {
                  setPuntaje(valor)
                  setError('')
                }}
              >
                <i className={`bi ${valor <= puntaje ? 'bi-star-fill' : 'bi-star'}`}></i>
              </Button>
            ))}
          </div>

          <Form.Group controlId="comentario-calificacion">
            <Form.Label className="fw-bold text-primary-emphasis small mb-1">Comentario (opcional)</Form.Label>
            <ConSombra>
              <Form.Control
                as="textarea"
                rows={3}
                className="border-2 border-primary rounded-3"
                placeholder="¿Cómo fue tu experiencia?"
                value={comentario}
                onChange={(evento) => setComentario(evento.target.value)}
              />
            </ConSombra>
          </Form.Group>

          {error && (
            <Alert variant="danger" className="small py-2 mt-3 mb-0">
              {error}
            </Alert>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top border-2 border-primary">
          <Button variant="outline-primary" className="fw-bold border-2" onClick={alCerrar}>
            Cancelar
          </Button>
          <BotonOfiGO type="submit">Enviar</BotonOfiGO>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

function Historial() {
  // Los más nuevos primero
  const [pedidos, setPedidos] = useState(() => obtenerPedidos().reverse())
  const [pedidoACalificar, setPedidoACalificar] = useState(null)

  function guardarCalificacion(calificacion) {
    setPedidos(actualizarPedido(pedidoACalificar.id, { calificacion }).reverse())
    setPedidoACalificar(null)
  }

  return (
    <Container className="py-5">
      <TituloPagina
        titulo="Mis pedidos · OfiGO"
        descripcion="Seguí el estado de los pedidos que les hiciste a los profesionales y calificá los trabajos terminados."
      />

      <Link to="/menu" className="link-secondary small fw-semibold text-decoration-none">
        <i className="bi bi-arrow-left me-1"></i>Volver al menú
      </Link>
      <h1 className="h3 fw-bold mt-2 mb-1">Mis pedidos</h1>
      <p className="text-secondary mb-4">Seguí el estado de tus solicitudes y calificá los trabajos finalizados.</p>

      {pedidos.length === 0 ? (
        <section className="text-center py-5">
          <i className="bi bi-clipboard fs-1 text-primary d-block mb-2"></i>
          <p className="fw-semibold mb-3">Todavía no hiciste ningún pedido.</p>
          <BotonOfiGO as={Link} to="/oficios">
            <i className="bi bi-search me-1"></i>Buscar un oficio
          </BotonOfiGO>
        </section>
      ) : (
        <section>
          <Row xs={1} lg={2} className="g-4">
            {pedidos.map((pedido) => (
              <Col key={pedido.id}>
                <TarjetaPedido pedido={pedido} titulo={`${pedido.oficio} · ${pedido.profesionalNombre}`}>
                  <CalificacionPedido pedido={pedido} alCalificar={() => setPedidoACalificar(pedido)} />
                </TarjetaPedido>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {pedidoACalificar && (
        <ModalCalificar
          pedido={pedidoACalificar}
          alCerrar={() => setPedidoACalificar(null)}
          alEnviar={guardarCalificacion}
        />
      )}
    </Container>
  )
}

export default Historial
