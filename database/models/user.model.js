/* user.model.js */
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBloacked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    age: Number,
    passwordChangedAt: Date,
    otpCode: String,
    otpExpire: Date
}, { timestamps: true, versionKey: false });

schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();  
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

schema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    }
    this.setOptions({ runValidators: true });  
    next();
});

export const User = mongoose.model('User', schema);
