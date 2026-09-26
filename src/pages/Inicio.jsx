import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap'
import Buscador from '../components/common/Buscador.jsx'
import BotonOfiGO from '../components/common/BotonOfiGO.jsx'
import ConSombra from '../components/common/ConSombra.jsx'
import MascotaOfiGO from '../components/common/MascotaOfiGO.jsx'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaAviso from '../components/common/TarjetaAviso.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'

// Migrado desde index.html (portada) del TP1

const POPULARES = ['Plomería', 'Electricidad', 'Pintura', 'Cerrajería']


const PASOS = [
  { numero: '01', icono: 'bi-search', titulo: 'Buscá y compará', texto: 'Filtrá por oficio o escribí lo que necesitás. Mirá precio, distancia y calificación.' },
  { numero: '02', icono: 'bi-chat-dots', titulo: 'Enviá tu pedido', texto: 'Contá qué pasa, dónde y cuándo. El pedido le llega al profesional.' },
  { numero: '03', icono: 'bi-clipboard-check', titulo: 'Seguí el trabajo', texto: 'El profesional lo acepta y lo finaliza. Vos ves cada cambio en Mis pedidos.' },
]

const VENTAJAS_CLIENTE = ['Profesionales de tu zona', 'Precios y calificaciones a la vista', 'Seguís tu pedido paso a paso']
const VENTAJAS_PROFESIONAL = ['Recibís pedidos de clientes', 'Los aceptás o rechazás', 'Marcás los trabajos terminados']

// Ordenados por calificación (y por cantidad de reseñas si empatan)
const RANKING = [...PROFESIONALES].sort((a, b) => b.rating - a.rating || b.resenas - a.resenas)
const DESTACADOS = RANKING.slice(0, 3)

// "¿Cómo funciona?": los pasos se eligen como opciones de radio (idea de Uiverse)
// y a la derecha se muestra la explicación del paso elegido.
function PasosComoFunciona({ pasos }) {
  const [elegido, setElegido] = useState(pasos[0].numero)
  const paso = pasos.find((p) => p.numero === elegido)

  return (
    <Row className="g-4 align-items-stretch">
      <Col md={5} className="d-flex flex-column gap-3">
        {pasos.map((opcion) => {
          const marcado = opcion.numero === elegido
          return (
            <ConSombra key={opcion.numero}>
              <ToggleButton
                id={`paso-${opcion.numero}`}
                type="radio"
                name="pasos-como-funciona"
                value={opcion.numero}
                checked={marcado}
                onChange={() => setElegido(opcion.numero)}
                variant="light"
                className={`w-100 d-flex align-items-center gap-3 text-start fw-bold border border-2 border-primary rounded-3 px-3 py-2 ${
                  marcado ? 'bg-warning text-dark' : 'bg-white text-primary-emphasis'
                }`}
              >
                <i className={`bi ${marcado ? 'bi-record-circle-fill' : 'bi-circle'} text-primary fs-5`}></i>
                <span>
                  <span className="small d-block opacity-75">Paso {opcion.numero}</span>
                  {opcion.titulo}
                </span>
              </ToggleButton>
            </ConSombra>
          )
        })}
      </Col>

      <Col md={7}>
        <TarjetaEntrada icono={paso.icono} etiqueta={`Paso ${paso.numero}`} fondo="primary-subtle" sombra="warning">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white text-primary border border-2 border-primary rounded-circle p-3 lh-1 flex-shrink-0">
              <i className={`bi ${paso.icono} fs-3`}></i>
            </div>
            <div>
              <h3 className="h4 fw-bolder text-primary-emphasis mb-2">{paso.titulo}</h3>
              <p className="fw-semibold mb-0">{paso.texto}</p>
            </div>
          </div>
        </TarjetaEntrada>
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

// Tarjeta estilo Uiverse adaptada a los colores de Mi perfil:
// borde azul grueso, franja blanca de encabezado y sombra dura de color.
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

  // Abre Oficios con esa categoría ya elegida (como oficios.html?categoria=... en el TP1)
  function irAOficio(nombreCategoria) {
    navegar(`/oficios?categoria=${encodeURIComponent(nombreCategoria)}`)
  }

  // Busca en Oficios lo que se escribió (como el formulario del TP1, que iba a oficios.html?buscar=...)
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
          <TituloSeccion titulo="¿Cómo funciona OfiGO?" />
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
