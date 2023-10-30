const { crop } = require('../config/db')

const createCrop = async (
	id_crop,
	start_date,
	latitude,
	longitude,
	area,
	plants_num,
	plants_m2
	) => {
		try {
			
			console.log(id_crop,
				start_date,
				latitude,
				longitude,
				area,
				plants_num,
				plants_m2)
				
				console.log("Ok :)")
				console.log(crop)
				
				const newCrop = await crop.create({
					id_crop,
					start_date,
					latitude,
					longitude,
					area,
					plants_num,
					plants_m2
				})
				
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