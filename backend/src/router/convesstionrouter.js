const express = require('express');
const auth = require('../middleware/auth');
const convessationRoom = require('../model/convessationRoom');
const router = express.Router();
router.use(express.json());
router.post('/room', auth, async (req, res) => {
    try {
        const ConvessationRoom = new convessationRoom({ userId: req.user._id, ...req.body });
        const data = await ConvessationRoom.save();
        res.send(data)
    } catch (e) {
        res.send(e.toString())
    }
})
router.post('/roomdata', auth, async (req, res) => {
    try {
        const data = await convessationRoom.find({ $or: [{ userId: req.user._id, senderId: req.body.senderId }, { userId: req.body.senderId, senderId: req.user._id }] });
        // console.log("data", data)
        res.send(data)
    } catch (e) {
        res.send(e.toString())
    }
})
module.exports = router;