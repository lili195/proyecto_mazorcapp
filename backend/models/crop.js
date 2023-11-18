const { crops } = require('../config/db')

const createCrop = async (
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

		const newCrop = await crops.create({
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