// Mismas claves que usaba el TP1 para guardar datos en localStorage
const CLAVE_SESION = 'oficioya-sesion'
const CLAVE_PEDIDOS = 'oficioya-pedidos'
const CLAVE_GUARDADOS = 'oficioya-guardados'

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

// Cambia algunos datos de un pedido ya guardado (por ejemplo su calificación) y devuelve la lista nueva
export function actualizarPedido(id, cambios) {
  const pedidos = obtenerPedidos().map((pedido) => (pedido.id === id ? { ...pedido, ...cambios } : pedido))
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos))
  return pedidos
}

// Ids de los profesionales que el usuario marcó como guardados
export function obtenerGuardados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_GUARDADOS)) || []
  } catch {
    return []
  }
}

// Agrega o quita un profesional de la lista de guardados
export function marcarGuardado(id, guardado) {
  const sinEste = obtenerGuardados().filter((idGuardado) => idGuardado !== id)
  localStorage.setItem(CLAVE_GUARDADOS, JSON.stringify(guardado ? [...sinEste, id] : sinEste))
}

// Avisa cada vez que otra pestaña cambia los pedidos guardados (el navegador dispara el evento "storage").
// Devuelve la función que deja de escuchar: se usa como limpieza del useEffect al salir de la página.
export function escucharPedidos(alCambiar) {
  function manejarCambio(evento) {
    if (evento.key === CLAVE_PEDIDOS) {
      alCambiar(obtenerPedidos())
    }
  }

  window.addEventListener('storage', manejarCambio)
  return () => window.removeEventListener('storage', manejarCambio)
}
