const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchama = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("email id not valid ....")
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'password length 8 char..']
    }
}, { timestamps: true });
userSchama.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next()
})
userSchama.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email: email })
    
    if (!user) throw new Error("Login Unable....");
    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) throw new Error("user Password Wrong....");
    return user;
}
userSchama.methods.genrateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user.id.toString() }, "myChatApp")
    return token;
}
const User = mongoose.model('user', userSchama);
module.exports = User;