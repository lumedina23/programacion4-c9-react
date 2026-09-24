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
