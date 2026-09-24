import { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import PanelAyuda from './PanelAyuda.jsx'
import logo from '../../assets/img/hombrelogo.png'

function Encabezado({ rol, enPortada, alIrAlInicio, alEntrarComoCliente, alCerrarSesion }) {
  const [mostrarAyuda, setMostrarAyuda] = useState(false)
  const esTrabajador = rol === 'trabajador'

  return (
    <>
      <Navbar expand="md" bg="primary" data-bs-theme="dark" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand
            href="#"
            className="d-flex align-items-center gap-2 fw-bold fs-3"
            title="Ir a la página principal"
            onClick={alIrAlInicio}
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
                <Nav className="me-auto">
                  <Nav.Link onClick={alIrAlInicio}>
                    <i className="bi bi-house-door me-1"></i>Página principal
                  </Nav.Link>
                  {!esTrabajador && (
                    <Nav.Link href="#"><i className="bi bi-search me-1"></i>Buscar</Nav.Link>
                  )}
                  <Nav.Link href="#">
                    <i className="bi bi-clipboard-check me-1"></i>
                    {esTrabajador ? 'Pedidos recibidos' : 'Mis pedidos'}
                  </Nav.Link>
                  <Nav.Link href="#"><i className="bi bi-person me-1"></i>Mi perfil</Nav.Link>
                </Nav>

                <div className="d-flex gap-2 py-2 py-md-0">
                  <Button variant="outline-light" size="sm" onClick={() => setMostrarAyuda(true)}>
                    <i className="bi bi-question-circle me-1"></i>Ayuda
                  </Button>
                  <Button variant="warning" size="sm" onClick={alCerrarSesion}>
                    Cerrar sesión
                  </Button>
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
