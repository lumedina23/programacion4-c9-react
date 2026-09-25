import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import TituloSeccion from '../components/common/TituloSeccion.jsx'
import TarjetaProfesional from '../components/common/TarjetaProfesional.jsx'
import { CATEGORIAS } from '../data/categorias.js'
import { PROFESIONALES } from '../data/profesionales.js'
import { normalizar } from '../utils/formato.js'

function tituloDeCategoria(nombreCategoria) {
  const categoria = CATEGORIAS.find((c) => c.nombre === nombreCategoria)
  return categoria ? categoria.titulo : `${nombreCategoria} disponibles`
}

function coincideConBusqueda(profesional, busqueda) {
  const { nombre, oficio, categoria, tags } = profesional
  return normalizar([nombre, oficio, categoria, ...tags].join(' ')).includes(normalizar(busqueda))
}

function agruparPorCategoria(profesionales) {
  const grupos = {}
  profesionales.forEach((profesional) => {
    if (!grupos[profesional.categoria]) grupos[profesional.categoria] = []
    grupos[profesional.categoria].push(profesional)
  })

  const orden = CATEGORIAS.map((c) => c.nombre).filter((nombre) => grupos[nombre])
  Object.keys(grupos).forEach((nombre) => {
    if (!orden.includes(nombre)) orden.push(nombre)
  })

  return orden.map((nombre) => ({ categoria: nombre, profesionales: grupos[nombre] }))
}

function ListaProfesionales({ profesionales }) {
  return (
    <Row xs={1} lg={2} className="g-3">
      {profesionales.map((profesional) => (
        <Col key={profesional.id}>
          <TarjetaProfesional profesional={profesional} />
        </Col>
      ))}
    </Row>
  )
}

function Oficios() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [textoIngresado, setTextoIngresado] = useState('')
  const [busquedaActiva, setBusquedaActiva] = useState('')

  const resultados = PROFESIONALES.filter(
    (profesional) =>
      (!categoriaActiva || profesional.categoria === categoriaActiva) &&
      (!busquedaActiva || coincideConBusqueda(profesional, busquedaActiva)),
  )

  function buscar(evento) {
    evento.preventDefault()
    setBusquedaActiva(textoIngresado.trim())
  }

  const opcionesCategoria = [{ nombre: null, icono: 'bi-search', etiqueta: 'Todos' }].concat(
    CATEGORIAS.map((c) => ({ nombre: c.nombre, icono: c.icono, etiqueta: c.etiqueta || c.nombre })),
  )

  function renderResultados() {
    if (resultados.length === 0) {
      return (
        <div className="text-center text-secondary py-5">
          <i className="bi bi-search fs-1 d-block mb-2"></i>
          <p className="mb-0">No encontramos profesionales con esos filtros.</p>
        </div>
      )
    }

    if (categoriaActiva || busquedaActiva) {
      const titulo = busquedaActiva
        ? `Resultados para "${busquedaActiva}"`
        : tituloDeCategoria(categoriaActiva)

      return (
        <section>
          <TituloSeccion titulo={titulo} />
          <ListaProfesionales profesionales={resultados} />
        </section>
      )
    }

    return agruparPorCategoria(resultados).map((grupo) => (
      <section key={grupo.categoria} className="mb-5">
        <TituloSeccion
          titulo={tituloDeCategoria(grupo.categoria)}
          textoEnlace="Ver más →"
          alHacerClick={() => setCategoriaActiva(grupo.categoria)}
        />
        <ListaProfesionales profesionales={grupo.profesionales} />
      </section>
    ))
  }

  return (
    <>
      <section className="bg-white border-bottom py-5">
        <Container>
          <h1 className="h3 fw-bold">Explorar profesionales</h1>
          <p className="text-secondary">Elegí una categoría o buscá directamente lo que necesitás.</p>

          <Form onSubmit={buscar} className="col-lg-7">
            <InputGroup size="lg">
              <Form.Control
                type="search"
                placeholder="¿Qué servicio necesitás?"
                aria-label="Servicio a buscar"
                value={textoIngresado}
                onChange={(evento) => setTextoIngresado(evento.target.value)}
              />
              <Button type="submit" variant="primary">
                <i className="bi bi-search me-2"></i>Buscar
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </section>

      <Container className="py-5">
        <Row xs={3} sm={3} md={5} lg={9} className="g-2 mb-5">
          {opcionesCategoria.map((opcion) => {
            const activa = categoriaActiva === opcion.nombre
            return (
              <Col key={opcion.etiqueta}>
                <Button
                  variant={activa ? 'primary' : 'outline-secondary'}
                  className={`w-100 h-100 d-flex flex-column align-items-center gap-1 py-2 small ${activa ? '' : 'bg-white text-body'}`}
                  aria-pressed={activa}
                  onClick={() => setCategoriaActiva(opcion.nombre)}
                >
                  <i className={`bi ${opcion.icono} fs-4`}></i>
                  <span className="small lh-sm">{opcion.etiqueta}</span>
                </Button>
              </Col>
            )
          })}
        </Row>

        {renderResultados()}
      </Container>
    </>
  )
}

export default Oficios
