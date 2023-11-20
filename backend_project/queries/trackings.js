const createTracking = async (
    trackingModel,
    id_person,
    name_person,
    number_person,
    password_person,
) => {
    try {
        console.log(
            id_person,
            
            number_person,
            password_person
        );

        console.log("Ok :)");
        console.log(peopleModel);

        const newTracking = await trackingModel.create({
            id_person,
            name_person,
            number_person,
            password_person,
        });

        console.log(newTracking);
        return newTracking;
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

module.exports = {
    createTracking
}