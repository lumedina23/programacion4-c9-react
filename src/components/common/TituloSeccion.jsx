function TituloSeccion({ titulo, textoEnlace }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="h4 fw-bold mb-0">{titulo}</h2>
      {textoEnlace && (
        <a href="#" className="link-primary small fw-semibold text-decoration-none">
          {textoEnlace}
        </a>
      )}
    </div>
  )
}

export default TituloSeccion
