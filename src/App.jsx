import { useState } from 'react'
import FondoHerramientas from './components/common/FondoHerramientas.jsx'
import Encabezado from './components/layout/Encabezado.jsx'
import PiePagina from './components/layout/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Perfil from './pages/Perfil.jsx' // TEMPORAL: para ver el perfil
import { borrarSesion, guardarSesion, obtenerSesion } from './utils/sesion.js'
import { normalizar } from './utils/formato.js'

function App() {
  const [usuario, setUsuario] = useState(obtenerSesion())
  // Página visible. Cuando se agregue React Router, esto se reemplaza por rutas.
  const [pagina, setPagina] = useState('perfil') // TEMPORAL: volver a 'inicio'

  // Igual que en el TP1: entrar como cliente borra cualquier sesión guardada
  function entrarComoCliente() {
    borrarSesion()
    setUsuario(null)
    setPagina('menu')
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
    setPagina('menu')
  }

  function cerrarSesion() {
    borrarSesion()
    setUsuario(null)
    setPagina('inicio')
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <Encabezado
        rol={usuario ? usuario.rol : 'cliente'}
        enPortada={pagina === 'inicio'}
        alIrAlInicio={() => setPagina('inicio')}
        alEntrarComoCliente={entrarComoCliente}
        alCerrarSesion={cerrarSesion}
      />
      <main className="flex-grow-1 position-relative overflow-hidden">
        <FondoHerramientas />
        <div className="position-relative">
          {pagina === 'perfil' ? (
            <Perfil usuario={usuario || undefined} />
          ) : pagina === 'inicio' ? (
            <Inicio alEntrarComoCliente={entrarComoCliente} alEntrarComoTrabajador={entrarComoTrabajador} />
          ) : (
            <Menu usuario={usuario} />
          )}
        </div>
      </main>
      <PiePagina />
    </div>
  )
}

export default App
