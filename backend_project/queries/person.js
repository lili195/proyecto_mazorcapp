/**
 * 
 * @param {*} peopleModel 
 * @param {*} id_person 
 * @param {*} name_person 
 * @param {*} number_person 
 * @param {*} password_person 
 * @returns 
 */

const createPerson = async (
    peopleModel,
    id_person,
    name_person,
    number_person,
    password_person,
) => {
    try {
        console.log(
            id_person,
            eliminarDiacriticos(name_person),
            number_person,
            password_person
        );

        console.log("Ok :)");
        console.log(peopleModel);

        const newUser = await peopleModel.create({
            id_person,
            name_person: eliminarDiacriticos(name_person),
            number_person,
            password_person,
        });

        console.log(newUser);
        return newUser;
    } catch (error) {
        console.error("=======================");
        console.error("Fue posible crear el usuario por: ");
        console.error("=======================");
        console.error(error);
        console.error("=======================");
        return {
            error: "Error al crear el usuario: " + error.message,
        };
    }
};


/**
 * Eliminar caracteres especiales que puedan haber llegado
 */

function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

module.exports = {
    createPerson
}