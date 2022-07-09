import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/user.model.js';

const verifyJWT = async (req, res, next) => {
    
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        token = req.cookies.jwt;
    }
    console.log(token);
    if (!token) {
        next();
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        next();
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    console.log(currentUser);
    next();
};

export default verifyJWT;