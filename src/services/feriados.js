import axios from 'axios'

// API pública de ArgentinaDatos: feriados nacionales de Argentina. Es gratis y no necesita clave.
// Documentación: https://argentinadatos.com/docs/operations/get-feriados
const URL_FERIADOS = 'https://api.argentinadatos.com/v1/feriados'

// Devuelve los feriados de un año: [{ fecha: '2026-10-12', tipo: 'trasladable', nombre: '...' }, ...]
export async function obtenerFeriados(anio) {
  const respuesta = await axios.get(`${URL_FERIADOS}/${anio}`)
  return respuesta.data
}
