import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/user.model.js';

const authorisation = async (req, res, next) => {
  
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 

    if (!token) {
        res.json({status: "error", message: err});
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        res.json({status: "error", message: err});
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
};

export default authorisation;