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
