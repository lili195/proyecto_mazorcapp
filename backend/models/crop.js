const { crops } = require('../config/db')

const createCrop = async (
	state_crop,
	start_date,
	latitude,
	longitude,
	area,
	plants_num,
	plants_m2
	) => {
		try {
			
			console.log(
				state_crop,
				start_date,
				latitude,
				longitude,
				area,
				plants_num,
				plants_m2)
				
				const newCrop = await crops.create({
					state_crop: 'A',
					start_date: '20/10/2023',
					latitude: '',
					longitude,
					area,
					plants_num,
					plants_m2
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