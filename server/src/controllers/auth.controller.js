import crypto from 'crypto';
import User from '../models/user.model.js';
import mail from '../utils/mail.utils.js';
import signJWT from '../utils/signjwt.utils.js';

export const register = async (req, res) => {
    const {email, password, passwordConfirmation } = req.body;
     
    const newUser = await User.create({
        email,
        password,
        passwordConfirmation
    });
    
    
    if(!newUser) {
        return res.json({status: "error", message: "Something went wrong"});
    }
    const userID = newUser._id
    const token = signJWT(userID);
    res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    return res.json({
        status:"ok", message: "Registration Successful", userID, token
    });
    
}

export const getMe = async (req, res) => {
    //console.log(req.user._id);
    const userID = req.user._id;
    //const user = await User.findOne({ email });
    //console.log(user)
    if(!userID) {
        return res.json({
            status: "error", message: "Please signin" 
        });
    }
    return res.json({
        status: "ok", message: "Logged In", userID 
    });
}

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.json({status: "error", message: "Invalid Credentials"});
    }
  
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
        return res.json({status: "error", message: "Invalid Credentials"});
    }
    const userID = user._id
    const token = signJWT(userID);

    res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    return res.json({
        status: "ok", message: "Login Successful", userID, token 
    });
}

export const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: 36000000,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    return res.json({ status: 'ok', message: "Logout Successful" });
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    const user  = await User.findOne({ email});
    
    if(!user) {
        return res.json({status: "error", message: "Invalid Credentials"});
    }

    const resetToken = user.createPasswordResetToken();
    
    await user.save({ validateBeforeSave: false });
    
    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`

    try {
        await mail('john@example.com', resetURL);
        return res.json({ status: 'ok', message: 'Password reset has been sent to your email' });
    } catch (err) {
        return res.json({status: "error", message: "Something went wrong!"});
    }
}

export const resetPassword = async(req, res) => {
    let { token } = req.params;
    
    const { password, passwordConfirmation } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
        return res.json({status: "error", message: "Invalid Credentials!"});
    }

    user.password = password;
    user.passwordConfirmation = passwordConfirmation;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const userID = user._id
    token = signJWT(userID);

    res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    return res.json({
        status: 'ok', message: "Password Reset Successful", userID, token 
    });
}