// SEO: cada página le pone su propio nombre a la pestaña del navegador y su descripción.
// React (desde la versión 19) mueve solo estas etiquetas al <head> del index.html.
function TituloPagina({ titulo, descripcion }) {
  return (
    <>
      <title>{titulo}</title>
      {descripcion && <meta name="description" content={descripcion} />}
    </>
  )
}

export default TituloPagina
