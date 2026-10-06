// Pasa a minúsculas y quita tildes para que "plomeria" encuentre "Plomería"
export function normalizar(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function iniciales(nombre) {
  return nombre
    .split(' ')
    .map((parte) => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-AR')
}

// "02/10/2026 18:30", igual que mostraba el TP1 en los pedidos
export function formatearFecha(fechaIso) {
  const fecha = new Date(fechaIso)
  return (
    fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  )
}
