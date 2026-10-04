import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FondoHerramientas from './components/common/FondoHerramientas.jsx'
import Encabezado from './components/layout/Encabezado.jsx'
import PiePagina from './components/layout/PiePagina.jsx'
import Rutas from './components/Rutas/Rutas.jsx'
import { borrarSesion, guardarSesion, obtenerSesion } from './utils/sesion.js'
import { normalizar } from './utils/formato.js'

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
          <Rutas
            usuario={usuario}
            alEntrarComoCliente={entrarComoCliente}
            alEntrarComoTrabajador={entrarComoTrabajador}
          />
        </div>
      </main>
      <PiePagina />
    </div>
  )
}

export default App
