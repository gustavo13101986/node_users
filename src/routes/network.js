const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find();
    console.log(users)
    res.json(users)
})

router.post('/', async (req, res) => {
    const { nombre, apellido, correo, telefono, password } = req.body
    const user = new User({
        nombre,
        apellido,
        correo,
        telefono,
        password
    })
    await user.save()
    res.json({status: 'User Saved'})
})



module.exports = router;