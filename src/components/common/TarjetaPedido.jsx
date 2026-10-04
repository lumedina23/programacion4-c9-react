import { Badge, Stack } from 'react-bootstrap'
import ConSombra from './ConSombra.jsx'
import { formatearFecha } from '../../utils/formato.js'

// Mismos estados que en el TP1, cada uno con su color e ícono
const ESTADOS = {
  Pendiente: { color: 'warning', icono: 'bi-hourglass-split' },
  Aceptado: { color: 'primary', icono: 'bi-hand-thumbs-up' },
  'En curso': { color: 'info', icono: 'bi-tools' },
  Finalizado: { color: 'success', icono: 'bi-check-circle' },
  Cancelado: { color: 'secondary', icono: 'bi-x-circle' },
}

// Tarjeta de un pedido: título, estado, dirección, fecha y descripción.
// Abajo muestra lo que le pase cada página como children (por ejemplo, el botón para calificar).
function TarjetaPedido({ pedido, titulo, children }) {
  const estado = ESTADOS[pedido.estado] || ESTADOS.Pendiente

  return (
    <ConSombra redondeo="rounded-4" className="h-100">
      <article className="bg-white border border-2 border-primary rounded-4 p-4 h-100">
        <Stack direction="horizontal" gap={3} className="align-items-start mb-2">
          <div className="me-auto">
            <h2 className="h5 fw-bolder text-primary-emphasis mb-1">{titulo}</h2>
            <p className="small text-secondary mb-0">
              <i className="bi bi-geo-alt me-1"></i>{pedido.direccion}
              <span className="mx-2">·</span>
              <i className="bi bi-calendar-event me-1"></i>{formatearFecha(pedido.fechaSolicitada)}
            </p>
          </div>
          <Badge
            bg={estado.color}
            text={['warning', 'info'].includes(estado.color) ? 'dark' : undefined}
            pill
            className="border border-primary px-3 py-2"
          >
            <i className={`bi ${estado.icono} me-1`}></i>{pedido.estado}
          </Badge>
        </Stack>

        <p className="bg-body-tertiary border-start border-3 border-warning rounded-end px-3 py-2 my-3">
          {pedido.descripcion}
        </p>

        {children}
      </article>
    </ConSombra>
  )
}

export default TarjetaPedido
