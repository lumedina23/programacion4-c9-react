function TituloSeccion({ titulo, subtitulo, textoEnlace }) {
  return (
    <div className="d-flex justify-content-between align-items-end mb-3">
      <div>
        <h2 className="h4 fw-bold mb-0">{titulo}</h2>
        {subtitulo && <p className="text-secondary mb-0">{subtitulo}</p>}
      </div>
      {textoEnlace && (
        <a href="#" className="link-primary small fw-semibold text-decoration-none">
          {textoEnlace}
        </a>
      )}
    </div>
  )
}

export default TituloSeccion
