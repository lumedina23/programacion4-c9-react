import { Button, Card } from 'react-bootstrap'
import mascota from '../../assets/img/hombrelogo.png'

// El muñequito del logo con un globito de diálogo, para la portada
function MascotaOfiGO({ alContestar }) {
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Globito de diálogo: la flechita de abajo apunta al muñequito */}
      <Card className="border-0 shadow rounded-4 text-center mb-2">
        <Card.Body className="px-4 py-3">
          <p className="h5 fw-bold mb-1">¿Qué se rompió hoy?</p>
          <p className="text-secondary mb-3">Contame y te consigo a alguien que lo arregle.</p>
          <Button variant="warning" className="rounded-pill fw-semibold px-4" onClick={alContestar}>
            Te cuento <i className="bi bi-chat-dots ms-1"></i>
          </Button>
        </Card.Body>
        <i
          className="bi bi-caret-down-fill text-white fs-1 lh-1 position-absolute top-100 start-50 translate-middle"
          aria-hidden="true"
        ></i>
      </Card>

      {/* Muñequito sobre un círculo de color */}
      <div className="ratio ratio-1x1 w-75">
        <div className="d-flex align-items-center justify-content-center">
          <div className="w-75 h-75 bg-primary-subtle rounded-circle"></div>
        </div>
        <img src={mascota} alt="El muñequito de OfiGO haciendo pulgar arriba" className="object-fit-contain" />
      </div>
    </div>
  )
}

export default MascotaOfiGO
