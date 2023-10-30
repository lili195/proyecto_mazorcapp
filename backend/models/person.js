const { people } = require('../config/db')

/** Crear una nueva persona en la tabla people
 * Parámetros: 
 *  id_person => el numero de cc
 *  nombre
 *  numero de teléfono
 *  rol
 *  contraseña
 *
 */

const createPerson = async (
  id_person,
  name_person,
  number_person,
  rol_person,
  password_person
) => {
  try {

    console.log(id_person,
      eliminarDiacriticos(name_person),
      number_person,
      rol_person,
      password_person)

    console.log("Ok :)")
    console.log(people)

    const newUser = await people.create({
      id_person,
      name_person: eliminarDiacriticos(name_person),
      number_person,
      rol_person,
      password_person
    })

    console.log(newUser)
    return newUser
  } catch (error) {
    console.log('======================')
    console.log('No se pudo porque: ')
    console.log('======================')
    console.log(error)
    console.log('======================')
    return error
  }
}

/**
 * Eliminar caracteres especiales que puedan haber llegado
 */

function eliminarDiacriticos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

module.exports = {
  createPerson
}