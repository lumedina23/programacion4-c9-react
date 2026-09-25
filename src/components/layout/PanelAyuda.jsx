import { useState } from 'react'
import { Accordion, Button, Col, Form, InputGroup, Offcanvas, Row } from 'react-bootstrap'
import mascota from '../../assets/img/hombrelogo.png'
import { normalizar } from '../../utils/formato.js'

// icono y color: el círculo de color de cada pregunta, igual que en las tarjetas de categorías
const PREGUNTAS = [
  {
    pregunta: '¿Cómo contrato un profesional?',
    respuesta: 'Elegí una categoría, revisá los perfiles y seleccioná el profesional que más te convenga.',
    icono: 'bi-person-check',
    color: 'primary',
  },
  {
    pregunta: '¿Cómo califico un trabajo?',
    respuesta: 'Desde Mis pedidos, cuando el servicio esté finalizado.',
    icono: 'bi-star',
    color: 'warning',
  },
  {
    pregunta: '¿Puedo cancelar un pedido?',
    respuesta: 'Sí, mientras todavía no haya sido finalizado.',
    icono: 'bi-x-circle',
    color: 'danger',
  },
  {
    pregunta: '¿Cómo veo el estado de mi pedido?',
    respuesta: 'Desde la sección Mis pedidos.',
    icono: 'bi-clipboard-check',
    color: 'success',
  },
]

const CONTACTOS = [
  { texto: 'Escribinos', detalle: 'soporte@oficiosya.com', enlace: 'mailto:soporte@oficiosya.com', icono: 'bi-envelope' },
  { texto: 'Llamanos', detalle: '0800-123-456', enlace: 'tel:0800123456', icono: 'bi-telephone' },
]

function PanelAyuda({ mostrar, alCerrar }) {
  const [busqueda, setBusqueda] = useState('')

  const preguntas = PREGUNTAS.filter((item) =>
    normalizar(item.pregunta + ' ' + item.respuesta).includes(normalizar(busqueda.trim())),
  )

  return (
    <Offcanvas show={mostrar} onHide={alCerrar} onExited={() => setBusqueda('')} placement="end">
      {/* El muñequito de OfiGO saluda, igual que en la portada */}
      <Offcanvas.Header closeButton closeVariant="white" className="bg-primary text-white align-items-start">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white bg-opacity-25 rounded-circle p-1">
            <img src={mascota} alt="" height="64" />
          </div>
          <div>
            <Offcanvas.Title className="fw-bold">¡Hola! ¿En qué te ayudo?</Offcanvas.Title>
            <p className="small opacity-75 mb-0">Respuestas rápidas para usar OfiGO.</p>
          </div>
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body className="bg-body-tertiary">
        <InputGroup className="mb-4 shadow-sm rounded-pill overflow-hidden">
          <InputGroup.Text className="bg-white border-0 ps-3">
            <i className="bi bi-search text-secondary"></i>
          </InputGroup.Text>
          <Form.Control
            type="search"
            className="border-0 py-2"
            placeholder="Buscá tu duda (ej: cancelar)"
            aria-label="Buscar en la ayuda"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </InputGroup>

        <h2 className="h6 fw-bold text-secondary text-uppercase small mb-3">Preguntas frecuentes</h2>

        {preguntas.length === 0 ? (
          <p className="text-center text-secondary py-3">
            <i className="bi bi-emoji-frown fs-3 d-block mb-1"></i>
            No encontramos esa duda. Escribinos y te ayudamos.
          </p>
        ) : (
          <Accordion className="d-flex flex-column gap-2 mb-4">
            {preguntas.map((item) => (
              <Accordion.Item
                key={item.pregunta}
                eventKey={item.pregunta}
                className="border-0 rounded-4 shadow-sm overflow-hidden"
              >
                <Accordion.Header>
                  <span className="d-flex align-items-center gap-3 fw-semibold me-2">
                    <span className={`bg-${item.color}-subtle text-${item.color}-emphasis rounded-circle p-2 lh-1`}>
                      <i className={`bi ${item.icono}`}></i>
                    </span>
                    {item.pregunta}
                  </span>
                </Accordion.Header>
                <Accordion.Body className="text-secondary pt-0 ps-5 ms-3">{item.respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}

        <div className="bg-warning-subtle rounded-4 p-3">
          <h2 className="h6 fw-bold mb-1">¿Necesitás más ayuda?</h2>
          <p className="small text-secondary mb-3">Hablá con nuestro equipo de soporte.</p>
          <Row xs={1} className="g-2">
            {CONTACTOS.map((contacto) => (
              <Col key={contacto.texto}>
                <Button
                  href={contacto.enlace}
                  variant="light"
                  className="w-100 rounded-4 shadow-sm d-flex align-items-center gap-3 text-start px-3 py-2"
                >
                  <i className={`bi ${contacto.icono} fs-4 text-primary`}></i>
                  <span>
                    <span className="fw-bold small d-block">{contacto.texto}</span>
                    <span className="text-secondary small">{contacto.detalle}</span>
                  </span>
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PanelAyuda
