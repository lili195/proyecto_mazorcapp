if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const { Sequelize } = require('sequelize')
const { createPerson } = require('./queries/person')
const { createCrop } = require('./queries/crop')
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
})

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
})

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
            let token = jwt.sign({ id_person: personFound.id_person }, secretkey, {expiresIn: '10h'});
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
})

// recuperar id del cultivo desde el front tambien


app.post('/cropNew', auth.authToken, async (req, res) => {
    console.log(req.body)
    try {
        const existingCrop = await cropsTable.findOne({
            where: {
                id_person: req.body.id_person,
                id_crop: req.body.id_crop,
            },
        });
        
        if(!existingCrop) {
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
})

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




// para importar la base de datos ejecutar en la linea de comandos:
//npx sequelize-auto -o "./models" -d mazorcappDB.sqlite -h localhost -u lili -p 3306 -x 123 -e sqlite



// colocar true para pruebas (reiniciar la base de datos)
sequelize.sync({ alter: true }).then(async () => {
    app.listen(3000, () => {
        console.log(`Corriendo en el puerto 3000`)
    })
})







