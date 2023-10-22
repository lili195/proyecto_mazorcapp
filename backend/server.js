const { createPerson, searchPerson } = require('./models/person')
const { people } = require('./config/db')

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

const initPassport = require('./passport-config')
initPassport(passport,
    cc => users.find(user => user.cc === cc)
)

const users = []

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
        // si ya existe la cc en la db, se envía el error
        if (searchPerson(req.body.cc)) {
            
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

app.post('login', async (req, res) => {

})

// app.delete('/logout', (req, res) => {
//     req.logOut(req.user, err => {
//         if (err) return next(err);
//         res.redirect("/");
//     })
// })

const { conn } = require('./config/db')

// colocar true para pruebas (reiniciar la base de datos)
conn.sync({ force: false }).then(async () => {
    app.listen(3000, () => {
        console.log(`%s listening at 3000`) // eslint-disable-line no-console
    })
})