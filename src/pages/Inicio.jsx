import { Alert, Badge, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'

// Los 4 profesionales disponibles más cercanos
const CERCANOS = PROFESIONALES
  .filter((profesional) => profesional.disponible)
  .sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia))
  .slice(0, 4)

function Inicio({ nombreUsuario }) {
  function buscar(evento) {
    evento.preventDefault()
  }

  return (
    <>
      <section className="bg-white border-bottom py-5">
        <Container>
          <Badge bg="warning" text="dark" pill className="mb-3">
            Tucumán · Disponible ahora
          </Badge>
          <h1 className="display-6 fw-bold">
            Hola, <span className="text-primary">{nombreUsuario}</span>
          </h1>
          <p className="lead text-secondary">¿Qué oficio necesitás hoy?</p>

          <Form onSubmit={buscar} className="col-lg-7">
            <InputGroup size="lg">
              <Form.Control
                type="search"
                placeholder="Ej: electricista, plomero, pintor..."
                aria-label="Servicio a buscar"
              />
              <Button type="submit" variant="primary">Buscar</Button>
            </InputGroup>
          </Form>
        </Container>
      </section>

      <Container className="py-5">
        <Alert variant="warning" className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <Alert.Heading as="h2" className="h6 fw-bold">Primera consulta sin cargo</Alert.Heading>
            <p className="mb-0">Contactá a cualquier profesional hoy y obtené una evaluación gratis.</p>
          </div>
          <Button variant="dark">Aprovechar</Button>
        </Alert>

        <section className="mb-5">
          <TituloSeccion titulo="Categorías" textoEnlace="Ver todas" />
          <Row xs={2} md={4} className="g-3">
            {CATEGORIAS.map((categoria) => (
              <Col key={categoria.nombre}>
                <TarjetaCategoria nombre={categoria.nombre} icono={categoria.icono} />
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <TituloSeccion titulo="Cerca de vos" textoEnlace="Ver más" />
          <Row xs={1} lg={2} className="g-3">
            {CERCANOS.map((profesional) => (
              <Col key={profesional.id}>
                <TarjetaProfesional profesional={profesional} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Inicio
