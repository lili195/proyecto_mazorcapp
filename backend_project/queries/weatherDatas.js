const saveWeatherDatas = async (
    weatherModel,
    temp_datas,
    hum_datas,
    wind_datas,
    cloud_datas,
) => {
    try {
        console.log(
            weatherModel,
            temp_datas,
            hum_datas,
            wind_datas,
            cloud_datas,
        );

        const newWeatherData = await weatherModel.create({
            temp_datas,
            hum_datas,
            wind_datas,
            cloud_datas,
        });

        console.log(newWeatherData);
        return newWeatherData;
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
    saveWeatherDatas
}