// Mismas claves que usaba el TP1 para guardar datos en localStorage
const CLAVE_SESION = 'oficioya-sesion'
const CLAVE_PEDIDOS = 'oficioya-pedidos'

export function obtenerSesion() {
  const sesion = localStorage.getItem(CLAVE_SESION)

  if (!sesion) {
    return null
  }

  try {
    return JSON.parse(sesion)
  } catch (error) {
    console.error('Error al leer la sesión:', error)
    return null
  }
}

export function guardarSesion(usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
}

export function borrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}

export function obtenerPedidos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || []
  } catch {
    return []
  }
}

// Agrega un pedido nuevo a la lista guardada y lo devuelve (con id y fecha de creación)
export function guardarPedido(datos) {
  const pedido = { ...datos, id: Date.now(), creadoEl: new Date().toISOString() }
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([...obtenerPedidos(), pedido]))
  return pedido
}
