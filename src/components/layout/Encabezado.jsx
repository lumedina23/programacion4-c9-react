import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import PanelAyuda from './PanelAyuda.jsx'
import logo from '../../assets/img/hombrelogo.png'

// Estilo tipo píldora (basado en un diseño de Uiverse.io, pasado a Bootstrap)
const PILDORA = 'd-flex gap-1 p-1 rounded-pill bg-white bg-opacity-25 border border-white border-opacity-50 shadow-sm'
const BOTON_PILDORA = 'btn border-0 rounded-pill flex-fill d-flex flex-column align-items-center px-3 py-2'

// El link de la página actual queda blanco con texto azul; los demás se aclaran al pasar el mouse
function claseLink({ isActive }) {
  return `${BOTON_PILDORA} ${isActive ? 'btn-light text-primary' : 'btn-outline-light'}`
}

function ContenidoBoton({ icono, texto }) {
  return (
    <>
      <i className={`bi ${icono} fs-5 lh-1`}></i>
      <span className="small fw-semibold lh-1 mt-1">{texto}</span>
    </>
  )
}

function Encabezado({ rol, enPortada, alEntrarComoCliente, alCerrarSesion }) {
  const [mostrarAyuda, setMostrarAyuda] = useState(false)
  const esTrabajador = rol === 'trabajador'

  const links = [
    { destino: '/', icono: 'bi-house-door', texto: 'Inicio' },
    ...(esTrabajador ? [] : [{ destino: '/oficios', icono: 'bi-search', texto: 'Buscar' }]),
    esTrabajador
      ? { destino: '/historial-trabajador', icono: 'bi-clipboard-check', texto: 'Pedidos' }
      : { destino: '/historial', icono: 'bi-clipboard-check', texto: 'Mis pedidos' },
    { destino: '/perfil', icono: 'bi-person', texto: 'Mi perfil' },
  ]

  return (
    <>
      <Navbar expand="md" bg="primary" data-bs-theme="dark" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2 fw-bold fs-3"
            title="Ir a la página principal"
          >
            <img src={logo} alt="" height="56" />
            <span>Ofi<span className="text-warning">GO</span></span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="menu-principal" />

          <Navbar.Collapse id="menu-principal">
            {enPortada ? (
              // Portada (index.html del TP1): solo elegir cómo entrar
              <Nav className="ms-auto">
                <Nav.Link onClick={alEntrarComoCliente}>Soy cliente</Nav.Link>
                <Nav.Link href="#ser-profesional">Soy profesional</Nav.Link>
              </Nav>
            ) : (
              <>
                <nav aria-label="Navegación principal" className={`${PILDORA} mx-auto my-2 my-md-0`}>
                  {links.map((link) => (
                    <NavLink key={link.destino} to={link.destino} end={link.destino === '/'} className={claseLink}>
                      <ContenidoBoton icono={link.icono} texto={link.texto} />
                    </NavLink>
                  ))}
                </nav>

                {/* Misma píldora para Ayuda y Cerrar sesión; Cerrar sesión va en amarillo para distinguirse */}
                <div className={`${PILDORA} mb-2 mb-md-0`}>
                  <button type="button" className={`${BOTON_PILDORA} btn-outline-light`} onClick={() => setMostrarAyuda(true)}>
                    <ContenidoBoton icono="bi-question-circle" texto="Ayuda" />
                  </button>
                  <button type="button" className={`${BOTON_PILDORA} btn-outline-warning`} onClick={alCerrarSesion}>
                    <ContenidoBoton icono="bi-box-arrow-right" texto="Cerrar sesión" />
                  </button>
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <PanelAyuda mostrar={mostrarAyuda} alCerrar={() => setMostrarAyuda(false)} />
    </>
  )
}

export default Encabezado
