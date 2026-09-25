import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Buscador from '../components/common/Buscador.jsx'
import TarjetaCategoria from '../components/common/TarjetaCategoria.jsx'
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
  const [busquedaActiva, setBusquedaActiva] = useState('')

  const resultados = PROFESIONALES.filter(
    (profesional) =>
      (!categoriaActiva || profesional.categoria === categoriaActiva) &&
      (!busquedaActiva || coincideConBusqueda(profesional, busquedaActiva)),
  )

  // Tocar la categoría activa la desmarca y vuelve a mostrar todas
  function seleccionarCategoria(nombre) {
    setCategoriaActiva(categoriaActiva === nombre ? null : nombre)
  }

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
      <section className="pt-5">
        <Container>
          <h1 className="h3 fw-bold">Explorar profesionales</h1>
          <p className="text-secondary">Elegí una categoría o buscá directamente lo que necesitás.</p>

          <div className="col-lg-7">
            <Buscador placeholder="¿Qué servicio necesitás?" alBuscar={(texto) => setBusquedaActiva(texto.trim())} />
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <section className="mb-5">
          <TituloSeccion
            titulo="Elegí un oficio"
            textoEnlace={categoriaActiva ? 'Ver todos' : undefined}
            alHacerClick={() => setCategoriaActiva(null)}
          />
          <Row xs={2} sm={4} className="g-3">
            {CATEGORIAS.map((categoria) => (
              <Col key={categoria.nombre}>
                <TarjetaCategoria
                  nombre={categoria.etiqueta || categoria.nombre}
                  icono={categoria.icono}
                  color={categoria.color}
                  relleno={categoria.relleno}
                  activa={categoriaActiva === categoria.nombre}
                  alSeleccionar={() => seleccionarCategoria(categoria.nombre)}
                />
              </Col>
            ))}
          </Row>
        </section>

        {renderResultados()}
      </Container>
    </>
  )
}

export default Oficios
