// Sombra "dura" desplazada (estilo de Mi perfil): un fondo de color asoma abajo y a la derecha del contenido.
// grosor: 1 (fina, para campos y botones) o 2 (gruesa, para tarjetas).
function ConSombra({ color = 'warning', redondeo = 'rounded-3', grosor = 1, className = '', children }) {
  return (
    <div className={`bg-${color} ${redondeo} pe-${grosor} pb-${grosor} ${className}`}>
      {children}
    </div>
  )
}

export default ConSombra
