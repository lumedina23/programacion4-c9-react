import { Accordion, ListGroup, Offcanvas } from 'react-bootstrap'

const PREGUNTAS = [
  {
    pregunta: '¿Cómo contrato un profesional?',
    respuesta: 'Elegí una categoría, revisá los perfiles y seleccioná el profesional que más te convenga.',
  },
  {
    pregunta: '¿Cómo califico un trabajo?',
    respuesta: 'Desde Mis pedidos, cuando el servicio esté finalizado.',
  },
  {
    pregunta: '¿Puedo cancelar un pedido?',
    respuesta: 'Sí, mientras todavía no haya sido finalizado.',
  },
  {
    pregunta: '¿Cómo veo el estado de mi pedido?',
    respuesta: 'Desde la sección Mis pedidos.',
  },
]

function PanelAyuda({ mostrar, alCerrar }) {
  return (
    <Offcanvas show={mostrar} onHide={alCerrar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Centro de ayuda</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <p className="text-secondary">
          Encontrá respuestas rápidas y aprendé a usar OficiosYa.
        </p>

        <Accordion flush className="mb-4">
          {PREGUNTAS.map((item, indice) => (
            <Accordion.Item eventKey={String(indice)} key={item.pregunta}>
              <Accordion.Header>{item.pregunta}</Accordion.Header>
              <Accordion.Body className="text-secondary">{item.respuesta}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        <h2 className="h6 fw-bold">¿Necesitás más ayuda?</h2>
        <ListGroup>
          <ListGroup.Item className="d-flex align-items-center gap-2">
            <i className="bi bi-envelope text-primary"></i> soporte@oficiosya.com
          </ListGroup.Item>
          <ListGroup.Item className="d-flex align-items-center gap-2">
            <i className="bi bi-telephone text-primary"></i> 0800-123-456
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PanelAyuda
