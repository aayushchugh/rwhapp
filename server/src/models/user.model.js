import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'please provide an email address'],
            unique: [true, 'please provide a valid email address'],
            lowercase: true,
            validate: [validator.isEmail, 'please provide a valid email address'],
        },
        password: {
            type: String,
            required: true,
            select: false,
            validate: {
                validator: function(v) {
                  return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{10,}$/.test(v);
                },
                message: "password must contain at least 1 number, 1 letter & 1 special character"
              },
        },
        passwordConfirmation: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function(el) {
                    return el === this.password;
                },
                 message: 'Passwords do not match'
            }
        },
        passwordUpdatedAt: {
            type: Date
        },
        passwordResetToken: {
            type: String
        },
        passwordResetExpires: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = undefined;
    next();
});

userSchema.methods.checkPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    return resetToken;
  };

const User = mongoose.model('User', userSchema);

export default User;