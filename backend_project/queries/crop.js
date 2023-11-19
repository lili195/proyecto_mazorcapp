/**
 * 
 * @param {*} cropsModel 
 * @param {*} id_crop 
 * @param {*} id_person 
 * @param {*} state_crop 
 * @param {*} start_date_crop 
 * @param {*} latitude_crop 
 * @param {*} longitude_crop 
 * @param {*} area_crop 
 * @param {*} plants_totalNum_crop 
 * @param {*} plants_perM2_crop 
 * @returns 
 */

const createCrop = async (
    cropsModel,
	id_crop,
	id_person,
	state_crop,
	start_date_crop,
	latitude_crop,
	longitude_crop,
	area_crop,
	plants_totalNum_crop,
	plants_perM2_crop
) => {
	try {
		console.log(
			id_crop,
			id_person,
			state_crop,
			start_date_crop,
			latitude_crop,
			longitude_crop,
			area_crop,
			plants_totalNum_crop,
			plants_perM2_crop)

		const newCrop = await cropsModel.create({
			id_crop,
			id_person,
			state_crop,
			start_date_crop,
			latitude_crop,
			longitude_crop,
			area_crop,
			plants_totalNum_crop,
			plants_perM2_crop
		})
		console.log('Ok :)')
		console.log(newCrop)
		return newCrop
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	createCrop
}