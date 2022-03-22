const express = require('express');
const mongoose = require('mongoose');
const convessationRoomSchama = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    }
}, { timestamps: true });
const convessationRoom = mongoose.model('ConvessationRoom', convessationRoomSchama);
module.exports = convessationRoom;
