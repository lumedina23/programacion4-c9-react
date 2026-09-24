import { Badge, Col, Container, Row } from 'react-bootstrap'
import Buscador from '../components/common/Buscador.jsx'
import PanelTrabajador from '../components/common/PanelTrabajador.jsx'
import TarjetaAviso from '../components/common/TarjetaAviso.jsx'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'
import { obtenerPedidos } from '../utils/sesion.js'

// Migrado desde menu.html del TP1: 4 categorías y 2 profesionales cerca
const CATEGORIAS_MENU = CATEGORIAS.slice(0, 4)
const CERCANOS = PROFESIONALES.filter((profesional) => [1, 2].includes(profesional.id))

function Menu({ usuario }) {
  if (usuario && usuario.rol === 'trabajador') {
    const pendientes = obtenerPedidos().filter(
      (pedido) => pedido.profesionalId === usuario.profesionalId && pedido.estado === 'Pendiente',
    ).length

    return <PanelTrabajador nombre={usuario.nombre} calificacion={4.9} pedidosPendientes={pendientes} />
  }

  return (
    <Container className="py-5">
      <section className="mb-5">
        <Badge bg="warning" text="dark" pill className="mb-3 px-4 py-2 fs-6 fw-semibold bg-gradient shadow">
          <i className="bi bi-geo-alt-fill me-1"></i>Tucumán · Disponible ahora
        </Badge>
        <h1 className="display-6 fw-bold mb-1">
          Hola, <span className="text-primary">{usuario ? usuario.nombre : 'Invitado'}</span>.
        </h1>
        <div className="col-lg-7 mt-3 mb-4">
          <TarjetaAviso
            titulo="¿Qué oficio necesitás hoy?"
            texto="Encontrá plomeros, electricistas, pintores y más. Compará, elegí y contactá al instante."
          />
        </div>

        <div className="col-lg-7">
          <Buscador placeholder="¿Qué servicio necesitás? (Ej: electricista)" />
        </div>
      </section>

      <section className="mb-5">
        <TituloSeccion titulo="Categorías" textoEnlace="Ver todas" />
        <Row xs={2} sm={4} className="g-3">
          {CATEGORIAS_MENU.map((categoria) => (
            <Col key={categoria.nombre}>
              <TarjetaCategoria nombre={categoria.nombre} icono={categoria.icono} color={categoria.color} />
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <TituloSeccion titulo="Cerca de vos" textoEnlace="Ver más" />
        <Row xs={1} md={2} className="g-4">
          {CERCANOS.map((profesional) => (
            <Col key={profesional.id}>
              <TarjetaProfesional profesional={profesional} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}

export default Menu
