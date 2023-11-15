const { createPerson } = require('./models/person')
const { people, crops } = require('./config/db')
const { createCrop } = require('./models/crop')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const twilio = require('twilio')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.post('/register', async (req, res) => {
    console.log('solicitud recibida de front :)')
    try {
        const existingPerson = await people.findOne({
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
                req.body.cc,
                req.body.name,
                req.body.number,
                'P',
                bcrypt.hashSync(req.body.password, 10)
            );

            res.status(200).json({
                title: 'Registro exitoso',
            });
            console.log('======================')
            console.log('Se registró correctamente :D')
            console.log('======================')
        }
    } catch (error) {
        // Otro tipo de error
        res.status(500).json({
            title: 'Error interno del servidor',
            error: 'Ocurrió un error al procesar la solicitud',
        });

    }
})

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
        const existingNum = await people.findOne({
            where: {
                number_person: req.body.num,
            },
        });
        if (existingNum) {
            const otp = getOTP()
            let number_person = '+57' + req.body.num
            console.log(otp, number_person)
            sendSMS(otp, number_person)
            res.status(200).json({
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

app.post('/password_reset', async (req, res) => {

})

app.post('/login', async (req, res) => {
    try {
        const personFound = await people.findOne({
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
            let token = jwt.sign({ id_person: personFound.id_person }, 'secretkey');
            return res.status(200).json({
                title: 'Login exitoso',
                token: token,
                id_person: personFound.id_person
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

app.post('/cropNew', async (req, res) => {
    console.log("Solicitud recibida de front")
    try {
        console.log(req.body)
        createCrop(
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
    } catch {
        res.status(400).send('Error en solicitud');
    }
})

app.get('/followGrowth', async(req, res) => {



})

// async function getCropLocation(id_crop) {
//     const crop = await crops.findOne({
//         where: {
//             id_crop: id_crop,
//         }
//     })
//     const cropData = crop.get();
//     console.log(cropData)
// } 

//TODO: revisar q el getcroplocation funcione





const { conn } = require('./config/db')

// colocar true para pruebas (reiniciar la base de datos)
conn.sync({ force: false }).then(async () => {
    app.listen(3000, () => {
        console.log(`Corriendo en el puerto 3000`)
    })
})