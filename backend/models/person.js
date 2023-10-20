const { people } = require('../config/db')

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
    console.log(error)
    return error
  }
}

// /**
//  * find User per email
//  */

// const searchUser = async (email) => {
//   try {
//     return await user.findOne({
//       where: { email }
//     })
//   } catch (error) {
//     return error
//   }
// }

// async function findUser (id) {
//   try {
//     return await user.findOne({
//       where: { id }
//     })
//   } catch (err) {
//     return err
//   }
// }

function eliminarDiacriticos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

module.exports = {
  createPerson
}