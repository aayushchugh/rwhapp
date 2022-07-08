import express from 'express';
import authorisation from '../middleware/authorisation.middleware.js';

import { getMe, register, login, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authorisation, logout);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.get('/me', authorisation, getMe)
router.get('/dashboard', authorisation, (req, res) => {
    res.json({status: 'ok', message: 'you have permission to be here'});
});

export default router;