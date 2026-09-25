import { Link } from 'react-router-dom'

// El link de la derecha puede llevar a otra página (destino) o ejecutar una acción (alHacerClick)
function TituloSeccion({ titulo, subtitulo, textoEnlace, destino, alHacerClick }) {
  function manejarClick(evento) {
    if (alHacerClick) {
      evento.preventDefault()
      alHacerClick()
    }
  }

  const claseEnlace = 'link-primary small fw-semibold text-decoration-none'

  return (
    <div className="d-flex justify-content-between align-items-end mb-3">
      <div>
        <h2 className="h4 fw-bold mb-0">{titulo}</h2>
        {subtitulo && <p className="text-secondary mb-0">{subtitulo}</p>}
      </div>
      {textoEnlace &&
        (destino ? (
          <Link to={destino} className={claseEnlace}>
            {textoEnlace}
          </Link>
        ) : (
          <a href="#" onClick={manejarClick} className={claseEnlace}>
            {textoEnlace}
          </a>
        ))}
    </div>
  )
}

export default TituloSeccion
