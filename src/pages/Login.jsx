import { Container } from 'react-bootstrap'
import TituloPagina from '../components/common/TituloPagina.jsx'

// Bloque 2 - Login y registro (cliente / trabajador)
// Migrar desde: login.html (repo del TP1)
// Solo clases de Bootstrap y Bootstrap Icons, nada de CSS propio.

function Login() {
  return (
    <Container className="py-5">
      <TituloPagina titulo="Ingresar · OfiGO" descripcion="Ingresá a OfiGO como cliente o como profesional de oficios." />
      <h1 className="h3 fw-bold">Ingresar</h1>
    </Container>
  )
}

export default Login
