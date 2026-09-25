import { Navigate, Route, Routes } from 'react-router-dom'
import Encabezado from './components/layout/Encabezado.jsx'
import PiePagina from './components/layout/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import Oficios from './pages/Oficios.jsx'
import Login from './pages/Login.jsx'
import PerfilTrabajador from './pages/PerfilTrabajador.jsx'
import CrearPedido from './pages/CrearPedido.jsx'
import Historial from './pages/Historial.jsx'
import HistorialTrabajador from './pages/HistorialTrabajador.jsx'
import Perfil from './pages/Perfil.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <Encabezado />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio nombreUsuario="Juana" />} />
          <Route path="/oficios" element={<Oficios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profesional/:id" element={<PerfilTrabajador />} />
          <Route path="/crear-pedido" element={<CrearPedido />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/historial-trabajador" element={<HistorialTrabajador />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  )
}

export default App
