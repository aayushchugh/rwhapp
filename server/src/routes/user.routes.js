import express from 'express';
import authorisation from '../middleware/authorisation.middleware.js';
import verifyJWT from '../middleware/verifyJWT,middleware.js';
import { getMe, register, login, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

//router.use(verifyJWT);

router.use( (req, res, next) => {
    console.log(req.headers);
    next();
})

router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyJWT, logout);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.get('/me', verifyJWT, getMe)
router.get('/dashboard', (req, res) => {
    res.json({status: 'ok', message: 'you have permission to be here'});
});

export default router;