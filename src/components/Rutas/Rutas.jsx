import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Inicio from '../../pages/Inicio.jsx'
import Menu from '../../pages/Menu.jsx'
import Oficios from '../../pages/Oficios.jsx'
import Login from '../../pages/Login.jsx'
import PerfilTrabajador from '../../pages/PerfilTrabajador.jsx'
import CrearPedido from '../../pages/CrearPedido.jsx'
import Historial from '../../pages/Historial.jsx'
import HistorialTrabajador from '../../pages/HistorialTrabajador.jsx'
import Perfil from '../../pages/Perfil.jsx'
import { PROFESIONALES } from '../../data/profesionales.js'

// Toma el id de la URL (/profesional/3) y le pasa ese profesional a la página
function RutaPerfilTrabajador() {
  const { id } = useParams()
  const navegar = useNavigate()
  const profesional = PROFESIONALES.find((p) => String(p.id) === id)

  if (!profesional) {
    return <Navigate to="/oficios" replace />
  }

  return <PerfilTrabajador profesional={profesional} alVolver={() => navegar('/oficios')} />
}

// Todas las rutas de la aplicación: qué página se muestra en cada dirección.
// App.jsx le pasa el usuario y las funciones para entrar como cliente o como trabajador.
function Rutas({ usuario, alEntrarComoCliente, alEntrarComoTrabajador }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Inicio alEntrarComoCliente={alEntrarComoCliente} alEntrarComoTrabajador={alEntrarComoTrabajador} />}
      />
      <Route path="/menu" element={<Menu usuario={usuario} />} />
      <Route path="/oficios" element={<Oficios />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profesional/:id" element={<RutaPerfilTrabajador />} />
      <Route path="/crear-pedido" element={<CrearPedido usuario={usuario} />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/historial-trabajador" element={<HistorialTrabajador usuario={usuario} />} />
      <Route path="/perfil" element={<Perfil usuario={usuario || undefined} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Rutas
