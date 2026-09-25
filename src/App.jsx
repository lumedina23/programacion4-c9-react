import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import FondoHerramientas from './components/common/FondoHerramientas.jsx'
import Encabezado from './components/layout/Encabezado.jsx'
import PiePagina from './components/layout/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Oficios from './pages/Oficios.jsx'
import Login from './pages/Login.jsx'
import PerfilTrabajador from './pages/PerfilTrabajador.jsx'
import CrearPedido from './pages/CrearPedido.jsx'
import Historial from './pages/Historial.jsx'
import HistorialTrabajador from './pages/HistorialTrabajador.jsx'
import Perfil from './pages/Perfil.jsx'
import { PROFESIONALES } from './data/profesionales.js'
import { borrarSesion, guardarSesion, obtenerSesion } from './utils/sesion.js'
import { normalizar } from './utils/formato.js'

// Toma el id de la URL (/profesional/3) y le pasa ese profesional a la página
function RutaPerfilTrabajador() {
  const { id } = useParams()
  const navegar = useNavigate()
  const profesional = PROFESIONALES.find((p) => String(p.id) === id)

  if (!profesional) {
    return <Navigate to="/oficios" replace />
  }

  return <PerfilTrabajador profesional={profesional} alVolver={() => navegar(-1)} />
}

function App() {
  const [usuario, setUsuario] = useState(obtenerSesion())
  const navegar = useNavigate()
  const { pathname } = useLocation()

  // Igual que en el TP1: entrar como cliente borra cualquier sesión guardada
  function entrarComoCliente() {
    borrarSesion()
    setUsuario(null)
    navegar('/menu')
  }

  function entrarComoTrabajador(profesional) {
    const sesion = {
      nombre: profesional.nombre,
      email: normalizar(profesional.nombre).replace(/\s+/g, '.') + '@oficiosya.com',
      rol: 'trabajador',
      profesionalId: profesional.id,
    }
    guardarSesion(sesion)
    setUsuario(sesion)
    navegar('/menu')
  }

  function cerrarSesion() {
    borrarSesion()
    setUsuario(null)
    navegar('/')
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <Encabezado
        rol={usuario ? usuario.rol : 'cliente'}
        enPortada={pathname === '/'}
        alEntrarComoCliente={entrarComoCliente}
        alCerrarSesion={cerrarSesion}
      />
      <main className="flex-grow-1 position-relative overflow-hidden">
        <FondoHerramientas />
        <div className="position-relative">
          <Routes>
            <Route
              path="/"
              element={<Inicio alEntrarComoCliente={entrarComoCliente} alEntrarComoTrabajador={entrarComoTrabajador} />}
            />
            <Route path="/menu" element={<Menu usuario={usuario} />} />
            <Route path="/oficios" element={<Oficios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profesional/:id" element={<RutaPerfilTrabajador />} />
            <Route path="/crear-pedido" element={<CrearPedido />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/historial-trabajador" element={<HistorialTrabajador />} />
            <Route path="/perfil" element={<Perfil usuario={usuario || undefined} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <PiePagina />
    </div>
  )
}

export default App
