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
    console.log('NO SE PUDO PORQUE: ')
    console.log(error)
    return error
  }
}

/**
 * Eliminar caracteres especiales que puedan haber llegado
 */

function eliminarDiacriticos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Buscar una persona en la tabla people
 */
 
const searchPerson = async (id_person) => {
  try {
    return await people.findOne({
      where: { id_person: id_person }
    })
  } catch (error) {
    return error
  }
}

module.exports = {
  createPerson,
  searchPerson
}