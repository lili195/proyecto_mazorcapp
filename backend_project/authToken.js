if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
import jwt from 'jsonwebtoken'
const secretkey = process.env.SESSION_SECRET

const authToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            tittle: 'Error de credenciales',
            message: 'No autorizado, inicie sesion'
        })
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        req.body.id_person = decoded.id_person;
        console.log('token válido!')
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'token inválido'
        })
    }
}

export { authToken }