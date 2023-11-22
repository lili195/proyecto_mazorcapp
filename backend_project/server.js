if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const { Sequelize } = require('sequelize')
const { createPerson } = require('./queries/person')
const { createCrop } = require('./queries/crop')
const { saveWeatherDatas } = require('./queries/weatherDatas')
const { createTracking } = require('./queries/trackings')
const express = require('express')
const cors = require('cors')
const app = express()
const flash = require('express-flash')
const secretkey = process.env.SESSION_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const twilio = require('twilio')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

import { initModels } from "./models/init-models"
import * as auth from './authToken'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dbMazorcapp.sqlite',
});

const models = initModels(sequelize);

const peopleTable = models.people;
const cropsTable = models.crops;
const trackingsTable = models.trackings;
const weatherTable = models.weather;

/**
 * Registro de usuario nuevo
 */

app.post('/register', async (req, res) => {
    console.log('solicitud recibida de front :)')
    try {
        const existingPerson = await peopleTable.findOne({
            where: {
                id_person: req.body.cc,
            },
        });
        // si ya existe la cc en la db, se envía el error
        if (existingPerson) {

            console.log('======================')
            console.log('El número de cédula ya está en uso')
            console.log('======================')

            res.status(400).json({
                title: 'Error de validación',
                error: 'El número de cédula ya está en uso',
            });
        } else {
            // Registro exitoso
            await createPerson(
                peopleTable,
                req.body.cc,
                req.body.name,
                req.body.number,
                bcrypt.hashSync(req.body.password, 10)
            );

            res.status(201).json({
                title: 'Registro exitoso',
            });
            console.log('======================')
            console.log('Se registró correctamente :D')
            console.log('======================')
        }
    } catch (error) {
        // Otro tipo de error
        console.log(error)
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        });
    }
});

/**
 * Recuperación de contraseña
 */

async function sendSMS(otp_msg, number_person) {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUHT_TOKEN)
    client.messages
        .create({
            body: otp_msg,
            from: process.env.TWILIO_NUM,
            to: number_person
        })
        .then(message => { console.log(message.sid, 'Mensaje enviado!') })
        .catch(err => { console.log(err, 'Mensaje NO enviado :[') })
}

function getOTP() {
    return Math.floor(1000 + Math.random() * 9000)
}

app.post('/checkNum', async (req, res) => {
    console.log('solicitud de inicio de cambio de contraseña')
    console.log(req.body)
    try {
        const existingNum = await peopleTable.findOne({
            where: {
                number_person: req.body.num,
            },
        });
        if (existingNum) {
            const otp = getOTP()
            let number_person = '+57' + req.body.num
            console.log(otp, number_person)
            sendSMS(otp, number_person)
            res.status(201).json({
                title: 'Número encontrado, otp enviado',
            });
        } else {
            res.status(400).json({
                title: 'Error de validación',
                error: 'El número dado no existe en la base de datos',
            });
        }
    } catch (error) {
        // Otro tipo de error
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        });
    }
});

/**
 * Ingreso a la app
 */

app.post('/login', async (req, res) => {
    try {
        const personFound = await peopleTable.findOne({
            where: {
                id_person: req.body.cc,
            },
        });

        // si no existe la cc en la db, se envía el error
        if (!personFound) {
            console.log('usuario no encontrado')
            return res.status(401).json({
                title: 'Error de credenciales',
                error: 'Usuario no encontrado'
            })
        } else if (!bcrypt.compareSync(req.body.password, personFound.password_person)) {
            console.log('contraseña incorrecta')
            return res.status(400).json({
                title: 'Error de credenciales',
                error: 'Contraseña incorrecta',
            });
        } else {
            console.log('Inicio de sesion exitoso')
            let token = jwt.sign({ id_person: personFound.id_person }, secretkey, { expiresIn: '10h' });
            return res.status(201).json({
                title: 'Login exitoso',
                token: token,
            })
        }
    } catch (error) {
        // Otro tipo de error
        console.log(error)
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        });

    }
});

/**
 * Registro de nuevo cultivo
 */

app.post('/cropNew', auth.authToken, async (req, res) => {
    console.log(req.body)
    try {
        const existingCrop = await cropsTable.findOne({
            where: {
                id_person: req.body.id_person,
                id_crop: req.body.id_crop,
            },
        });

        if (!existingCrop) {
            console.log('entró!')
            await createCrop(
                cropsTable,
                req.body.id_crop,
                req.body.id_person,
                'A',
                req.body.start_date,
                req.body.latitude,
                req.body.longitude,
                req.body.area,
                req.body.plants_num,
                req.body.plants_m2
            )
            res.status(201).send('Cultivo registrado con éxito');
        } else {
            res.status(400).json({
                title: 'Error de validación',
                error: 'Identificador de cultivo ya en uso',
            });
        }
    } catch (error) {
        console.error('Error en solicitud:', error);
        res.status(500).send('Error en solicitud');
    }
});

/**
 * Obtencion de los cultivos de una persona
 */

app.get('/followGrowth', auth.authToken, async (req, res) => {
    try {
        // Encontrar todos los cultivos asociados a esa persona
        const cropsInfo = await cropsTable.findAll({
            where: {
                id_person: req.body.id_person,
            },
        });
        // Validar
        if (cropsInfo) {
            res.status(200).send(cropsInfo);
        } else {
            res.status(400).send('No se encontraron cultivos');
        }
    } catch (error) {
        console.error('Error en solicitud:', error);
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        });
    }
});

/***
 * Solicitud para editar un cultivo
 */

app.put('/followGrowth/cropsInfo/editCrop/:id_crop}', auth.authToken, async (req, res) => {
    console.log(req.body)
    res.status(200).send('Los datos se actualizaron correctamente');
    // try {
    //     const idCrop = req.params["id_crop}"];
    //     // Validar datos
    //     const { state_crop, start_date_crop, plants_totalNum_crop, plants_perM2_crop } = req.body;
    //     if (!idCrop || !state_crop || !start_date_crop || !plants_totalNum_crop || !plants_perM2_crop) {
    //       return res.status(400).send('Los datos son inválidos');
    //     }
    
    //     // Buscar el registro
    //     const crop = await cropsTable.findOne({
    //       where: {
    //         id_crop: idCrop,
    //       },
    //     });
    
    //     if (!crop) {
    //       return res.status(404).send('No se encontró el cultivo');
    //     }
    
    //     // // Actualizar la base de datos
    //     // await cropsTable.update({
          
    //     // });
    
    //     // Enviar respuesta
    //     res.status(200).send('Los datos se actualizaron correctamente');
    //   } catch (error) {
    //     console.error('Error en solicitud:', error);
    //     res.status(500).json({
    //       title: 'Error interno del servidor',
    //       error: 'Ocurrió un error al procesar la solicitud',
    //     });
    //   }
});


/**
 * Registro de nuevo seguimiento
 */

app.post('/followGrowth/newTracking/:id_crop}', auth.authToken, async (req, res) => {
    const idCrop = req.params["id_crop}"];
    const idPerson = req.body.id_person;
    const date = req.body.date;
    const fase = req.body.fase;
    const dirtState = req.body.dirt;

    try {
        const existingCrop = await cropsTable.findOne({
            where: {
                id_person: idPerson,
                id_crop: idCrop,
            },
        });
        if (existingCrop) {
            saveWather(idPerson, idCrop)
        } else {
            res.status(400).send('No se encontraron cultivos asociados');
        }
    } catch (error) {
        console.error('Error en solicitud:', error);
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        }); 
    }
});

const saveWather = async (id_person, id_crop) => {
    const datas = getWeatherDatas(id_person, id_crop)
        .then(weatherData => {
            console.log(weatherData);
        })
        .catch(error => {
            console.error('Error obteniendo los datos:', error);
        })
    await saveWeatherDatas(
        datas.temp,
        datas.hum,
        datas.wind,
        datas.clouds
    ).then(weatherData => {
        console.log('Registro exitoso de datos clima: ', weatherData);
    })
    .catch(error => {
        console.error('Error insertando datos de clima:', error)
    })
}

/**
 * Obtencion de datos de seguimientos
 * 
 */

app.get('/followGrowth/cropsInfo/:id_crop}', auth.authToken, async (req, res) => {
    const idCrop = req.params["id_crop}"];
    console.log(idCrop)
    res.status(200).send(idCrop)
});


// Obtener datos meteorológicos para ese cultivo
const getWeatherDatas = async (id_person, id_crop) => {
    console.log(id_person, id_crop);
    try {
        const cropData = await cropsTable.findOne({
            where: {
                id_person: id_person,
                id_crop: id_crop,
            },
        });

        if (cropData) {
            let latitude, longitude; // Declare variables inside the if block

            if (cropData.latitude_crop && cropData.longitude_crop) {
                latitude = cropData.latitude_crop;
                longitude = cropData.longitude_crop;

                const weatherData = await getDatasFromAPI(latitude, longitude);
                return weatherData; // Return weather data after waiting for the API call
            } else {
                console.log('Latitude or longitude data not found for this crop');
            }
        } else {
            console.log('No crop found with the specified id_crop');
        }
    } catch (error) {
        console.error('Error finding crop:', error);
    }
};

const getDatasFromAPI = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6844717cc493fe6fc1efdfcae8f0730d&lang=es`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            temp: data['list'][0]['main']['temp'] - 273.15,
            hum: data['list'][0]['main']['humidity'] + '%',
            wind: data['list'][0]['wind']['speed'] * 1.852,
            clouds: data['list'][0]['weather'][0]['description']
        };
    } catch (error) {
        console.log(error)
    }
};



// console.log(getWeatherDatas('1234567890', 'cult 2')
//     .then(weatherData => {
//         console.log(weatherData);
//     })
//     .catch(error => {
//         console.error('Error fetching weather data:', error);
//     }))




// para importar la base de datos ejecutar en la linea de comandos:
//npx sequelize-auto -o "./models" -d mazorcappDB.sqlite -h localhost -u lili -p 3306 -x 123 -e sqlite



// colocar { alter: true } para pruebas (reiniciar la base de datos)
sequelize.sync().then(async () => {
    app.listen(3000, () => {
        console.log(`Corriendo en el puerto 3000`)
    })
})







