import Encabezado from './components/layout/Encabezado.jsx'
import PiePagina from './components/layout/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <Encabezado />
      <main className="flex-grow-1">
        <Inicio nombreUsuario="Juana" />
      </main>
      <PiePagina />
    </div>
  )
}

export default App
