import { useState } from 'react'
import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BotonOfiGO from '../components/common/BotonOfiGO.jsx'
import ConSombra from '../components/common/ConSombra.jsx'
import TarjetaPedido from '../components/common/TarjetaPedido.jsx'
import TituloPagina from '../components/common/TituloPagina.jsx'
import { PROFESIONALES } from '../data/profesionales.js'
import { iniciales } from '../utils/formato.js'
import { actualizarPedido, obtenerPedidos } from '../utils/sesion.js'

// Bloque 4 - Pedidos recibidos por el trabajador
// Migrado desde: historial-trabajador.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.
// Mismo estilo que Mi perfil (Perfil.jsx): tarjeta celeste con borde azul y sombra amarilla.

// Próximo estado de cada pedido, igual que el botón de acción rápida del TP1
const SIGUIENTE_ESTADO = {
  Pendiente: { estado: 'Aceptado', texto: 'Aceptar', icono: 'bi-hand-thumbs-up' },
  Aceptado: { estado: 'En curso', texto: 'Empezar trabajo', icono: 'bi-tools' },
  'En curso': { estado: 'Finalizado', texto: 'Marcar como finalizado', icono: 'bi-check-circle' },
}

// Contadores de la tarjeta de arriba
const RESUMEN = [
  { etiqueta: 'Pendientes', estados: ['Pendiente'], icono: 'bi-hourglass-split' },
  { etiqueta: 'En marcha', estados: ['Aceptado', 'En curso'], icono: 'bi-tools' },
  { etiqueta: 'Finalizados', estados: ['Finalizado'], icono: 'bi-check-circle' },
]

// Tarjeta principal con el estilo de Mi perfil: iniciales, título, oficio y contadores
function EncabezadoPedidos({ nombre, oficio, pedidos }) {
  return (
    <ConSombra redondeo="rounded-4" grosor={2}>
      <section className="bg-primary-subtle border border-2 border-primary rounded-4 text-center px-4 py-4">
        <div className="d-inline-block bg-primary text-white fw-bold fs-4 rounded-circle border border-2 border-white p-3 lh-1 shadow-sm">
          {iniciales(nombre)}
        </div>

        <h1 className="h4 fw-bolder text-primary-emphasis mt-3 mb-1">Pedidos recibidos</h1>
        <p className="fw-semibold mb-2">Gestioná las solicitudes de tus clientes y actualizá el estado de cada trabajo.</p>
        <Badge bg="warning" text="dark" pill className="border border-primary mb-4">
          {nombre} · {oficio}
        </Badge>

        <Row xs={3} className="g-2 g-sm-3">
          {RESUMEN.map((dato) => (
            <Col key={dato.etiqueta}>
              <ConSombra>
                <div className="bg-white border border-2 border-primary rounded-3 py-2">
                  <p className="fs-4 fw-bolder text-primary-emphasis lh-1 mb-1">
                    {pedidos.filter((pedido) => dato.estados.includes(pedido.estado)).length}
                  </p>
                  <p className="small fw-semibold mb-0">
                    <i className={`bi ${dato.icono} me-1 d-none d-sm-inline`}></i>{dato.etiqueta}
                  </p>
                </div>
              </ConSombra>
            </Col>
          ))}
        </Row>
      </section>
    </ConSombra>
  )
}

// Botones de cada pedido: avanzar al próximo estado y rechazar o cancelar.
// Si ya está finalizado, muestra cómo lo calificó el cliente.
function AccionesPedido({ pedido, alCambiarEstado }) {
  const siguiente = SIGUIENTE_ESTADO[pedido.estado]

  if (pedido.calificacion) {
    return (
      <p className="small fw-semibold mb-0">
        El cliente te calificó:{' '}
        {[1, 2, 3, 4, 5].map((valor) => (
          <i
            key={valor}
            className={`bi ${valor <= pedido.calificacion.puntaje ? 'bi-star-fill' : 'bi-star'} text-warning`}
          ></i>
        ))}
        {pedido.calificacion.comentario && (
          <span className="text-secondary fw-normal"> · {pedido.calificacion.comentario}</span>
        )}
      </p>
    )
  }

  if (!siguiente) {
    return null
  }

  return (
    <Stack direction="horizontal" gap={3} className="flex-wrap">
      <BotonOfiGO onClick={() => alCambiarEstado(siguiente.estado)}>
        <i className={`bi ${siguiente.icono} me-1`}></i>
        {siguiente.texto}
      </BotonOfiGO>
      <ConSombra color="primary">
        <Button
          variant="light"
          className="bg-white fw-bold text-primary-emphasis border border-2 border-primary rounded-3 px-4 py-2"
          onClick={() => alCambiarEstado('Cancelado')}
        >
          <i className="bi bi-x-lg me-1"></i>
          {pedido.estado === 'Pendiente' ? 'Rechazar' : 'Cancelar'}
        </Button>
      </ConSombra>
    </Stack>
  )
}

function HistorialTrabajador({ usuario }) {
  const esTrabajador = usuario && usuario.rol === 'trabajador'

  // Solo los pedidos que le hicieron a este profesional, los más nuevos primero
  function pedidosDelTrabajador(lista) {
    return lista.filter((pedido) => esTrabajador && pedido.profesionalId === usuario.profesionalId).reverse()
  }

  const [pedidos, setPedidos] = useState(() => pedidosDelTrabajador(obtenerPedidos()))

  function cambiarEstado(id, estado) {
    setPedidos(pedidosDelTrabajador(actualizarPedido(id, { estado })))
  }

  // Como en el TP1: esta página es solo para trabajadores
  if (!esTrabajador) {
    return (
      <Container className="py-5">
        <TituloPagina titulo="Pedidos recibidos · OfiGO" />
        <Row className="justify-content-center">
          <Col sm={10} md={7} lg={5}>
            <ConSombra redondeo="rounded-4" grosor={2}>
              <section className="bg-primary-subtle border border-2 border-primary rounded-4 text-center px-4 py-4">
                <i className="bi bi-briefcase fs-1 text-primary"></i>
                <h1 className="h4 fw-bolder text-primary-emphasis mt-2 mb-1">Pedidos recibidos</h1>
                <p className="fw-semibold mb-4">Para ver los pedidos que te hicieron, entrá como trabajador desde la portada.</p>
                <BotonOfiGO as={Link} to="/">
                  <i className="bi bi-house me-1"></i>Ir a la portada
                </BotonOfiGO>
              </section>
            </ConSombra>
          </Col>
        </Row>
      </Container>
    )
  }

  const profesional = PROFESIONALES.find((p) => p.id === usuario.profesionalId)

  return (
    <Container className="py-5">
      <TituloPagina
        titulo="Pedidos recibidos · OfiGO"
        descripcion="Mirá los pedidos que te hicieron los clientes y aceptalos, empezalos, finalizalos o rechazalos."
      />

      <Row className="justify-content-center">
        <Col lg={9} xl={8}>
          <Link to="/menu" className="d-inline-block fw-semibold text-decoration-none mb-3">
            <i className="bi bi-arrow-left me-1"></i>Volver al menú
          </Link>

          <EncabezadoPedidos
            nombre={usuario.nombre}
            oficio={profesional ? profesional.oficio : 'Profesional'}
            pedidos={pedidos}
          />

          <section className="mt-5">
            <h2 className="h5 fw-bolder text-primary-emphasis mb-3">
              <i className="bi bi-inbox me-2"></i>Tus pedidos
            </h2>

            {pedidos.length === 0 ? (
              <ConSombra redondeo="rounded-4">
                <div className="bg-white border border-2 border-primary rounded-4 text-center px-4 py-5">
                  <i className="bi bi-inbox fs-1 text-primary d-block mb-2"></i>
                  <p className="fw-semibold mb-0">Todavía no recibiste ningún pedido.</p>
                </div>
              </ConSombra>
            ) : (
              <Stack gap={4}>
                {pedidos.map((pedido) => (
                  <TarjetaPedido key={pedido.id} pedido={pedido} titulo={`Cliente: ${pedido.cliente}`}>
                    <AccionesPedido pedido={pedido} alCambiarEstado={(estado) => cambiarEstado(pedido.id, estado)} />
                  </TarjetaPedido>
                ))}
              </Stack>
            )}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default HistorialTrabajador
