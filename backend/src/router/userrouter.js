const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/usermodel');
const router = express.Router();
router.use(express.json());
router.post('/user', async (req, res) => {
    try {
        const UserData = new User(req.body);
        const data = await UserData.save()
        res.status(201).send(data)
    } catch (e) {
        res.status(400).send({ data: e.toString() })
    }
})
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genrateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router;