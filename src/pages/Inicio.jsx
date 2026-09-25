import { useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Buscador from '../components/common/Buscador.jsx'
import MascotaOfiGO from '../components/common/MascotaOfiGO.jsx'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaBeneficio from '../components/common/TarjetaBeneficio.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
import TarjetaPaso from '../components/common/TarjetaPaso.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'

// Migrado desde index.html (portada) del TP1

const POPULARES = ['Plomería', 'Electricidad', 'Pintura', 'Cerrajería']

const BENEFICIOS = [
  { icono: 'bi-geo-alt', titulo: 'Profesionales de tu zona', texto: 'Ves la distancia y cuánto tardan en llegar.' },
  { icono: 'bi-star', titulo: 'Calificaciones reales', texto: 'Elegí según las reseñas de otros vecinos.' },
  { icono: 'bi-clipboard-check', titulo: 'Seguís tu pedido', texto: 'Sabés cuándo lo aceptan y cuándo está terminado.' },
]

const PASOS = [
  { numero: '01', titulo: 'Buscá y compará', texto: 'Filtrá por oficio o escribí lo que necesitás. Mirá precio, distancia y calificación.' },
  { numero: '02', titulo: 'Enviá tu pedido', texto: 'Contá qué pasa, dónde y cuándo. El pedido le llega al profesional.' },
  { numero: '03', titulo: 'Seguí el trabajo', texto: 'El profesional lo acepta y lo finaliza. Vos ves cada cambio en Mis pedidos.' },
]

const VENTAJAS_CLIENTE = ['Profesionales de tu zona', 'Precios y calificaciones a la vista', 'Seguís tu pedido paso a paso']
const VENTAJAS_PROFESIONAL = ['Recibís pedidos de clientes', 'Los aceptás o rechazás', 'Marcás los trabajos terminados']

// Ordenados por calificación (y por cantidad de reseñas si empatan)
const RANKING = [...PROFESIONALES].sort((a, b) => b.rating - a.rating || b.resenas - a.resenas)
const DESTACADOS = RANKING.slice(0, 3)

function ListaVentajas({ ventajas }) {
  return (
    <ul className="list-unstyled mb-4">
      {ventajas.map((ventaja) => (
        <li key={ventaja} className="mb-2">
          <i className="bi bi-check-circle-fill text-success me-2"></i>
          {ventaja}
        </li>
      ))}
    </ul>
  )
}

function Inicio({ alEntrarComoCliente, alEntrarComoTrabajador }) {
  const [profesionalElegido, setProfesionalElegido] = useState(PROFESIONALES[0].id)

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
              <p className="lead text-secondary mb-4">
                Buscá por oficio, compará precios y calificaciones, y pedí el servicio.
                Después seguí el estado de tu pedido desde un solo lugar.
              </p>

              <div className="mb-3">
                <Buscador placeholder="¿Qué necesitás arreglar? (Ej: plomero)" alBuscar={alEntrarComoCliente} />
              </div>

              <p className="small text-secondary mb-0">
                Populares:
                {POPULARES.map((categoria) => (
                  <Button
                    key={categoria}
                    variant="link"
                    size="sm"
                    className="fw-semibold text-decoration-none"
                    onClick={alEntrarComoCliente}
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
          <TituloSeccion titulo="Del problema a la solución, en tres pasos" />
          <Row xs={1} md={3} className="g-4">
            {PASOS.map((paso) => (
              <Col key={paso.numero}>
                <TarjetaPaso numero={paso.numero} titulo={paso.titulo} texto={paso.texto} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <TituloSeccion titulo="Elegí un oficio" textoEnlace="Ver todos" />
          <Row xs={2} sm={4} lg={8} className="g-3">
            {CATEGORIAS.map((categoria) => (
              <Col key={categoria.nombre}>
                <TarjetaCategoria
                  nombre={categoria.etiqueta || categoria.nombre}
                  icono={categoria.icono}
                  color={categoria.color}
                  relleno={categoria.relleno}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <TituloSeccion titulo="Profesionales destacados" textoEnlace="Ver todos" />
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
          <TituloSeccion titulo="¿Por qué OfiGO?" />
          <Row xs={1} md={3} className="g-4">
            {BENEFICIOS.map((beneficio) => (
              <Col key={beneficio.titulo}>
                <TarjetaBeneficio icono={beneficio.icono} titulo={beneficio.titulo} texto={beneficio.texto} />
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
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4 p-lg-5">
                  <h3 className="h4 fw-bold">¿Necesitás un arreglo?</h3>
                  <p className="text-secondary">
                    Entrá como cliente, buscá entre los profesionales de tu zona y pedí el servicio hoy mismo.
                  </p>
                  <ListaVentajas ventajas={VENTAJAS_CLIENTE} />
                  <Button variant="primary" className="rounded-pill px-4" onClick={alEntrarComoCliente}>
                    Entrar como cliente
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} id="ser-profesional">
              <Card className="h-100 border-0 shadow-sm rounded-4 bg-primary text-white">
                <Card.Body className="p-4 p-lg-5">
                  <h3 className="h4 fw-bold">¿Sos profesional?</h3>
                  <p className="opacity-75">
                    Mirá los pedidos que te hicieron los clientes y respondelos: aceptalos, rechazalos o marcalos como terminados.
                  </p>
                  <ListaVentajas ventajas={VENTAJAS_PROFESIONAL} />
                  <Form.Group controlId="select-profesional" className="mb-2">
                    <Form.Label className="small fw-bold">Elegí qué profesional sos</Form.Label>
                    <Form.Select
                      value={profesionalElegido}
                      onChange={(evento) => setProfesionalElegido(evento.target.value)}
                    >
                      {PROFESIONALES.map((profesional) => (
                        <option key={profesional.id} value={profesional.id}>
                          {profesional.nombre} — {profesional.oficio}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button variant="light" className="rounded-pill px-4" onClick={entrarComoTrabajador}>
                    Entrar como trabajador
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
