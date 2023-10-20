const { createPerson } = require('./models/person')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const jwt = require('jsonwebtoken')

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

// app.get('/', checkAuthenticated, (req, res) => {
//     console.log('solicitud recibida de front')
//     res.status(200).json({ name: req.user.name });
// })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// app.post('/login', async (req, res) => {
//     const { cc, password } = req.body;

//     const user = await users.find({ cc });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid cc or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid cc or password' });
//     }

//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//         expiresIn: '1h',
//     });

//     res.status(200).json({ token });
// });

app.post('/register', checkNotAuthenticated, async (req, res) => {
    console.log('solicitud recibida de front :)')
    try {
        console.log(req.body)
        createPerson(req.body.cc,
            req.body.name,
            req.body.number,
            'P',
            req.body.password)
        res.status(201).send('Usuario registrado con éxito');
    } catch {
        res.status(400).send('Error en solicitud');
    }
})

// app.delete('/logout', (req, res) => {
//     req.logOut(req.user, err => {
//         if (err) return next(err);
//         res.redirect("/");
//     })
// })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

const { conn } = require('./config/db')

// colocar true para pruebas (reiniciar la base de datos)
conn.sync({ force: true }).then(async () => {
    app.listen(3000, () => {
        console.log(`%s listening at 3000`) // eslint-disable-line no-console
    })
})