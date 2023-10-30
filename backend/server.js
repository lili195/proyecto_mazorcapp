const { createPerson } = require('./models/person')
const { people } = require('./config/db')
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
            let token = jwt.sign({ id_person: personFound.id_person}, 'secretkey');
            return res.status(200).json({
                title: 'Login exitoso',
                token: token
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
            req.body.id_crop,
            req.body.start_date,
            req.body.latitude,
            req.body.longitude,
            req.body.altitude,
            req.body.area,
            req.body.plants_num,
            req.body.plants_m2
        )
        res.status(201).send('Cultivo registrado con éxito');
    } catch {
        res.status(400).send('Error en solicitud');
    }
})

app.post('/session', async (req, res)=> {
    
})

const { conn } = require('./config/db')

// colocar true para pruebas (reiniciar la base de datos)
conn.sync({ force: false }).then(async () => {
    app.listen(3000, () => {
        console.log(`%s listening at 3000`) // eslint-disable-line no-console
    })
})