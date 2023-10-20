const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByCc) {
    const authenticateUser = async (cc, password, done) => {
        const user = getUserByCc(cc);
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'cc' }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.cc));

    passport.deserializeUser((cc, done) => {
        return done(null, cc);
    });
}

module.exports = initialize;