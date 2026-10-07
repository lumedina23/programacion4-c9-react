import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Button, CloseButton, Col, Container, Form, Row } from 'react-bootstrap'
import Buscador from '../components/common/Buscador.jsx'
import BotonOfiGO from '../components/common/BotonOfiGO.jsx'
import ConSombra from '../components/common/ConSombra.jsx'
import MascotaOfiGO from '../components/common/MascotaOfiGO.jsx'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaAviso from '../components/common/TarjetaAviso.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import TituloPagina from '../components/common/TituloPagina.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'


const POPULARES = ['Plomería', 'Electricidad', 'Pintura', 'Cerrajería']


const PASOS = [
  {
    numero: '01',
    icono: 'bi-search',
    titulo: 'Buscá y compará profesionales',
    texto: 'Filtrá por oficio o escribí lo que necesitás. Mirá precio, distancia y calificación.',
    enlace: 'Ver oficios',
    destino: '/oficios',
    fondo: 'primary',
  },
  {
    numero: '02',
    icono: 'bi-chat-dots',
    titulo: 'Pedí el servicio en minutos',
    texto: 'Contá qué pasa, dónde y cuándo. El pedido le llega al profesional.',
    enlace: 'Elegir profesional',
    destino: '/oficios',
    fondo: 'warning',
  },
  {
    numero: '03',
    icono: 'bi-clipboard-check',
    titulo: 'Seguí tu pedido paso a paso',
    texto: 'El profesional lo acepta y lo finaliza. Vos ves cada cambio en Mis pedidos.',
    enlace: 'Ver mis pedidos',
    destino: '/historial',
    fondo: 'primary-subtle',
  },
]

const VENTAJAS_CLIENTE = ['Profesionales de tu zona', 'Precios y calificaciones a la vista', 'Seguís tu pedido paso a paso']
const VENTAJAS_PROFESIONAL = ['Recibís pedidos de clientes', 'Los aceptás o rechazás', 'Marcás los trabajos terminados']

const RANKING = [...PROFESIONALES].sort((a, b) => b.rating - a.rating || b.resenas - a.resenas)
const DESTACADOS = RANKING.slice(0, 3)

const ALTO_ENCABEZADO = 96
const SEPARACION_TARJETAS = 20

const VENTAJAS_OFIGO = [
  { titulo: 'Precios', texto: 'a la vista', icono: 'bi-cash-coin' },
  { titulo: 'Reseñas', texto: 'de clientes', icono: 'bi-star-fill' },
  { titulo: 'Cerca', texto: 'de tu casa', icono: 'bi-geo-alt-fill' },
]
function TarjetaComoFunciona({ paso, posicion, alCerrar }) {
  const oscura = paso.fondo === 'primary'

  return (
    <article
      className={`bg-${paso.fondo} ${oscura ? 'text-white' : 'text-primary-emphasis'} position-sticky overflow-hidden rounded-4 shadow mb-4`}
      style={{ top: ALTO_ENCABEZADO + posicion * SEPARACION_TARJETAS }}
    >
      <div className="position-absolute top-0 end-0 m-2 m-sm-3 bg-black bg-opacity-10 rounded-3 p-2 lh-1">
        <CloseButton variant={oscura ? 'white' : undefined} aria-label={`Cerrar "${paso.titulo}"`} onClick={alCerrar} />
      </div>

      <Row className="g-0 align-items-center">
        <Col xs={8} className="p-4">
          <span className="small fw-bold text-uppercase opacity-75">Paso {paso.numero}</span>
          <h3 className="h4 fw-bold lh-sm mt-1 mb-2">{paso.titulo}</h3>
          <p className="small fw-semibold opacity-75 mb-3">{paso.texto}</p>
          <Link to={paso.destino} className="fw-bold text-reset text-decoration-none">
            {paso.enlace} <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </Col>

        <Col xs={4} className="pe-4 pt-5 pb-4">
          <div className="col-lg-9 mx-auto">
            <div className="ratio ratio-1x1">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center">
                <i className={`bi ${paso.icono} display-4`} aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </article>
  )
}

function PanelComoFunciona() {
  return (
    <div className="sticky-lg-top z-1" style={{ top: ALTO_ENCABEZADO }}>
      <Badge bg="warning" text="dark" pill className="mb-3 px-3 py-2 fw-semibold">
        <i className="bi bi-stars me-1"></i>Fácil y rápido
      </Badge>
      <h2 className="display-6 fw-bold mb-3">
        ¿Cómo funciona <span className="text-primary">OfiGO</span>?
      </h2>
      <p className="fs-5 text-secondary mb-4">
        En tres pasos encontrás al profesional que necesitás y seguís el trabajo desde tu celular.
      </p>

      <Row xs={3} className="g-2 g-sm-3 mb-4">
        {VENTAJAS_OFIGO.map((ventaja) => (
          <Col key={ventaja.titulo}>
            <ConSombra>
              <div className="bg-white border border-2 border-primary rounded-3 text-center py-3">
                <i className={`bi ${ventaja.icono} text-primary fs-3`}></i>
                <p className="fs-5 fw-bolder text-primary-emphasis lh-1 my-1">{ventaja.titulo}</p>
                <p className="small fw-semibold mb-0">{ventaja.texto}</p>
              </div>
            </ConSombra>
          </Col>
        ))}
      </Row>

      <BotonOfiGO as={Link} to="/oficios">
        <i className="bi bi-search me-1"></i>Buscar un oficio
      </BotonOfiGO>
    </div>
  )
}

function PasosComoFunciona({ pasos }) {
  const [cerrados, setCerrados] = useState([])
  const visibles = pasos.filter((paso) => !cerrados.includes(paso.numero))

  return (
    <Row className="g-5">
      <Col lg={5}>
        <PanelComoFunciona />
      </Col>

      <Col lg={7}>
        {visibles.length === 0 ? (
          <Button variant="link" className="fw-semibold text-decoration-none p-0" onClick={() => setCerrados([])}>
            <i className="bi bi-arrow-counterclockwise me-1"></i>Volver a ver los pasos
          </Button>
        ) : (
          visibles.map((paso, posicion) => (
            <TarjetaComoFunciona
              key={paso.numero}
              paso={paso}
              posicion={posicion}
              alCerrar={() => setCerrados([...cerrados, paso.numero])}
            />
          ))
        )}
      </Col>
    </Row>
  )
}

function ListaVentajas({ ventajas }) {
  return (
    <ul className="list-unstyled mb-4">
      {ventajas.map((ventaja) => (
        <li key={ventaja} className="mb-2 fw-semibold">
          <i className="bi bi-check-square-fill text-primary me-2"></i>
          {ventaja}
        </li>
      ))}
    </ul>
  )
}

function TarjetaEntrada({ icono, etiqueta, fondo, sombra, children }) {
  return (
    <ConSombra color={sombra} redondeo="rounded-4" grosor={2} className="h-100">
      <div className={`bg-${fondo} border border-3 border-primary rounded-4 overflow-hidden h-100`}>
        <div className="bg-white border-bottom border-3 border-primary px-4 py-2 fw-bolder small text-primary-emphasis text-uppercase">
          <i className={`bi ${icono} me-2`}></i>{etiqueta}
        </div>
        <div className="p-4 p-lg-5">{children}</div>
      </div>
    </ConSombra>
  )
}

function Inicio({ alEntrarComoCliente, alEntrarComoTrabajador }) {
  const [profesionalElegido, setProfesionalElegido] = useState(PROFESIONALES[0].id)
  const navegar = useNavigate()

  function irAOficio(nombreCategoria) {
    navegar(`/oficios?categoria=${encodeURIComponent(nombreCategoria)}`)
  }

  function buscarEnOficios(texto) {
    const busqueda = texto.trim()
    navegar(busqueda ? `/oficios?buscar=${encodeURIComponent(busqueda)}` : '/oficios')
  }

  function entrarComoTrabajador() {
    const profesional = PROFESIONALES.find((p) => p.id === Number(profesionalElegido))
    alEntrarComoTrabajador(profesional)
  }

  return (
    <>
      <TituloPagina
        titulo="OfiGO · Oficios en Tucumán"
        descripcion="Encontrá plomeros, electricistas, pintores y más profesionales de oficios en Tucumán. Compará precios y calificaciones y pedí el servicio."
      />

      <section className="py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col xs={12} lg={7}>
              <Badge bg="warning" text="dark" pill className="mb-3 px-4 py-2 fs-6 fw-semibold bg-gradient shadow">
                <i className="bi bi-geo-alt-fill me-1"></i>Oficios en Tucumán, sin vueltas
              </Badge>
              <h1 className="display-5 fw-bold mb-3">
                Encontrá al profesional <span className="text-primary">ideal</span> para tu casa.
              </h1>
              <div className="mb-4">
                <TarjetaAviso texto="Buscá por oficio, compará precios y calificaciones, y pedí el servicio. Después seguí el estado de tu pedido desde un solo lugar." />
              </div>

              <div className="mb-3">
                <Buscador placeholder="¿Qué necesitás arreglar? (Ej: plomero)" alBuscar={buscarEnOficios} />
              </div>

              <p className="small text-secondary mb-0">
                Populares:
                {POPULARES.map((categoria) => (
                  <Button
                    key={categoria}
                    variant="link"
                    size="sm"
                    className="fw-semibold text-decoration-none"
                    onClick={() => irAOficio(categoria)}
                  >
                    {categoria}
                  </Button>
                ))}
              </p>
            </Col>

            <Col xs={12} lg={5} className="d-flex justify-content-center">
              <div className="col-12 col-sm-9 col-md-7 col-lg-12">
                <MascotaOfiGO alContestar={alEntrarComoCliente} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <PasosComoFunciona pasos={PASOS} />
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <TituloSeccion titulo="Elegí un oficio" />
          <Row xs={2} sm={4} lg={8} className="g-3">
            {CATEGORIAS.map((categoria) => (
              <Col key={categoria.nombre}>
                <TarjetaCategoria
                  nombre={categoria.etiqueta || categoria.nombre}
                  icono={categoria.icono}
                  color={categoria.color}
                  relleno={categoria.relleno}
                  alSeleccionar={() => irAOficio(categoria.nombre)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <TituloSeccion titulo="Profesionales destacados" />
          <Row xs={1} md={2} lg={3} className="g-4">
            {DESTACADOS.map((profesional) => (
              <Col key={profesional.id}>
                <TarjetaProfesional profesional={profesional} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <TituloSeccion titulo="Sumate a OfiGO" />

          <Row className="g-4">
            <Col xs={12} md={6}>
              <TarjetaEntrada icono="bi-house-gear" etiqueta="Para clientes" fondo="primary-subtle" sombra="warning">
                <h3 className="h4 fw-bolder text-primary-emphasis">¿Necesitás un arreglo?</h3>
                <p className="fw-semibold">
                  Entrá como cliente, buscá entre los profesionales de tu zona y pedí el servicio hoy mismo.
                </p>
                <ListaVentajas ventajas={VENTAJAS_CLIENTE} />
                <BotonOfiGO onClick={alEntrarComoCliente}>
                  <i className="bi bi-person me-1"></i>Entrar como cliente
                </BotonOfiGO>
              </TarjetaEntrada>
            </Col>

            <Col xs={12} md={6} id="ser-profesional">
              <TarjetaEntrada icono="bi-tools" etiqueta="Para profesionales" fondo="warning-subtle" sombra="primary">
                <h3 className="h4 fw-bolder text-primary-emphasis">¿Sos profesional?</h3>
                <p className="fw-semibold">
                  Mirá los pedidos que te hicieron los clientes y respondelos: aceptalos, rechazalos o marcalos como terminados.
                </p>
                <ListaVentajas ventajas={VENTAJAS_PROFESIONAL} />
                <Form.Group controlId="select-profesional" className="mb-3">
                  <Form.Label className="fw-bold text-primary-emphasis small mb-1">Elegí qué profesional sos</Form.Label>
                  <ConSombra>
                    <Form.Select
                      className="border-2 border-primary rounded-3"
                      value={profesionalElegido}
                      onChange={(evento) => setProfesionalElegido(evento.target.value)}
                    >
                      {PROFESIONALES.map((profesional) => (
                        <option key={profesional.id} value={profesional.id}>
                          {profesional.nombre} · {profesional.oficio}
                        </option>
                      ))}
                    </Form.Select>
                  </ConSombra>
                </Form.Group>
                <BotonOfiGO onClick={entrarComoTrabajador}>
                  <i className="bi bi-briefcase me-1"></i>Entrar como trabajador
                </BotonOfiGO>
              </TarjetaEntrada>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
